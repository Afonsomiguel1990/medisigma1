import { accessCv } from '@/lib/cv/access';
import { readBoundedJson, publicError } from '@/lib/security/body';
import { rateLimitRequest } from '@/lib/rate-limit';
export const runtime = 'nodejs';
export async function POST(req: Request) {
  const limited = await rateLimitRequest(req, { key:'cv-access', limit:120, windowMs:600000 });
  if (limited) return limited;
  try {
    const body = await readBoundedJson(req, 2048);
    return Response.json(await accessCv(body.id, body.token), { headers:{ 'Cache-Control':'no-store', 'Referrer-Policy':'no-referrer' } });
  } catch (error) { return publicError(error); }
}
