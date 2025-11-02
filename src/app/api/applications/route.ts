import { NextResponse } from 'next/server';
import { getSupabaseAdmin, getSupabaseServer } from '@/lib/supabase';

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

    if (!name || !email) {
      return NextResponse.json({ error: 'name e email são obrigatórios' }, { status: 400 });
    }

    // Se houver service role, usamos para upload; se não houver, saltamos upload e ainda assim gravamos candidatura
    let cv_url: string | null = null;
    if (cv && process.env.SUPABASE_SERVICE_ROLE) {
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
      cv_url = upload.data.path;
    }

    const supabase = getSupabaseServer();
    const { error } = await supabase
      .schema('web')
      .from('applications')
      .insert({ job_id, name, email, phone, cv_url, cover_letter, consent });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (process.env.EMAIL_ENABLED === 'true') {
      // futuras integrações
    }

    return NextResponse.json({ ok: true, cv_uploaded: Boolean(cv_url) });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Erro inesperado' }, { status: 500 });
  }
}
