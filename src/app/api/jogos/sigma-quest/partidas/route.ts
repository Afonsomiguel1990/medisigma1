import { rateLimitRequest } from '@/lib/rate-limit';
import { publicError } from '@/lib/security/body';
import { checkGameOrigin, gameJson } from '@/lib/turno-seguro/record-server';
import { createQuestRun } from '@/lib/sigma-quest/record-server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    checkGameOrigin(request);
    const limited = await rateLimitRequest(request, { key: 'sigma-quest-start', limit: 60, windowMs: 60_000 });
    if (limited) return limited;
    return gameJson(await createQuestRun(), 201);
  } catch (error) {
    return publicError(error);
  }
}
