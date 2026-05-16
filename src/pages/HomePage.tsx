import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  Bot,
  Building2,
  Code2,
  Globe,
  MessageCircle,
  RefreshCw,
  Shield,
  Smartphone,
  Store,
  Stethoscope,
  Wrench,
  Workflow,
} from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import ProjectCard from '../components/ProjectCard';
import { HomeHero } from '../components/HomeHero';
import {
  ServiceIllustration,
  type ServiceIllustrationVariant,
} from '../components/ServiceIllustration';
import { CostGuideTeaser } from '../components/CostGuideTeaser';
import { MarketingNav } from '../components/MarketingNav';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { PartnershipCard } from '../components/PartnershipCard';
import { RetainerPricingCards } from '../components/RetainerPricingCards';
import { SiteFooter } from '../components/SiteFooter';
import { PARTNERSHIP_PILLARS } from '../data/pricing-strategy';
import {
  absoluteUrl,
  APP_DEVELOPMENT_COST_PAGE,
  DEFAULT_OG_IMAGE,
  PRICING_STRATEGY_PAGE,
  QUOTE_PAGE,
  QUOTE_TOOL_LABEL,
  TWITTER_HANDLE,
  WHATSAPP_URL,
} from '../lib/site-config';
import { authorPersonSchema } from '../lib/author-profile';
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
} from '../lib/entity-schema';
import { AUTHOR_HEADSHOT, projectThumbnail } from '../lib/marketing-images';

const HOME_TITLE =
  'Software Development Company South Africa | App & Web Development';
const HOME_DESCRIPTION =
  'South African app development company for mobile app development, web development, and custom software. Ecommerce, business systems, AI, and long-term technical ownership from one senior engineer.';

const servicesOverview: {
  icon: typeof Smartphone;
  title: string;
  copy: string;
  link: string;
  illustration: ServiceIllustrationVariant;
}[] = [
  {
    icon: Smartphone,
    title: 'Mobile app development',
    copy: 'Android and iOS with React Native, Flutter, or native when NFC and performance demand it. Store releases, push, and payments included in scope.',
    link: '/mobile-app-development-south-africa',
    illustration: 'mobile',
  },
  {
    icon: Globe,
    title: 'Web development South Africa',
    copy: 'Fast marketing sites, customer portals, and admin dashboards on modern stacks. Built for local connectivity and mobile-first users.',
    link: `${APP_DEVELOPMENT_COST_PAGE}#websites`,
    illustration: 'web',
  },
  {
    icon: Building2,
    title: 'Business systems',
    copy: 'Custom software for CRM, payroll, inventory, HR, fleet, and approvals. Replace spreadsheets with role-based tools your team will use.',
    link: '/custom-software-development-south-africa',
    illustration: 'business',
  },
  {
    icon: Store,
    title: 'Ecommerce & marketplaces',
    copy: 'Catalog, checkout, vendor payouts, and ops dashboards. Paystack, PayFast, and Ozow wired in from day one.',
    link: `${APP_DEVELOPMENT_COST_PAGE}#ecommerce`,
    illustration: 'ecommerce',
  },
  {
    icon: Bot,
    title: 'AI & automation',
    copy: 'WhatsApp bots, grounded assistants, and workflow automation with human handoff when the model should not guess.',
    link: '/whatsapp-ai-chatbot-south-africa',
    illustration: 'ai',
  },
  {
    icon: Code2,
    title: 'Bespoke software',
    copy: 'Greenfield MVPs, app rescues, and product evolution when off-the-shelf tools do not fit how your business runs.',
    link: `${APP_DEVELOPMENT_COST_PAGE}#mvp-startup`,
    illustration: 'bespoke',
  },
];

const buildTypes = [
  {
    icon: Store,
    title: 'Ecommerce & marketplace development',
    copy: 'Multi-sided products with payouts, disputes, and ops tooling. Laundry Marketplace is a live South African reference.',
    link: `${APP_DEVELOPMENT_COST_PAGE}#marketplace`,
  },
  {
    icon: Smartphone,
    title: 'Mobile app development',
    copy: 'Cross-platform or native apps for fintech, campus wallets, and field teams. UTap shipped NFC campus access patterns.',
    link: `${APP_DEVELOPMENT_COST_PAGE}#mobile`,
  },
  {
    icon: Globe,
    title: 'Web platforms & portals',
    copy: 'Customer-facing web apps and internal portals with auth, reporting, and integrations to your existing stack.',
    link: `${APP_DEVELOPMENT_COST_PAGE}#websites`,
  },
  {
    icon: Workflow,
    title: 'Business operations software',
    copy: 'CRM, payroll hooks, inventory, HR workflows, and fleet tracking in one custom software build.',
    link: `${APP_DEVELOPMENT_COST_PAGE}#business-ops`,
  },
  {
    icon: Stethoscope,
    title: 'Health & patient systems',
    copy: 'Bookings, occupational health, and staff workflows with POPIA-aware design. ClinicPlus serves mining-sector clinics.',
    link: `${APP_DEVELOPMENT_COST_PAGE}#health`,
  },
  {
    icon: Shield,
    title: 'Fintech & payments',
    copy: 'Paystack, PayFast, Ozow, Yoco. Webhooks, reconciliation, and failed-payment paths built in, not bolted on later.',
    link: `${APP_DEVELOPMENT_COST_PAGE}#fintech`,
  },
];

