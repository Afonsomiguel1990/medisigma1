import assert from 'node:assert/strict';
import test from 'node:test';
import { submitContactIntent, type SubmissionIntent } from '../src/lib/leads/client-submission';
import { POST } from '../src/app/api/contact/route';
const payload = { empresa: 'Teste', email: 'test@example.invalid', lead_kind: 'resource_request', resource_id: 'preparacao-exames' };
test('expired resource keeps saved receipt and intent; new request gets a new UUID', async () => {
  const intent: SubmissionIntent = {};
  const ids: string[] = [];
  const fetcher = (async (_url, init) => {
    const input = JSON.parse(String(init?.body)); ids.push(input.submission_id);
    return Response.json({ ok: true, saved: true, duplicate: true, submission_id: input.submission_id, lead_kind: 'resource_request', download_expired: true }, { status: 410 });
  }) as typeof fetch;
  const receipt = await submitContactIntent(payload, intent, undefined, fetcher);
  assert.equal(receipt.saved,true); assert.equal(receipt.download_expired,true);
  await submitContactIntent(payload,intent,undefined,fetcher);
  assert.equal(ids[0],ids[1]);
  await submitContactIntent(payload,{},undefined,fetcher);
  assert.notEqual(ids[0],ids[2]);
});
test('generic errors and mismatched expiry receipts never count as successful requests', async () => {
  for (const status of [410,503]) {
    await assert.rejects(submitContactIntent(payload,{},undefined,async () => Response.json({ ok:true,saved:true,lead_kind:'resource_request',download_expired:true,submission_id:'wrong-id' },{status})));
  }
  await assert.rejects(submitContactIntent({ ...payload,lead_kind:'service_request' },{},undefined,async () => Response.json({ok:true,saved:true,download_expired:true,lead_kind:'resource_request'},{status:410})));
});
test('contact endpoint rejects resource kind and forged resource identifier before persistence', async () => {
  for (const body of [{lead_kind:'resource_request'}, {resource_id:'preparacao-exames'}, {lead_kind:'service_request',resource_id:'forged'}]) {
    const response = await POST(new Request('https://www.medisigma.pt/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}));
    assert.equal(response.status,400);
    assert.match((await response.json()).error,/formulário do recurso/);
  }
});
