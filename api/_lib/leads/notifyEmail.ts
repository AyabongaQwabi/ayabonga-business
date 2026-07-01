import type { LeadRecord } from './types';

const SITE_URL =
  process.env.SITE_URL?.replace(/\/$/, '') || 'https://business.qwabi.co.za';

const BUDGET_LABELS: Record<string, string> = {
  under_50k: 'Under R50k',
  '50k_150k': 'R50k–R150k',
  '150k_plus': 'R150k+',
  funded_startup: 'Funded startup',
  not_sure: 'Not sure',
};

export function buildCaptureNotifyEmail(lead: LeadRecord): {
  subject: string;
  text: string;
} {
  const budget = lead.budgetBand
    ? BUDGET_LABELS[lead.budgetBand] ?? lead.budgetBand
    : 'n/a';

  const lines = [
    `New inbound lead · ${lead.formType ?? 'form'}`,
    '',
    `Name: ${lead.name ?? 'n/a'}`,
    `Email: ${lead.email ?? 'n/a'}`,
    `Company: ${lead.company ?? 'n/a'}`,
    `Budget: ${budget}`,
    `Source: ${lead.sourcePage ?? 'n/a'}`,
    '',
    'Message:',
    lead.message ?? '',
    '',
    `Admin: ${SITE_URL}/admin/leads/${lead.id}`,
  ];

  return {
    subject: `[Inbound] ${lead.name ?? 'Lead'} · ${lead.formType ?? 'capture'}`,
    text: lines.join('\n'),
  };
}
