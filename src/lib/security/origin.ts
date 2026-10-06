const PRODUCTION = 'https://www.medisigma.pt';

// Only deployment configuration can choose an outbound origin. Never use Host,
// X-Forwarded-Host, Origin or Referer to build a server-side fetch destination.
export function siteOrigin(env: Partial<NodeJS.ProcessEnv> = process.env): string {
  if (env.VERCEL_ENV === 'production') return PRODUCTION;
  if (env.VERCEL_ENV === 'preview' && env.VERCEL_URL) {
    const url = new URL(`https://${env.VERCEL_URL}`);
    if (url.hostname.endsWith('.vercel.app') && url.pathname === '/' && !url.username && !url.port) return url.origin;
    throw new Error('Invalid preview origin configuration');
  }
  if (env.NODE_ENV !== 'production' || env.SECURITY_LOCAL_TEST === '1') {
    const url = new URL(env.LOCAL_SITE_ORIGIN || 'http://localhost:3000');
    if (['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) && ['http:', 'https:'].includes(url.protocol)) return url.origin;
    throw new Error('Invalid local origin configuration');
  }
  return PRODUCTION;
}

export function isAllowedOrigin(value: string | null): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return value === url.origin && [siteOrigin(), ...(process.env.VERCEL_ENV === 'production' ? ['https://medisigma.pt'] : [])].includes(url.origin);
  } catch { return false; }
}

export function externalDocumentUrl(value: string): string {
  if (value.length > 1500 || /[\s<>"\\]/.test(value)) throw new Error('Invalid external URL');
  const url = new URL(value);
  const host = url.hostname.toLowerCase();
  if (url.protocol !== 'https:' || url.username || url.password || (url.port && url.port !== '443') ||
    !host.includes('.') || host.endsWith('.') || !/^[a-z0-9.-]+$/.test(host) ||
    /^\d+\.\d+\.\d+\.\d+$/.test(host) || /\.(localhost|local|internal|test|invalid|example)$/.test(host)) {
    throw new Error('Invalid external URL');
  }
  return url.href;
}
