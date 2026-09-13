import { getSupabaseAdmin } from '../supabase';
import type { ClickReceipt, ContactClickInput, LeadAnalytics, LeadSubmission, NotificationStatus, SubmissionReceipt } from './types';

export interface RpcAdapter {
  rpc(name: string, args: Record<string, unknown>): PromiseLike<{ data: unknown; error: unknown }>;
}

// Never fall back to an anonymous client for the operational tables.
export function createLeadRepository(adapter?: RpcAdapter) {
  const client = () => adapter ?? getSupabaseAdmin().schema('web');
  async function call<T>(name: string, args: Record<string, unknown>): Promise<T> {
    const { data, error } = await client().rpc(name, args);
    if (error) throw new Error(`Lead repository operation failed: ${name}`);
    return data as T;
  }
  return {
    acceptSubmission: (input: LeadSubmission) => call<SubmissionReceipt>('submit_lead', { p_input: input }),
    claimNotification: (submissionId: string) => call<{ attemptId: string } | null>('claim_lead_notification', { p_submission_id: submissionId }),
    completeNotification: (submissionId: string, attemptId: string, status: Extract<NotificationStatus, 'sent' | 'failed' | 'uncertain'>) =>
      call<boolean>('complete_lead_notification', { p_submission_id: submissionId, p_attempt_id: attemptId, p_status: status }),
    recordContactClick: (input: ContactClickInput) => call<ClickReceipt>('record_contact_click', { p_input: input }),
    getAnalytics: (from: string, to: string) => call<LeadAnalytics>('get_lead_analytics', { p_from: from, p_to: to }),
  };
}
export type LeadRepository = ReturnType<typeof createLeadRepository>;
