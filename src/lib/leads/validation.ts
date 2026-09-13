import { sanitizeAttribution } from '../analytics/attribution';
import { createHash, randomUUID } from 'node:crypto';
import type { LeadSubmission } from './types';
export class LeadValidationError extends Error {}
export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const limits = { empresa: 200, telefone: 40, email: 254, servico: 200, mensagem: 2500, pagina: 200, url: 1500, fonte: 200 };
export function validateLeadSubmission(body: unknown): LeadSubmission | null {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new LeadValidationError('Pedido inválido.');
  const input = body as Record<string, unknown>;
  if (typeof input.confirm_mail === 'string' && input.confirm_mail.trim()) return null;
  const read = (key: string, max: number) => {
    const value = input[key] ?? '';
    if (typeof value !== 'string' || value.length > max) throw new LeadValidationError('Verifique os campos do formulário.');
    return value.trim();
  };
  const submissionId = read('submission_id', 36).toLowerCase() || (input.lead_kind !== 'resource_request' ? randomUUID() : '');
  if (!UUID_PATTERN.test(submissionId)) throw new LeadValidationError('Identificador do pedido inválido.');
  const fields = Object.fromEntries(Object.entries(limits).map(([key, max]) => [key, read(key, max)])) as Record<keyof typeof limits, string>;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) throw new LeadValidationError('Indique um email válido.');
  const leadKind = input.lead_kind ?? 'service_request';
  if (leadKind !== 'service_request' && leadKind !== 'resource_request') throw new LeadValidationError('Tipo de pedido inválido.');
  const serviceKey = read('service_key', 120);
  const companySector = read('company_sector', 200);
  const resourceId = read('resource_id', 120);
  if (leadKind === 'resource_request' && !resourceId) throw new LeadValidationError('Recurso inválido.');
  // Attribution and timestamps are deliberately excluded from the stable intent hash.
  const payloadHash = createHash('sha256').update(JSON.stringify([fields.empresa, fields.telefone, fields.email, fields.servico, fields.mensagem, fields.pagina, fields.url, fields.fonte, leadKind, serviceKey, companySector, resourceId])).digest('hex');
  return { submissionId, payloadHash, leadKind, ...fields, serviceKey, companySector, resourceId, attribution: sanitizeAttribution(input.attribution) };
}
