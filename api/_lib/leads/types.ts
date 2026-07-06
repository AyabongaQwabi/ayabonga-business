import type { FounderStage, SendQuoteRequestBody } from '../types';
import type { OutreachCampaign } from './campaigns';

export type { OutreachCampaign };

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
  /** cofounder = startup/founder track; cold = services sales track */
  campaign?: OutreachCampaign;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
  name?: string;
  email?: string;
  /** Other inboxes found on the same site (info@, sales@, etc.). */
  alternativeEmails?: string[];
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
  /** Set when a send attempt fails; cleared on success. */
  lastSendError?: string;
  lastSendAttemptAt?: string;
};

export type LeadIndexEntry = {
  id: string;
  kind: LeadKind;
  campaign?: OutreachCampaign;
  status: LeadStatus;
  name?: string;
  email?: string;
  company?: string;
  score?: number;
  tier?: 1 | 2 | 3;
  sourcePage?: string;
  formType?: string;
  createdAt?: string;
  updatedAt: string;
  lastSentAt?: string;
  sendCount?: number;
  lastSendError?: string;
  lastSendAttemptAt?: string;
};

export type LeadSortField = 'updated' | 'created' | 'score' | 'lastSent';

export type LeadsListResult = {
  entries: LeadIndexEntry[];
  total: number;
  page: number;
  pageSize: number;
  sort: LeadSortField;
  order: 'asc' | 'desc';
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
  /** Code default version; blob copies refresh when this lags behind. */
  seedVersion?: number;
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
