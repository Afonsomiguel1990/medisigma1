import type { createLeadRepository } from './repository';
import { validateLeadSubmission, LeadValidationError } from './validation';
import { formatSlackMessage, sendSlackNotification } from '../webhook';
type Repository = Pick<ReturnType<typeof createLeadRepository>, 'acceptSubmission' | 'claimNotification' | 'completeNotification'>;
export async function submitLead(body: unknown, repository: Repository, notify = sendSlackNotification) {
  let lead;
  try { lead = validateLeadSubmission(body); }
  catch (error) {
    if (error instanceof LeadValidationError) return { status: 400, body: { ok: false, error: error.message } };
    throw error;
  }
  if (!lead) return { status: 200, body: { ok: true, saved: false } };
  let receipt;
  try { receipt = await repository.acceptSubmission(lead); }
  catch { return { status: 503, body: { ok: false, error: 'Não foi possível guardar o pedido. Tente novamente.' } }; }
  if (receipt.status === 'conflict') return { status: 409, body: { ok: false, error: 'O identificador já pertence a outro pedido.' } };
  let notificationStatus = receipt.notificationStatus;
  try {
    const claim = await repository.claimNotification(lead.submissionId);
    if (claim) {
      let delivery: 'sent' | 'failed' | 'uncertain' = 'uncertain';
      try {
        delivery = await notify(formatSlackMessage({ tipo: lead.leadKind === 'resource_request' ? 'recurso' : 'cliente', nome: lead.empresa || 'N/A', ...lead, resource_id: lead.resourceId, company_sector: lead.companySector, service_key: lead.serviceKey }));
      } catch { /* Delivery may have happened. Never retry automatically. */ }
      notificationStatus = delivery;
      await repository.completeNotification(lead.submissionId, claim.attemptId, delivery);
    }
  } catch { /* A saved lead remains successful even when notification fails. */ }
  return { status: 200, body: { ok: true, saved: true, duplicate: receipt.status === 'duplicate', submission_id: lead.submissionId, lead_kind: lead.leadKind, notification_status: notificationStatus, created_at: receipt.createdAt } };
}
