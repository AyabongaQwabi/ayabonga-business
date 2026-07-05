import { isOutreachSendableEmail } from './emailEnrichment';

/** Primary + alternative inboxes, deduped; includes info@, contact@, etc. */
export function outreachRecipientsForLead(lead: {
  email?: string;
  alternativeEmails?: string[];
}): string[] {
  const all = [lead.email, ...(lead.alternativeEmails ?? [])]
    .filter((e): e is string => Boolean(e))
    .map((e) => e.toLowerCase().trim())
    .filter(isOutreachSendableEmail);
  return [...new Set(all)];
}