const serviceLinks = [
  { label: 'Mobile app development (ZA)', path: '/mobile-app-development-south-africa' },
  { label: 'Custom software development (ZA)', path: '/custom-software-development-south-africa' },
  { label: 'App development cost guide (2026)', path: APP_DEVELOPMENT_COST_PAGE },
  { label: 'Retainer pricing & philosophy', path: PRICING_STRATEGY_PAGE },
  { label: 'Technical co-founder (TaaS)', path: '/technical-cofounder' },
  { label: 'All engineering services', path: '/services' },
];

const projects = [
  {
    title: 'Laundry Marketplace',
    category: 'Ecommerce & marketplace',
    description:
      'Multi-sided laundry marketplace app development: customers, providers, payouts, and operations in production.',
    url: 'https://laundry.qwabi.co.za',
    tech: ['Next.js', 'Marketplace', 'Payments'],
    imageUrl: projectThumbnail('Laundry Marketplace', 'https://laundry.qwabi.co.za'),
  },
  {
    title: 'ClinicPlus',
    category: 'Health & business systems',
    description:
      'Custom software for occupational health bookings and clinic access for mining companies in Witbank.',
    url: 'https://clinicplusbookings.co.za',
    tech: ['React', 'Health', 'Bookings'],
    imageUrl: projectThumbnail('ClinicPlus', 'https://clinicplusbookings.co.za'),
  },
  {
    title: 'UTap',
    category: 'Mobile app development',
    description:
      'Mobile app development for a university NFC wallet: campus access and payments on iOS and Android.',
    url: 'https://utaptech.co.za',
    tech: ['React Native', 'NFC', 'Fintech'],
    imageUrl: projectThumbnail('UTap', 'https://utaptech.co.za'),
  },
  {
    title: 'Queens Connect',
    category: 'AI & web',
    description:
      'Community AI assistant with local context for Queenstown, built as a web experience with WhatsApp-ready patterns.',
    url: 'https://queensconnect.qwabi.co.za',
    tech: ['AI', 'Next.js', 'Local data'],
    imageUrl: projectThumbnail('Queens Connect', 'https://queensconnect.qwabi.co.za'),
  },
];

const proofPoints = [
  'Software development company South Africa with 10+ years in production',
  'Mobile app development, web development, and custom business systems',
  'One senior engineer accountable for architecture and delivery',
  'Local payments, POPIA-aware patterns, and post-launch ownership',
];

const partnershipIcons = [RefreshCw, Wrench, Shield] as const;

