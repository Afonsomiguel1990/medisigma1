import test from 'node:test';
import assert from 'node:assert/strict';
import { serviceMedia, locationMedia, videoJsonLd, getServiceMedia } from '../src/lib/service-media';
import { mediaContactIntent } from '../src/lib/media-contact';
import { submitContactIntent, type SubmissionIntent } from '../src/lib/leads/client-submission';
import { initializeGA, setAnalyticsConsent, trackServiceMedia } from '../src/lib/analytics/client';

test('media CTAs select the catalog service, including fire safety, and reject arbitrary IDs', () => {
  for (const entry of Object.values(serviceMedia)) {
    const intent = mediaContactIntent(entry.id)!;
    assert.equal(intent.serviceKey, entry.serviceKey);
    assert.equal(intent.serviceLabel, entry.serviceLabel);
  }
  for (const id of ['__proto__', 'constructor', '', null, {}]) {
    assert.equal(mediaContactIntent(id), undefined);
    assert.equal(getServiceMedia(id), undefined);
  }
  assert.equal(mediaContactIntent('herdade-amarela')?.serviceKey, 'seguranca-incendios');
  assert.equal(locationMedia.portalegre, 'herdade-amarela');
});

test('shared media reuses stable URLs and emits no fictitious publication date', () => {
  const entry = serviceMedia['sofalca-ruido'].video!;
  assert.equal(videoJsonLd({ ...entry, publishedAt: null }), null);
  const schema = videoJsonLd({ ...entry, publishedAt: '2026-09-25' })!;
  assert.equal(schema.uploadDate, '2026-09-25');
  assert.equal(schema.contentUrl, 'https://www.medisigma.pt/media/servicos/sofalca-ruido.mp4');
  assert.equal(schema['@type'], 'VideoObject');
  assert.ok(schema.thumbnailUrl.endsWith('.webp'));
  assert.equal(Object.keys(locationMedia).length, 12);
  assert.equal(serviceMedia[locationMedia.covilha].video!.src, entry.src);
  assert.equal(serviceMedia[locationMedia.leiria].video!.src, entry.src);
});

test('media events require analytics consent and public origin, never create leads or replay a queue', () => {
  const location = { origin: 'https://www.medisigma.pt', pathname: '/lisboa/', search: '?email=private' };
  const win = { location, dataLayer: [] as unknown[] };
  Object.assign(globalThis, { window: win, document: { referrer: '' }, sessionStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} } });
  const track = () => trackServiceMedia('service_video_start', 'seguranca-alimentar', 'seguranca-alimentar');
  try {
    setAnalyticsConsent(false); assert.equal(track(), false); assert.equal(win.dataLayer.length, 0);
    setAnalyticsConsent(true); assert.equal(track(), false); initializeGA();
    assert.equal(track(), true);
    trackServiceMedia('service_video_complete', 'seguranca-alimentar', 'seguranca-alimentar');
    trackServiceMedia('service_media_cta', 'seguranca-alimentar', 'seguranca-alimentar');
    assert.equal(trackServiceMedia('service_media_cta', 'private@example.pt', 'invalid'), false);
    const events = win.dataLayer as unknown[][];
    assert.equal(events.filter(e => e[1] === 'service_video_start').length, 1);
    assert.equal(events.filter(e => e[1] === 'generate_lead').length, 0);
    assert.ok(!JSON.stringify(events).includes('private'));
    location.origin = 'https://preview.vercel.app'; assert.equal(track(), false);
    location.origin = 'https://www.medisigma.pt'; location.pathname = '/admin'; assert.equal(track(), false);
    location.pathname = '/lisboa/'; setAnalyticsConsent(false); assert.equal(track(), false); assert.equal(win.dataLayer.length, 0);
  } finally { setAnalyticsConsent(false); for (const key of ['window', 'document', 'sessionStorage']) Reflect.deleteProperty(globalThis, key); }
});

test('media-selected request retains service and page, retries idempotently, changes ID on a new service', async () => {
  const intent: SubmissionIntent = {}; const sent: Record<string, string>[] = [];
  const fetcher = (async (_url, init) => {
    const payload = JSON.parse(String(init?.body)); sent.push(payload);
    if (sent.length === 1) throw Error('Response lost');
    return Response.json({ ok: true, saved: true, submission_id: payload.submission_id });
  }) as typeof fetch;
  const selected = mediaContactIntent('herdade-amarela')!;
  const payload = { empresa: 'Teste', email: 'test@example.invalid', service_key: selected.serviceKey, servico: selected.serviceLabel, pagina: 'Portalegre', fonte: `Portalegre:media:${selected.mediaId}`, url: 'https://www.medisigma.pt/portalegre/' };
  await assert.rejects(submitContactIntent(payload, intent, undefined, fetcher));
  await submitContactIntent(payload, intent, undefined, fetcher);
  await submitContactIntent({ ...payload, service_key: 'medicina-desportiva', servico: 'Medicina Desportiva' }, intent, undefined, fetcher);
  assert.equal(sent[0].submission_id, sent[1].submission_id);
  assert.notEqual(sent[1].submission_id, sent[2].submission_id);
  assert.equal(sent[1].service_key, 'seguranca-incendios');
  assert.equal(sent[1].pagina, 'Portalegre');
  assert.equal(sent[1].fonte, 'Portalegre:media:herdade-amarela');
});
