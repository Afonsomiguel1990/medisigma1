import { rateLimitRequest } from '@/lib/rate-limit';
import { HttpError, publicError, readBoundedJson } from '@/lib/security/body';
import { checkGameOrigin, gameJson } from '@/lib/turno-seguro/record-server';
import { loadQuestRecords, storeQuestRecord, validateQuestRun } from '@/lib/sigma-quest/record-server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return gameJson({ records: await loadQuestRecords() });
  } catch {
    return publicError(new HttpError(503, 'O top 10 está temporariamente indisponível.'));
  }
}

export async function POST(request: Request) {
  try {
    checkGameOrigin(request);
    const limited = await rateLimitRequest(request, { key: 'sigma-quest-score', limit: 30, windowMs: 60_000 });
    if (limited) return limited;
    const body = await readBoundedJson(request, 18_000);
    return gameJson(await storeQuestRecord(await validateQuestRun(body)));
  } catch (error) {
    return publicError(error);
  }
}
