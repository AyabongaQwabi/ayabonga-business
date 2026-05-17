import {
  Bot,
  Building2,
  Code2,
  Globe,
  Smartphone,
  Store,
} from 'lucide-react';
import { APP_DEVELOPMENT_COST_PAGE } from '../../lib/site-config';
import { MarketingSection } from '../shared/MarketingSection';
import { SectionLabel } from '../shared/SectionLabel';
import { ServiceCard } from '../shared/ServiceCard';
import type { ServiceIllustrationVariant } from '../ServiceIllustration';

type HomeService = {
  label: string;
  title: string;
  description: string;
  href: string;
  icon: typeof Smartphone;
  illustration: ServiceIllustrationVariant;
};

const SERVICES: HomeService[] = [
  {
    label: 'Mobile',
    title: 'Mobile app development',
    description:
      'Android and iOS with React Native, Flutter, or native when NFC and performance demand it. Store releases, push, and payments included in scope.',
    href: '/mobile-app-development-south-africa',
    icon: Smartphone,
    illustration: 'mobile',
  },
  {
    label: 'Ecommerce',
    title: 'Ecommerce and marketplaces',
    description:
      'Catalog, checkout, vendor payouts, and ops dashboards. Paystack, PayFast, and Ozow wired in from day one.',
    href: `${APP_DEVELOPMENT_COST_PAGE}#ecommerce`,
    icon: Store,
    illustration: 'ecommerce',
  },
  {
    label: 'Web',
    title: 'Web development South Africa',
    description:
      'Fast marketing sites, customer portals, and admin dashboards on modern stacks. Built for local connectivity and mobile-first users.',
    href: `${APP_DEVELOPMENT_COST_PAGE}#websites`,
    icon: Globe,
    illustration: 'web',
  },
  {
    label: 'Operations',
    title: 'Business systems',
    description:
      'Custom software for CRM, payroll, inventory, HR, fleet, and approvals. Replace spreadsheets with role-based tools your team will use.',
    href: '/custom-software-development-south-africa',
    icon: Building2,
    illustration: 'business',
  },
  {
    label: 'AI',
    title: 'AI and automation',
    description:
      'WhatsApp bots, grounded assistants, and workflow automation with human handoff when the model should not guess.',
    href: '/whatsapp-ai-chatbot-south-africa',
    icon: Bot,
    illustration: 'ai',
  },
  {
    label: 'Greenfield',
    title: 'Bespoke software',
    description:
      'Greenfield MVPs, app rescues, and product evolution when off-the-shelf tools do not fit how your business runs.',
    href: `${APP_DEVELOPMENT_COST_PAGE}#mvp-startup`,
    icon: Code2,
    illustration: 'bespoke',
  },
];

export function ServicesSection() {
  return (
    <MarketingSection id="services">
      <SectionLabel className="mb-3">What I build</SectionLabel>
      <h2
        className="font-display font-bold text-text-primary mb-4 max-w-2xl"
        style={{
          fontSize: 'var(--type-display-md)',
          lineHeight: 'var(--leading-heading)',
          letterSpacing: '-0.02em',
        }}
      >
        Software development services
      </h2>
      <p
        className="text-text-secondary max-w-2xl mb-8 md:mb-10"
        style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
      >
        Full-stack delivery from one senior engineer: mobile apps, web development South Africa
        businesses need, and custom software for operations teams. Pick a lane below or combine
        them in one product roadmap.
      </p>

      <ul className="services-grid">
        {SERVICES.map((service) => (
          <li key={service.title} className="services-grid__item">
            <ServiceCard
              label={service.label}
              title={service.title}
              description={service.description}
              href={service.href}
              icon={service.icon}
              illustration={service.illustration}
            />
          </li>
        ))}
      </ul>
    </MarketingSection>
  );
}
