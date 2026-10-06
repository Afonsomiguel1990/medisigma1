// Web Crypto also works in middleware. Counters never store raw IPs or emails.
export async function privateIdentifier(purpose: string, value: string): Promise<string> {
  const secret = process.env.SUBMISSION_HMAC_SECRET || process.env.SUPABASE_SERVICE_ROLE;
  if (!secret) throw new Error('Missing server configuration');
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const hash = await crypto.subtle.sign('HMAC', key, encoder.encode(`medisigma:${purpose}:v1:${value}`));
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
}
export function trustedClientIp(request: Request): string {
  if (process.env.VERCEL === '1') {
    const value = request.headers.get('x-vercel-forwarded-for')?.trim();
    if (value && value.length <= 45 && /^[0-9a-f:.]+$/i.test(value)) return value.toLowerCase();
    throw new Error('Trusted ingress IP unavailable');
  }
  if (process.env.NODE_ENV !== 'production' || process.env.SECURITY_LOCAL_TEST === '1') return 'local-development';
  throw new Error('Unconfigured trusted ingress');
}
export async function requestIdentifiers(request: Request, email: string) {
  const [ip, mail] = await Promise.all([privateIdentifier('ip', trustedClientIp(request)), privateIdentifier('email', email.trim().toLowerCase())]);
  return { ip, email: mail };
}
