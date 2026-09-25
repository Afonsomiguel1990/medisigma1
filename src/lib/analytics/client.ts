'use client';
import { acquisition, gaAcquisition, publicOrigin, publicPath, sanitizeAttribution } from './attribution';
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
  lastPath = undefined;
  if (typeof window !== 'undefined') {
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
    (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
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
      (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
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
  w.dataLayer = w.dataLayer || [];
  w.gtag = (...args: unknown[]) => { w.dataLayer.push(args); };
  observePath(window.location.pathname);
  w.gtag('js', new Date());
  w.gtag('config', GA_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: window.location.origin + window.location.pathname, ...gaAcquisition(session?.attribution) });
  ready = true;
  observePath(window.location.pathname);
}
export function getCurrentAttribution(): Record<string, unknown> { if (!canTrack()) return { status: 'unknown' }; observePath(window.location.pathname); return sanitizeAttribution(session?.attribution); }
export function trackSavedLead(id: string, kind: 'service_request' | 'resource_request') {
  if (!canTrack() || !ready || !id) return;
  getCurrentAttribution();
  if (!session || session.saved.includes(id)) return;
  session.saved.push(id); session.saved = session.saved.slice(-100); persist();
  ga('event', kind === 'service_request' ? 'generate_lead' : 'resource_access', { lead_kind: kind });
}
export function trackContactClick(channel: 'phone' | 'email' | 'whatsapp', serviceKey?: string) {
  if (!canTrack()) return;
  const path = publicPath(window.location.pathname)!;
  const attribution = getCurrentAttribution();
  ga('event', `${channel}_click`, { contact_method: channel, page_location: window.location.origin + path });
  try { void fetch(`/api/track-${channel}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true, body: JSON.stringify({ event_id: crypto.randomUUID(), consent: true, pagina: path, url: path, service_key: serviceKey, attribution }) }).catch(() => {}); } catch { /* Contact navigation must continue. */ }
}

export function trackServiceMedia(event: 'service_video_start' | 'service_video_complete' | 'service_media_cta', mediaId: string, serviceKey: string): boolean {
  if (!canTrack() || !ready || !/^[a-z0-9-]{1,80}$/.test(mediaId) || !/^[a-z0-9-]{1,80}$/.test(serviceKey)) return false;
  ga('event', event, { media_id: mediaId, service_key: serviceKey, page_location: window.location.origin + publicPath(window.location.pathname) });
  return true;
}
