import { sanitizeAttribution } from '../analytics/attribution';
import { createHash, randomUUID } from 'node:crypto';
import type { LeadSubmission } from './types';
import { contactServiceKey, normalizeContactService } from '../contact';
export class LeadValidationError extends Error {}
export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const limits = { empresa: 200, nome: 200, localidade: 200, tipo_instalacao: 200, concelho: 200, nif: 9, telefone: 40, email: 254, servico: 200, mensagem: 2500, pagina: 200, url: 1500, fonte: 200 };
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
  if (fields.nif && !/^[0-9]{9}$/.test(fields.nif)) throw new LeadValidationError('Indique o NIF com 9 algarismos ou deixe o campo vazio.');
  const readCount = (key: string) => {
    const value = input[key];
    if (value === undefined || value === null || value === '' || (typeof value === 'string' && !value.trim())) return null;
    if (!['string', 'number'].includes(typeof value) || !/^[0-9]+$/.test(String(value).trim())) throw new LeadValidationError('Indique quantidades inteiras entre 1 e 1000000 ou deixe os campos vazios.');
    const count = Number(value);
    if (!Number.isSafeInteger(count) || count < 1 || count > 1000000) throw new LeadValidationError('Indique quantidades inteiras entre 1 e 1000000 ou deixe os campos vazios.');
    return count;
  };
  const counts = { numero_trabalhadores: readCount('numero_trabalhadores'), numero_estabelecimentos: readCount('numero_estabelecimentos'), numero_extintores: readCount('numero_extintores') };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) throw new LeadValidationError('Indique um email válido.');
  const leadKind = input.lead_kind ?? 'service_request';
  if (leadKind !== 'service_request' && leadKind !== 'resource_request') throw new LeadValidationError('Tipo de pedido inválido.');
  if (leadKind === 'service_request' && (!fields.empresa || !fields.servico)) throw new LeadValidationError('Indique a empresa e o serviço pretendido.');
  const suppliedServiceKey = read('service_key', 120);
  const serviceKey = contactServiceKey(fields.servico) || suppliedServiceKey;
  const companySector = fields.tipo_instalacao || read('company_sector', 200);
  const resourceId = read('resource_id', 120);
  if (leadKind === 'resource_request' && !resourceId) throw new LeadValidationError('Recurso inválido.');
  // Attribution and timestamps are deliberately excluded from the stable intent hash.
  const hashFields = [fields.empresa, fields.telefone, fields.email, fields.servico, fields.mensagem, fields.pagina, fields.url, fields.fonte, leadKind, suppliedServiceKey, read('company_sector', 200), resourceId];
  // Preserve receipts from older clients when no new contact details are present.
  if (fields.nome || fields.localidade || fields.tipo_instalacao) hashFields.push(fields.nome, fields.localidade, fields.tipo_instalacao);
  if (fields.concelho || fields.nif || Object.values(counts).some(value => value !== null)) hashFields.push(JSON.stringify({ concelho: fields.concelho, nif: fields.nif, ...counts }));
  const payloadHash = createHash('sha256').update(JSON.stringify(hashFields)).digest('hex');
  fields.servico = normalizeContactService(fields.servico);
  return { submissionId, payloadHash, leadKind, ...fields, ...counts, serviceKey, companySector, resourceId, attribution: sanitizeAttribution(input.attribution) };
}
