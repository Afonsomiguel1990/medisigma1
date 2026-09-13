import { NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/admin-auth';
import { createLeadRepository } from '@/lib/leads/repository';
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  const denied = requireAdminAuth(request);
  if (denied) return denied;
  const query = new URL(request.url).searchParams;
  const to = query.get('to') || new Date().toISOString();
  const from = query.get('from') || new Date(Date.now() - 30 * 86400000).toISOString();
  const start = Date.parse(from), end = Date.parse(to);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start || end - start > 366 * 86400000) return NextResponse.json({ error: 'Escolha um intervalo válido até 366 dias.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  try {
    const analytics = await createLeadRepository().getAnalytics(new Date(start).toISOString(), new Date(end).toISOString());
    if (!analytics || typeof analytics.submissions !== 'number') throw new Error('Invalid analytics');
    return NextResponse.json({ ...analytics, from, to }, { headers: { 'Cache-Control': 'no-store' } });
  } catch { return NextResponse.json({ error: 'Não foi possível carregar os dados. Nenhuma contagem foi substituída por zero.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } }); }
}
