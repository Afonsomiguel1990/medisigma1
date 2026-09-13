import { NextResponse } from 'next/server';
import { createLeadRepository } from '@/lib/leads/repository';
import { submitLead } from '@/lib/leads/submit';
import { getResource, RESOURCE_BUCKET, resourceObjectPath } from '@/lib/resources/catalog';
import { createResourceAccess } from '@/lib/resources/access';
import { getSupabaseAdmin } from '@/lib/supabase';
import { rateLimitRequest } from '@/lib/rate-limit';
export const runtime = 'nodejs';
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const resource = getResource((await params).slug);
  const respond = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
  if (!resource) return respond({ ok: false, error: 'Recurso não encontrado.' }, 404);
  const limited = rateLimitRequest(request, { key: 'resource-access', limit: 10, windowMs: 10 * 60 * 1000 });
  if (limited) return limited;
  const raw = await request.text();
  if (raw.length > 20000) return respond({ ok: false, error: 'Pedido demasiado longo.' }, 413);
  let input: Record<string, unknown>;
  try {
    const body = JSON.parse(raw);
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error();
    input = body;
  } catch { return respond({ ok: false, error: 'Pedido inválido.' }, 400); }
  if (!input.confirm_mail && (typeof input.empresa !== 'string' || !input.empresa.trim())) {
    return respond({ ok: false, error: 'Indique o nome da empresa.' }, 400);
  }
  try {
    const result = await submitLead({ ...input, lead_kind: 'resource_request', resource_id: resource.slug,
      servico: resource.title, service_key: resource.serviceKey }, createLeadRepository());
    if (!result.body.ok || !result.body.saved) return respond(result.body, result.status);
    const createdAt = 'created_at' in result.body && typeof result.body.created_at === 'string' ? result.body.created_at : undefined;
    const access = await createResourceAccess(resource, createdAt, async (item, expiresIn) => {
      const { data, error } = await getSupabaseAdmin().storage.from(RESOURCE_BUCKET).createSignedUrl(resourceObjectPath(item), expiresIn, { download: true });
      if (error || !data?.signedUrl) throw new Error('Resource unavailable');
      return data.signedUrl;
    });
    return respond({ ...result.body, ...access }, access.download_expired ? 410 : 200);
  } catch { return respond({ ok: false, error: 'Não foi possível guardar o pedido. Tente novamente.' }, 503); }
}
