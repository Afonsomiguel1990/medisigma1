import test from 'node:test';
import assert from 'node:assert/strict';
import { submitLead } from '../src/lib/leads/submit';
import { validateLeadSubmission } from '../src/lib/leads/validation';
import { serviceKeyFromLabel, submitContactIntent, type SubmissionIntent } from '../src/lib/leads/client-submission';
import { formatSlackMessage, sendSlackNotification } from '../src/lib/webhook';
import type { LeadSubmission, NotificationStatus, SubmissionReceipt } from '../src/lib/leads/types';
import { initializeGA, setAnalyticsConsent } from '../src/lib/analytics/client';
const payload = { submission_id: 'e9f67d67-0982-4c88-9823-870611ac6222', empresa: 'Teste', email: 'test@example.invalid', servico: 'Medicina', company_sector: 'Hotelaria' };
test('service keys match the canonical catalog and generic contact stays unknown', () => {
  for (const [label,key] of [['Medicina do Trabalho','medicina-no-trabalho'],['Medicina no Trabalho','medicina-no-trabalho'],['Legionella','legionella'],['Segurança no Trabalho','seguranca-no-trabalho'],['Controlo de Pragas','controlo-pragas'],['Segurança Contra Incêndios','seguranca-incendios'],['Manutenção de Extintores','manutencao-extintores']]) assert.equal(serviceKeyFromLabel(label),key);
  assert.equal(serviceKeyFromLabel('Exames médicos','/servicos/medicina-no-trabalho/'),'medicina-no-trabalho');
  assert.equal(serviceKeyFromLabel('Segurança Contra Incêndios','/servicos/manutencao-extintores/'),'manutencao-extintores');
  assert.equal(serviceKeyFromLabel('', '/servicos/legionella/'),'legionella');
  assert.equal(serviceKeyFromLabel('', '/contact/'),'');
  assert.equal(serviceKeyFromLabel('HST Integrada','/entroncamento/'),'');
  assert.equal(serviceKeyFromLabel('', '/servicos/nao-existe/'),'');
});
test('throwing analytics and corrupt storage cannot prevent a saved POST', async () => {
  const win = { location: { origin: 'https://www.medisigma.pt', pathname: '/blog/artigo', search: '' }, gtag: (..._args: unknown[]) => {} };
  Object.assign(globalThis, { window: win, document: { referrer: '' }, sessionStorage: { getItem: () => '{broken', setItem: () => { throw new Error('Storage blocked'); }, removeItem: () => {} } });
  let posted = false;
  try {
    setAnalyticsConsent(true); initializeGA(); win.gtag = () => { throw new Error('Analytics blocked'); }; win.location.pathname = '/contact';
    const receipt = await submitContactIntent({ email: 'test@example.invalid' }, {}, () => { throw new Error('Callback blocked'); }, async (_url, init) => {
      posted = true; const sent = JSON.parse(init?.body as string);
      return new Response(JSON.stringify({ ok: true, saved: true, submission_id: sent.submission_id, lead_kind: 'service_request' }));
    });
    assert.equal(posted,true); assert.equal(receipt.saved,true);
  } finally { setAnalyticsConsent(false); for (const key of ['window','document','sessionStorage']) Reflect.deleteProperty(globalThis,key); }
});
function repo() {
  let saved: LeadSubmission | undefined;
  let state: NotificationStatus = 'pending';
  let claims = 0;
  return {
    async acceptSubmission(input: LeadSubmission): Promise<SubmissionReceipt> {
      const status = saved ? saved.payloadHash === input.payloadHash ? 'duplicate' : 'conflict' : 'accepted';
      saved ??= input;
      return { status, submissionId: input.submissionId, notificationStatus: state };
    },
    async claimNotification() { if (state !== 'pending') return null; state = 'sending'; claims++; return { attemptId: 'attempt' }; },
    async completeNotification(_id: string, _attempt: string, status: 'sent' | 'failed' | 'uncertain') { state = status; return true; },
    get claims() { return claims; },
  };
}
test('concurrent duplicate is saved once, claimed before notification and sent once', async () => {
  const repository = repo(); let sends = 0;
  const notify = async () => { assert.equal(repository.claims, 1); sends++; return 'sent' as const; };
  const results = await Promise.all([submitLead(payload, repository, notify), submitLead(payload, repository, notify)]);
  assert.equal(sends, 1); assert.ok(results.every(result => result.body.saved));
  assert.equal(results.filter(result => result.body.duplicate).length, 1);
  assert.equal((await submitLead({ ...payload, empresa: 'Outro' }, repository, notify)).status, 409);
});
test('storage failure and honeypot never send; storage details remain private', async () => {
  const repository = repo(); let sends = 0;
  repository.acceptSubmission = async () => { throw Error('secret PII'); };
  const notify = async () => { sends++; return 'sent' as const; };
  const failed = await submitLead(payload, repository, notify);
  assert.equal(failed.status, 503); assert.ok(!JSON.stringify(failed).includes('secret'));
  const spam = await submitLead({ confirm_mail: 'bot' }, repository, notify);
  assert.deepEqual(spam.body, { ok: true, saved: false }); assert.equal(sends, 0);
});
test('notification timeout and completion failure cannot fail saved lead or trigger retry', async () => {
  const repository = repo(); let sends = 0;
  const notify = async () => { sends++; throw Error('timeout'); };
  repository.completeNotification = async () => { throw Error('database unavailable'); };
  const result = await submitLead(payload, repository, notify);
  assert.equal(result.body.saved, true); assert.equal(result.body.notification_status, 'uncertain');
  await submitLead(payload, repository, notify); assert.equal(sends, 1);
});
test('validates fields, UUID and resource; attribution excluded from hash', () => {
  assert.ok(validateLeadSubmission({ empresa: '', telefone: '', email: 'legacy@example.invalid', servico: '', mensagem: '', pagina: '', url: '', fonte: '' })?.submissionId);
  assert.throws(() => validateLeadSubmission({ ...payload, email: 'nope' }));
  assert.throws(() => validateLeadSubmission({ ...payload, mensagem: 'x'.repeat(2501) }));
  assert.throws(() => validateLeadSubmission({ ...payload, submission_id: 'x' }));
  assert.throws(() => validateLeadSubmission({ ...payload, lead_kind: 'resource_request' }));
  assert.equal(validateLeadSubmission(payload)?.payloadHash, validateLeadSubmission({ ...payload, attribution: { changed: true } })?.payloadHash);
});
test('Slack requires HTTP success and plain ok; network errors are uncertain', async () => {
  const message = formatSlackMessage({ tipo: 'cliente', nome: 'Teste', email: '', telefone: '', mensagem: '' });
  for (const [status, body, expected] of [[200, 'ok', 'sent'], [200, 'invalid_payload', 'failed'], [500, 'ok', 'failed']] as const) {
    const fetcher = (async () => new Response(body, { status })) as typeof fetch;
    assert.equal(await sendSlackNotification(message, { webhookUrl: 'https://example.invalid', fetcher }), expected);
  }
  assert.equal(await sendSlackNotification(message, { webhookUrl: 'https://example.invalid', fetcher: async () => { throw Error('timeout'); } }), 'uncertain');
  const candidatura = formatSlackMessage({ tipo: 'candidatura', nome: 'Teste', email: '', telefone: '', mensagem: '', area_interesse: 'Saúde', cv_link: 'https://example.invalid/cv', job_id: 'vaga', origem: 'emprego' });
  assert.ok(candidatura.text.startsWith('📝 NOVA CANDIDATURA')); assert.ok(JSON.stringify(candidatura).includes('Ver CV'));
  assert.ok(formatSlackMessage({ tipo: 'recurso', nome: '', email: '', telefone: '', mensagem: '' }).text.startsWith('PEDIDO DE RECURSO'));
});
test('client retry retains ID, changed intent rotates ID; analytics error does not reject success', async () => {
  const intent: SubmissionIntent = {}; const ids: string[] = [];
  const fetcher = (async (_url, init) => {
    const input = JSON.parse(String(init?.body)); ids.push(input.submission_id);
    if (ids.length === 1) throw Error('lost response');
    return Response.json({ ok: true, saved: true, submission_id: input.submission_id });
  }) as typeof fetch;
  await assert.rejects(submitContactIntent(payload, intent, undefined, fetcher));
  await submitContactIntent(payload, intent, () => { throw Error('gtag error'); }, fetcher);
  await submitContactIntent({ ...payload, empresa: 'Outra' }, intent, undefined, fetcher);
  assert.equal(ids[0], ids[1]); assert.notEqual(ids[1], ids[2]);
  let analytics = 0;
  await submitContactIntent(payload, intent, () => { analytics++; }, async () => Response.json({ ok: true, saved: false }));
  assert.equal(analytics, 0);
});
