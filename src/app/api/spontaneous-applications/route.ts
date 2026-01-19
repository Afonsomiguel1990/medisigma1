import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase';
import { WEBHOOK_URL, formatSlackMessage } from '@/lib/webhook';

export async function POST(req: Request) {
  console.log('[DEBUG] Início do processamento de candidatura espontânea');
  try {
    let nome, email, telefone, area_interesse, cv_link, mensagem, pagina, url, origem;
    let cv_file: File | null = null;

    const contentType = req.headers.get('content-type') || '';
    console.log('[DEBUG] Content-Type:', contentType);

    if (contentType.includes('application/json')) {
      const body = await req.json().catch(() => ({}));
      nome = (body.nome ?? '').toString();
      email = (body.email ?? '').toString();
      telefone = (body.telefone ?? '').toString();
      area_interesse = (body.area_interesse ?? '').toString();
      cv_link = (body.cv_link ?? '').toString();
      mensagem = (body.mensagem ?? '').toString();
      pagina = (body.pagina ?? '').toString();
      url = (body.url ?? '').toString();
      origem = (body.origem ?? '').toString();
      console.log('[DEBUG] Dados JSON recebidos:', { nome, email });
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      nome = (formData.get('nome') ?? '').toString();
      email = (formData.get('email') ?? '').toString();
      telefone = (formData.get('telefone') ?? '').toString();
      area_interesse = (formData.get('area_interesse') ?? '').toString();
      cv_link = (formData.get('cv_link') ?? '').toString();
      mensagem = (formData.get('mensagem') ?? '').toString();
      pagina = (formData.get('pagina') ?? '').toString();
      url = (formData.get('url') ?? '').toString();
      origem = (formData.get('origem') ?? '').toString();
      cv_file = formData.get('cv') as File | null;
      console.log('[DEBUG] Dados FormData recebidos:', { nome, email, temCv: !!cv_file });
    }

    if (!nome || !email || !telefone) {
      console.log('[DEBUG] Campos obrigatórios em falta');
      return NextResponse.json(
        { error: 'Nome, email e telefone são obrigatórios.' },
        { status: 400 }
      );
    }

    // Upload de ficheiro se existir
    if (cv_file) {
      console.log('[DEBUG] Iniciando upload de CV...');
      try {
        const supabase = getSupabaseServer();
        const arrayBuffer = await cv_file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const sanitize = (str: string) => str.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const path = `${Date.now()}_${sanitize(nome)}_${sanitize(cv_file.name)}`;

        console.log('[DEBUG] Uploading to os-cv:', path);
        const upload = await supabase.storage.from('os-cv').upload(path, buffer, {
          contentType: cv_file.type || 'application/octet-stream',
          upsert: false,
        });

        if (!upload.error) {
          const { data: publicUrlData } = supabase.storage.from('os-cv').getPublicUrl(path);
          cv_link = publicUrlData.publicUrl;
          console.log('[DEBUG] Upload sucesso. URL:', cv_link);
        } else {
          console.error('[DEBUG] Erro upload CV:', upload.error);
        }
      } catch (uploadErr) {
        console.error('[DEBUG] Exceção no upload:', uploadErr);
      }
    }

    console.log('[DEBUG] Tentando inserir na base de dados...');
    try {
      const supabase = getSupabaseServer();
      console.log('[DEBUG] Cliente Supabase obtido');

      const insertPayload = {
        nome,
        email,
        telefone,
        area_interesse,
        cv_link,
        mensagem,
        pagina,
        url,
        origem: origem || pagina || 'Candidatura Espontânea',
      };
      console.log('[DEBUG] Payload inserção:', JSON.stringify(insertPayload, null, 2));

      // Tentar usar RPC primeiro (pode ser SECURITY DEFINER)
      let insertResult;
      try {
        insertResult = await supabase.rpc('insert_candidatura', {
          p_nome: nome,
          p_email: email,
          p_telefone: telefone,
          p_area_interesse: area_interesse || null,
          p_cv_link: cv_link || null,
          p_mensagem: mensagem || null,
          p_pagina: pagina || null,
          p_url: url || null,
          p_origem: insertPayload.origem
        });

        // Se falhar porque a função não foi encontrada ou permissão negada, tenta INSERT direto
        if (insertResult.error) {
          console.log(`[DEBUG] RPC falhou (${insertResult.error.code}), tentando INSERT direto...`);
          insertResult = await supabase
            .schema('web')
            .from('candidaturas')
            .insert(insertPayload)
            .select()
            .single();
        }
      } catch (rpcErr) {
        console.log('[DEBUG] Exceção ao chamar RPC, tentando INSERT direto...', rpcErr);
        insertResult = await supabase
          .schema('web')
          .from('candidaturas')
          .insert(insertPayload)
          .select()
          .single();
      }

      if (insertResult.error) {
        console.error('[DEBUG] Erro final na inserção DB:', JSON.stringify(insertResult.error, null, 2));
        return NextResponse.json({ error: `DB Error: ${insertResult.error.message}` }, { status: 500 });
      }

      console.log('[DEBUG] Inserção concluída com sucesso');
    } catch (dbErr) {
      console.error('[DEBUG] Exceção no fluxo DB:', dbErr);
      throw dbErr;
    }

    try {
      if (!WEBHOOK_URL) {
        console.warn('[DEBUG] SLACK_WEBHOOK_URL não está configurada. Notificação Slack ignorada.');
      } else {
        console.log('[DEBUG] Notificando Slack...');
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

        const slackResponse = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slackMessage),
        });

        if (!slackResponse.ok) {
          const errorText = await slackResponse.text().catch(() => 'Erro desconhecido');
          console.error('[DEBUG] Slack retornou erro:', slackResponse.status, errorText);
        } else {
          console.log('[DEBUG] Slack notificado com sucesso.');
        }
      }
    } catch (notifyError) {
      console.error('[DEBUG] Falha ao notificar Slack:', notifyError);
      // Não falhar a request original se o Slack falhar
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error('[DEBUG] Erro fatal no handler:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado.' },
      { status: 500 }
    );
  }
}
