import React from 'react';
import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { renderToStaticMarkup } from 'react-dom/server';
import { NextRequest } from 'next/server';
import ContactForm from '../src/components/ContactForm';
import { ContactApiDetails } from '../src/components/ContactApiDetails';
import { SocialProofTestimonials } from '../src/components/testimonial-scroll';
import { CONTACT_SERVICES, CONTACT_SUCCESS_MESSAGE } from '../src/lib/contact';
import { handleContactRequest } from '../src/lib/contact-http';
import { validateLeadSubmission } from '../src/lib/leads/validation';
import { submitLead } from '../src/lib/leads/submit';
import type { LeadSubmission } from '../src/lib/leads/types';
import { formatSlackMessage } from '../src/lib/webhook';
import { htmlToMarkdown } from '../src/lib/markdown';
import { middleware } from '../src/middleware';
import { hasEmDash } from '../scripts/check-public-copy.mjs';
import { proposalService, proposalQuestions } from '../src/lib/proposal';
import { submitContactIntent } from '../src/lib/leads/client-submission';
import ProposalPage from '../src/app/pedir-proposta/page';

const payload = { empresa: 'Empresa de Teste', nome: 'Ana', email: 'contacto@example.invalid', servico: 'Medicina do Trabalho', localidade: 'Abrantes', tipo_instalacao: 'Indústria' };
const noLimit = () => null;
function repository() {
  const rows: LeadSubmission[] = [];
  return {
    rows,
    async acceptSubmission(lead: LeadSubmission) {
      rows.push(lead);
      return { status: 'accepted' as const, submissionId: lead.submissionId, notificationStatus: 'pending' as const };
    },
    async claimNotification() { return { attemptId: 'attempt' }; },
    async completeNotification() { return true; },
  };
}

test('JSON, urlencoded and multipart persist the same contact fields', async () => {
  for (const format of ['json', 'urlencoded', 'multipart']) {
    const repo = repository();
    const headers: Record<string, string> = { Accept: 'application/json' };
    let body: BodyInit;
    if (format === 'json') { headers['Content-Type'] = 'application/json'; body = JSON.stringify(payload); }
    else if (format === 'urlencoded') body = new URLSearchParams(payload);
    else { const data = new FormData(); for (const [key, value] of Object.entries(payload)) data.set(key, value); body = data; }
    const response = await handleContactRequest(new Request('https://www.medisigma.pt/api/contact', { method: 'POST', headers, body }),
      value => submitLead(value, repo, async () => 'sent'), noLimit);
    assert.equal(response.status, 200);
    assert.equal((await response.json()).saved, true);
    assert.equal(repo.rows.length, 1);
    for (const [key, value] of Object.entries(payload)) assert.equal(repo.rows[0][key as keyof LeadSubmission], value);
    assert.equal(repo.rows[0].serviceKey, 'medicina-no-trabalho');
    assert.equal(repo.rows[0].companySector, 'Indústria');
  }
});

test('native form redirects only after persistence; honeypot never confirms receipt', async () => {
  for (const spam of [false, true]) {
    const repo = repository();
    const request = new Request('https://www.medisigma.pt/api/contact', { method: 'POST', headers: { Accept: 'text/html' }, body: new URLSearchParams({ ...payload, confirm_mail: spam ? 'bot' : '' }) });
    const response = await handleContactRequest(request, body => submitLead(body, repo, async () => 'sent'), noLimit);
    assert.equal(repo.rows.length, spam ? 0 : 1);
    assert.equal(response.status, spam ? 200 : 303);
    assert.equal(response.headers.get('Location'), spam ? null : 'https://www.medisigma.pt/contact/?enviado=1#contact-form');
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    if (spam) assert.doesNotMatch(await response.text(), /Mensagem recebida/);
  }
});

