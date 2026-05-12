import { createHash, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const unauthorizedHeaders = {
  'Cache-Control': 'no-store',
  'WWW-Authenticate': 'Bearer realm="Medisigma Admin"',
};

function digest(value: string) {
  return createHash('sha256').update(value).digest();
}

function safeTokenEqual(provided: string, expected: string) {
  return timingSafeEqual(digest(provided), digest(expected));
}

export function requireAdminAuth(req: NextRequest) {
  const expectedToken = process.env.ADMIN_API_TOKEN;

  if (!expectedToken) {
    console.error('ADMIN_API_TOKEN is not configured; refusing admin API access.');
    return NextResponse.json(
      { error: 'Admin API nao configurada.' },
      {
        status: 503,
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  }

  const authorization = req.headers.get('authorization') || '';
  const bearerToken = authorization.match(/^Bearer\s+(.+)$/i)?.[1];
  const headerToken = req.headers.get('x-admin-token');
  const providedToken = bearerToken || headerToken || '';

  if (!providedToken || !safeTokenEqual(providedToken, expectedToken)) {
    return NextResponse.json(
      { error: 'Nao autorizado.' },
      {
        status: 401,
        headers: unauthorizedHeaders,
      }
    );
  }

  return null;
}