export default function HomePage() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 88;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Helmet>
        <title>{HOME_TITLE}</title>
        <meta name="description" content={HOME_DESCRIPTION} />
        <meta
          name="keywords"
          content="app development company, mobile app development, custom software development, web development south africa, software development company south africa, ecommerce app development, business systems software"
        />
        <link rel="canonical" href={absoluteUrl('/')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl('/')} />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:locale" content="en_ZA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={HOME_TITLE} />
        <meta name="twitter:description" content={HOME_DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              buildOrganizationSchema(),
              {
                ...authorPersonSchema({ url: absoluteUrl('/about') }),
                '@id': `${absoluteUrl('/')}#person`,
              },
              buildWebSiteSchema(),
              {
                '@type': 'ProfessionalService',
                name: 'Ayabonga Qwabi — Software Development South Africa',
                url: absoluteUrl('/'),
                areaServed: { '@type': 'Country', name: 'South Africa' },
                description: HOME_DESCRIPTION,
                provider: { '@id': `${absoluteUrl('/')}#person` },
                serviceType: [
                  'Mobile app development',
                  'Web development',
                  'Custom software development',
                  'Ecommerce development',
                ],
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground font-sans">
        <MarketingNav onNavigateSection={scrollTo} />
        <FloatingWhatsApp />

        <main className="max-w-6xl mx-auto px-6">
          <HomeHero proofPoints={proofPoints} />

          <section id="services" className="py-16 border-t border-border scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Software development services</h2>
            <p className="text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Full-stack delivery from one senior engineer: mobile apps, web development South Africa
              businesses need, and custom software for operations teams. Pick a lane below or combine
              them in one product roadmap.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicesOverview.map(({ icon: Icon, title, copy, link, illustration }) => (
                <Link
                  key={title}
                  to={link}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ServiceIllustration
                    variant={illustration}
                    alt={`Illustration for ${title}`}
                    className="mb-4"
                  />
                  <Icon className="w-8 h-8 text-primary mb-4" aria-hidden />
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{copy}</p>
                </Link>
              ))}
            </div>
          </section>

          <section id="partnership" className="py-16 border-t border-border scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">How the partnership works</h2>
            <p className="text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              You get a single accountable senior engineer, not a rotating agency bench. Work is
              continuous: stabilise what you have, ship what you need next, and keep the system
              reliable while the business moves.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {PARTNERSHIP_PILLARS.map(({ title, copy }, index) => {
                const Icon = partnershipIcons[index] ?? Shield;
                return (
                  <div
                    key={title}
                    className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors"
                  >
                    <Icon className="w-8 h-8 text-primary mb-4" aria-hidden />
                    <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{copy}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="build-costs" className="py-16 border-t border-border scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">What builds typically cost</h2>
            <p className="text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Ballpark ZAR ranges for greenfield work in South Africa. Use these to sanity-check
              quotes, then open the full guide for timelines, tiers, and scope notes.
            </p>
            <CostGuideTeaser />
          </section>

          <section id="pricing" className="py-16 border-t border-border scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Monthly retainer tiers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  After launch, most clients move to retainers for maintenance, features, and
                  integrations. Pricing scales with system complexity and how fast your product must
                  evolve.
                </p>
              </div>
              <Link
                to={PRICING_STRATEGY_PAGE}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4 shrink-0"
              >
                Full pricing philosophy
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            </div>
            <RetainerPricingCards showSystemExamples={false} />
          </section>

          <section id="build" className="py-16 border-t border-border scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Projects I build and maintain</h2>
            <p className="text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Custom software development across startups and established businesses. If it runs on
              phones, browsers, or WhatsApp, and it must survive real South African users and
              payments, I have likely shipped something adjacent before.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {buildTypes.map(({ icon: Icon, title, copy, link }) => (
                <Link
                  key={title}
                  to={link}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Icon className="w-8 h-8 text-primary mb-4" aria-hidden />
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{copy}</p>
                </Link>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              Need WhatsApp AI or a full cost breakdown?{' '}
              <Link
                to="/whatsapp-ai-chatbot-south-africa"
                className="text-primary hover:underline underline-offset-4"
              >
                WhatsApp AI chatbots
              </Link>
              {' · '}
              <Link
                to={APP_DEVELOPMENT_COST_PAGE}
                className="text-primary hover:underline underline-offset-4"
              >
                App development cost guide
              </Link>
              {' · '}
              <Link to="/services" className="text-primary hover:underline underline-offset-4">
                All services
              </Link>
            </p>
          </section>

          <section className="py-16 border-t border-border">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Technical co-founder energy without giving up equity
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You get product decisions, architecture, and delivery from one person who stays
                  after launch. I tell you what is realistic for budget and timeline before you
                  commit, including post-launch maintenance and integration risk.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Cheap once-off quotes often mean junior execution and a paid rewrite six months
                  later. I would rather scope an honest MVP and a retainer that matches operational
                  reality.
                </p>
                <ul className="space-y-2">
                  {serviceLinks.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4 text-sm font-medium"
                      >
                        {item.label}
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <PartnershipCard />
            </div>
          </section>

          <section id="work" className="py-16 border-t border-border scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Custom software in production</h2>
            <p className="text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Shipped mobile app development and web development projects in South Africa, not
              mockups. Collaborations include Warner Music Africa and Western Cape Labs.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <div key={project.title} className="flex flex-col gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {project.category}
                  </p>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    url={project.url}
                    tech={project.tech}
                    imageUrl={project.imageUrl}
                    imageAlt={`${project.title} website preview`}
                  />
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-16 md:py-24 border-t border-border scroll-mt-24">
            <div className="max-w-2xl mx-auto text-center">
              <img
                src={AUTHOR_HEADSHOT}
                alt="Ayabonga Qwabi, senior product engineer and software development partner"
                width={112}
                height={112}
                loading="lazy"
                decoding="async"
                className="w-28 h-28 rounded-full object-cover mx-auto mb-6 border-2 border-primary/40 shadow-lg ring-4 ring-primary/10"
              />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Start a technical partnership</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Tell me what you run today, what is fragile, and where the product needs to go. I
                will reply with fit, a retainer band or build range, and what I would tackle first.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#128C7E] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden />
                  WhatsApp
                </a>
                <Link
                  to={APP_DEVELOPMENT_COST_PAGE}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  Development cost guide
                </Link>
              </div>
              <p className="mt-8 text-sm text-muted-foreground">
                Planning a greenfield build?{' '}
                <Link
                  to={QUOTE_PAGE}
                  className="text-primary hover:underline underline-offset-4"
                >
                  {QUOTE_TOOL_LABEL}
                </Link>{' '}
                gives a rough scope ballpark. Retainers are agreed after we review your stack.
              </p>
            </div>
          </section>
        </main>

        <SiteFooter />
        <SpeedInsights />
        <Analytics />
      </div>
    </>
  );
}
