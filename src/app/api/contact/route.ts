import { NextResponse } from 'next/server';
import { getSupabaseAnon, getSupabaseServer } from '@/lib/supabase';
import { WEBHOOK_URL, formatSlackMessage } from '@/lib/webhook';

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

    try {
      const slackMessage = formatSlackMessage({
        tipo: 'cliente',
        nome: empresa || 'N/A',
        email,
        telefone,
        mensagem,
        empresa,
        servico,
        pagina,
        url,
        fonte,
      });

      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackMessage),
      });
    } catch (notifyError) {
      console.error('Falha ao notificar Slack (contact)', notifyError);
      // Não falhar a request original
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Erro inesperado' }, { status: 500 });
  }
}