test('validation applies equally to JSON and native HTML, and rejects oversized or unsupported bodies', async () => {
  for (const invalid of [{ empresa: ' ' }, { email: 'invalid' }, { servico: '' }, { localidade: 'x'.repeat(201) }]) {
    for (const html of [false, true]) {
      const repo = repository();
      const body = { ...payload, ...invalid };
      const response = await handleContactRequest(new Request('https://www.medisigma.pt/api/contact', { method: 'POST',
        headers: html ? { Accept: 'text/html' } : { 'Content-Type': 'application/json' },
        body: html ? new URLSearchParams(body) : JSON.stringify(body),
      }), value => submitLead(value, repo, async () => 'sent'), noLimit);
      assert.equal(response.status, 400); assert.equal(repo.rows.length, 0);
      assert.match(response.headers.get('Content-Type') || '', html ? /text\/html/ : /application\/json/);
      assert.equal(response.headers.get('Location'), null);
    }
  }
  for (const [type, body, status] of [['application/json', '{', 400], ['text/plain', 'hello', 415], ['application/json', 'x'.repeat(64001), 413]] as const) {
    const response = await handleContactRequest(new Request('https://example.invalid/api/contact', { method: 'POST', headers: { 'Content-Type': type }, body }), async () => { throw Error('Must not submit'); }, noLimit);
    assert.equal(response.status, status);
  }
});

test('rate limit keeps Retry-After in both response formats, without persistence', async () => {
  for (const html of [false, true]) {
    const response = await handleContactRequest(new Request('https://example.invalid/api/contact', { method: 'POST',
      headers: html ? { Accept: 'text/html' } : { 'Content-Type': 'application/json' },
      body: html ? new URLSearchParams(payload) : JSON.stringify(payload),
    }), async () => { throw Error('Must not submit'); }, () => Response.json({}, { status: 429, headers: { 'Retry-After': '600' } }));
    assert.equal(response.status, 429);
    assert.equal(response.headers.get('Retry-After'), '600');
    assert.match(await response.text(), /Demasiados pedidos/);
  }
});

test('storage errors never report success; notification errors cannot lose a saved contact', async () => {
  for (const failure of ['storage', 'notification']) {
    const repo = repository(); let notified = 0;
    if (failure === 'storage') repo.acceptSubmission = async () => { throw Error('private failure'); };
    const result = await submitLead(payload, repo, async () => { notified++; throw Error('timeout'); });
    assert.equal(result.status, failure === 'storage' ? 503 : 200);
    assert.equal(result.body.saved, failure === 'storage' ? undefined : true);
    assert.equal(notified, failure === 'storage' ? 0 : 1);
    assert.doesNotMatch(JSON.stringify(result), /private failure/);
  }
});

test('new contact details affect idempotency, while old payload hashes remain compatible', async () => {
  const legacy = { empresa: 'Teste', email: 'test@example.invalid', servico: 'Medicina no Trabalho' };
  const expected = createHash('sha256').update(JSON.stringify(['Teste', '', legacy.email, legacy.servico, '', '', '', '', 'service_request', '', '', ''])).digest('hex');
  assert.equal(validateLeadSubmission(legacy)?.payloadHash, expected);
  assert.equal(validateLeadSubmission(legacy)?.servico, 'Medicina do Trabalho');
  const original = validateLeadSubmission(payload)?.payloadHash;
  for (const field of ['nome', 'localidade', 'tipo_instalacao']) assert.notEqual(validateLeadSubmission({ ...payload, [field]: 'Outro valor' })?.payloadHash, original);
});

test('form HTML supports native submission, all service defaults and separate optional fields', async () => {
  for (const service of CONTACT_SERVICES) {
    const markup = renderToStaticMarkup(<ContactForm servicoDefault={service.value} />);
    assert.match(markup, /method="post"/); assert.match(markup, /action="\/api\/contact"/);
    assert.ok(markup.includes('value="' + service.value + '" selected=""'));
    for (const field of ['nome', 'localidade', 'tipo_instalacao', 'confirm_mail']) assert.ok(markup.includes('name="' + field + '"'));
    assert.match(markup, /name="servico" required=""/);
  }
  const markup = renderToStaticMarkup(<ContactForm servicoDefault="Medicina no Trabalho" />);
  assert.match(markup, /value="Medicina do Trabalho" selected=""/);
});

