import { rateLimitRequest } from '@/lib/rate-limit';
import { publicError } from '@/lib/security/body';
import { checkGameOrigin, gameJson, issueRunToken } from '@/lib/turno-seguro/record-server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    checkGameOrigin(request);
    const limited = await rateLimitRequest(request, {
      key: 'turno-seguro-start',
      limit: 60,
      windowMs: 60_000,
    });
    if (limited) return limited;
    return gameJson({ token: await issueRunToken() }, 201);
  } catch (error) {
    return publicError(error);
  }
}
