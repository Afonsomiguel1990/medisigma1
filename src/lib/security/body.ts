export class HttpError extends Error {
  constructor(public status: number, message: string, public retryAfter?: number) { super(message); }
}

// Count bytes while reading, including chunked requests without Content-Length.
export async function readBoundedBytes(source: Request | Response, limit: number): Promise<Uint8Array<ArrayBuffer>> {
  const length = source.headers.get('content-length');
  if (length && (!/^\d+$/.test(length) || Number(length) > limit)) {
    await source.body?.cancel();
    throw new HttpError(413, 'Pedido demasiado grande.');
  }
  const reader = source.body?.getReader();
  if (!reader) return new Uint8Array(0);
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > limit) { await reader.cancel(); throw new HttpError(413, 'Pedido demasiado grande.'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const result = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { result.set(chunk, offset); offset += chunk.byteLength; }
  return result;
}

export async function readBoundedJson(req: Request, limit = 64_000): Promise<Record<string, unknown>> {
  if (req.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    throw new HttpError(415, 'Utilize JSON.');
  }
  const bytes = await readBoundedBytes(req, limit);
  try {
    const value = JSON.parse(new TextDecoder().decode(bytes));
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error();
    return value;
  } catch { throw new HttpError(400, 'Pedido inválido.'); }
}

export function publicError(error: unknown) {
  const known = error instanceof HttpError;
  return Response.json({ ok: false, error: known ? error.message : 'Não foi possível guardar o pedido. Tente novamente.' }, {
    status: known ? error.status : 503,
    headers: { 'Cache-Control': 'no-store', ...(known && error.retryAfter ? { 'Retry-After': String(error.retryAfter) } : {}) },
  });
}