test('contact aliases preserve query parameters for HTML, Markdown, GET and HEAD', async () => {
  for (const path of ['/contacto', '/contacto/', '/contactos', '/contactos/', '/fale-connosco', '/fale-connosco/']) for (const accept of ['text/html', 'text/markdown']) for (const method of ['GET', 'HEAD']) {
    const response = await middleware(new NextRequest('https://www.medisigma.pt' + path + '?origem=teste', { method, headers: { Accept: accept } }));
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('Location'), 'https://www.medisigma.pt/contact/?origem=teste');
  }
});

test('testimonials occur once in server HTML and hidden copies do not enter Markdown', async () => {
  const markup = renderToStaticMarkup(<SocialProofTestimonials testimonials={[{ id: 'unique', name: 'Cliente único', role: 'Empresa', img: '/image.png', description: 'Testemunho único.' }]} />);
  assert.equal(markup.split('Testemunho único.').length - 1, 1);
  const markdown = htmlToMarkdown('<main>' + markup + '<div aria-hidden="true">Cópia oculta</div><div hidden>Também oculta</div></main>');
  assert.equal(markdown.split('Testemunho único.').length - 1, 1);
  assert.doesNotMatch(markdown, /Cópia oculta|Também oculta/);
});

test('Markdown includes API instructions and compact global contact information', async () => {
  const markdown = htmlToMarkdown('<main>' + renderToStaticMarkup(<ContactApiDetails />) + '</main><footer><div data-contact-details>Contactos</div></footer>');
  for (const text of ['POST /api/contact', 'application/json', 'submission_id', 'saved: true', 'info@medisigma.pt', '+351 241 331 504', '48 horas úteis']) assert.ok(markdown.includes(text), text);
  assert.ok(CONTACT_SUCCESS_MESSAGE.endsWith('48 horas úteis.'));
});

test('Slack includes personal contact details without exceeding ten fields per block', async () => {
  const message = formatSlackMessage({ tipo: 'cliente', ...payload, telefone: '123', mensagem: 'Teste', fonte: 'contacto', pagina: 'Contacto', url: 'https://example.invalid', resource_id: 'resource' });
  const text = JSON.stringify(message);
  for (const value of ['Ana', 'Abrantes', 'Indústria', 'Empresa de Teste', 'Medicina do Trabalho']) assert.ok(text.includes(value));
  for (const block of message.blocks) if ('fields' in block) assert.ok(block.fields.length <= 10);
});

test('public-copy guard catches literal and encoded m-dashes while retaining ordinary hyphens', async () => {
  for (const value of [String.fromCodePoint(8212), '&mdash;', '&#8212;', '&#x2014;', String.raw`\u2014`, String.raw`\u{2014}`]) assert.ok(hasEmDash(value), value);
  assert.equal(hasEmDash('pt-PT e segunda-feira'), false);
});

test('proposal details survive JSON, native and multipart submission and reach notification', async () => {
  const details = { concelho: 'Tomar', nif: '500000000', numero_trabalhadores: '12', numero_estabelecimentos: '2', numero_extintores: '8', fonte: 'pedido-proposta' };
  for (const format of ['json', 'urlencoded', 'multipart']) {
    const repo = repository(); let notification = '';
    let body: BodyInit;
    const headers: Record<string, string> = { Accept: format === 'json' ? 'application/json' : 'text/html' };
    if (format === 'json') { headers['Content-Type'] = 'application/json'; body = JSON.stringify({ ...payload, ...details, numero_trabalhadores: 12 }); }
    else if (format === 'urlencoded') body = new URLSearchParams({ ...payload, ...details });
    else { const data = new FormData(); for (const [key, value] of Object.entries({ ...payload, ...details })) data.set(key, value); body = data; }
    const response = await handleContactRequest(new Request('https://www.medisigma.pt/api/contact', { method: 'POST', headers, body }),
      value => submitLead(value, repo, async value => { notification = JSON.stringify(value); return 'sent'; }), noLimit);
    assert.equal(response.status, format === 'json' ? 200 : 303);
    const lead = repo.rows[0];
    assert.equal(lead.concelho, 'Tomar'); assert.equal(lead.nif, '500000000');
    assert.equal(lead.numero_trabalhadores, 12); assert.equal(lead.numero_estabelecimentos, 2); assert.equal(lead.numero_extintores, 8);
    for (const value of ['Tomar', '500000000', 'Trabalhadores', 'Estabelecimentos', 'Extintores']) assert.ok(notification.includes(value));
  }
});

