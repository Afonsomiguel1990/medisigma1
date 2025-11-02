import { NextResponse } from 'next/server';
import { getSupabaseAnon, getSupabaseServer } from '@/lib/supabase';

const NOTIFY_URL = process.env.NOTIFY_URL;
const NOTIFY_SECRET = process.env.NOTIFY_SHARED_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const nome = (body.nome ?? '').toString();
    const email = (body.email ?? '').toString();
    const telefone = (body.telefone ?? '').toString();
    const area_interesse = (body.area_interesse ?? '').toString();
    const cv_link = (body.cv_link ?? '').toString();
    const mensagem = (body.mensagem ?? '').toString();
    const pagina = (body.pagina ?? '').toString();
    const url = (body.url ?? '').toString();
    const origem = (body.origem ?? '').toString();

    if (!nome || !email || !telefone) {
      return NextResponse.json(
        { error: 'Nome, email e telefone são obrigatórios.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServer() ?? getSupabaseAnon();
    const insertResult = await supabase
      .schema('web')
      .from('candidaturas')
      .insert({
        nome,
        email,
        telefone,
        area_interesse,
        cv_link,
        mensagem,
        pagina,
        url,
        origem: origem || pagina || 'Candidatura Espontânea',
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
            type: 'candidatura',
            data: insertResult.data,
          }),
        });
      } catch (notifyError) {
        console.error('Falha ao notificar equipa (candidatura)', notifyError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? 'Erro inesperado.' },
      { status: 500 }
    );
  }
}
