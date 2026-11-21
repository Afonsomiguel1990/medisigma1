import { rateLimitRequest } from '@/lib/rate-limit';
import { HttpError, publicError, readBoundedJson } from '@/lib/security/body';
import { checkGameOrigin, gameJson } from '@/lib/turno-seguro/record-server';
import { changeQuestClock, finishQuest } from '@/lib/sigma-quest/record-server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    checkGameOrigin(request);
    const limited = await rateLimitRequest(request, { key: 'sigma-quest-clock', limit: 180, windowMs: 60_000 });
    if (limited) return limited;
    const body = await readBoundedJson(request, 18_000);
    if (body.action === 'finish') {
      const { elapsedMs, running, finished, points, firstTries, timePoints } = await finishQuest(body);
      return gameJson({ elapsedMs, running, finished, points, firstTries, timePoints });
    }
    if (body.action === 'pause' || body.action === 'resume') {
      return gameJson(await changeQuestClock(body.token, body.action));
    }
    throw new HttpError(400, 'O comando do cronómetro é inválido.');
  } catch (error) {
    return publicError(error);
  }
}
