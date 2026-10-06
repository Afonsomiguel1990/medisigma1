import { requireAdminAuth } from '@/lib/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase';
import { readBoundedJson, publicError, HttpError } from '@/lib/security/body';
import { intakeRpc, type IntakeReceipt } from '@/lib/intake/repository';
import { notifyIntake } from '@/lib/intake/notification';
import { UUID_PATTERN } from '@/lib/leads/validation';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  const denied = await requireAdminAuth(req); if (denied) return denied;
  try {
    const url = new URL(req.url);
    const offset = Math.max(0, Math.min(1000000, Number(url.searchParams.get('offset')) || 0));
    const client = getSupabaseAdmin().schema('web');
    const { data, error, count } = await client.from('public_intake')
      .select('submission_id,kind,payload,state,suspected,reasons,rules_version,mode_at_receipt,notification_status,created_at,cv_uploads(id,validation_status,validation_code),intake_reviews(action,actor,previous_state,created_at)', { count:'exact' })
      .or('suspected.eq.true,state.eq.held,state.eq.spam').order('created_at', { ascending:false }).range(offset,offset+49);
    const settings = await client.from('intake_settings').select('mode,observation_started_at,enforcement_enabled_at').single();
    if (error || settings.error) throw new Error('Intake unavailable');
    return Response.json({ items:data, total:count, settings:settings.data }, { headers:{ 'Cache-Control':'no-store' } });
  } catch (error) { return publicError(error); }
}
export async function POST(req: Request) {
  const denied = await requireAdminAuth(req); if (denied) return denied;
  try {
    const body = await readBoundedJson(req, 2048);
    if (typeof body.id !== 'string' || !UUID_PATTERN.test(body.id) || !['accept','spam'].includes(String(body.action))) throw new HttpError(400, 'Revisão inválida.');
    const receipt = await intakeRpc<IntakeReceipt>('review_public_submission', { p_id:body.id, p_action:body.action, p_actor:process.env.ADMIN_USERNAME || 'admin' });
    if (receipt.state === 'accepted' && body.action === 'accept') {
      try { await notifyIntake(body.id); } catch { /* Visible delivery status remains pending or uncertain. */ }
    }
    return Response.json({ ok:true }, { headers:{ 'Cache-Control':'no-store' } });
  } catch (error) { return publicError(error); }
}
