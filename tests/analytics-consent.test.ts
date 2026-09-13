import test from 'node:test';
import assert from 'node:assert/strict';
import { acquisition, gaAcquisition, publicPath, publicOrigin, sanitizeAttribution } from '../src/lib/analytics/attribution';
import { canTrack, getCurrentAttribution, initializeGA, observePath, setAnalyticsConsent, trackSavedLead } from '../src/lib/analytics/client';
import { createContactClickHandler } from '../src/lib/analytics/contact-route';
test('attribution strips queries, PII-shaped campaign values, private paths and unbounded history', () => {
  assert.equal(publicPath('/admin/forms'), undefined);
  assert.equal(publicPath('/%61dmin/forms'), undefined);
  assert.equal(publicPath('https://preview.vercel.app/blog/artigo'), undefined);
  assert.equal(publicOrigin('http://localhost:3000'), false);
  assert.equal(publicPath('/blog/artigo/?email=a@b.pt#x'), '/blog/artigo');
  const a = sanitizeAttribution({ status: 'partial', entry_path: '/blog/artigo?secret=x', campaign: 'a@b.pt', source: 'Google', email: 'secret', assisted_article_paths: ['/admin', ...Array.from({length:20},(_,i)=>`/blog/artigo-${i}`)] });
  assert.equal(a.entry_path, '/blog/artigo'); assert.equal(a.campaign, undefined); assert.equal(a.email, undefined); assert.equal(a.source, 'google'); assert.equal((a.assisted_article_paths as string[]).length, 10);
  assert.deepEqual(sanitizeAttribution({ status: 'complete', entry_path: '/' }), { status: 'unknown' });
});
test('organic and AI referrers, campaigns and unknown acquisition remain sanitized and partial', () => {
  for (const [host, source, medium] of [['www.google.pt','google','organic'],['www.bing.com','bing','organic'],['duckduckgo.com','duckduckgo','organic'],['chatgpt.com','chatgpt','referral'],['gemini.google.com','gemini','referral'],['www.perplexity.ai','perplexity','referral']]) {
    const a = acquisition('', `https://${host}/search?email=private`);
    assert.equal(a.source,source); assert.equal(a.medium,medium); assert.equal(a.status,'partial');
    assert.equal(gaAcquisition(a).page_referrer,`https://${host}/`);
    assert.ok(!JSON.stringify(a).includes('private'));
  }
  const campaign = acquisition('?utm_source=newsletter&utm_medium=email&utm_campaign=outono&email=secret','https://www.google.pt/search?q=secret');
  assert.equal(campaign.source,'newsletter'); assert.equal(campaign.medium,'email'); assert.equal(gaAcquisition(campaign).campaign_name,'outono');
  assert.equal(acquisition('', 'https://example.org/link').medium, 'referral');
  for (const referrer of ['', 'https://www.medisigma.pt/blog/artigo', 'https://medisigma.pt/contact']) {
    const a = acquisition('?utm_source=a@b.pt&utm_campaign=secret%20name', referrer);
    assert.equal(a.source,undefined); assert.equal(a.medium,undefined); assert.equal(a.referrer_host,undefined); assert.equal(gaAcquisition(a).page_referrer,'');
  }
});
test('consent has no queued events, SPA views deduplicate, revocation clears storage and confirmed leads deduplicate', () => {
  const memory = new Map<string,string>();
  const location = { origin: 'https://www.medisigma.pt', pathname: '/blog/artigo', search: '?utm_source=google&email=secret' };
  const win = { location, dataLayer: [] as unknown[] };
  Object.assign(globalThis, { window: win, document: { referrer: 'https://google.pt/search?q=secret' }, sessionStorage: { getItem: (k:string)=>memory.get(k), setItem:(k:string,v:string)=>memory.set(k,v), removeItem:(k:string)=>memory.delete(k) } });
  try {
    setAnalyticsConsent(false); observePath(location.pathname); trackSavedLead('before', 'service_request');
    assert.deepEqual(getCurrentAttribution(), { status: 'unknown' }); assert.equal(memory.size, 0); assert.equal(win.dataLayer.length, 0);
    setAnalyticsConsent(true); initializeGA(); observePath(location.pathname); observePath(location.pathname);
    const events = () => win.dataLayer.map(a=>Array.from(a as ArrayLike<unknown>)).filter(a=>a[0]==='event');
    assert.equal(events().filter(a=>a[1]==='page_view').length, 1);
    location.pathname = '/contact'; observePath(location.pathname);
    assert.equal(events().filter(a=>a[1]==='page_view').length, 2);
    trackSavedLead('saved-1','service_request'); trackSavedLead('saved-1','service_request'); trackSavedLead('saved-2','resource_request');
    assert.equal(events().filter(a=>a[1]==='generate_lead').length, 1); assert.equal(events().filter(a=>a[1]==='resource_access').length, 1);
    assert.equal(getCurrentAttribution().entry_path, '/blog/artigo');
    const realNow = Date.now;
    try { const expired = realNow() + 31 * 60 * 1000; Date.now = () => expired; assert.equal(getCurrentAttribution().entry_path, '/contact'); assert.deepEqual(getCurrentAttribution().assisted_article_paths, []); } finally { Date.now = realNow; }
    location.pathname='/admin/forms'; assert.equal(canTrack(),false); assert.deepEqual(getCurrentAttribution(),{status:'unknown'});
    setAnalyticsConsent(false); assert.equal(memory.size,0); assert.equal(win.dataLayer.length,0);
  } finally { setAnalyticsConsent(false); for(const key of ['window','document','sessionStorage']) Reflect.deleteProperty(globalThis,key); }
});
test('contact API rejects admin/origin/no-consent and uses the idempotent repository with sanitized payload', async () => {
  const inputs: unknown[] = [];
  const post = createContactClickHandler('phone', { async recordContactClick(input) { inputs.push(input); return { status: inputs.length > 1 ? 'duplicate' : 'accepted', eventId: input.eventId }; } });
  const body = { event_id:'e9f67d67-0982-4c88-9823-870611ac6222', consent:true, url:'/contact?email=secret', attribution: {status:'unknown'} };
  const req = (data=body, origin='https://www.medisigma.pt', referer='https://www.medisigma.pt/contact')=>new Request('https://www.medisigma.pt/api/track-phone',{method:'POST',headers:{origin,referer},body:JSON.stringify(data)});
  assert.equal((await post(req(body,'https://preview.vercel.app'))).status,403);
  assert.equal((await post(req(body,undefined,'https://www.medisigma.pt/admin/forms'))).status,403);
  assert.equal((await post(req({...body,consent:false}))).status,400);
  assert.equal((await post(req({...body,url:'/estatisticas'}))).status,400);
  assert.equal((await post(req())).status,200); assert.equal((await (await post(req({ ...body, attribution: { status: 'partial' } }))).json()).duplicate,true);
  assert.equal(inputs.length,2); const saved=inputs[0] as {url:string; payloadHash:string}; assert.equal(saved.url,'/contact'); assert.match(saved.payloadHash,/^[a-f0-9]{64}$/);
  assert.equal(saved.payloadHash, (inputs[1] as {payloadHash:string}).payloadHash, 'attribution changes must not conflict with an identical click intent');
});
