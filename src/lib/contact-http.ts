import { rateLimitRequest } from './rate-limit';
import { MEDISIGMA } from './organization';

type SubmissionResult = { status: number; body: { ok: boolean; saved?: boolean; error?: string } };
type Submit = (body: unknown) => Promise<SubmissionResult>;
type Limiter = (req: Request) => Response | null;
const MAX_BODY_BYTES = 64_000;
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]!));

async function readBody(req: Request) {
  const reader = req.body?.getReader();
  if (!reader) return '';
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new RangeError('Pedido demasiado longo.');
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder().decode(bytes);
}

export async function handleContactRequest(req: Request, submit: Submit,
  limiter: Limiter = request => rateLimitRequest(request, { key: 'contact', limit: 5, windowMs: 10 * 60 * 1000 }),
) {
  const contentType = req.headers.get('content-type') || '';
  const mediaType = contentType.split(';')[0].trim().toLowerCase();
  const isForm = ['application/x-www-form-urlencoded', 'multipart/form-data'].includes(mediaType);
  const wantsHtml = isForm && (req.headers.get('accept') || '').includes('text/html');
  function respond(result: SubmissionResult, extraHeaders?: HeadersInit) {
    const headers = new Headers(extraHeaders);
    headers.set('Cache-Control', 'no-store');
    if (!wantsHtml) return Response.json(result.body, { status: result.status, headers });
    if (result.body.saved) {
      headers.set('Location', new URL('/contact/?enviado=1#contact-form', req.url).href);
      return new Response(null, { status: 303, headers });
    }
    const message = result.body.error || 'Não foi possível confirmar o pedido. Verifique os campos e tente novamente.';
    headers.set('Content-Type', 'text/html; charset=utf-8');
    headers.set('X-Robots-Tag', 'noindex, nofollow');
    const html = `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Contacto | Medisigma</title></head><body><main style="max-width:42rem;margin:4rem auto;padding:1rem;font:1.1rem/1.6 system-ui"><h1>Não foi possível concluir o envio</h1><p role="alert">${escapeHtml(message)}</p><p><a href="/contact/#contact-form">Voltar ao formulário</a></p><p>Também pode contactar-nos através de <a href="mailto:${MEDISIGMA.email}">${MEDISIGMA.email}</a> ou <a href="tel:${MEDISIGMA.telephoneHref}">${MEDISIGMA.telephone}</a>.</p></main></body></html>`;
    return new Response(html, { status: result.status, headers });
  }
  const limited = limiter(req);
  if (limited) return respond({ status: 429, body: { ok: false, error: 'Demasiados pedidos. Tente novamente mais tarde.' } }, limited.headers);
  if (mediaType !== 'application/json' && !isForm) {
    return respond({ status: 415, body: { ok: false, error: 'Formato não suportado. Utilize JSON ou um formulário HTML.' } });
  }
  let body: unknown;
  try {
    const raw = await readBody(req);
    if (mediaType === 'application/json') body = JSON.parse(raw);
    else {
      const parsed = await new Request(req.url, { method: 'POST', headers: { 'Content-Type': contentType }, body: raw }).formData();
      if ([...parsed.values()].some(value => typeof value !== 'string')) throw new Error('Files not supported');
      body = Object.fromEntries(parsed);
      const referer = req.headers.get('referer');
      if (referer && new URL(referer).origin === new URL(req.url).origin) {
        (body as Record<string, unknown>).url ||= referer;
      }
    }
  } catch (error) {
    return respond({ status: error instanceof RangeError ? 413 : 400, body: { ok: false, error: error instanceof RangeError ? 'Pedido demasiado longo.' : 'Pedido inválido.' } });
  }
  if (body && typeof body === 'object' && (('lead_kind' in body && body.lead_kind === 'resource_request') || 'resource_id' in body)) {
    return respond({ status: 400, body: { ok: false, error: 'Utilize o formulário do recurso.' } });
  }
  try { return respond(await submit(body)); }
  catch { return respond({ status: 503, body: { ok: false, error: 'Não foi possível guardar o pedido. Tente novamente.' } }); }
}
