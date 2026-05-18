import { Link } from 'react-router-dom';
import { Bot, Building2, Code2, Globe, Layers, Smartphone, Zap } from 'lucide-react';
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
    label: 'Custom',
    title: 'Custom software development',
    description:
      'Greenfield products, app rescues, and tools that match how your team actually works. Discovery and architecture first, then staged delivery with visible milestones.',
    href: '/custom-software-development-south-africa',
    icon: Code2,
    illustration: 'bespoke',
  },
  {
    label: 'Apps',
    title: 'App development',
    description:
      'Mobile apps for Android and iOS, plus web apps when the product lives in the browser. Store releases, payments, and integrations scoped up front.',
    href: '/mobile-app-development-south-africa',
    icon: Smartphone,
    illustration: 'mobile',
  },
  {
    label: 'Rapid',
    title: 'AI-powered rapid app development',
    description:
      'High-fidelity MVPs and business systems built in weeks, not months. We combine senior-led software architecture with advanced AI-assisted code pipelines.',
    href: '/services/ai-powered-rapid-app-development',
    icon: Zap,
    illustration: 'ai',
  },
  {
    label: 'Systems',
    title: 'Business system development',
    description:
      'CRM, payroll, inventory, bookings, and approvals. Replace spreadsheets with role-based software your staff will use every day.',
    href: '/custom-software-development-south-africa',
    icon: Building2,
    illustration: 'business',
  },
  {
    label: 'Web',
    title: 'Web development',
    description:
      'Marketing sites, customer portals, and admin dashboards on modern stacks. Built for South African connectivity and mobile-first users.',
    href: `${APP_DEVELOPMENT_COST_PAGE}#websites`,
    icon: Globe,
    illustration: 'web',
  },
  {
    label: 'SaaS',
    title: 'SaaS product development',
    description:
      'Multi-tenant platforms with auth, billing, onboarding, and role-based access. Built for recurring revenue from day one, with a clear path from v1 to growth.',
    href: '/saas-development-pricing',
    icon: Layers,
    illustration: 'bespoke',
  },
  {
    label: 'AI',
    title: 'AI system development',
    description:
      'Agents, automations, and AI-backed workflows grounded in your data. From WhatsApp support bots to document processing and internal ops assistants.',
    href: '/ai-automation-pricing',
    icon: Bot,
    illustration: 'ai',
  },
];

export function ServicesSection() {
  return (
    <MarketingSection id="services">
      <SectionLabel className="mb-3">What we build</SectionLabel>
      <h2
        className="font-display font-bold text-text-primary mb-4 max-w-2xl"
        style={{
          fontSize: 'var(--type-display-md)',
          lineHeight: 'var(--leading-heading)',
          letterSpacing: '-0.02em',
        }}
      >
        Software development for South African teams
      </h2>
      <p
        className="text-text-secondary max-w-2xl mb-8 md:mb-10"
        style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
      >
        We design and ship custom software, mobile apps, business systems, and web platforms.
        Pick one lane or combine them in a single roadmap. Need ballpark build costs first? See
        the{' '}
        <Link
          to={APP_DEVELOPMENT_COST_PAGE}
          className="text-accent-gold font-medium hover:underline underline-offset-4"
        >
          2026 cost guide
        </Link>
        .
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
