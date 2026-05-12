import { NextResponse } from 'next/server';
import { getSupabaseAdmin, getSupabaseServer } from '@/lib/supabase';
import { WEBHOOK_URL, formatSlackMessage } from '@/lib/webhook';
import { rateLimit } from '@/lib/rate-limit';
import { buildStoragePath, validateCvFile } from '@/lib/upload-validation';

export const runtime = 'nodejs';

const MAX_TEXT_LENGTH = 2000;

function cleanText(value: FormDataEntryValue | null, maxLength = MAX_TEXT_LENGTH) {
  return (value ?? '').toString().trim().slice(0, maxLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function isValidExternalUrl(value: string | null) {
  if (!value) return true;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const limitError = rateLimit(req, 'applications', 10, 60 * 60 * 1000);
  if (limitError) return limitError;

  try {
    const formData = await req.formData();
    const name = cleanText(formData.get('name'), 200);
    const email = cleanText(formData.get('email'), 254);
    const phone = cleanText(formData.get('phone'), 80);
    const cover_letter = cleanText(formData.get('cover_letter'));
    const consent = (formData.get('consent') ?? 'false').toString() === 'true';
    const job_id = cleanText(formData.get('job_id'), 100) || null;
    const cv = formData.get('cv') as File | null;
    let cv_url = cleanText(formData.get('cv_link'), 1000) || null;

    if (!name || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Nome e email valido sao obrigatorios' }, { status: 400 });
    }

    if (!isValidExternalUrl(cv_url)) {
      return NextResponse.json({ error: 'Link do CV invalido' }, { status: 400 });
    }

    if (cv && cv.size > 0 && process.env.SUPABASE_SERVICE_ROLE) {
      const cvValidationError = validateCvFile(cv);
      if (cvValidationError) {
        return NextResponse.json({ error: cvValidationError }, { status: 400 });
      }

      const supabaseAdmin = getSupabaseAdmin();
      const arrayBuffer = await cv.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const path = buildStoragePath('applications', cv.name, name);
      const upload = await supabaseAdmin.storage.from('os-cv').upload(path, buffer, {
        contentType: cv.type || 'application/octet-stream',
        upsert: false,
      });

      if (upload.error) {
        console.error('Erro upload CV:', upload.error);
        return NextResponse.json({ error: 'Erro ao guardar CV' }, { status: 500 });
      }

      const { data: publicUrlData } = supabaseAdmin.storage.from('os-cv').getPublicUrl(upload.data.path);
      cv_url = publicUrlData.publicUrl;
    }

    const supabase = getSupabaseServer();
    const { error } = await supabase
      .schema('web')
      .from('applications')
      .insert({ job_id, name, email, phone, cv_url, cover_letter, consent })
      .select()
      .single();

    if (error) {
      console.error('Erro ao inserir candidatura:', error);
      return NextResponse.json({ error: 'Erro ao guardar candidatura' }, { status: 500 });
    }

    try {
      if (WEBHOOK_URL) {
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
      }
    } catch (notifyError) {
      console.error('Falha ao notificar Slack (applications)', notifyError);
    }

    return NextResponse.json({ ok: true, cv_uploaded: Boolean(cv_url) });
  } catch (e: unknown) {
    console.error('Erro inesperado na candidatura:', e);
    return NextResponse.json({ error: 'Erro inesperado' }, { status: 500 });
  }
}
