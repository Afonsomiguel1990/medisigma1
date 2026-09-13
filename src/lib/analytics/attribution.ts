export const PUBLIC_ORIGIN = 'https://www.medisigma.pt';
export function publicPath(value: unknown): string | undefined {
  if (typeof value !== 'string' || value.length > 2048) return;
  try {
    const url = new URL(value, PUBLIC_ORIGIN);
    if (!['medisigma.pt', 'www.medisigma.pt'].includes(url.hostname)) return;
    const path = decodeURIComponent(url.pathname).replace(/\/{2,}/g, '/').replace(/\/$/, '') || '/';
    if (!/^\/[a-zA-Z0-9/_-]*$/.test(path) || /^\/(admin|estatisticas|api|test|preview)(\/|$)/i.test(path)) return;
    return path.slice(0, 240);
  } catch { return; }
}
export function publicOrigin(value: string): boolean {
  try { const u = new URL(value); return u.protocol === 'https:' && ['medisigma.pt', 'www.medisigma.pt'].includes(u.host); } catch { return false; }
}
function token(value: unknown): string | undefined {
  return typeof value === 'string' && /^[a-zA-Z0-9_-]{1,80}$/.test(value) ? value.toLowerCase() : undefined;
}
export function acquisition(search: string, referrer: string): Record<string, unknown> {
  const params = new URLSearchParams(search);
  const source = token(params.get('utm_source'));
  const medium = token(params.get('utm_medium'));
  const campaign = token(params.get('utm_campaign'));
  let host: string | undefined;
  try { const u = new URL(referrer); if (['https:', 'http:'].includes(u.protocol) && !['medisigma.pt', 'www.medisigma.pt'].includes(u.hostname)) host = u.hostname; } catch { /* Referrer is unknown. */ }
  const matched = host && [
    [/^(www\.)?google\.(com|pt|co\.uk|es|fr|de)$/, 'google', 'organic'],
    [/^(www\.)?bing\.com$/, 'bing', 'organic'],
    [/^(www\.)?duckduckgo\.com$/, 'duckduckgo', 'organic'],
    [/^(chatgpt\.com|chat\.openai\.com)$/, 'chatgpt', 'referral'],
    [/^gemini\.google\.com$/, 'gemini', 'referral'],
    [/^(www\.)?perplexity\.ai$/, 'perplexity', 'referral'],
  ].find(([pattern]) => (pattern as RegExp).test(host!));
  return sanitizeAttribution({ status: 'partial', referrer_host: host, source: source || matched?.[1] || (host ? 'referral' : undefined), medium: medium || (source ? undefined : matched?.[2] || (host ? 'referral' : undefined)), campaign });
}
export function gaAcquisition(input: unknown): Record<string, unknown> {
  const a = sanitizeAttribution(input);
  return { page_referrer: a.referrer_host ? `https://${a.referrer_host}/` : '', ...(a.source ? { campaign_source: a.source } : {}), ...(a.medium ? { campaign_medium: a.medium } : {}), ...(a.campaign ? { campaign_name: a.campaign } : {}) };
}
export function sanitizeAttribution(input: unknown): Record<string, unknown> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { status: 'unknown' };
  const a = input as Record<string, unknown>;
  if (a.status !== 'partial') return { status: 'unknown' };
  const out: Record<string, unknown> = { status: 'partial' };
  for (const key of ['entry_path', 'conversion_path']) { const v = publicPath(a[key]); if (v) out[key] = v; }
  for (const key of ['source', 'medium', 'campaign']) { const v = token(a[key]); if (v) out[key] = v; }
  if (typeof a.referrer_host === 'string' && /^(?:[a-z0-9-]+\.)+[a-z]{2,24}$/.test(a.referrer_host) && a.referrer_host.length <= 120) out.referrer_host = a.referrer_host;
  out.assisted_article_paths = Array.isArray(a.assisted_article_paths) ? [...new Set(a.assisted_article_paths.map(publicPath).filter((p): p is string => !!p && /^\/blog\/[a-z0-9-]+$/.test(p)))].slice(0, 10) : [];
  return out;
}
