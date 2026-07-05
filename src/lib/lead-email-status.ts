import type { LeadIndexEntry } from './admin-api';

export type LeadEmailStatus = 'sent' | 'failed' | 'pending' | 'no_email';

export function leadEmailStatus(entry: LeadIndexEntry): LeadEmailStatus {
  if (!entry.email) return 'no_email';
  if (entry.lastSendError) return 'failed';
  if ((entry.sendCount ?? 0) > 0 || entry.lastSentAt) return 'sent';
  return 'pending';
}

export function leadEmailStatusLabel(status: LeadEmailStatus): string {
  switch (status) {
    case 'sent':
      return 'Sent';
    case 'failed':
      return 'Send failed';
    case 'pending':
      return 'Not sent yet';
    case 'no_email':
      return 'No email';
  }
}
