// Explicit live acceptance test, authorized as part of the security rollout.
// Sends three clearly labelled synthetic candidatures to the existing Slack destination.
// Never opens historical CVs or submitted external links. Tokens stay in memory.
import { loadEnvConfig } from '@next/env';
import { createClient } from '@supabase/supabase-js';
import { randomUUID,randomBytes } from 'node:crypto';
import { readFile,writeFile } from 'node:fs/promises';
import { PDFDocument } from 'pdf-lib';
import { zipSync,strToU8 } from 'fflate';
import * as CFB from 'cfb';
import assert from 'node:assert/strict';
import { sha256,CV_BUCKET,CV_MAX_BYTES } from '../src/lib/cv/validation';
loadEnvConfig(process.cwd());
const base='https://www.medisigma.pt';
const client=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE!,{auth:{persistSession:false}});
const db=client.schema('web');
const evidence='output/security/production-smoke.json';
type Entry={submissionId:string;cvId:string;extension:string};
const entries:Entry[]=[];
async function post(path:string,body:unknown){const response=await fetch(base+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const data=await response.json();assert.equal(response.status,200,`${path}: ${response.status} ${data.error || ''}`);return data;}
async function main(){
  if(process.argv.includes('--cleanup')){
    const saved=JSON.parse(await readFile(evidence,'utf8'));const ids=saved.entries.map((row:Entry)=>row.submissionId);
    const intake=await db.from('public_intake').select('submission_id,payload,operational_id').in('submission_id',ids);assert.equal(intake.error,null);
    assert.ok(intake.data!.every(row=>row.payload.nome.startsWith('TESTE TECNICO SEGURANCA ')));
    const files=await db.from('cv_uploads').select('id,object_path').in('submission_id',ids);assert.equal(files.error,null);
    const removed=await client.storage.from(CV_BUCKET).remove(files.data!.map(row=>row.object_path));assert.equal(removed.error,null);
    for(const result of [await db.from('cv_access_tokens').delete().in('cv_id',files.data!.map(row=>row.id)),await db.from('intake_reviews').delete().in('submission_id',ids),await db.from('cv_uploads').delete().in('submission_id',ids),await db.from('public_intake').delete().in('submission_id',ids),await db.from('candidaturas').delete().in('id',intake.data!.map(row=>row.operational_id))])assert.equal(result.error,null);
    await writeFile(evidence,JSON.stringify({...saved,cleanedAt:new Date().toISOString()},null,2));console.log('Synthetic production rows and objects cleaned.');return;
  }
  if(!process.argv.includes('--run'))throw Error('Pass --run to send the three authorized synthetic notifications, or --cleanup afterwards.');
  const pdf=await PDFDocument.create();pdf.addPage();const small=await pdf.save();const big=new Uint8Array(CV_MAX_BYTES);big.fill(32);big.set(small.subarray(0,small.length-5));big.set(strToU8('%%EOF'),big.length-5);
  const docx=zipSync({'[Content_Types].xml':strToU8('<Types><Override ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'),'word/document.xml':strToU8('<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p/></w:body></w:document>')});
  const compound=CFB.utils.cfb_new();const word=Buffer.alloc(4096);word.writeUInt16LE(0xa5ec);word.writeUInt16LE(0xc1,2);CFB.utils.cfb_add(compound,'WordDocument',word);CFB.utils.cfb_add(compound,'0Table',Buffer.alloc(4096));
  const fixtures={pdf:big,docx,doc:new Uint8Array(CFB.write(compound,{type:'buffer'}))};
  for(const extension of ['pdf','doc','docx'] as const){
    const id=randomUUID();const bytes=fixtures[extension];const fields={submission_id:id,nome:`TESTE TECNICO SEGURANCA ${extension.toUpperCase()}`,email:`${id}@example.org`,telefone:'000000000',mensagem:'Teste autorizado de publicação. Sem candidato real. Pode ignorar esta notificação.',origem:'Teste técnico de segurança'};
    const auth=await post('/api/cv/uploads',{kind:'spontaneous',submission:fields,file:{name:`test.${extension}`,size:bytes.length,sha256:sha256(bytes)}});
    entries.push({submissionId:id,cvId:auth.upload_id,extension});await writeFile(evidence,JSON.stringify({startedAt:new Date().toISOString(),entries},null,2));
    const upload=await fetch(auth.signed_url,{method:'PUT',headers:{'Content-Type':auth.content_type,'x-upsert':'false'},body:bytes as BodyInit});assert.equal(upload.status,200);
    const response=await post('/api/spontaneous-applications',{...fields,upload_id:auth.upload_id});assert.equal(response.saved,true);
    const repeat=await post('/api/spontaneous-applications',{...fields,upload_id:auth.upload_id});assert.equal(repeat.duplicate,true);
    const row=await db.from('public_intake').select('state,notification_status').eq('submission_id',id).single();assert.equal(row.data?.state,'accepted');assert.equal(row.data?.notification_status,'sent');
    const tokens=await db.from('cv_access_tokens').select('id',{count:'exact'}).eq('cv_id',auth.upload_id);assert.equal(tokens.count,1);
    const token=randomBytes(32).toString('base64url');const created=await db.rpc('create_cv_access_token',{p_cv_id:auth.upload_id,p_hash:sha256(token),p_actor:'authorized-synthetic-test'});assert.equal(created.error,null);
    const access=await post('/api/cv/access',{id:auth.upload_id,token});assert.equal(access.expiresIn,300);
    const file=await fetch(access.url);assert.equal(file.status,200);assert.equal(sha256(new Uint8Array(await file.arrayBuffer())),sha256(bytes));
    const viewer=await fetch(base+`/cv/${auth.upload_id}`);assert.equal(viewer.status,200);assert.ok(viewer.headers.get('cache-control')?.includes('no-store'));assert.doesNotMatch(await viewer.text(),/analytics|googletagmanager|_next\/static/);
    console.log(`Production ${extension}: private upload, validation, Slack delivery, single notification and token access passed.`);
  }
  await writeFile(evidence,JSON.stringify({checkedAt:new Date().toISOString(),entries,slackNotifications:3,passed:true},null,2));
}
main().catch(error=>{console.error('Production smoke failed:',error.message);process.exitCode=1;});
