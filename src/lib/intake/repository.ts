import { getSupabaseAdmin } from '../supabase';
export async function intakeRpc<T>(name: string, args: Record<string, unknown>): Promise<T> {
  const { data, error } = await getSupabaseAdmin().schema('web').rpc(name, args);
  if (error) throw new Error('Intake operation unavailable');
  return data as T;
}
export interface IntakeReceipt {
  submissionId: string; state: 'accepted' | 'held' | 'spam' | 'received' | 'pending_upload' | 'conflict' | 'limited';
  duplicate?: boolean; legacy?: boolean; createdAt?: string; notificationStatus?: string;
  uploadId?: string; objectPath?: string; uploadExpiresAt?: string; validationStatus?: string; retryAfter?: number;
}
