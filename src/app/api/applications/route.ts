import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase';
import { WEBHOOK_URL, formatSlackMessage } from '@/lib/webhook';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = (formData.get('name') ?? '').toString();
    const email = (formData.get('email') ?? '').toString();
    const phone = (formData.get('phone') ?? '').toString();
    const cover_letter = (formData.get('cover_letter') ?? '').toString();
    // const consent = (formData.get('consent') ?? 'false').toString() === 'true';
    const job_id = (formData.get('job_id') ?? '').toString() || null;
    const cv = formData.get('cv') as File | null;
    let cv_url = (formData.get('cv_link') ?? '').toString() || null;

    if (!name || !email) {
      return NextResponse.json({ error: 'name e email são obrigatórios' }, { status: 400 });
    }

    // Se houver service role e ficheiro, fazemos upload. Ficheiro tem prioridade sobre link.
    if (cv && cv.size > 0 && process.env.SUPABASE_SERVICE_ROLE) {
      const supabase = getSupabaseServer();
      const arrayBuffer = await cv.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const sanitize = (str: string) => str.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const path = `${Date.now()}_${sanitize(name)}_${sanitize(cv.name)}`;
      const upload = await supabase.storage.from('os-cv').upload(path, buffer, {
        contentType: cv.type || 'application/octet-stream',
        upsert: false,
      });
      if (upload.error) {
        return NextResponse.json({ error: upload.error.message }, { status: 500 });
      }
      // Obter URL público se upload bem sucedido
      const { data: publicUrlData } = supabase.storage.from('os-cv').getPublicUrl(upload.data.path);
      cv_url = publicUrlData.publicUrl;
    }

    const supabase = getSupabaseServer();
    const { error } = await supabase
      .schema('web')
      .from('candidaturas')
      .insert({
        nome: name,
        email,
        telefone: phone,
        cv_link: cv_url,
        mensagem: cover_letter,
        area_interesse: job_id ? `Vaga: ${job_id}` : 'Candidatura a Vaga',
        origem: 'Candidatura a Vaga'
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    try {
      const slackMessage = formatSlackMessage({
        tipo: 'candidatura',
        nome: name,
        email,
        telefone: phone,
        mensagem: cover_letter,
        area_interesse: job_id ? `Vaga ID: ${job_id}` : 'Candidatura a vaga',
        cv_link: cv_url || '',
        origem: 'Candidatura a Vaga',
        job_id: job_id || undefined,
      });

      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackMessage),
      });
    } catch (notifyError) {
      console.error('Falha ao notificar Slack (applications)', notifyError);
    }

    if (process.env.EMAIL_ENABLED === 'true') {
      // futuras integrações
    }

    return NextResponse.json({ ok: true, cv_uploaded: Boolean(cv_url) });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Erro inesperado' }, { status: 500 });
  }
}
