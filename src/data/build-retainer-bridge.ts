import { appCostPricingTables } from './app-cost-pricing-tables';
import type { PricingTier } from '../components/PricingTable';
import type { RetainerTierId } from './pricing-strategy';
import { RETAINER_TIERS } from './pricing-strategy';

function pricingTable(id: string) {
  const table = appCostPricingTables.find((t) => t.id === id);
  if (!table) {
    throw new Error(`app-cost-pricing-tables: missing block "${id}"`);
  }
  return table;
}

function tierRange(tableId: string, tierName: string): string {
  const tier = pricingTable(tableId).tiers.find((t) => t.name === tierName);
  if (!tier) {
    throw new Error(`app-cost-pricing-tables: missing tier "${tierName}" in "${tableId}"`);
  }
  return tier.rangeZar;
}

/** Phase 1 TaaS bands — same rows as MVP builds for startups in the 2026 cost guide. */
export function getTaasPhase1Table() {
  return pricingTable('mvp-startup');
}

export function getTaasPhase1Tiers(): PricingTier[] {
  return getTaasPhase1Table().tiers;
}

export const TAAS_PHASE_1_NOTE =
  'Fixed-scope Phase 1 delivery. Final price after a scoping call. Ranges match the fundable MVP bands in the app development cost guide.';

export type BuildRetainerBridgeRow = {
  id: string;
  buildRangeLabel: string;
  buildSourceNote: string;
  productExamples: string;
  retainerTierId: RetainerTierId;
  retainerFromLabel: string;
  guidance: string;
  smmeFit?: boolean;
};

function retainerFromLabel(tierId: RetainerTierId): string {
  const tier = RETAINER_TIERS.find((t) => t.id === tierId);
  return tier ? `from ${tier.monthlyFromZar} / month` : '';
}

/** Launch spend → typical retainer tier. Labels pulled from app-cost-pricing-tables.ts. */
export const BUILD_TO_RETAINER_BRIDGE_ROWS: BuildRetainerBridgeRow[] = [
  {
    id: 'light-launch',
    buildRangeLabel: tierRange('websites', 'Business marketing site'),
    buildSourceNote: 'Business marketing site band',
    productExamples: 'Brochure sites, service businesses, early lead-gen',
    retainerTierId: 'essential',
    retainerFromLabel: retainerFromLabel('essential'),
    guidance:
      'Patches, hosting hygiene, small content or form changes. No heavy product roadmap.',
    smmeFit: true,
  },
  {
    id: 'fundable-mvp',
    buildRangeLabel: tierRange('mvp-startup', 'Fundable MVP'),
    buildSourceNote: 'Fundable MVP band',
    productExamples: 'One core loop, basic admin, first paying users',
    retainerTierId: 'essential',
    retainerFromLabel: retainerFromLabel('essential'),
    guidance:
      'Default path for many South African SMMEs after launch: keep the system stable, fix production issues, ship small improvements without hiring a bench.',
    smmeFit: true,
  },
  {
    id: 'production-web',
    buildRangeLabel: tierRange('web-apps', 'Production web app'),
    buildSourceNote: 'Production web app band',
    productExamples: 'Portals with roles, integrations, reporting, staging and monitoring',
    retainerTierId: 'growth',
    retainerFromLabel: retainerFromLabel('growth'),
    guidance:
      'Monthly feature work, payment or CRM integrations, and a steady release rhythm.',
  },
  {
    id: 'marketplace-mvp',
    buildRangeLabel: tierRange('marketplace', 'Single-city MVP'),
    buildSourceNote: 'Single-city marketplace MVP band',
    productExamples: 'Two-sided booking or listing in one region',
    retainerTierId: 'growth',
    retainerFromLabel: retainerFromLabel('growth'),
    guidance:
      'Ops load rises quickly once providers and payouts go live. Plan for Growth unless scope stays truly minimal.',
  },
  {
    id: 'marketplace-production',
    buildRangeLabel: tierRange('marketplace', 'Production marketplace'),
    buildSourceNote: 'Production marketplace band',
    productExamples: 'Onboarding, in-app payments, disputes, multi-role admin',
    retainerTierId: 'ecosystem',
    retainerFromLabel: retainerFromLabel('ecosystem'),
    guidance:
      'Multi-sided products with payments and high incident load usually need Ecosystem-level ownership.',
  },
];

export const BUILD_TO_RETAINER_BRIDGE = {
  heading: 'From launch budget to monthly partnership',
  intro:
    'A once-off build gets you live. A retainer keeps a senior engineer responsible for what happens next: fixes, integrations, releases, and architecture as the business changes. The table below uses the same ZAR planning bands as the 2026 cost guide.',
  smmeCallout:
    'Most SMME teams I work with start on Essential after a focused MVP or internal tool launch, then move up only when payments, integrations, or release pressure justify it.',
  planningNote:
    'Illustrative mapping for budget conversations, not a formula. We confirm tier after reviewing your stack, roadmap, and support expectations.',
} as const;
