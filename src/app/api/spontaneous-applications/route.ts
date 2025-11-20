import { NextResponse } from 'next/server';
import { getSupabaseAnon, getSupabaseServer } from '@/lib/supabase';
import { WEBHOOK_URL, formatSlackMessage } from '@/lib/webhook';

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

    try {
      const slackMessage = formatSlackMessage({
        tipo: 'candidatura',
        nome,
        email,
        telefone,
        mensagem,
        area_interesse,
        cv_link,
        pagina,
        origem: origem || pagina || 'Candidatura Espontânea',
      });

      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackMessage),
      });
    } catch (notifyError) {
      console.error('Falha ao notificar Slack (candidatura)', notifyError);
      // Não falhar a request original
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado.' },
      { status: 500 }
    );
  }
}
