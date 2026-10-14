import { getCurrentAttribution, trackSavedLead } from '../analytics/client';
import { CONTACT_SERVICES, contactServiceKey } from '../contact';
export interface SubmissionIntent { signature?: string; submissionId?: string }
export interface SavedLeadReceipt {
  ok: true; saved: boolean; duplicate?: boolean; submission_id?: string;
  lead_kind?: 'service_request' | 'resource_request'; notification_status?: string;
  analytics_eligible?: boolean;
  download_expired?: boolean;
}
const intentKeys = ['empresa', 'nome', 'localidade', 'tipo_instalacao', 'concelho', 'nif', 'numero_trabalhadores', 'numero_estabelecimentos', 'numero_extintores', 'telefone', 'email', 'servico', 'mensagem', 'pagina', 'url', 'fonte', 'lead_kind', 'service_key', 'company_sector', 'resource_id'];
export async function submitContactIntent(
  payload: Record<string, unknown>, intent: SubmissionIntent,
  onSaved?: (receipt: SavedLeadReceipt) => void,
  fetcher: typeof fetch = fetch,
): Promise<SavedLeadReceipt> {
  const signature = JSON.stringify(intentKeys.map(key => payload[key] ?? ''));
  if (signature !== intent.signature || !intent.submissionId) {
    intent.signature = signature;
    intent.submissionId = crypto.randomUUID();
  }
  let attribution: Record<string, unknown> = { status: 'unknown' };
  try { attribution = getCurrentAttribution(); } catch { /* Optional analytics must never prevent the POST. */ }
  const response = await fetcher('/api/contact', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, attribution, submission_id: intent.submissionId }),
  });
  const receipt = await response.json().catch(() => null) as (SavedLeadReceipt & { error?: string }) | null;
  const expiredSavedResource = response.status === 410 && payload.lead_kind === 'resource_request' && receipt?.saved === true && receipt.download_expired === true && receipt.lead_kind === 'resource_request';
  if (!response.ok && !expiredSavedResource && typeof receipt?.error === 'string') throw new Error(receipt.error);
  if ((!response.ok && !expiredSavedResource) || !receipt || receipt.ok !== true || typeof receipt.saved !== 'boolean') throw new Error('Não foi possível confirmar o pedido.');
  if (receipt.saved && receipt.submission_id !== intent.submissionId) throw new Error('Não foi possível confirmar o pedido.');
  // Analytics must never change a successful submission into a user-facing error.
  if (receipt.saved) { try {
    if (receipt.submission_id && !receipt.duplicate && receipt.analytics_eligible !== false) trackSavedLead(receipt.submission_id,
      receipt.lead_kind || (payload.lead_kind === 'resource_request' ? 'resource_request' : 'service_request'),
      contactServiceKey(typeof payload.servico === 'string' ? payload.servico : '') || (typeof payload.service_key === 'string' ? payload.service_key : undefined));
  } catch { /* Analytics must not affect submission. */ } try { onSaved?.(receipt); } catch { /* Optional analytics. */ } }
  return receipt;
}
export function serviceKeyFromLabel(label: string, pathname = '') {
  const pathKey = pathname.match(/^\/servicos\/([a-z-]+)\/?$/)?.[1];
  if (pathKey && CONTACT_SERVICES.some(service => service.key === pathKey)) return pathKey;
  const normalized = label.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
  return contactServiceKey(label) || CONTACT_SERVICES.find(service => service.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() === normalized)?.key || '';
}
