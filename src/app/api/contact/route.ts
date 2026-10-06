import { submitPublicContact } from '@/lib/intake/submit';
import { handleContactRequest } from '@/lib/contact-http';
import { countRejectedSubmission } from '@/lib/rate-limit';
export async function POST(req: Request) {
  const started = Date.now();
  const response = await handleContactRequest(req, body => submitPublicContact(req, body));
  const limited = await countRejectedSubmission(req,response.status);
  console.info('public_submission', { kind:'contact',status:(limited || response).status,durationMs:Date.now()-started });
  return limited || response;
}
