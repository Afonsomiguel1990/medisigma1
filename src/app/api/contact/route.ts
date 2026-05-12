import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { getSupabaseAnon, getSupabaseServer } from '@/lib/supabase';
import { WEBHOOK_URL, formatSlackMessage } from '@/lib/webhook';

const MAX_TEXT_LENGTH = 2000;

function cleanText(value: unknown, maxLength = MAX_TEXT_LENGTH) {
  return (value ?? '').toString().trim().slice(0, maxLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export async function POST(req: Request) {
  const limitError = rateLimit(req, 'contact', 20, 60 * 60 * 1000);
  if (limitError) return limitError;

  try {
    const body = await req.json().catch(() => ({}));

    const empresa = cleanText(body.empresa, 200);
    const telefone = cleanText(body.telefone, 80);
    const email = cleanText(body.email, 254);
    const servico = cleanText(body.servico, 200);
    const mensagem = cleanText(body.mensagem);
    const pagina = cleanText(body.pagina, 300);
    const url = cleanText(body.url, 1000);
    const fonte = cleanText(body.fonte, 200);

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Email invalido' }, { status: 400 });
    }

    const supabase = getSupabaseServer() ?? getSupabaseAnon();
    const { error } = await supabase
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
      });

    if (error) {
      console.error('Erro ao inserir contacto:', error);
      return NextResponse.json({ error: 'Erro ao guardar contacto' }, { status: 500 });
    }

    try {
      if (WEBHOOK_URL) {
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
      }
    } catch (notifyError) {
      console.error('Falha ao notificar Slack (contact)', notifyError);
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    console.error('Erro inesperado no contacto:', e);
    return NextResponse.json({ error: 'Erro inesperado' }, { status: 500 });
  }
}
