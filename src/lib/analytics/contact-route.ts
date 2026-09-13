import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { rateLimitRequest } from '../rate-limit';
import { createLeadRepository, type LeadRepository } from '../leads/repository';
import { publicOrigin, publicPath, sanitizeAttribution } from './attribution';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function createContactClickHandler(channel: 'phone' | 'email' | 'whatsapp', repository?: Pick<LeadRepository, 'recordContactClick'>) {
  return async function POST(req: Request) {
    const limited = rateLimitRequest(req, { key: `track-${channel}`, limit: 120, windowMs: 600000 });
    if (limited) return limited;
    if (!publicOrigin(req.headers.get('origin') || '')) return NextResponse.json({ error: 'Origem inválida.' }, { status: 403 });
    const referrer = req.headers.get('referer');
    if (referrer && !publicPath(referrer)) return NextResponse.json({ error: 'Página inválida.' }, { status: 403 });
    try {
      const text = await req.text();
      if (text.length > 8000) return NextResponse.json({ error: 'Pedido demasiado grande.' }, { status: 413 });
      let body;
      try { body = JSON.parse(text); } catch { return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 }); }
      const path = publicPath(body?.url);
      if (!body || body.consent !== true || !UUID.test(body.event_id) || !path) return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 });
      const serviceKey = typeof body.service_key === 'string' && /^[a-z0-9-]{1,120}$/.test(body.service_key) ? body.service_key : undefined;
      const attribution = sanitizeAttribution(body.attribution);
      const payloadHash = createHash('sha256').update(JSON.stringify({ channel, path, serviceKey })).digest('hex');
      const receipt = await (repository || createLeadRepository()).recordContactClick({ eventId: body.event_id.toLowerCase(), payloadHash, channel, pagina: path, url: path, serviceKey, attribution });
      return NextResponse.json({ success: receipt.status !== 'conflict', event_id: receipt.eventId, duplicate: receipt.status === 'duplicate' }, { status: receipt.status === 'conflict' ? 409 : 200 });
    } catch { return NextResponse.json({ error: 'Não foi possível registar o evento.' }, { status: 500 }); }
  };
}
