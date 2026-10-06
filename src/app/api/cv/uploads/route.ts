import { readBoundedJson, publicError, HttpError } from '@/lib/security/body';
import { validateFileIntent } from '@/lib/cv/validation';
import { authorizeCv } from '@/lib/intake/submit';
import { countRejectedSubmission } from '@/lib/rate-limit';
export const runtime = 'nodejs';
export async function POST(req: Request) {
  try {
    const body = await readBoundedJson(req);
    if (!['spontaneous','application'].includes(String(body.kind)) || !body.submission || typeof body.submission !== 'object' || Array.isArray(body.submission)) throw new HttpError(400, 'Pedido inválido.');
    const result = await authorizeCv(req, body.submission as Record<string, unknown>, body.kind as 'spontaneous' | 'application', validateFileIntent(body.file));
    return Response.json(result, { headers: { 'Cache-Control':'no-store', 'Referrer-Policy':'no-referrer' } });
  } catch (error) { const response=publicError(error);return await countRejectedSubmission(req,response.status) || response; }
}
