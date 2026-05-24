import { NextResponse } from 'next/server';

const ADMIN_REALM = 'Medisigma Admin';

function getExpectedCredentials() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return null;
  }

  return { username, password };
}

function decodeBasicCredentials(value: string) {
  if (!value.startsWith('Basic ')) {
    return null;
  }

  try {
    const token = value.slice('Basic '.length);
    const decoded =
      typeof atob === 'function'
        ? atob(token)
        : (
            globalThis as typeof globalThis & {
              Buffer?: {
                from: (
                  input: string,
                  encoding: 'base64'
                ) => { toString: (encoding: 'utf8') => string };
              };
            }
          ).Buffer?.from(token, 'base64').toString('utf8');

    if (!decoded) {
      return null;
    }

    const separator = decoded.indexOf(':');
    if (separator === -1) {
      return null;
    }

    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

function safeEqual(actual: string, expected: string) {
  const maxLength = Math.max(actual.length, expected.length);
  let mismatch = actual.length ^ expected.length;

  for (let index = 0; index < maxLength; index += 1) {
    mismatch |= (actual.charCodeAt(index) || 0) ^ (expected.charCodeAt(index) || 0);
  }

  return mismatch === 0;
}

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'Cache-Control': 'no-store',
      'WWW-Authenticate': `Basic realm="${ADMIN_REALM}", charset="UTF-8"`,
    },
  });
}

export function isAdminAuthenticated(request: Request) {
  const expected = getExpectedCredentials();
  if (!expected) {
    return false;
  }

  const credentials = decodeBasicCredentials(request.headers.get('authorization') || '');
  if (!credentials) {
    return false;
  }

  return (
    safeEqual(credentials.username, expected.username) &&
    safeEqual(credentials.password, expected.password)
  );
}

export function requireAdminAuth(request: Request) {
  return isAdminAuthenticated(request) ? null : unauthorized();
}
