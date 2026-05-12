import { NextResponse } from 'next/server';

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitBucket>();

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();

  return req.headers.get('x-real-ip') || 'unknown';
}

export function rateLimit(req: Request, scope: string, limit: number, windowMs: number) {
  const now = Date.now();
  const key = `${scope}:${getClientIp(req)}`;
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  bucket.count += 1;

  if (bucket.count > limit) {
    const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
    return NextResponse.json(
      { error: 'Demasiadas tentativas. Tente novamente mais tarde.' },
      {
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'Cache-Control': 'no-store',
        },
      }
    );
  }

  return null;
}
