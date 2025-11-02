import { NextResponse } from 'next/server';
import { getSupabaseAnon, getSupabaseServer } from '@/lib/supabase';

const NOTIFY_URL = process.env.NOTIFY_URL;
const NOTIFY_SECRET = process.env.NOTIFY_SHARED_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const empresa = (body.empresa ?? '').toString();
    const telefone = (body.telefone ?? '').toString();
    const email = (body.email ?? '').toString();
    const servico = (body.servico ?? '').toString();
    const mensagem = (body.mensagem ?? '').toString();
    const pagina = (body.pagina ?? '').toString();
    const url = (body.url ?? '').toString();
    const fonte = (body.fonte ?? '').toString();

    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório' }, { status: 400 });
    }

    const supabase = getSupabaseServer() ?? getSupabaseAnon();
    const insertResult = await supabase
      .schema('web')
      .from('contacts')
      .insert({
        empresa,
        telefone,
        email,
        servico,
        mensagem,
        pagina,
        url,
        fonte,
      })
      .select()
      .single();

    if (insertResult.error) {
      return NextResponse.json({ error: insertResult.error.message }, { status: 500 });
    }

    if (NOTIFY_URL && NOTIFY_SECRET) {
      try {
        await fetch(NOTIFY_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-notify-secret': NOTIFY_SECRET,
          },
          body: JSON.stringify({
            type: 'contact',
            data: insertResult.data,
          }),
        });
      } catch (notifyError) {
        console.error('Falha ao notificar equipa (contact)', notifyError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: e?.message ?? 'Erro inesperado' }, { status: 500 });
  }
}
