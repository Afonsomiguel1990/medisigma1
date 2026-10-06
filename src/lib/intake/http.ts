import { HttpError, readBoundedBytes, readBoundedJson, publicError } from '../security/body';
import { submitCandidate } from './submit';
import type { CandidateKind } from './validation';
import { countRejectedSubmission } from '../rate-limit';

const escape = (text: string) => text.replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]!));
export function candidateHandler(kind: CandidateKind) {
  return async (req: Request) => {
    const media = req.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
    const html = media !== 'application/json' && req.headers.get('accept')?.includes('text/html');
    let response: Response;
    try {
      let body: Record<string, unknown>;
      let file: File | undefined;
      if (media === 'application/json') body = await readBoundedJson(req);
      else if (media === 'multipart/form-data' || media === 'application/x-www-form-urlencoded') {
        const bytes = await readBoundedBytes(req, media === 'multipart/form-data' ? 4_400_000 : 64_000);
        const form = await new Request(req.url, { method:'POST', headers:{ 'Content-Type':req.headers.get('content-type')! }, body:bytes }).formData();
        body = {};
        let fieldBytes = 0;
        for (const [key, value] of form) {
          if (typeof value !== 'string') {
            if (!['cv','cv_file'].includes(key) || file) throw new HttpError(400, 'Anexo inválido.');
            if (value.size) file = value;
          } else { fieldBytes += new TextEncoder().encode(key + value).length; body[key] = value; }
        }
        if (fieldBytes > 64_000) throw new HttpError(413, 'Pedido demasiado grande.');
      } else throw new HttpError(415, 'Utilize JSON ou um formulário HTML.');
      const result = await submitCandidate(req, body, kind, file);
      response = Response.json(result.body, { status: result.status, headers: { 'Cache-Control':'no-store' } });
    } catch (error) { response = publicError(error); }
    response = await countRejectedSubmission(req,response.status) || response;
    if (!html) return response;
    const result = await response.json();
    const message = response.ok ? 'Recebemos a sua candidatura. Obrigado.' : result.error;
    return new Response(`<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Candidatura | Medisigma</title></head><body><main><h1>${response.ok ? 'Candidatura recebida' : 'Envio não concluído'}</h1><p role="status">${escape(message)}</p><p><a href="/recrutamento/">Voltar ao recrutamento</a></p></main></body></html>`, {
      status: response.status, headers: { 'Content-Type':'text/html; charset=utf-8', 'Cache-Control':'no-store', 'X-Robots-Tag':'noindex, nofollow', ...(response.headers.has('retry-after') ? { 'Retry-After':response.headers.get('retry-after')! } : {}) },
    });
  };
}
