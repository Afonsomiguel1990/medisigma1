'use client';
import { acquisition, gaAcquisition, publicOrigin, publicPath, sanitizeAttribution } from './attribution';
import { CONTACT_SERVICES, contactServiceKey } from '../contact';
export const GA_ID = 'G-GB5WGQPXK3';
const KEY = 'medisigma-attribution-v1';
const TTL = 30 * 60 * 1000;
let consent = false;
let ready = false;
let lastPath: string | undefined;
let session: { updated: number; attribution: Record<string, unknown>; saved: string[] } | undefined;
const listeners = new Set<() => void>();
export const subscribeConsent = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
export const hasConsent = () => consent;
export function suspendAnalytics() {
  lastPath = undefined; ready = false;
  if (typeof window !== 'undefined') {
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
    // Keep the same array and Google's installed push handler on subsequent visits.
    const layer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
    if (layer) layer.length = 0;
  }
}
export function canTrack() { return typeof window !== 'undefined' && consent && publicOrigin(window.location.origin) && !!publicPath(window.location.pathname); }
function ga(...args: unknown[]) { try { if (canTrack() && ready) (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.(...args); } catch { /* Optional analytics must not interrupt contact actions. */ } }
export function setAnalyticsConsent(value: boolean) {
  consent = value;
  if (!value) {
    session = undefined; lastPath = undefined; ready = false;
    if (typeof window !== 'undefined') {
      (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
      const layer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
      if (layer) layer.length = 0;
      try { sessionStorage.removeItem(KEY); } catch { /* Storage may be disabled. */ }
    }
  }
  listeners.forEach(listener => listener());
}
function persist() { try { sessionStorage.setItem(KEY, JSON.stringify(session)); } catch { /* Attribution remains in memory. */ } }
export function observePath(path: string) {
  if (!canTrack() || !publicPath(path)) return;
  if (!session) { try { const raw = JSON.parse(sessionStorage.getItem(KEY) || 'null'); if (raw && Date.now() - raw.updated < TTL) session = { updated: raw.updated, attribution: sanitizeAttribution(raw.attribution), saved: Array.isArray(raw.saved) ? raw.saved.filter((s: unknown) => typeof s === 'string').slice(-100) : [] }; } catch { /* Start a partial session. */ } }
  if (!session || Date.now() - session.updated >= TTL) {
    session = { updated: Date.now(), saved: [], attribution: sanitizeAttribution({ ...acquisition(window.location.search, document.referrer), entry_path: path }) };
  }
  session.updated = Date.now();
  session.attribution = sanitizeAttribution({ ...session.attribution, conversion_path: path, assisted_article_paths: [...(session.attribution.assisted_article_paths as string[] || []), path] });
  persist();
  if (ready && lastPath !== path) { lastPath = path; ga('event', 'page_view', { page_location: window.location.origin + path, ...gaAcquisition(session.attribution) }); }
}
export function initializeGA() {
  if (!canTrack()) return;
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = false;
  if (ready) { observePath(window.location.pathname); return; }
  w.dataLayer = w.dataLayer || [];
  // gtag commands are Arguments objects, not generic dataLayer event arrays.
  // eslint-disable-next-line prefer-rest-params -- Google's dataLayer consumer requires Arguments.
  w.gtag = function () { w.dataLayer.push(arguments); };
  observePath(window.location.pathname);
  w.gtag('js', new Date());
  w.gtag('config', GA_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: window.location.origin + window.location.pathname, ...(new URLSearchParams(window.location.search).get('analytics_debug') === '1' ? { debug_mode: true } : {}), ...gaAcquisition(session?.attribution) });
  ready = true;
  observePath(window.location.pathname);
}
export function getCurrentAttribution(): Record<string, unknown> { if (!canTrack()) return { status: 'unknown' }; observePath(window.location.pathname); return sanitizeAttribution(session?.attribution); }
export function trackSavedLead(id: string, kind: 'service_request' | 'resource_request', serviceKey?: string) {
  if (!canTrack() || !ready || !id) return;
  getCurrentAttribution();
  if (!session || session.saved.includes(id)) return;
  session.saved.push(id); session.saved = session.saved.slice(-100); persist();
  ga('event', kind === 'service_request' ? 'generate_lead' : 'resource_access', { lead_kind: kind, ...serviceParameters(serviceKey) });
}
export function trackContactFormStart(serviceKey?: string) {
  if (!canTrack() || !ready) return false;
  ga('event', 'contact_form_start', { lead_kind: 'service_request', ...serviceParameters(serviceKey) });
  return true;
}
function serviceParameters(key?: string): Record<string, string> {
  const pathKey = typeof window !== 'undefined' ? window.location.pathname.match(/^\/servicos\/([a-z-]+)\/?$/)?.[1] : undefined;
  const found = CONTACT_SERVICES.find(service => service.key === (key || pathKey));
  return found ? { service_key: contactServiceKey(found.value) } : {};
}
export function trackContactClick(channel: 'phone' | 'email' | 'whatsapp', serviceKey?: string) {
  if (!canTrack()) return;
  const path = publicPath(window.location.pathname)!;
  const attribution = getCurrentAttribution();
  const service = serviceParameters(serviceKey);
  ga('event', `${channel}_click`, { contact_method: channel, page_location: window.location.origin + path, ...service });
  try { void fetch(`/api/track-${channel}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true, body: JSON.stringify({ event_id: crypto.randomUUID(), consent: true, pagina: path, url: path, ...service, attribution }) }).catch(() => {}); } catch { /* Contact navigation must continue. */ }
}

export function trackServiceMedia(event: 'service_video_start' | 'service_video_complete' | 'service_media_cta', mediaId: string, serviceKey: string): boolean {
  if (!canTrack() || !ready || !/^[a-z0-9-]{1,80}$/.test(mediaId) || !/^[a-z0-9-]{1,80}$/.test(serviceKey)) return false;
  ga('event', event, { media_id: mediaId, service_key: serviceKey, page_location: window.location.origin + publicPath(window.location.pathname) });
  return true;
}
