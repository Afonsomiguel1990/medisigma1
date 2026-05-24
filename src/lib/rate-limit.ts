import { NextResponse } from 'next/server';

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitEntry>();
let requestsSinceCleanup = 0;

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

function cleanupExpiredEntries(now: number) {
  requestsSinceCleanup += 1;
  if (requestsSinceCleanup < 100) {
    return;
  }

  requestsSinceCleanup = 0;
  for (const [key, entry] of buckets.entries()) {
    if (entry.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export function rateLimitRequest(request: Request, options: RateLimitOptions) {
  const now = Date.now();
  cleanupExpiredEntries(now);

  const bucketKey = `${options.key}:${getClientIp(request)}`;
  const existing = buckets.get(bucketKey);

  if (!existing || existing.resetAt <= now) {
    buckets.set(bucketKey, {
      count: 1,
      resetAt: now + options.windowMs,
    });
    return null;
  }

  existing.count += 1;

  if (existing.count <= options.limit) {
    return null;
  }

  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);

  return NextResponse.json(
    { error: 'Demasiados pedidos. Tente novamente mais tarde.' },
    {
      status: 429,
      headers: {
        'Retry-After': retryAfter.toString(),
      },
    }
  );
}
