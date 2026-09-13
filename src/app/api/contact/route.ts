import { NextResponse } from 'next/server';
import { createLeadRepository } from '@/lib/leads/repository';
import { submitLead } from '@/lib/leads/submit';
import { rateLimitRequest } from '@/lib/rate-limit';
export async function POST(req: Request) {
  const limited = rateLimitRequest(req, { key: 'contact', limit: 5, windowMs: 10 * 60 * 1000 });
  if (limited) return limited;
  try {
    const raw = await req.text();
    if (raw.length > 20000) return NextResponse.json({ ok: false, error: 'Pedido demasiado longo.' }, { status: 413 });
    let body: unknown;
    try { body = JSON.parse(raw); }
    catch { return NextResponse.json({ ok: false, error: 'Pedido inválido.' }, { status: 400 }); }
    if (body && typeof body === 'object' && (('lead_kind' in body && body.lead_kind === 'resource_request') || 'resource_id' in body)) {
      return NextResponse.json({ ok: false, error: 'Utilize o formulário do recurso.' }, { status: 400 });
    }
    const result = await submitLead(body, createLeadRepository());
    return NextResponse.json(result.body, { status: result.status });
  } catch {
    return NextResponse.json({ ok: false, error: 'Não foi possível guardar o pedido. Tente novamente.' }, { status: 503 });
  }
}
