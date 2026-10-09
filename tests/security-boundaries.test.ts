import test from 'node:test';
import assert from 'node:assert/strict';
import { PDFDocument, PDFName, PDFString } from 'pdf-lib';
import * as CFB from 'cfb';
import { zipSync, strToU8 } from 'fflate';
import { readBoundedBytes } from '../src/lib/security/body';
import { validateCv, validateFileIntent, sha256, CV_MAX_BYTES } from '../src/lib/cv/validation';
import { triage } from '../src/lib/security/triage';
import { externalDocumentUrl, siteOrigin } from '../src/lib/security/origin';
import { trustedClientIp, privateIdentifier } from '../src/lib/security/identity';
import { issueCsrf, validCsrf, CSRF_COOKIE } from '../src/lib/security/csrf';
import { formatSlackMessage } from '../src/lib/webhook';
import { isNegotiablePublicPath } from '../src/lib/public-routes';
import { validateCandidate } from '../src/lib/intake/validation';
import { remarkSafeEditorial } from '../src/lib/security/mdx';
import { GET as cvPage } from '../src/app/cv/[id]/route';

async function pdf(size=0) {
  const doc=await PDFDocument.create();doc.addPage();const bytes=await doc.save();
  if(!size)return bytes;
  const result=new Uint8Array(size);result.fill(32);result.set(bytes.subarray(0,bytes.length-5));result.set(strToU8('%%EOF'),size-5);return result;
}
function docx(extra:Record<string,Uint8Array>={}) {return zipSync({
  '[Content_Types].xml':strToU8('<Types><Override ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'),
  'word/document.xml':strToU8('<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p/></w:body></w:document>'),...extra,
});}
function doc() {
  const file=CFB.utils.cfb_new();const word=Buffer.alloc(4096);word.writeUInt16LE(0xa5ec);word.writeUInt16LE(0x00c1,2);
  CFB.utils.cfb_add(file,'WordDocument',word);CFB.utils.cfb_add(file,'0Table',Buffer.alloc(4096));return new Uint8Array(CFB.write(file,{type:'buffer'}));
}
test('5 MB valid PDF, DOC and DOCX pass; fake formats, executables, oversized files and active content stay isolated',async()=>{
  for(const [extension,bytes] of [['pdf',await pdf()],['pdf',await pdf(CV_MAX_BYTES)],['doc',doc()],['docx',docx()]] as const){
    const intent=validateFileIntent({extension,size:bytes.length,sha256:sha256(bytes)});assert.equal((await validateCv(bytes,intent)).status,'valid',extension);
  }
  const forged=strToU8('MZ executable, this is not a PDF');
  assert.equal((await validateCv(forged,{extension:'pdf',size:forged.length,sha256:sha256(forged)})).status,'invalid');
  assert.throws(()=>validateFileIntent({extension:'pdf',size:CV_MAX_BYTES+1,sha256:'a'.repeat(64)}));
  const macro=docx({'word/vbaProject.bin':strToU8('synthetic macro placeholder')});assert.equal((await validateCv(macro,{extension:'docx',size:macro.length,sha256:sha256(macro)})).status,'suspicious');
  const active=await PDFDocument.create();active.addPage();active.catalog.set(PDFName.of('OpenAction'),active.context.obj({S:'JavaScript',JS:PDFString.of('test')}));
  const activeBytes=await active.save();assert.equal((await validateCv(activeBytes,{extension:'pdf',size:activeBytes.length,sha256:sha256(activeBytes)})).status,'suspicious');
});
test('unusual names, agents, empty messages, Gmail and external links alone do not determine spam',()=>{
  const random='bSmdCTLwgYpOSjAxwfCNoe';
  assert.deepEqual(triage('contact',{nome:random,empresa:random,mensagem:''}).reasons,[]);
  assert.equal(triage('contact',{nome:random,empresa:random,mensagem:random}).reasons.length,1);
  for(const nome of ['Inês São João','Nguyễn','O’Connor',random])assert.deepEqual(triage('spontaneous',{nome,mensagem:'',email:'candidate@gmail.com',cv_link:'https://example.org',agent:true}).reasons,[]);
  assert.deepEqual(triage('spontaneous',{nome:random,mensagem:random,cv_link:'https://www.linkedin.com/in/test'}).reasons,[]);
  assert.equal(triage('spontaneous',{nome:random,mensagem:random,cv_link:'https://example.org'}).reasons.length,1);
});
test('chunked input is bounded during reading, including unknown Content-Length',async()=>{
  let cancelled=false;
  const stream=new ReadableStream({start(controller){controller.enqueue(new Uint8Array(63_000));controller.enqueue(new Uint8Array(2_000));},cancel(){cancelled=true;}});
  await assert.rejects(readBoundedBytes(new Response(stream),64_000));assert.equal(cancelled,true);
  await assert.rejects(readBoundedBytes(new Response('small',{headers:{'content-length':'8001'}}),8000));
});
test('public HTTPS links are syntactically checked without contacting their destinations',()=>{
  for(const url of ['javascript:alert(1)','http://example.org','https://127.0.0.1/a','https://[::1]/','https://localhost/','https://me:secret@example.org/','https://site.internal/'])assert.throws(()=>externalDocumentUrl(url));
  assert.equal(externalDocumentUrl('https://drive.google.com/file/d/123'),'https://drive.google.com/file/d/123');
});
test('configured production and preview origins cannot be selected by visitor headers',()=>{
  assert.equal(siteOrigin({VERCEL_ENV:'production'}),'https://www.medisigma.pt');
  assert.equal(siteOrigin({VERCEL_ENV:'preview',VERCEL_URL:'medisigma-example.vercel.app'}),'https://medisigma-example.vercel.app');
  assert.throws(()=>siteOrigin({VERCEL_ENV:'preview',VERCEL_URL:'attacker.org'}));
  for(const path of ['/cv/123','/%63v/123','/api/cv/access','/%61dmin/forms'])assert.equal(isNegotiablePublicPath(path),false);
});
test('trusted ingress ignores spoofed forwarding headers and HMACs separate identities',async()=>{
  const previous={VERCEL:process.env.VERCEL,SUPABASE_SERVICE_ROLE:process.env.SUPABASE_SERVICE_ROLE};
  process.env.VERCEL='1';process.env.SUPABASE_SERVICE_ROLE='synthetic-secret';
  try {
    const req=new Request('https://example.org',{headers:{'x-forwarded-for':'attacker','x-real-ip':'attacker','x-vercel-forwarded-for':'203.0.113.9'}});
    assert.equal(trustedClientIp(req),'203.0.113.9');
    assert.throws(()=>trustedClientIp(new Request('https://example.org',{headers:{'x-forwarded-for':'203.0.113.9'}})));
    const a=await privateIdentifier('ip','203.0.113.9');assert.match(a,/^[a-f0-9]{64}$/);assert.notEqual(a,await privateIdentifier('email','203.0.113.9'));
  } finally {for(const [k,v] of Object.entries(previous))if(v===undefined)delete process.env[k];else process.env[k]=v;}
});
test('admin writes require same origin and a session-bound CSRF token; public JSON contracts keep optional fields',async()=>{
  const previous=process.env.SUPABASE_SERVICE_ROLE;process.env.SUPABASE_SERVICE_ROLE='synthetic-secret';
  try {
    const authorization='Basic synthetic';const token=await issueCsrf(new Request('http://localhost:3000/api/admin/csrf',{headers:{authorization}}));
    const request=(origin='http://localhost:3000',header=token,auth=authorization)=>new Request('http://localhost:3000/api/admin/intake',{method:'POST',headers:{origin,authorization:auth,cookie:`${CSRF_COOKIE}=${token}`,'x-csrf-token':header}});
    assert.equal(await validCsrf(request()),true);assert.equal(await validCsrf(request('https://attacker.org')),false);assert.equal(await validCsrf(request(undefined,'')),false);assert.equal(await validCsrf(request(undefined,undefined,'Basic another')),false);
    const candidate=validateCandidate({nome:'João',email:'test@example.org'},'application');assert.equal(candidate.payload.telefone,'');assert.equal(candidate.payload.mensagem,'');
  } finally {if(previous===undefined)delete process.env.SUPABASE_SERVICE_ROLE;else process.env.SUPABASE_SERVICE_ROLE=previous;}
});
test('Slack renders submitted strings as plain text and disables link previews',()=>{
  const payload=formatSlackMessage({tipo:'candidatura',nome:'<!channel>',email:'test@example.org',telefone:'',mensagem:'<https://attacker.org|click> <!here>',cv_link:'https://www.medisigma.pt/cv/123#token=secret'});
  assert.equal(payload.unfurl_links,false);assert.equal(payload.unfurl_media,false);
  for(const block of payload.blocks){if('fields' in block)for(const field of block.fields)if(field.text.includes('<!channel>'))assert.equal(field.type,'plain_text');if('text' in block && typeof block.text==='object' && block.text.text.includes('<!here>'))assert.equal(block.text.type,'plain_text');}
});
test('CV viewer strips fragment before access, bypasses analytics and forbids cache/indexing',async()=>{
  const response=await cvPage(new Request('https://www.medisigma.pt/cv/00000000-0000-4000-8000-000000000001'),{params:Promise.resolve({id:'00000000-0000-4000-8000-000000000001'})});
  const html=await response.text();assert.match(response.headers.get('cache-control')||'',/no-store/);assert.match(response.headers.get('x-robots-tag')||'',/noindex/);
  assert.ok(html.indexOf('history.replaceState')<html.indexOf("fetch('/api/cv/access'"));assert.doesNotMatch(html,/analytics|googletagmanager|_next\/static/);
});
test('MDX AST rejects executable elements, events, unsafe links and unknown components but retains editorial content',async()=>{
  const {compileMDX}=await import('next-mdx-remote/rsc');
  for(const source of ['<script>alert(1)</script>','<iframe src="https://example.org" />','<div onClick="evil">x</div>','<a href="javascript:alert(1)">x</a>','<Unknown />','<img src="data:text/html,x" />','[x](javascript:alert%281%29)']){
    await assert.rejects(compileMDX({source,options:{mdxOptions:{remarkPlugins:[remarkSafeEditorial]}}}),source);
  }
  await compileMDX({source:'# Título\n\n**Texto** e [ligação](https://example.org).\n\n<FacebookVideo />',components:{FacebookVideo:()=>null},options:{mdxOptions:{remarkPlugins:[remarkSafeEditorial]}}});
  await compileMDX({source:'<NoiseAssessmentMedia />',components:{NoiseAssessmentMedia:()=>null},options:{mdxOptions:{remarkPlugins:[remarkSafeEditorial]}}});
  for (const source of ['<NoiseAssessmentMedia src="https://example.org/video.mp4" />', '<NoiseAssessmentMedia {...props} />', '<NoiseAssessmentMedia onClick="evil" />', '<NoiseAssessmentMedia><script>alert(1)</script></NoiseAssessmentMedia>']) {
    await assert.rejects(compileMDX({source,options:{mdxOptions:{remarkPlugins:[remarkSafeEditorial]}}}),source);
  }
});
