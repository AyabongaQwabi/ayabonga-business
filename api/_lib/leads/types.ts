import type { FounderStage, SendQuoteRequestBody } from '../types';

export type LeadKind = 'inbound' | 'outbound';
export type LeadStatus =
  | 'new'
  | 'qualified'
  | 'contacted'
  | 'replied'
  | 'won'
  | 'lost';

export type BudgetBand =
  | 'under_50k'
  | '50k_150k'
  | '150k_plus'
  | 'funded_startup'
  | 'not_sure';

export type EmailTemplateCategory =
  | 'intro_ask'
  | 'direct'
  | 'follow_up';

export type OutreachDraft = {
  subject: string;
  text: string;
  html?: string;
  templateSlug?: string;
  lastSentAt?: string;
};

export type SendHistoryEntry = {
  sentAt: string;
  templateSlug: string;
  email: string;
  channel: 'email';
  subject: string;
  from: string;
  archiveId?: string;
  resendMessageId?: string;
};

export type LeadRecord = {
  id: string;
  kind: LeadKind;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  linkedInUrl?: string;
  sourcePage?: string;
  formType?: string;
  message?: string;
  budgetBand?: BudgetBand;
  founderStage?: FounderStage;
  consentAt?: string;
  score?: number;
  tier?: 1 | 2 | 3;
  verticals?: string[];
  whyNow?: string;
  budgetSignal?: string;
  warmPath?: string;
  suggestedChannel?: string;
  notes?: string;
  quoteSnapshot?: SendQuoteRequestBody;
  outreachDraft?: OutreachDraft;
  sendHistory?: SendHistoryEntry[];
  unsubscribedAt?: string;
  connectorType?: boolean;
};

export type LeadIndexEntry = {
  id: string;
  kind: LeadKind;
  status: LeadStatus;
  name?: string;
  email?: string;
  company?: string;
  score?: number;
  tier?: 1 | 2 | 3;
  sourcePage?: string;
  formType?: string;
  updatedAt: string;
};

export type LeadsIndex = {
  updatedAt: string;
  entries: LeadIndexEntry[];
};

export type EmailTemplate = {
  slug: string;
  name: string;
  subject: string;
  text: string;
  html?: string;
  category: EmailTemplateCategory;
  placeholders: string[];
  updatedAt: string;
};

export type LeadCaptureRequestBody = {
  name: string;
  email: string;
  company?: string;
  budgetBand: BudgetBand;
  message: string;
  sourcePage: string;
  formType: string;
  consent: boolean;
};

export type AdminLoginBody = {
  password: string;
};

export type AdminSessionPayload = {
  sub: 'admin';
  exp: number;
  iat: number;
};
