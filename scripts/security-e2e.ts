// Explicit synthetic integration workflow. Uses real private storage/database,
// a local notification receiver, and cleans up only IDs created in this process.
import { loadEnvConfig } from '@next/env';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { writeFile, readFile, mkdir } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';
import { PDFDocument } from 'pdf-lib';
import { zipSync,strToU8 } from 'fflate';
import * as CFB from 'cfb';
import { sha256, CV_BUCKET, CV_MAX_BYTES } from '../src/lib/cv/validation';
import { validateCandidate } from '../src/lib/intake/validation';
import { privateIdentifier } from '../src/lib/security/identity';
loadEnvConfig(process.cwd());
const base='http://127.0.0.1:3147';
const client=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE!,{auth:{persistSession:false}});
const ids:string[]=[];const messages:unknown[]=[];const results:string[]=[];
const authorization=`Basic ${Buffer.from(`security-local:${randomUUID()}`).toString('base64')}`;
const credentials=Buffer.from(authorization.slice(6),'base64').toString().split(':');
let logs='';let child:ReturnType<typeof spawn> | undefined;
let testPostId='';
async function clearLocalCounters() {
  const key=await privateIdentifier('ip','local-development');
  const result=await client.schema('web').from('intake_counters').delete().in('key',['submit-ip','admin-failed','cv-access'].map(prefix=>`${prefix}:${key}`));
  if(result.error)throw Error('Local test counter cleanup failed');
}
const receiver=createServer((req,res)=>{let body='';req.on('data',chunk=>body+=chunk);req.on('end',()=>{messages.push(JSON.parse(body));res.end('ok');});});
async function json(path:string,body:unknown,headers:Record<string,string>={}) {
  const response=await fetch(base+path,{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(body)});
  return {response,data:await response.json()};
}
async function csrfHeaders() {
  const response=await fetch(base+'/api/admin/csrf',{headers:{authorization}});assert.equal(response.status,200);
  const {token}=await response.json();const cookie=response.headers.get('set-cookie')!.split(';')[0];
  return {authorization,origin:base,'x-csrf-token':token,cookie};
}
async function fixtures() {
  const pdf=await PDFDocument.create();pdf.addPage();const small=await pdf.save();const big=new Uint8Array(CV_MAX_BYTES);big.fill(32);big.set(small.subarray(0,small.length-5));big.set(strToU8('%%EOF'),big.length-5);
  const docx=zipSync({'[Content_Types].xml':strToU8('<Types><Override ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'),'word/document.xml':strToU8('<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>TESTE TECNICO SEM DADOS PESSOAIS</w:t></w:r></w:p></w:body></w:document>')});
  const compound=CFB.utils.cfb_new();const word=Buffer.alloc(4096);word.writeUInt16LE(0xa5ec);word.writeUInt16LE(0xc1,2);CFB.utils.cfb_add(compound,'WordDocument',word);CFB.utils.cfb_add(compound,'0Table',Buffer.alloc(4096));
  return {pdf:big,docx,doc:new Uint8Array(CFB.write(compound,{type:'buffer'})),small};
}
async function cleanup() {
  if(testPostId){const result=await client.schema('web').from('posts').delete().eq('id',testPostId);if(result.error)throw Error('Draft cleanup failed');}
  await clearLocalCounters();
  if(!ids.length)return;
  const db=client.schema('web');const uploads=await db.from('cv_uploads').select('id,object_path').in('submission_id',ids);
  const intake=await db.from('public_intake').select('kind,operational_id').in('submission_id',ids);
  if(uploads.error || intake.error)throw Error('Test cleanup lookup failed');
  if(uploads.data.length){await client.storage.from(CV_BUCKET).remove(uploads.data.map(row=>row.object_path));await db.from('cv_access_tokens').delete().in('cv_id',uploads.data.map(row=>row.id));}
  const operations=[await db.from('intake_reviews').delete().in('submission_id',ids),await db.from('cv_uploads').delete().in('submission_id',ids),await db.from('public_intake').delete().in('submission_id',ids),await db.from('lead_submissions').delete().in('submission_id',ids)];
  for(const kind of ['contact','spontaneous','application']){
    const operational=intake.data.filter(row=>row.kind===kind&&row.operational_id).map(row=>row.operational_id);
    if(operational.length)operations.push(await db.from(kind==='contact'?'contacts':'candidaturas').delete().in('id',operational));
  }
  if(operations.some(result=>result.error))throw Error('Synthetic test cleanup incomplete');
}
async function main() {
  await mkdir('output/security',{recursive:true});
  await clearLocalCounters();
  await new Promise<void>(resolve=>receiver.listen(3148,'127.0.0.1',resolve));
  child=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-H','127.0.0.1','-p','3147'],{env:{...process.env,NODE_ENV:'production',SECURITY_LOCAL_TEST:'1',LOCAL_SITE_ORIGIN:base,VERCEL:'',VERCEL_ENV:'',ADMIN_USERNAME:credentials[0],ADMIN_PASSWORD:credentials[1],SLACK_WEBHOOK_URL:'http://127.0.0.1:3148'},stdio:['ignore','pipe','pipe'],windowsHide:true});
  child.stdout!.on('data',chunk=>{logs=(logs+chunk).slice(-12000);});child.stderr!.on('data',chunk=>{logs=(logs+chunk).slice(-12000);});
  for(let i=0;i<60;i++){try{if((await fetch(base+'/api/admin/csrf',{headers:{authorization}})).ok)break;}catch{}await delay(500);}
  const historical=JSON.parse(await readFile('output/security/historical-cv-references.json','utf8'));
  const now=await client.schema('web').from('candidaturas').select('id,cv_link').in('id',historical.map((row:{id:string})=>row.id)).order('id');assert.deepEqual(now.data,historical);results.push('historical-references-unchanged');
  for(const ext of ['pdf','doc','docx']){
    const old=historical.find((row:{cv_link:string})=>row.cv_link?.includes('/object/public/os-cv/')&&row.cv_link.toLowerCase().endsWith('.'+ext));
    assert.ok(old);const head=await fetch(old.cv_link,{method:'HEAD',redirect:'error'});assert.equal(head.status,200);
  }results.push('historical-pdf-doc-docx-head-only');
  const files=await fixtures();
  let cvId='';let token='';
  for(const extension of ['pdf','doc','docx'] as const){
    const id=randomUUID();ids.push(id);const bytes=files[extension];
    const submission={submission_id:id,nome:`TESTE TECNICO ${extension.toUpperCase()}`,email:`${id}@example.org`,telefone:'000000000',mensagem:'Teste técnico de segurança. Sem candidato real.'};
    const auth=await json('/api/cv/uploads',{kind:'spontaneous',submission,file:{name:`cv.${extension}`,size:bytes.length,sha256:sha256(bytes)}});assert.equal(auth.response.status,200,JSON.stringify(auth.data));
    assert.ok(auth.data.signed_url);const repeated=await json('/api/cv/uploads',{kind:'spontaneous',submission,file:{name:`cv.${extension}`,size:bytes.length,sha256:sha256(bytes)}});assert.equal(repeated.data.upload_id,auth.data.upload_id);
    const upload=await fetch(auth.data.signed_url,{method:'PUT',headers:{'Content-Type':auth.data.content_type,'x-upsert':'false'},body:bytes as BodyInit});assert.equal(upload.status,200,await upload.text());
    const duplicateUpload=await fetch(auth.data.signed_url,{method:'PUT',headers:{'Content-Type':auth.data.content_type,'x-upsert':'false'},body:bytes as BodyInit});assert.equal(duplicateUpload.ok,false);
    const alien=await json('/api/spontaneous-applications',{...submission,submission_id:randomUUID(),upload_id:auth.data.upload_id});assert.equal(alien.response.status,409);
    const before=messages.length;const finished=await json('/api/spontaneous-applications',{...submission,upload_id:auth.data.upload_id});assert.equal(finished.response.status,200,JSON.stringify(finished.data));assert.equal(finished.data.saved,true);assert.equal(messages.length,before+1);
    const retry=await json('/api/spontaneous-applications',{...submission,upload_id:auth.data.upload_id});assert.equal(retry.data.duplicate,true);assert.equal(messages.length,before+1);
    const notification=JSON.stringify(messages.at(-1));const match=/\/cv\/([a-f0-9-]{36})#token=([A-Za-z0-9_-]{43})/.exec(notification);assert.ok(match);cvId=match[1];token=match[2];
    const access=await json('/api/cv/access',{id:cvId,token});assert.equal(access.response.status,200);assert.equal(access.data.expiresIn,300);
    const document=await fetch(access.data.url);assert.equal(document.status,200);assert.equal(sha256(new Uint8Array(await document.arrayBuffer())),sha256(bytes));
    const uploadRecord=await client.schema('web').from('cv_uploads').select('object_path').eq('id',cvId).single();assert.ok(uploadRecord.data);
    const publicAttempt=await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${CV_BUCKET}/${uploadRecord.data.object_path}`);assert.equal(publicAttempt.ok,false);
    results.push(`private-${extension}-upload-read-repeat-binding${extension==='pdf'?'-5MB':''}`);
  }
  const accessAgain=await json('/api/cv/access',{id:cvId,token});assert.equal(accessAgain.response.status,200);
  const wrong=await json('/api/cv/access',{id:randomUUID(),token});assert.equal(wrong.response.status,403);
  let headers=await csrfHeaders();const renewed=await json(`/api/admin/cv/${cvId}`,{action:'create'},headers);assert.equal(renewed.response.status,200);
  assert.ok(Date.parse(renewed.data.expiresAt)-Date.now()>89*86400000);const newToken=new URL(renewed.data.url).hash.slice(7);
  const expired=await client.schema('web').from('cv_access_tokens').update({expires_at:new Date(Date.now()-1000).toISOString()}).eq('cv_id',cvId).eq('token_hash',sha256(token));assert.equal(expired.error,null);
  assert.equal((await json('/api/cv/access',{id:cvId,token})).response.status,403);
  assert.equal((await json('/api/cv/access',{id:cvId,token:newToken})).response.status,200);
  const adminCv=await fetch(base+`/api/admin/cv/${cvId}`,{headers:{authorization}});assert.equal(adminCv.status,200);
  headers=await csrfHeaders();assert.equal((await json(`/api/admin/cv/${cvId}`,{action:'revoke'},headers)).response.status,200);assert.equal((await json('/api/cv/access',{id:cvId,token:newToken})).response.status,403);results.push('token-expiry-renewal-revocation-admin-access');
  const oversized=await json('/api/cv/uploads',{kind:'spontaneous',submission:{nome:'TESTE',email:'x@example.org',telefone:'0'},file:{name:'cv.pdf',size:CV_MAX_BYTES+1,sha256:'f'.repeat(64)}});assert.equal(oversized.response.status,413);
  const forgedId=randomUUID();ids.push(forgedId);const forged=strToU8('MZ synthetic invalid format, no executable');const forgedFields={submission_id:forgedId,nome:'TESTE INVALIDO',email:'invalid@example.org',telefone:'0'};
  const forgedAuth=await json('/api/cv/uploads',{kind:'spontaneous',submission:forgedFields,file:{name:'cv.pdf',size:forged.length,sha256:sha256(forged)}});assert.equal(forgedAuth.response.status,200);
  assert.equal((await fetch(forgedAuth.data.signed_url,{method:'PUT',headers:{'Content-Type':'application/pdf'},body:forged as BodyInit})).status,200);
  const beforeInvalid=messages.length;assert.equal((await json('/api/spontaneous-applications',{...forgedFields,upload_id:forgedAuth.data.upload_id})).response.status,422);assert.equal(messages.length,beforeInvalid);results.push('oversize-forged-file-isolation');
  for(const native of [false,true]){
    const id=randomUUID();ids.push(id);const fields={submission_id:id,empresa:'TESTE TECNICO',nome:'Inês São João',email:`${id}@example.org`,servico:'Medicina do Trabalho'};
    if(native){const response=await fetch(base+'/api/contact',{method:'POST',redirect:'manual',headers:{'Content-Type':'application/x-www-form-urlencoded',Accept:'text/html'},body:new URLSearchParams(fields)});assert.equal(response.status,303);}
    else {const response=await json('/api/contact',fields,{'User-Agent':'TestAgent/1.0'});assert.equal(response.response.status,200);assert.equal(response.data.saved,true);const repeated=await json('/api/contact',fields);assert.equal(repeated.data.duplicate,true);}
  }results.push('contact-json-agent-native-optional-fields-idempotency');
  const legacyId=randomUUID();ids.push(legacyId);const form=new FormData();form.set('submission_id',legacyId);form.set('name','TESTE MULTIPART');form.set('email',`${legacyId}@example.org`);form.set('cv',new Blob([files.small as BlobPart],{type:'application/pdf'}),'cv.pdf');
  const legacy=await fetch(base+'/api/applications',{method:'POST',headers:{Accept:'text/html'},body:form});assert.equal(legacy.status,200);assert.match(await legacy.text(),/Candidatura recebida/);results.push('legacy-multipart-native-confirmation');
  // Synthetic held record exercises authenticated recovery while real traffic stays in observation.
  const heldId=randomUUID();ids.push(heldId);const held=validateCandidate({submission_id:heldId,nome:'TESTE REVISAO',email:`${heldId}@example.org`,telefone:'0'},'spontaneous');
  const stored=await client.schema('web').from('public_intake').insert({submission_id:heldId,kind:held.kind,payload_hash:held.payloadHash,payload:held.payload,state:'held',suspected:true,reasons:['honeypot'],rules_version:'test-fixture',mode_at_receipt:'enforce'});assert.equal(stored.error,null);
  headers=await csrfHeaders();assert.equal((await json('/api/admin/intake',{id:heldId,action:'accept'},{...headers,origin:'https://attacker.org'})).response.status,403);
  assert.equal((await json('/api/admin/intake',{id:heldId,action:'accept'},{authorization,origin:base})).response.status,403);
  const beforeReview=messages.length;assert.equal((await json('/api/admin/intake',{id:heldId,action:'accept'},headers)).response.status,200);assert.equal((await json('/api/admin/intake',{id:heldId,action:'accept'},headers)).response.status,200);assert.equal(messages.length,beforeReview+1);
  const list=await fetch(base+'/api/admin/intake',{headers:{authorization}});assert.equal(list.status,200);const listData=await list.json();assert.ok(listData.items.some((row:{submission_id:string})=>row.submission_id===heldId));results.push('authenticated-review-csrf-single-notification');
  headers=await csrfHeaders();
  const draft=await json('/api/admin/posts',{title:'TESTE TECNICO TEMPORARIO',slug:`security-test-${randomUUID()}`,content_mdx:'## Artigo de teste\n\nTexto **editorial**.\n\n<FacebookVideo />',status:'draft'},headers);
  assert.equal(draft.response.status,201);testPostId=draft.data.post.id;
  const edited=await fetch(base+`/api/admin/posts/${testPostId}`,{method:'PUT',headers:{...await csrfHeaders(),'Content-Type':'application/json'},body:JSON.stringify({title:'TESTE EDITADO',excerpt:'Alteração de teste'})});
  assert.equal(edited.status,200);assert.equal((await edited.json()).post.title,'TESTE EDITADO');
  const preview=await fetch(base+`/admin/blog/${testPostId}/preview`,{headers:{authorization}});assert.equal(preview.status,200);
  assert.equal((await fetch(base+`/api/admin/posts/${testPostId}`,{method:'DELETE',headers:await csrfHeaders()})).status,200);testPostId='';results.push('admin-draft-create-edit-preview-delete');
  assert.equal((await fetch(base+'/api/admin/forms')).status,401);
  for(let i=0;i<11;i++){const response=await fetch(base+'/api/admin/forms',{headers:{authorization:'Basic d3Jvbmc6d3Jvbmc='}});assert.equal(response.status,i<10?401:429);if(i===10)assert.ok(response.headers.get('retry-after'));}
  results.push('shared-admin-failed-attempt-limit');
  assert.ok(!logs.includes(token)&&!logs.includes(newToken)&&!logs.includes('example.org'));
  await writeFile('output/security/e2e-results.json',JSON.stringify({checkedAt:new Date().toISOString(),passed:results,notificationCount:messages.length,notificationDestination:'local synthetic receiver'},null,2));
  console.log(JSON.stringify({passed:results,notifications:messages.length},null,2));
}
main().catch(error=>{console.error('Security E2E failed:',error.message);process.exitCode=1;}).finally(async()=>{
  try{await cleanup();console.log('Synthetic rows and objects cleaned up.');}catch{console.error('Synthetic cleanup requires attention:',ids.join(','));process.exitCode=1;}
  child?.kill();receiver.close();
});
