import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
export async function POST() {
  return NextResponse.json(
    { ok: false, error: 'Este recurso não está disponível.' },
    { status: 410, headers: { 'Cache-Control': 'no-store' } },
  );
}
