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

test('new contact details affect idempotency, while old payload hashes remain compatible', () => {
  const legacy = { empresa: 'Teste', email: 'test@example.invalid', servico: 'Medicina no Trabalho' };
  const expected = createHash('sha256').update(JSON.stringify(['Teste', '', legacy.email, legacy.servico, '', '', '', '', 'service_request', '', '', ''])).digest('hex');
  assert.equal(validateLeadSubmission(legacy)?.payloadHash, expected);
  assert.equal(validateLeadSubmission(legacy)?.servico, 'Medicina do Trabalho');
  const original = validateLeadSubmission(payload)?.payloadHash;
  for (const field of ['nome', 'localidade', 'tipo_instalacao']) assert.notEqual(validateLeadSubmission({ ...payload, [field]: 'Outro valor' })?.payloadHash, original);
});

test('form HTML supports native submission, all service defaults and separate optional fields', () => {
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

test('contact aliases preserve query parameters for HTML, Markdown, GET and HEAD', () => {
  for (const path of ['/contacto', '/contacto/', '/contactos', '/contactos/']) for (const accept of ['text/html', 'text/markdown']) for (const method of ['GET', 'HEAD']) {
    const response = middleware(new NextRequest('https://www.medisigma.pt' + path + '?origem=teste', { method, headers: { Accept: accept } }));
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('Location'), 'https://www.medisigma.pt/contact/?origem=teste');
  }
});

test('testimonials occur once in server HTML and hidden copies do not enter Markdown', () => {
  const markup = renderToStaticMarkup(<SocialProofTestimonials testimonials={[{ id: 'unique', name: 'Cliente único', role: 'Empresa', img: '/image.png', description: 'Testemunho único.' }]} />);
  assert.equal(markup.split('Testemunho único.').length - 1, 1);
  const markdown = htmlToMarkdown('<main>' + markup + '<div aria-hidden="true">Cópia oculta</div><div hidden>Também oculta</div></main>');
  assert.equal(markdown.split('Testemunho único.').length - 1, 1);
  assert.doesNotMatch(markdown, /Cópia oculta|Também oculta/);
});

test('Markdown includes API instructions and compact global contact information', () => {
  const markdown = htmlToMarkdown('<main>' + renderToStaticMarkup(<ContactApiDetails />) + '</main><footer><div data-contact-details>Contactos</div></footer>');
  for (const text of ['POST /api/contact', 'application/json', 'submission_id', 'saved: true', 'info@medisigma.pt', '+351 241 331 504', '48 horas úteis']) assert.ok(markdown.includes(text), text);
  assert.ok(CONTACT_SUCCESS_MESSAGE.endsWith('48 horas úteis.'));
});

test('Slack includes personal contact details without exceeding ten fields per block', () => {
  const message = formatSlackMessage({ tipo: 'cliente', ...payload, telefone: '123', mensagem: 'Teste', fonte: 'contacto', pagina: 'Contacto', url: 'https://example.invalid', resource_id: 'resource' });
  const text = JSON.stringify(message);
  for (const value of ['Ana', 'Abrantes', 'Indústria', 'Empresa de Teste', 'Medicina do Trabalho']) assert.ok(text.includes(value));
  for (const block of message.blocks) if ('fields' in block) assert.ok(block.fields.length <= 10);
});

test('public-copy guard catches literal and encoded m-dashes while retaining ordinary hyphens', () => {
  for (const value of [String.fromCodePoint(8212), '&mdash;', '&#8212;', '&#x2014;', String.raw`\u2014`, String.raw`\u{2014}`]) assert.ok(hasEmDash(value), value);
  assert.equal(hasEmDash('pt-PT e segunda-feira'), false);
});
