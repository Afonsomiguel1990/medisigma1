import { randomUUID } from 'node:crypto';
import { HttpError } from '../security/body';
import { externalDocumentUrl } from '../security/origin';
import { UUID_PATTERN } from '../leads/validation';
import { sha256, type FileIntent } from '../cv/validation';
import { triage } from '../security/triage';

export type CandidateKind = 'spontaneous' | 'application';
export function validateCandidate(body: Record<string, unknown>, kind: CandidateKind, file?: FileIntent) {
  const read = (key: string, max: number, alternate?: string) => {
    const value = body[key] ?? (alternate ? body[alternate] : '') ?? '';
    if (typeof value !== 'string' || value.length > max) throw new HttpError(400, 'Verifique os campos do formulário.');
    return value.trim();
  };
  const submissionId = read('submission_id', 36).toLowerCase() || randomUUID();
  if (!UUID_PATTERN.test(submissionId) || (body.upload_id && !body.submission_id)) throw new HttpError(400, 'Identificador do pedido inválido.');
  const payload = {
    nome: read('nome', 200, 'name'), email: read('email', 254), telefone: read('telefone', 40, 'phone'),
    mensagem: read('mensagem', 2500, 'cover_letter'), area_interesse: read('area_interesse', 200),
    pagina: read('pagina', 200), url: read('url', 1500), origem: read('origem', 200),
    job_id: read('job_id', 200), cv_link: file ? '' : read('cv_link', 1500),
  };
  if (!payload.nome || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || (kind === 'spontaneous' && !payload.telefone)) {
    throw new HttpError(400, kind === 'spontaneous' ? 'Nome, email e telefone são obrigatórios.' : 'Nome e email são obrigatórios.');
  }
  if (payload.cv_link) {
    try { payload.cv_link = externalDocumentUrl(payload.cv_link); }
    catch { throw new HttpError(400, 'Indique uma ligação HTTPS pública para o CV ou perfil profissional.'); }
  }
  payload.origem ||= kind === 'application' ? 'Candidatura a Vaga' : payload.pagina || 'Candidatura Espontânea';
  if (kind === 'application') payload.area_interesse ||= payload.job_id ? `Vaga: ${payload.job_id}` : 'Candidatura a Vaga';
  const payloadHash = sha256(JSON.stringify({ kind, payload, file: file || null }));
  return { submissionId, payloadHash, kind, payload, file, ...triage(kind, payload, Boolean(read('confirm_mail', 200))) };
}
