import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { PGlite } from '@electric-sql/pglite';
import { validateLeadSubmission } from '../src/lib/leads/validation';
import { validateCandidate } from '../src/lib/intake/validation';
import { sha256 } from '../src/lib/cv/validation';
const db = new PGlite();
async function rpc<T = Record<string,unknown>>(name:string,args:unknown[]):Promise<T> {
  const result=await db.query<{value:T}>(`select web.${name}(${args.map((_,i)=>`$${i+1}`).join(',')}) as value`, args);
  return result.rows[0].value;
}
function contact(reasons:string[]=[]) {
  const payload=validateLeadSubmission({submission_id:randomUUID(),empresa:'Teste de integração',nome:'Inês São João',email:`${randomUUID()}@example.org`,servico:'Medicina do Trabalho',mensagem:'',telefone:''})!;
  return {kind:'contact',submissionId:payload.submissionId,payloadHash:payload.payloadHash,payload,reasons,ruleVersion:'test'};
}
before(async()=>{
  await db.exec(await readFile('tests/fixtures/intake-baseline.sql','utf8'));
  await db.exec(await readFile('supabase/review/proposal-details.sql','utf8'));
  await db.exec(await readFile('supabase/migrations/20261006120140_public_intake_private_cv.sql','utf8'));
  await db.exec(await readFile('supabase/migrations/20261006123346_intake_legacy_retry_guard.sql','utf8'));
});
after(async()=>{await db.close();});
test('additive migration keeps historical CV public and new intake private',async()=>{
  const result=await db.query<{public:boolean}>('select public from storage.buckets where id=$1',['os-cv']);assert.equal(result.rows[0].public,true);
  for(const role of ['anon','authenticated']) {
    const q=await db.query<{allowed:boolean}>("select has_table_privilege($1,'web.public_intake','select') or has_function_privilege($1,'web.receive_public_submission(jsonb,text,text)','execute') as allowed",[role]);assert.equal(q.rows[0].allowed,false);
  }
});
test('observation, concurrent retries and notification claims produce one operational record and no trigger notification',async()=>{
  const input=contact(['random_multiple_fields']);const ip=randomUUID();
  const receipts=await Promise.all([rpc('receive_public_submission',[input,ip,randomUUID()]),rpc('receive_public_submission',[input,ip,randomUUID()])]);
  assert.equal(receipts[0].state,'accepted');assert.equal(receipts[1].duplicate,true);
  const count=await db.query<{count:number}>('select count(*)::int as count from web.contacts where id=$1',[receipts[0].operationalId]);assert.equal(count.rows[0].count,1);
  const claims=await Promise.all([rpc('claim_intake_notification',[input.submissionId]),rpc('claim_intake_notification',[input.submissionId])]);
  assert.ok(claims[0]);assert.equal(claims[1],null);
  await rpc('complete_intake_notification',[input.submissionId,claims[0].attemptId,'uncertain']);
  assert.equal(await rpc('claim_intake_notification',[input.submissionId]),null);
  const triggers=await db.query<{count:number}>('select count(*)::int as count from web.trigger_events');assert.equal(triggers.rows[0].count,0);
  const conflict=await rpc('receive_public_submission',[{...input,payloadHash:'a'.repeat(64)},ip,randomUUID()]);assert.equal(conflict.state,'conflict');
});
test('enforcement holds suspects without operational rows and accepts exactly once with review history',async()=>{
  await db.exec("update web.intake_settings set mode='enforce'");
  const input=contact(['honeypot']);const result=await rpc('receive_public_submission',[input,randomUUID(),randomUUID()]);
  assert.equal(result.state,'held');assert.equal(result.operationalId,null);assert.equal(await rpc('claim_intake_notification',[input.submissionId]),null);
  await rpc('review_public_submission',[input.submissionId,'spam','test-admin']);
  const accepted=await rpc('review_public_submission',[input.submissionId,'accept','test-admin']);assert.equal(accepted.state,'accepted');
  const repeated=await rpc('review_public_submission',[input.submissionId,'accept','test-admin']);assert.equal(repeated.operationalId,accepted.operationalId);
  const history=await db.query<{count:number}>('select count(*)::int as count from web.intake_reviews where submission_id=$1',[input.submissionId]);assert.equal(history.rows[0].count,2);
});
test('atomic shared limits count new intents only and return a hard 429 receipt after thirty IP attempts',async()=>{
  const ip=randomUUID(),email=randomUUID();let previous;
  for(let i=1;i<=31;i++) {
    const input=contact();const result=await rpc('receive_public_submission',[input,ip,email]);
    if(i===1)previous=input;
    if(i===4)assert.equal(result.state,'held');
    if(i===31){assert.equal(result.state,'limited');assert.ok(Number(result.retryAfter)>0);}
  }
  const retry=await rpc('receive_public_submission',[previous,ip,email]);assert.equal(retry.state,'accepted');assert.equal(retry.duplicate,true);
  const first=await rpc('increment_intake_counter',['parallel',600]);assert.equal(first.count,1);
  await Promise.all(Array.from({length:15},()=>rpc('increment_intake_counter',['parallel',600])));
  const last=await rpc('increment_intake_counter',['parallel',600]);assert.equal(last.count,17);
});
test('CV binding, validation, repeatable 90-day tokens, wrong CV, expiry and revocation',async()=>{
  const input=validateCandidate({submission_id:randomUUID(),nome:'João',email:'fixture@example.org',telefone:'123'},'spontaneous',{extension:'pdf',size:300,sha256:'d'.repeat(64)});
  const r=await rpc('receive_public_submission',[input,randomUUID(),randomUUID()]);assert.equal(r.state,'pending_upload');assert.equal(r.operationalId,null);
  await assert.rejects(rpc('complete_cv_upload',[input.submissionId,'e'.repeat(64),r.uploadId,'valid','test']));
  await assert.rejects(rpc('create_cv_access_token',[r.uploadId,'f'.repeat(64),null]));
  const completed=await rpc('complete_cv_upload',[input.submissionId,input.payloadHash,r.uploadId,'valid','test']);assert.equal(completed.state,'accepted');
  const again=await rpc('complete_cv_upload',[input.submissionId,input.payloadHash,r.uploadId,'valid','test']);assert.equal(again.operationalId,completed.operationalId);
  const tokenHash=sha256('synthetic-token');const token=await rpc('create_cv_access_token',[r.uploadId,tokenHash,'test-admin']);
  assert.ok(Date.parse(String(token.expiresAt))-Date.now()>89*86400000);
  for(let i=0;i<2;i++)assert.equal(await rpc('resolve_cv_access',[r.uploadId,tokenHash]),r.objectPath);
  assert.equal(await rpc('resolve_cv_access',[randomUUID(),tokenHash]),null);
  await db.query("update web.cv_access_tokens set expires_at=now()-interval '1 second' where id=$1",[token.id]);assert.equal(await rpc('resolve_cv_access',[r.uploadId,tokenHash]),null);
  const newHash=sha256('new-synthetic-token');const fresh=await rpc('create_cv_access_token',[r.uploadId,newHash,'test-admin']);
  await rpc('revoke_cv_access_tokens',[r.uploadId,'test-admin',fresh.id]);assert.equal(await rpc('resolve_cv_access',[r.uploadId,newHash]),null);
});
test('legacy receipt race and mistaken spam review preserve a single notification owner',async()=>{
  const input=contact();
  const old=await rpc('submit_lead',[input.payload]);
  await db.query("insert into web.public_intake(submission_id,kind,payload_hash,payload,state,suspected,reasons,rules_version,mode_at_receipt) values($1,'contact',$2,$3,'held',true,'{honeypot}','test','enforce')",[input.submissionId,input.payloadHash,input.payload]);
  const accepted=await rpc('review_public_submission',[input.submissionId,'accept','test-admin']);
  assert.equal(accepted.operationalId,old.contactId);
  assert.equal(await rpc('claim_intake_notification',[input.submissionId]),null);
  await rpc('review_public_submission',[input.submissionId,'spam','test-admin']);
  const restored=await rpc('review_public_submission',[input.submissionId,'accept','test-admin']);
  assert.equal(restored.state,'accepted');assert.equal(restored.operationalId,old.contactId);
  assert.equal(await rpc('claim_intake_notification',[input.submissionId]),null);
});
test('invalid CV cannot be promoted even by review and failure never confirms persistence',async()=>{
  const input=validateCandidate({submission_id:randomUUID(),nome:'Inês',email:'invalid@example.org',telefone:'123'},'spontaneous',{extension:'doc',size:300,sha256:'d'.repeat(64)});
  const r=await rpc('receive_public_submission',[input,randomUUID(),randomUUID()]);
  const completed=await rpc('complete_cv_upload',[input.submissionId,input.payloadHash,r.uploadId,'invalid','invalid_structure']);
  assert.equal(completed.state,'held');assert.equal(completed.operationalId,null);
  await assert.rejects(rpc('review_public_submission',[input.submissionId,'accept','test-admin']));
  await assert.rejects(rpc('create_cv_access_token',[r.uploadId,sha256('invalid-cv-token'),null]));
  const bad=contact();bad.payload.email='x';bad.payload.numero_extintores=-1;
  await db.exec('alter table web.contacts add constraint test_failure check(numero_extintores is null or numero_extintores>0)');
  await assert.rejects(rpc('receive_public_submission',[bad,randomUUID(),randomUUID()]));
  const rows=await db.query('select 1 from web.public_intake where submission_id=$1',[bad.submissionId]);assert.equal(rows.rows.length,0);
});
