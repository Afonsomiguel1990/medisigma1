import { requireAdminAuth } from '@/lib/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase';
import { readBoundedJson, publicError, HttpError } from '@/lib/security/body';
import { createCvLink, signCvPath } from '@/lib/cv/access';
import { intakeRpc } from '@/lib/intake/repository';
import { UUID_PATTERN } from '@/lib/leads/validation';
type Context = { params: Promise<{ id:string }> };
export const dynamic = 'force-dynamic';
export async function GET(req: Request, context: Context) {
  const denied = await requireAdminAuth(req); if (denied) return denied;
  try {
    const { id } = await context.params;
    if (!UUID_PATTERN.test(id)) throw new HttpError(404, 'CV não encontrado.');
    const client = getSupabaseAdmin().schema('web');
    const { data, error } = await client.from('cv_uploads').select('object_path,validation_status').eq('id',id).maybeSingle();
    if (error || !data) throw new HttpError(404, 'CV não encontrado.');
    if (data.validation_status !== 'valid') throw new HttpError(422, 'Este ficheiro está isolado e não está disponível para consulta.');
    const tokens = await client.from('cv_access_tokens').select('id,created_at,expires_at,revoked_at').eq('cv_id',id).order('created_at',{ascending:false});
    if (tokens.error) throw new Error('Tokens unavailable');
    return Response.json({ ...await signCvPath(data.object_path), tokens:tokens.data }, { headers:{ 'Cache-Control':'no-store','Referrer-Policy':'no-referrer' } });
  } catch (error) { return publicError(error); }
}
export async function POST(req: Request, context: Context) {
  const denied = await requireAdminAuth(req); if (denied) return denied;
  try {
    const { id } = await context.params;
    if (!UUID_PATTERN.test(id)) throw new HttpError(404, 'CV não encontrado.');
    const body = await readBoundedJson(req,2048);
    const actor = process.env.ADMIN_USERNAME || 'admin';
    if (body.action === 'create') return Response.json(await createCvLink(id,actor), { headers:{ 'Cache-Control':'no-store' } });
    if (body.action !== 'revoke' || (body.token_id && (typeof body.token_id !== 'string' || !UUID_PATTERN.test(body.token_id)))) throw new HttpError(400,'Ação inválida.');
    await intakeRpc('revoke_cv_access_tokens', { p_cv_id:id, p_actor:actor, p_token_id:body.token_id || null });
    return Response.json({ ok:true }, { headers:{ 'Cache-Control':'no-store' } });
  } catch (error) { return publicError(error); }
}
