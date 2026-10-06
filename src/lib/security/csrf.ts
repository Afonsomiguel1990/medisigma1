import { privateIdentifier } from './identity';
import { isAllowedOrigin } from './origin';
export const CSRF_COOKIE = 'medisigma_admin_csrf';
export async function issueCsrf(request: Request) {
  const issued = String(Date.now());
  const salt = crypto.randomUUID();
  const signature = await privateIdentifier('csrf', `${issued}:${salt}:${request.headers.get('authorization') || ''}`);
  return `${issued}.${salt}.${signature}`;
}
export async function validCsrf(request: Request) {
  if (!isAllowedOrigin(request.headers.get('origin')) || request.headers.get('sec-fetch-site') === 'cross-site') return false;
  const token = request.headers.get('x-csrf-token') || '';
  const cookie = request.headers.get('cookie')?.split(';').map(s => s.trim()).find(s => s.startsWith(`${CSRF_COOKIE}=`))?.slice(CSRF_COOKIE.length + 1);
  if (!token || token.length > 160 || token !== cookie) return false;
  const [issued, salt, signature, extra] = token.split('.');
  if (extra || !/^\d{13}$/.test(issued) || !/^[a-f0-9-]{36}$/.test(salt) || !/^[a-f0-9]{64}$/.test(signature)) return false;
  if (Date.now() - Number(issued) > 8 * 3600000 || Number(issued) > Date.now() + 30000) return false;
  const expected = await privateIdentifier('csrf', `${issued}:${salt}:${request.headers.get('authorization') || ''}`);
  let difference = 0;
  for (let index = 0; index < expected.length; index++) difference |= expected.charCodeAt(index) ^ signature.charCodeAt(index);
  return difference === 0;
}
