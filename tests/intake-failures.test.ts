import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { POST as contact } from '../src/app/api/contact/route';
import { POST as uploads } from '../src/app/api/cv/uploads/route';
import { finishReceipt } from '../src/lib/intake/submit';

test('database and storage outages are recoverable errors; notification uncertainty preserves the saved receipt',async(context)=>{
  const old={...process.env};context.after(()=>{process.env=old;});
  process.env.NEXT_PUBLIC_SUPABASE_URL='https://test.supabase.co';process.env.SUPABASE_SERVICE_ROLE='synthetic-key';process.env.SECURITY_LOCAL_TEST='1';
  const id=randomUUID();let phase='database';const calls:string[]=[];
  context.mock.method(globalThis,'fetch',async(url:string|URL|Request,init?:RequestInit)=>{
    const destination=String(url);calls.push(destination);
    if(phase==='database') return Response.json({message:'sensitive-provider-error'},{status:503});
    if(destination.endsWith('/receive_public_submission'))return Response.json({submissionId:id,state:'pending_upload',uploadId:randomUUID(),objectPath:'synthetic.pdf',uploadExpiresAt:new Date(Date.now()+3600000).toISOString()});
    if(destination.includes('/storage/')) return Response.json({message:'storage unavailable'},{status:503});
    if(destination.endsWith('/claim_intake_notification'))return Response.json({attemptId:randomUUID(),kind:'contact',payload:{nome:'Test',email:'test@example.org'}});
    if(destination.endsWith('/complete_intake_notification')){assert.ok(['failed','uncertain'].includes(JSON.parse(String(init?.body)).p_status));return Response.json(true);}
    throw Error('Unexpected call');
  });
  const request=(path:string,body:unknown)=>new Request(`https://www.medisigma.pt${path}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  const db=await contact(request('/api/contact',{empresa:'Test',email:'test@example.org',servico:'Medicina do Trabalho'}));
  assert.equal(db.status,503);assert.doesNotMatch(await db.text(),/sensitive-provider-error|saved.*true/);
  phase='storage';
  const storage=await uploads(request('/api/cv/uploads',{kind:'application',submission:{submission_id:id,name:'Test',email:'test@example.org'},file:{name:'cv.pdf',size:100,sha256:'a'.repeat(64)}}));
  assert.equal(storage.status,503);assert.doesNotMatch(await storage.text(),/saved.*true|signed_url/);
  phase='notification';
  const receipt=await finishReceipt({submissionId:id,state:'accepted'});assert.equal(receipt.body.saved,true);
  assert.ok(calls.some(url=>url.endsWith('/complete_intake_notification')));
});
