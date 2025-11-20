import { NextResponse } from 'next/server';
import { getSupabaseAnon, getSupabaseServer, getSupabaseAdmin } from '@/lib/supabase';
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

    // Verificar Service Role
    const hasServiceRole = !!process.env.SUPABASE_SERVICE_ROLE;
    console.log('[DEBUG] Tem Service Role definida?', hasServiceRole);

    // Upload de ficheiro se existir
    if (cv_file && hasServiceRole) {
      console.log('[DEBUG] Iniciando upload de CV...');
      try {
        const supabaseAdmin = getSupabaseAdmin();
        const arrayBuffer = await cv_file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const path = `${Date.now()}_${encodeURIComponent(nome)}_${cv_file.name}`.replace(/\s+/g, '_');
        
        console.log('[DEBUG] Uploading to os-cv:', path);
        const upload = await supabaseAdmin.storage.from('os-cv').upload(path, buffer, {
          contentType: cv_file.type || 'application/octet-stream',
          upsert: false,
        });

        if (!upload.error) {
          const { data: publicUrlData } = supabaseAdmin.storage.from('os-cv').getPublicUrl(path);
          cv_link = publicUrlData.publicUrl;
          console.log('[DEBUG] Upload sucesso. URL:', cv_link);
        } else {
          console.error('[DEBUG] Erro upload CV:', upload.error);
        }
      } catch (uploadErr) {
        console.error('[DEBUG] Exceção no upload:', uploadErr);
      }
    } else if (cv_file && !hasServiceRole) {
        console.warn('[DEBUG] CV recebido mas sem Service Role configurada. Upload ignorado.');
    }

    console.log('[DEBUG] Tentando inserir na base de dados...');
    // Usamos o admin client (service role) explicitamente
    // IMPORTANTE: A service_role deve bypassar RLS automaticamente
    try {
        if (!process.env.SUPABASE_SERVICE_ROLE) {
          console.error('[DEBUG] ERRO CRÍTICO: SUPABASE_SERVICE_ROLE não está definida!');
          return NextResponse.json({ error: 'Configuração do servidor inválida' }, { status: 500 });
        }
        
        const supabaseAdmin = getSupabaseAdmin();
        console.log('[DEBUG] Cliente admin criado com sucesso');
        
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

        // Usar função SQL com SECURITY DEFINER para garantir permissões
        // A função está no schema 'web', mas o Supabase RPC procura no schema 'public' por padrão
        // Vamos tentar primeiro com o schema explícito, depois fallback para INSERT direto
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
            p_origem: origem || pagina || 'Candidatura Espontânea'
          });
          
          // Se RPC falhar, tentar INSERT direto (que agora deve funcionar com as permissões GRANT)
          if (insertResult.error && insertResult.error.code === '42883') {
            console.log('[DEBUG] Função RPC não encontrada, tentando INSERT direto...');
            insertResult = await supabaseAdmin
              .schema('web')
              .from('candidaturas')
              .insert(insertPayload);
          }
        } catch (rpcErr) {
          console.log('[DEBUG] Erro ao chamar RPC, tentando INSERT direto...', rpcErr);
          insertResult = await supabaseAdmin
            .schema('web')
            .from('candidaturas')
            .insert(insertPayload);
        }
        
        console.log('[DEBUG] Resultado inserção - Error:', insertResult.error);
        console.log('[DEBUG] Resultado inserção - Data:', insertResult.data);

        if (insertResult.error) {
          console.error('[DEBUG] Erro detalhado inserção:', JSON.stringify(insertResult.error, null, 2));
          return NextResponse.json({ error: `DB Error: ${insertResult.error.message} (${insertResult.error.code})` }, { status: 500 });
        }
    } catch (dbErr) {
        console.error('[DEBUG] Exceção na inserção DB:', dbErr);
        if (dbErr instanceof Error) {
          console.error('[DEBUG] Stack trace:', dbErr.stack);
        }
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
