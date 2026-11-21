import { rateLimitRequest } from '@/lib/rate-limit';
import { HttpError, publicError, readBoundedJson } from '@/lib/security/body';
import { checkGameOrigin, gameJson, loadRecords, storeRecord, validateFinishedRun } from '@/lib/turno-seguro/record-server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return gameJson({ records: await loadRecords() });
  } catch {
    return publicError(new HttpError(503, 'O quadro de recordes está temporariamente indisponível.'));
  }
}

export async function POST(request: Request) {
  try {
    checkGameOrigin(request);
    const limited = await rateLimitRequest(request, {
      key: 'turno-seguro-score',
      limit: 30,
      windowMs: 60_000,
    });
    if (limited) return limited;

    const body = await readBoundedJson(request, 16_000);
    const record = await validateFinishedRun(body);
    return gameJson(await storeRecord(record));
  } catch (error) {
    return publicError(error);
  }
}
