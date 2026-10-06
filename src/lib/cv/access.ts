import { randomBytes } from 'node:crypto';
import { intakeRpc } from '../intake/repository';
import { sha256, CV_BUCKET } from './validation';
import { siteOrigin } from '../security/origin';
import { getSupabaseAdmin } from '../supabase';
import { HttpError } from '../security/body';
import { UUID_PATTERN } from '../leads/validation';

export async function createCvLink(cvId: string, actor: string | null = null) {
  const token = randomBytes(32).toString('base64url');
  const record = await intakeRpc<{ id: string; expiresAt: string }>('create_cv_access_token', {
    p_cv_id: cvId, p_hash: sha256(token), p_actor: actor,
  });
  return { url: `${siteOrigin()}/cv/${cvId}#token=${token}`, expiresAt: record.expiresAt };
}
export async function signCvPath(path: string) {
  const { data, error } = await getSupabaseAdmin().storage.from(CV_BUCKET).createSignedUrl(path, 300, { download: `CV.${path.split('.').at(-1)}` });
  if (error || !data?.signedUrl) throw new Error('CV signing unavailable');
  return { url: data.signedUrl, expiresIn: 300 };
}
export async function accessCv(id: unknown, token: unknown) {
  if (typeof id !== 'string' || !UUID_PATTERN.test(id) || typeof token !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(token)) throw new HttpError(403, 'Ligação inválida ou expirada.');
  const path = await intakeRpc<string | null>('resolve_cv_access', { p_cv_id: id, p_hash: sha256(token) });
  if (!path) throw new HttpError(403, 'Ligação inválida ou expirada.');
  return signCvPath(path);
}