test('optional proposal validation rejects malformed data without creating leads', async () => {
  for (const invalid of [{ nif: 'abc123456' }, { nif: '123' }, { concelho: 'x'.repeat(201) },
    ...['numero_trabalhadores', 'numero_estabelecimentos', 'numero_extintores'].flatMap(key => [-1, 0, 1.5, 1000001, true, [], {}, '1e2'].map(value => ({ [key]: value })))]) {
    const repo = repository();
    const result = await submitLead({ ...payload, ...invalid }, repo, async () => { throw Error('Must not notify'); });
    assert.equal(result.status, 400); assert.equal(repo.rows.length, 0);
  }
  const minimal = validateLeadSubmission({ empresa: 'Teste', email: 'test@example.invalid', servico: 'Outros' });
  assert.equal(minimal?.numero_trabalhadores, null);
  assert.equal(minimal?.nif, '');
});

test('proposal changes rotate client intent and server hash, while equivalent quantities keep server hash', async () => {
  const initial = { ...payload, nif: '500000000', concelho: 'Tomar', numero_trabalhadores: '12', numero_estabelecimentos: '2', numero_extintores: '8' };
  const originalHash = validateLeadSubmission(initial)?.payloadHash;
  assert.equal(validateLeadSubmission({ ...initial, numero_trabalhadores: 12 })?.payloadHash, originalHash);
  const ids: string[] = [];
  const fetcher = (async (_url: unknown, options: RequestInit) => {
    const body = JSON.parse(String(options.body)); ids.push(body.submission_id);
    return Response.json({ ok: true, saved: true, submission_id: body.submission_id });
  }) as typeof fetch;
  for (const [key, value] of Object.entries({ nif: '500000001', concelho: 'Abrantes', numero_trabalhadores: '13', numero_estabelecimentos: '3', numero_extintores: '9' })) {
    const changed = { ...initial, [key]: value };
    assert.notEqual(validateLeadSubmission(changed)?.payloadHash, originalHash);
    const intent = {};
    await submitContactIntent(initial, intent, undefined, fetcher);
    await submitContactIntent(initial, intent, undefined, fetcher);
    await submitContactIntent(changed, intent, undefined, fetcher);
    assert.equal(ids.at(-3), ids.at(-2)); assert.notEqual(ids.at(-2), ids.at(-1));
  }
});

test('proposal page preselects known services only and exposes every optional field without JavaScript', async () => {
  for (const service of CONTACT_SERVICES) assert.equal(proposalService(service.key), service.value);
  assert.equal(proposalService('<script>'), '');
  assert.equal(proposalQuestions('Medicina no Trabalho').workers, true);
  assert.equal(proposalQuestions('SST integrada').workers, true);
  assert.equal(proposalQuestions('HACCP').sites, true);
  assert.equal(proposalQuestions('SCIE').sites, true);
  assert.equal(proposalQuestions('Controlo de Pragas').sites, true);
  assert.equal(proposalQuestions('Manutenção de Extintores').extinguishers, true);
  const markup = renderToStaticMarkup(await ProposalPage({ searchParams: Promise.resolve({ servico: 'manutencao-extintores' }) }));
  assert.match(markup, /value="Manutenção de Extintores" selected=""/);
  assert.match(markup, /method="post"/); assert.match(markup, /action="\/api\/contact"/);
  assert.doesNotMatch(markup, /name="localidade"/);
  for (const field of ['concelho', 'nif', 'numero_trabalhadores', 'numero_estabelecimentos', 'numero_extintores']) {
    const input = markup.match(new RegExp('<input[^>]*name="' + field + '"[^>]*>'))?.[0] || '';
    assert.ok(input); assert.doesNotMatch(input, /required|disabled/);
  }
  const markdown = htmlToMarkdown(markup);
  for (const field of ['concelho', 'nif', 'numero_trabalhadores', 'numero_estabelecimentos', 'numero_extintores']) assert.ok(markdown.includes(field));
});
