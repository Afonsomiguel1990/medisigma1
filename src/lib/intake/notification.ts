import { formatSlackMessage, sendSlackNotification } from '../webhook';
import { intakeRpc } from './repository';
import { createCvLink } from '../cv/access';

export async function notifyIntake(id: string): Promise<void> {
  const claim = await intakeRpc<{ attemptId: string; kind: string; payload: Parameters<typeof formatSlackMessage>[0]; cvId?: string } | null>('claim_intake_notification', { p_id: id });
  if (!claim) return;
  let result: 'sent' | 'failed' | 'uncertain' = 'failed';
  try {
    const cvLink = claim.cvId ? (await createCvLink(claim.cvId)).url : claim.payload.cv_link;
    const message = formatSlackMessage({ ...claim.payload, tipo: claim.kind === 'contact' ? 'cliente' : 'candidatura',
      nome: claim.payload.nome || claim.payload.empresa || 'N/A', cv_link: cvLink });
    result = 'uncertain';
    result = await sendSlackNotification(message);
  } finally {
    await intakeRpc('complete_intake_notification', { p_id: id, p_attempt: claim.attemptId, p_status: result });
  }
}
