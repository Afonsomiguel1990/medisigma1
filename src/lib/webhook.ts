export const WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || '';

interface WebhookData {
  tipo: 'cliente' | 'candidatura';
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
  // Campos de Cliente
  empresa?: string;
  servico?: string;
  pagina?: string;
  url?: string;
  fonte?: string;
  // Campos de Candidatura
  area_interesse?: string;
  cv_link?: string;
  origem?: string;
  job_id?: string;
  timestamp?: string;
}

export function formatSlackMessage(data: WebhookData) {
  const isCliente = data.tipo === 'cliente';
  const title = isCliente ? '🔔 NOVO CONTACTO' : '📝 NOVA CANDIDATURA';
  const timestamp = new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' });

  const fields = [
    { type: 'mrkdwn', text: `*Nome:*\n${data.nome || 'N/A'}` },
    { type: 'mrkdwn', text: `*Email:*\n${data.email || 'N/A'}` },
    { type: 'mrkdwn', text: `*Telefone:*\n${data.telefone || 'N/A'}` }
  ];

  if (isCliente) {
    if (data.empresa && data.empresa !== data.nome) {
      fields.push({ type: 'mrkdwn', text: `*Empresa:*\n${data.empresa}` });
    }
    fields.push({ type: 'mrkdwn', text: `*Serviço:*\n${data.servico || 'N/A'}` });
    fields.push({ type: 'mrkdwn', text: `*Origem:*\n${data.fonte || data.pagina || 'N/A'}` });
  } else {
    fields.push({ type: 'mrkdwn', text: `*Área Interesse:*\n${data.area_interesse || 'N/A'}` });
    if (data.job_id) {
      fields.push({ type: 'mrkdwn', text: `*Vaga ID:*\n${data.job_id}` });
    }
    if (data.cv_link) {
      fields.push({ type: 'mrkdwn', text: `*CV:*\n<${data.cv_link}|Ver CV>` });
    }
    fields.push({ type: 'mrkdwn', text: `*Origem:*\n${data.origem || data.pagina || 'N/A'}` });
  }

  return {
    text: `${title} - ${data.nome}`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: title,
          emoji: true
        }
      },
      {
        type: 'section',
        fields: fields
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Mensagem:*\n${data.mensagem || 'Sem mensagem'}`
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
