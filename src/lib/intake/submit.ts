import { getSupabaseAdmin } from '../supabase';
import { validateLeadSubmission, LeadValidationError } from '../leads/validation';
import { HttpError, readBoundedBytes } from '../security/body';
import { requestIdentifiers } from '../security/identity';
import { triage } from '../security/triage';
import { intakeRpc, type IntakeReceipt } from './repository';
import { notifyIntake } from './notification';
import { validateCandidate, type CandidateKind } from './validation';
import { CV_BUCKET, CV_MAX_BYTES, CV_TYPES, sha256, validateCv, validateFileIntent, type FileIntent } from '../cv/validation';

function checkReceipt(receipt: IntakeReceipt) {
  if (receipt.state === 'conflict') throw new HttpError(409, 'O identificador já pertence a outro pedido.');
  if (receipt.state === 'limited') throw new HttpError(429, 'Demasiados pedidos. Tente novamente mais tarde.', receipt.retryAfter);
  if (!receipt.submissionId) throw new Error('Missing receipt');
  return receipt;
}
export async function receiveIntake(req: Request, input: { payload: { email: string }; [key: string]: unknown }) {
  const ids = await requestIdentifiers(req, input.payload.email);
  return checkReceipt(await intakeRpc<IntakeReceipt>('receive_public_submission', { p_input: input, p_ip_key: ids.ip, p_email_key: ids.email }));
}
export async function finishReceipt(receipt: IntakeReceipt) {
  console.info('intake_receipt', { submissionId:receipt.submissionId,state:receipt.state,duplicate:Boolean(receipt.duplicate) });
  if (receipt.state === 'accepted' && !receipt.legacy) {
    try { await notifyIntake(receipt.submissionId); }
    catch { console.warn('intake_notification_incomplete', { submissionId: receipt.submissionId }); }
  }
  if (receipt.validationStatus && !['valid', 'pending'].includes(receipt.validationStatus)) {
    throw new HttpError(422, 'O ficheiro ficou isolado para revisão. Envie um PDF, DOC ou DOCX válido, sem conteúdo ativo.');
  }
  return { status: 200, body: { ok: true, saved: true, duplicate: Boolean(receipt.duplicate), submission_id: receipt.submissionId,
    created_at: receipt.createdAt, status: 'received' } };
}
export async function submitPublicContact(req: Request, body: unknown) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new HttpError(400, 'Pedido inválido.');
  const raw = body as Record<string, unknown>;
  let payload;
  try { payload = validateLeadSubmission({ ...raw, confirm_mail: '' }); }
  catch (error) { if (error instanceof LeadValidationError) throw new HttpError(400, error.message); throw error; }
  if (!payload) throw new HttpError(400, 'Pedido inválido.');
  const input = { kind: 'contact', submissionId: payload.submissionId, payloadHash: payload.payloadHash, payload,
    ...triage('contact', { ...payload }, typeof raw.confirm_mail === 'string' && Boolean(raw.confirm_mail.trim())) };
  return finishReceipt(await receiveIntake(req, input));
}

export async function prepareCv(req: Request, body: Record<string, unknown>, kind: CandidateKind, file: FileIntent) {
  const input = validateCandidate(body, kind, file);
  const receipt = await receiveIntake(req, input);
  if (!receipt.uploadId || !receipt.objectPath) throw new HttpError(409, 'Este pedido não tem um upload associado.');
  return { input, receipt };
}
export async function authorizeCv(req: Request, body: Record<string, unknown>, kind: CandidateKind, file: FileIntent) {
  const { receipt } = await prepareCv(req, body, kind, file);
  if (receipt.state !== 'pending_upload') return { upload_id: receipt.uploadId, submission_id: receipt.submissionId, complete: true };
  if (!receipt.uploadExpiresAt || Date.parse(receipt.uploadExpiresAt) <= Date.now()) throw new HttpError(410, 'A autorização de upload expirou. Inicie um novo pedido.');
  const { data, error } = await getSupabaseAdmin().storage.from(CV_BUCKET).createSignedUploadUrl(receipt.objectPath!, { upsert: false });
  if (error || !data) throw new Error('Upload authorization unavailable');
  return { upload_id: receipt.uploadId, submission_id: receipt.submissionId, signed_url: data.signedUrl,
    content_type: CV_TYPES[file.extension], expires_at: receipt.uploadExpiresAt, complete: false };
}

export async function submitCandidate(req: Request, body: Record<string, unknown>, kind: CandidateKind, legacyFile?: File) {
  let file: FileIntent | undefined;
  let upload: { id: string; submission_id: string; payload_hash: string; object_path: string; extension: string; declared_size: number; content_hash: string } | null = null;
  let bytes: Uint8Array | undefined;
  if (typeof body.upload_id === 'string' && body.upload_id) {
    const { data, error } = await getSupabaseAdmin().schema('web').from('cv_uploads').select('id,submission_id,payload_hash,object_path,extension,declared_size,content_hash').eq('id', body.upload_id).maybeSingle();
    if (error || !data) throw new HttpError(400, 'Upload inválido.');
    upload = data;
    file = validateFileIntent({ extension: data.extension, size: data.declared_size, sha256: data.content_hash });
  } else if (legacyFile?.size) {
    if (legacyFile.size > CV_MAX_BYTES) throw new HttpError(413, 'O CV pode ter até 5 MB.');
    bytes = new Uint8Array(await legacyFile.arrayBuffer());
    file = validateFileIntent({ name: legacyFile.name, size: bytes.length, sha256: sha256(bytes) });
  }
  const input = validateCandidate(body, kind, file);
  if (upload && (upload.submission_id !== input.submissionId || upload.payload_hash !== input.payloadHash)) throw new HttpError(409, 'O upload pertence a outro pedido.');
  let receipt = await receiveIntake(req, input);
  if (receipt.state !== 'pending_upload') return finishReceipt(receipt);
  if (!file || !receipt.uploadId || !receipt.objectPath) throw new HttpError(400, 'Falta o CV.');
  if (bytes) {
    const result = await getSupabaseAdmin().storage.from(CV_BUCKET).upload(receipt.objectPath, bytes, { upsert: false, contentType: CV_TYPES[file.extension] });
    if (result.error) {
      // A preceding retry may already have stored this exact object. Validate the
      // existing bytes below; never overwrite or silently drop the attachment.
      bytes = undefined;
    }
  }
  if (!bytes) {
    const { data, error } = await getSupabaseAdmin().storage.from(CV_BUCKET).createSignedUrl(receipt.objectPath, 30);
    if (error || !data) throw new HttpError(503, 'O upload não está concluído. Tente novamente.');
    const response = await fetch(data.signedUrl, { cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new HttpError(503, 'O upload não está concluído. Tente novamente.');
    bytes = await readBoundedBytes(response, CV_MAX_BYTES);
  }
  const validation = await validateCv(bytes, file);
  receipt = await intakeRpc<IntakeReceipt>('complete_cv_upload', { p_submission_id: input.submissionId, p_payload_hash: input.payloadHash,
    p_upload_id: receipt.uploadId, p_validation: validation.status, p_code: validation.code });
  return finishReceipt(receipt);
}
