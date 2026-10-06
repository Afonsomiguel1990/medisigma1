import { requireAdminAuth } from '@/lib/admin-auth';
import { CSRF_COOKIE, issueCsrf } from '@/lib/security/csrf';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  const denied = await requireAdminAuth(req);
  if (denied) return denied;
  if (req.headers.get('sec-fetch-site') === 'cross-site') return new Response(null, { status:403 });
  const token = await issueCsrf(req);
  return Response.json({ token }, { headers:{ 'Cache-Control':'no-store',
    'Set-Cookie':`${CSRF_COOKIE}=${token}; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=28800${process.env.VERCEL === '1' ? '; Secure' : ''}` } });
}
