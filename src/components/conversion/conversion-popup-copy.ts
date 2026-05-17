import {
  APP_DEVELOPMENT_COST_PAGE,
  MVP_SCOPE_CHECKLIST_PAGE,
  PRICING_STRATEGY_PAGE,
  WHATSAPP_URL,
} from '../../lib/site-config';
import type { SlideInVariant } from '../../lib/conversion-popup-rules';

export type SlideInCopy = {
  headline: string;
  subhead: string;
  ctaLabel: string;
  to: string;
  variant: SlideInVariant;
};

export function getSlideInCopy(variant: SlideInVariant): SlideInCopy {
  if (variant === 'cost-guide') {
    return {
      variant,
      headline: 'Comparing build costs in South Africa?',
      subhead:
        'See 2026 ZAR ranges for apps, web, and integrations before you commit to an agency quote.',
      ctaLabel: 'View the cost guide',
      to: APP_DEVELOPMENT_COST_PAGE,
    };
  }
  return {
    variant,
    headline: 'Planning an MVP in South Africa?',
    subhead:
      'Use the free scope checklist before you commit to a build budget or agency quote.',
    ctaLabel: 'Open the MVP checklist',
    to: MVP_SCOPE_CHECKLIST_PAGE,
  };
}

export const EXIT_INTENT_COPY = {
  headline: 'Still comparing options?',
  subhead:
    'Send what you are building and what is blocking you. I reply on WhatsApp with fit and next steps, not a generic sales script.',
  whatsappLabel: 'Message on WhatsApp',
  whatsappUrl: WHATSAPP_URL,
  secondaryLabel: 'View retainer tiers',
  secondaryTo: PRICING_STRATEGY_PAGE,
  declineLabel: 'Close',
} as const;

export const STICKY_BANNER_COPY = {
  message: 'New: MVP scope checklist for founders scoping a first build.',
  ctaLabel: 'Try the checklist',
  to: MVP_SCOPE_CHECKLIST_PAGE,
  dismissLabel: 'Dismiss',
} as const;
