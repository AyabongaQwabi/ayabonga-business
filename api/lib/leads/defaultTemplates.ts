import type { EmailTemplate } from './types';
import rawTemplates from '../../../src/data/default-email-templates.json';

const now = new Date().toISOString();

export const defaultEmailTemplates: EmailTemplate[] = (
  rawTemplates as Omit<EmailTemplate, 'updatedAt'>[]
).map((t) => ({ ...t, updatedAt: now }));
