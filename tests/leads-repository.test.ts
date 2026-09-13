import assert from 'node:assert/strict';
import test from 'node:test';
import { createLeadRepository, type RpcAdapter } from '../src/lib/leads/repository';
import type { LeadSubmission } from '../src/lib/leads/types';

const input: LeadSubmission = {
  submissionId: 'efc61618-694b-437a-a90d-27d0468126a5', payloadHash: 'a'.repeat(64), leadKind: 'service_request',
  empresa: 'Test', telefone: '', email: 'test@example.invalid', servico: 'Test', mensagem: '',
  pagina: '/servicos/test', url: 'https://www.medisigma.pt/servicos/test', fonte: 'test', attribution: {},
};
test('submission persists through one transactional RPC and preserves conflict for HTTP 409', async () => {
  const calls: unknown[] = [];
  const adapter: RpcAdapter = { rpc: async (name, args) => {
    calls.push({ name, args });
    return { data: { status: 'conflict', submissionId: input.submissionId, notificationStatus: 'sent' }, error: null };
  } };
  const result = await createLeadRepository(adapter).acceptSubmission(input);
  assert.equal(result.status, 'conflict');
  assert.deepEqual(calls, [{ name: 'submit_lead', args: { p_input: input } }]);
});
test('an already claimed notification returns null without throwing or completing', async () => {
  const calls: string[] = [];
  const repo = createLeadRepository({ rpc: async (name) => { calls.push(name); return { data: null, error: null }; } });
  assert.equal(await repo.claimNotification(input.submissionId), null);
  assert.deepEqual(calls, ['claim_lead_notification']);
});
test('notification completion includes the attempt token and surfaces stale completion', async () => {
  const repo = createLeadRepository({ rpc: async (name, args) => {
    assert.equal(name, 'complete_lead_notification');
    assert.deepEqual(args, { p_submission_id: input.submissionId, p_attempt_id: 'attempt', p_status: 'uncertain' });
    return { data: false, error: null };
  } });
  assert.equal(await repo.completeNotification(input.submissionId, 'attempt', 'uncertain'), false);
});
test('database errors do not disclose the input or provider error', async () => {
  const repo = createLeadRepository({ rpc: async () => ({ data: null, error: { message: 'secret-provider-message' } }) });
  await assert.rejects(repo.acceptSubmission(input), { message: 'Lead repository operation failed: submit_lead' });
});
