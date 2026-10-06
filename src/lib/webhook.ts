export const WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || '';

interface WebhookData {
  tipo: 'cliente' | 'candidatura' | 'recurso';
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
  // Campos de Cliente
  empresa?: string;
  localidade?: string;
  tipo_instalacao?: string;
  concelho?: string;
  nif?: string;
  numero_trabalhadores?: number | null;
  numero_estabelecimentos?: number | null;
  numero_extintores?: number | null;
  servico?: string;
  pagina?: string;
  url?: string;
  fonte?: string;
  resource_id?: string;
  company_sector?: string;
  service_key?: string;
  // Campos de Candidatura
  area_interesse?: string;
  cv_link?: string;
  origem?: string;
  job_id?: string;
  timestamp?: string;
}

export function formatSlackMessage(data: WebhookData) {
  const isCliente = data.tipo !== 'candidatura';
  const title = data.tipo === 'recurso' ? 'PEDIDO DE RECURSO' : isCliente ? '🔔 NOVO CONTACTO' : '📝 NOVA CANDIDATURA';
  const timestamp = new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' });

  const field = (label: string, value: unknown) => ({ type: 'plain_text', text: `${label}:\n${String(value || 'N/A').slice(0, 1900)}`, emoji: false } as { type: string; text: string; emoji?: boolean });
  const fields = [field('Nome',data.nome),field('Email',data.email),field('Telefone',data.telefone)];
  if (isCliente) {
    for (const [label,value] of Object.entries({ Empresa:data.empresa, Serviço:data.servico, Origem:data.fonte || data.pagina,
      'Tipo de instalação':data.tipo_instalacao || data.company_sector, Localidade:data.localidade, Concelho:data.concelho,
      'NIF indicado':data.nif, Trabalhadores:data.numero_trabalhadores, Estabelecimentos:data.numero_estabelecimentos,
      Extintores:data.numero_extintores, Recurso:data.resource_id, Página:data.pagina, URL:data.url })) {
      if (value) fields.push(field(label,value));
    }
  } else {
    fields.push(field('Área de Interesse',data.area_interesse),field('Origem',data.origem || data.pagina));
    if (data.job_id) fields.push(field('Vaga ID',data.job_id));
    if (data.cv_link) {
      try {
        const url = new URL(data.cv_link);
        if (!['https:','http:'].includes(url.protocol) || /[<>|\s]/.test(data.cv_link)) throw new Error();
        const privateCv = url.pathname.startsWith('/cv/');
        const label = privateCv ? 'Ver CV (ligação válida por 90 dias)' : `Ver CV: ${url.hostname} (Ligação externa não verificada)`;
        fields.push({ type:'mrkdwn', text:`<${data.cv_link.replace(/&/g,'&amp;')}|${label}>` });
      } catch { fields.push(field('CV','Ligação indisponível')); }
    }
  }

  return {
    text: title,
    unfurl_links: false,
    unfurl_media: false,
    parse: 'none',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: title,
          emoji: true
        }
      },
      ...Array.from({ length: Math.ceil(fields.length / 10) }, (_, index) => ({
        type: 'section',
        fields: fields.slice(index * 10, (index + 1) * 10),
      })),
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: `Mensagem:\n${(data.mensagem || 'Sem mensagem').slice(0, 2800)}`
        }
      },
      {
        type: 'context',
        elements: [
          {
            type: 'plain_text',
            text: `Recebido em: ${timestamp}`,
            emoji: true
          }
        ]
      }
    ]
  };
}

export async function sendSlackNotification(
  payload: ReturnType<typeof formatSlackMessage>,
  options: { fetcher?: typeof fetch; webhookUrl?: string; timeoutMs?: number } = {},
): Promise<'sent' | 'failed' | 'uncertain'> {
  const url = options.webhookUrl ?? WEBHOOK_URL;
  if (!url) return 'failed';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 5000);
  try {
    const response = await (options.fetcher ?? fetch)(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload), signal: controller.signal,
    });
    const body = await response.text();
    return response.ok && body.trim() === 'ok' ? 'sent' : response.status >= 500 ? 'uncertain' : 'failed';
  } catch {
    return 'uncertain';
  } finally { clearTimeout(timeout); }
}
