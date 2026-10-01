import { createLeadRepository } from '@/lib/leads/repository';
import { submitLead } from '@/lib/leads/submit';
import { handleContactRequest } from '@/lib/contact-http';
export async function POST(req: Request) {
  return handleContactRequest(req, body => submitLead(body, createLeadRepository()));
}
