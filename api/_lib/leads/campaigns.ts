/** Hardcoded CC for copies of every outreach send. */
export const OUTREACH_CC_EMAIL = 'ayassender@gmail.com';

export type OutreachCampaign = 'cofounder' | 'cold';

/** Technical cofounder / funded startup founder outreach. */
export const COFOUNDER_DISCOVERY_QUERIES = [
  'South Africa startup technical cofounder engineering founder contact email',
  'Cape Town fintech startup CTO hiring contact email',
  'Johannesburg SaaS founder needs senior engineer contact',
  'Durban startup MVP production engineering founder email',
  'South Africa AI startup founding engineer contact',
  'Pretoria marketplace startup technical lead email',
  'SA seed stage startup engineering partner founder contact',
  'Eastern Cape startup product engineering cofounder email',
  'South Africa proptech startup engineering hiring contact',
  'SA healthtech startup technical founder contact email',
  'South Africa edtech startup engineering lead contact',
  'Cape Town logistics startup CTO contact email',
] as const;

/** Cold outreach: companies that may buy app / web / custom software services. */
export const COLD_DISCOVERY_QUERIES = [
  'South Africa company custom software development contact email',
  'Cape Town web application development company contact email',
  'Johannesburg mobile app development company email',
  'Durban bespoke software development business contact',
  'Pretoria SME needs software developer contact email',
  'South Africa business digital transformation software contact',
  'SA company website redesign web app development contact',
  'Eastern Cape business app development company email',
  'South Africa logistics company custom software contact',
  'Cape Town retail business ecommerce app development contact',
  'Johannesburg mining company software system contact email',
  'SA healthcare clinic management software development contact',
  'South Africa school administration software development contact',
  'Durban hospitality booking app development company email',
  'SA manufacturing inventory software development contact',
] as const;

export function queriesForCampaign(campaign: OutreachCampaign): readonly string[] {
  return campaign === 'cold' ? COLD_DISCOVERY_QUERIES : COFOUNDER_DISCOVERY_QUERIES;
}

export function campaignLabel(campaign: OutreachCampaign): string {
  return campaign === 'cold' ? 'Cold services outreach' : 'Technical cofounder outreach';
}
