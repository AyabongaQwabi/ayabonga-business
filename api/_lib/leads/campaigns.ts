/** Hardcoded CC for copies of every outreach send. */
export const OUTREACH_CC_EMAIL = 'ayassender@gmail.com';

export type OutreachCampaign = 'cofounder' | 'cold';

/**
 * Funded startups and product companies that need engineering help.
 * Not software agencies or dev shops.
 */
export const COFOUNDER_DISCOVERY_QUERIES = [
  'South Africa fintech startup founder CEO contact email',
  'Cape Town ecommerce startup founder contact email',
  'Johannesburg marketplace startup founder contact',
  'Durban health startup founder CEO email',
  'Pretoria edtech startup founder contact email',
  'SA logistics startup founder contact email',
  'Eastern Cape agritech startup founder contact',
  'South Africa proptech startup CEO contact email',
  'Cape Town insurtech startup founder email',
  'Johannesburg retail startup founder contact',
  'SA seed stage startup hiring engineer founder email',
  'South Africa WhatsApp business startup founder contact',
] as const;

/**
 * Non-tech businesses that may need apps, web systems, or custom software built.
 * Never search for "software development company" — that finds competitors.
 */
export const COLD_DISCOVERY_QUERIES = [
  'South Africa construction company contact email',
  'Cape Town pharmacy contact email',
  'Johannesburg law firm contact email',
  'Durban legal aid organisation contact email',
  'Pretoria medical clinic contact email',
  'South Africa dental practice contact email',
  'Eastern Cape farming business contact email',
  'SA restaurant group contact email',
  'Cape Town hotel contact email',
  'Johannesburg accounting firm contact email',
  'Durban estate agency contact email',
  'South Africa transport logistics company contact email',
  'Pretoria private school contact email',
  'SA manufacturing company contact email',
  'Cape Town retail store contact email',
  'Johannesburg mining services company contact email',
  'South Africa NGO nonprofit contact email',
  'Durban church organisation contact email',
  'SA veterinary clinic contact email',
  'Pretoria security company contact email',
  'Cape Town beauty salon spa contact email',
  'South Africa courier delivery company contact email',
  'Eastern Cape guest lodge contact email',
  'SA new small business contact email site:.co.za',
] as const;

export function queriesForCampaign(campaign: OutreachCampaign): readonly string[] {
  return campaign === 'cold' ? COLD_DISCOVERY_QUERIES : COFOUNDER_DISCOVERY_QUERIES;
}

export function campaignLabel(campaign: OutreachCampaign): string {
  return campaign === 'cold' ? 'Cold services outreach' : 'Technical cofounder outreach';
}
