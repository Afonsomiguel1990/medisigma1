import { privateIdentifier, trustedClientIp } from './security/identity';

// Small REST call works at the edge and in Node. No in-memory fallback.
export async function incrementCounter(key: string, windowSeconds: number) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE;
  if (!url || !service) throw new Error('Missing server configuration');
  const response = await fetch(`${url}/rest/v1/rpc/increment_intake_counter`, {
    method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(5000),
    headers: { apikey: service, Authorization: `Bearer ${service}`, 'Content-Type': 'application/json', 'Content-Profile': 'web' },
    body: JSON.stringify({ p_key: key, p_window_seconds: windowSeconds }),
  });
  if (!response.ok) throw new Error('Counter unavailable');
  return await response.json() as { count: number; retryAfter: number };
}
export async function rateLimitRequest(request: Request, options: { key: string; limit: number; windowMs: number }) {
  try {
    const key = await privateIdentifier('ip', trustedClientIp(request));
    const result = await incrementCounter(`${options.key}:${key}`, Math.ceil(options.windowMs / 1000));
    if (result.count <= options.limit) return null;
    return Response.json({ error: 'Demasiados pedidos. Tente novamente mais tarde.' }, {
      status: 429, headers: { 'Retry-After': String(result.retryAfter), 'Cache-Control': 'no-store' },
    });
  } catch {
    return Response.json({ error: 'Serviço temporariamente indisponível. Tente novamente.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}

// Successful idempotent retries are handled before counting in PostgreSQL.
// Rejected requests still consume the shared hard attempt limit.
export function countRejectedSubmission(request:Request, status:number) {
  if (![400,409,413,415].includes(status)) return Promise.resolve(null);
  return rateLimitRequest(request,{key:'submit-ip',limit:30,windowMs:600000});
}
