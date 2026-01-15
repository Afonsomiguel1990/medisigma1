import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { WEBHOOK_URL, formatSlackMessage } from '@/lib/webhook';

export const runtime = 'nodejs';

// TODO: validar uso futuro desta rota quando candidaturas espontâneas forem centralizadas

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = (formData.get('name') ?? '').toString();
    const email = (formData.get('email') ?? '').toString();
    const phone = (formData.get('phone') ?? '').toString();
    const cover_letter = (formData.get('cover_letter') ?? '').toString();
    const consent = (formData.get('consent') ?? 'false').toString() === 'true';
    const job_id = (formData.get('job_id') ?? '').toString() || null;
    const cv = formData.get('cv') as File | null;
    let cv_url = (formData.get('cv_link') ?? '').toString() || null;

    if (!name || !email) {
      return NextResponse.json({ error: 'name e email são obrigatórios' }, { status: 400 });
    }

    // Se houver service role e ficheiro, fazemos upload. Ficheiro tem prioridade sobre link.
    if (cv && cv.size > 0 && process.env.SUPABASE_SERVICE_ROLE) {
      const supabaseAdmin = getSupabaseAdmin();
      const arrayBuffer = await cv.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const path = `${Date.now()}_${encodeURIComponent(name)}_${cv.name}`.replace(/\s+/g, '_');
      const upload = await supabaseAdmin.storage.from('os-cv').upload(path, buffer, {
        contentType: cv.type || 'application/octet-stream',
        upsert: false,
      });
      if (upload.error) {
        return NextResponse.json({ error: upload.error.message }, { status: 500 });
      }
      // Obter URL público se upload bem sucedido
      const { data: publicUrlData } = supabaseAdmin.storage.from('os-cv').getPublicUrl(upload.data.path);
      cv_url = publicUrlData.publicUrl;
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .schema('web')
      .from('applications')
      .insert({ job_id, name, email, phone, cv_url, cover_letter, consent })
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
