import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { WEBHOOK_URL, formatSlackMessage } from '@/lib/webhook';
import { rateLimit } from '@/lib/rate-limit';
import { buildStoragePath, validateCvFile } from '@/lib/upload-validation';

const MAX_TEXT_LENGTH = 2000;

function cleanText(value: unknown, maxLength = MAX_TEXT_LENGTH) {
  return (value ?? '').toString().trim().slice(0, maxLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function isValidExternalUrl(value: string) {
  if (!value) return true;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const limitError = rateLimit(req, 'spontaneous-applications', 10, 60 * 60 * 1000);
  if (limitError) return limitError;

  try {
    let nome = '';
    let email = '';
    let telefone = '';
    let area_interesse = '';
    let cv_link = '';
    let mensagem = '';
    let pagina = '';
    let url = '';
    let origem = '';
    let cv_file: File | null = null;

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const body = await req.json().catch(() => ({}));
      nome = cleanText(body.nome, 200);
      email = cleanText(body.email, 254);
      telefone = cleanText(body.telefone, 80);
      area_interesse = cleanText(body.area_interesse, 200);
      cv_link = cleanText(body.cv_link, 1000);
      mensagem = cleanText(body.mensagem);
      pagina = cleanText(body.pagina, 300);
      url = cleanText(body.url, 1000);
      origem = cleanText(body.origem, 200);
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      nome = cleanText(formData.get('nome'), 200);
      email = cleanText(formData.get('email'), 254);
      telefone = cleanText(formData.get('telefone'), 80);
      area_interesse = cleanText(formData.get('area_interesse'), 200);
      cv_link = cleanText(formData.get('cv_link'), 1000);
      mensagem = cleanText(formData.get('mensagem'));
      pagina = cleanText(formData.get('pagina'), 300);
      url = cleanText(formData.get('url'), 1000);
      origem = cleanText(formData.get('origem'), 200);
      cv_file = formData.get('cv') as File | null;
    }

    if (!nome || !isValidEmail(email) || !telefone) {
      return NextResponse.json(
        { error: 'Nome, email valido e telefone sao obrigatorios.' },
        { status: 400 }
      );
    }

    if (!isValidExternalUrl(cv_link) || !isValidExternalUrl(url)) {
      return NextResponse.json({ error: 'URL invalido.' }, { status: 400 });
    }

    const hasServiceRole = Boolean(process.env.SUPABASE_SERVICE_ROLE);

    if (cv_file && hasServiceRole) {
      const cvValidationError = validateCvFile(cv_file);
      if (cvValidationError) {
        return NextResponse.json({ error: cvValidationError }, { status: 400 });
      }

      try {
        const supabaseAdmin = getSupabaseAdmin();
        const arrayBuffer = await cv_file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const path = buildStoragePath('spontaneous-applications', cv_file.name, nome);
        const upload = await supabaseAdmin.storage.from('os-cv').upload(path, buffer, {
          contentType: cv_file.type || 'application/octet-stream',
          upsert: false,
        });

        if (!upload.error) {
          const { data: publicUrlData } = supabaseAdmin.storage.from('os-cv').getPublicUrl(path);
          cv_link = publicUrlData.publicUrl;
        } else {
          console.error('Erro upload CV:', upload.error);
        }
      } catch (uploadErr) {
        console.error('Excecao no upload CV:', uploadErr);
      }
    } else if (cv_file && !hasServiceRole) {
      console.warn('CV recebido mas sem Service Role configurada. Upload ignorado.');
    }

    try {
      if (!process.env.SUPABASE_SERVICE_ROLE) {
        console.error('SUPABASE_SERVICE_ROLE nao esta definida.');
        return NextResponse.json({ error: 'Configuracao do servidor invalida' }, { status: 500 });
      }

      const supabaseAdmin = getSupabaseAdmin();
      const insertPayload = {
        nome,
        email,
        telefone,
        area_interesse,
        cv_link,
        mensagem,
        pagina,
        url,
        origem: origem || pagina || 'Candidatura Espontanea',
      };

      let insertResult;
      try {
        insertResult = await supabaseAdmin.rpc('insert_candidatura', {
          p_nome: nome,
          p_email: email,
          p_telefone: telefone,
          p_area_interesse: area_interesse || null,
          p_cv_link: cv_link || null,
          p_mensagem: mensagem || null,
          p_pagina: pagina || null,
          p_url: url || null,
          p_origem: origem || pagina || 'Candidatura Espontanea',
        });

        if (insertResult.error && insertResult.error.code === '42883') {
          insertResult = await supabaseAdmin
            .schema('web')
            .from('candidaturas')
            .insert(insertPayload);
        }
      } catch (rpcErr) {
        console.warn('Erro ao chamar RPC, tentando INSERT direto...', rpcErr);
        insertResult = await supabaseAdmin
          .schema('web')
          .from('candidaturas')
          .insert(insertPayload);
      }

      if (insertResult.error) {
        console.error('Erro insercao candidatura espontanea:', insertResult.error);
        return NextResponse.json({ error: 'Erro ao guardar candidatura.' }, { status: 500 });
      }
    } catch (dbErr) {
      console.error('Excecao na insercao DB:', dbErr);
      throw dbErr;
    }

    try {
      if (WEBHOOK_URL) {
        const slackMessage = formatSlackMessage({
          tipo: 'candidatura',
          nome,
          email,
          telefone,
          mensagem,
          area_interesse,
          cv_link,
          pagina,
          origem: origem || pagina || 'Candidatura Espontanea',
        });

        const slackResponse = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slackMessage),
        });

        if (!slackResponse.ok) {
          const errorText = await slackResponse.text().catch(() => 'Erro desconhecido');
          console.error('Slack retornou erro:', slackResponse.status, errorText);
        }
      }
    } catch (notifyError) {
      console.error('Falha ao notificar Slack:', notifyError);
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error('Erro fatal no handler de candidatura espontanea:', error);
    return NextResponse.json({ error: 'Erro inesperado.' }, { status: 500 });
  }
}
