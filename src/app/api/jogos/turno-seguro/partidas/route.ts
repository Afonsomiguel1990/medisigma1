import { rateLimitRequest } from '@/lib/rate-limit';
import { HttpError, publicError } from '@/lib/security/body';
import { checkGameOrigin, gameJson, issueRunToken } from '@/lib/turno-seguro/record-server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    checkGameOrigin(request);
    const version = request.headers.get('x-turno-version');
    if (version !== null && version !== '1' && version !== '2') {
      throw new HttpError(400, 'Atualiza a página para jogar.');
    }
    const limited = await rateLimitRequest(request, {
      key: 'turno-seguro-start',
      limit: 60,
      windowMs: 60_000,
    });
    if (limited) return limited;
    return gameJson({ token: await issueRunToken(Date.now(), version === '2' ? 2 : 1) }, 201);
  } catch (error) {
    return publicError(error);
  }
}
