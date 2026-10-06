'use client';
export interface CandidateAttempt { id: string; intent: string; uploadId?: string }
export async function sendCandidate(kind: 'spontaneous' | 'application', fields: Record<string, unknown>, file: File | null,
  attempt: { current: CandidateAttempt | null }) {
  let fileInfo;
  if (file) {
    if (!file.size || file.size > 5 * 1024 * 1024) throw new Error('O CV pode ter até 5 MB.');
    const hash = await crypto.subtle.digest('SHA-256', await file.arrayBuffer());
    fileInfo = { name:file.name, size:file.size, sha256:[...new Uint8Array(hash)].map(b => b.toString(16).padStart(2,'0')).join('') };
  }
  const intent = JSON.stringify({ kind, fields, file:fileInfo });
  if (!attempt.current || attempt.current.intent !== intent) attempt.current = { id:crypto.randomUUID(), intent };
  const current = attempt.current;
  const submission = { ...fields, submission_id:current.id };
  if (file && fileInfo) {
    const authorization = await fetch('/api/cv/uploads', {
      method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify({ kind, submission, file:fileInfo }),
    });
    const auth = await authorization.json();
    if (!authorization.ok) {
      if (authorization.status === 410) attempt.current = null;
      throw new Error(auth.error || 'Não foi possível preparar o upload. Tente novamente.');
    }
    current.uploadId = auth.upload_id;
    if (!auth.complete) {
      const uploaded = await fetch(auth.signed_url, { method:'PUT', headers:{ 'Content-Type':auth.content_type, 'x-upsert':'false' }, body:file });
      if (!uploaded.ok) {
        const error = await uploaded.json().catch(() => ({}));
        // Storage may have received the previous attempt before its reply was lost.
        // The final endpoint checks the stored hash before accepting this retry.
        if (uploaded.status !== 409 && !['409','Duplicate'].includes(String(error.statusCode || error.error))) throw new Error('O upload não foi concluído. Tente novamente.');
      }
    }
  }
  const response = await fetch(kind === 'spontaneous' ? '/api/spontaneous-applications' : '/api/applications', {
    method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify({ ...submission, ...(current.uploadId ? { upload_id:current.uploadId } : {}) }),
  });
  const result = await response.json();
  if (!response.ok || !result.saved) throw new Error(result.error || 'Não foi possível confirmar a candidatura. Tente novamente.');
  attempt.current = null;
  return result;
}
