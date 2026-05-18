import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, MapPin, Rocket, Users, BarChart, Zap, ShieldCheck, Cpu, MessageCircle } from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageHero } from '../components/PageHero';
import { easternCapeHubPath } from '../lib/local-developers';
import { HERO_IMAGES } from '../lib/hero-images';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  TWITTER_HANDLE,
  WHATSAPP_URL,
} from '../lib/site-config';

const PAGE_TITLE = 'Software development services';
const PAGE_DESCRIPTION =
  'Custom software, mobile apps, web platforms, and business systems for South African teams. Senior-led delivery from Qwabi Engineering.';

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>{`${PAGE_TITLE} | ${SITE_NAME}`}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={absoluteUrl('/services')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl('/services')} />
        <meta property="og:title" content={`${PAGE_TITLE} | ${SITE_NAME}`} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <PageShell mainClassName="max-w-5xl mx-auto flex-1 px-6 pt-[4.5rem] pb-12 md:pb-20">
        <ScrollReveal>
        <PageHero
          className="mb-16"
          eyebrow="Software development · South Africa"
          title={
            <>
              Custom software, apps, and{' '}
              <span className="text-primary">business systems</span>
            </>
          }
          subtitle="We design and ship production software for founders, operators, and agency partners. Staged delivery, honest ZAR ranges, and monthly retainers after launch when you need ongoing ownership."
          imageSrc={HERO_IMAGES.servicesHub}
          imageAlt="Senior product engineer workspace for South African software delivery"
        />

        {/* Persona Sections */}
        <section className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all">
            <Rocket className="w-10 h-10 text-primary mb-6" />
            <h2 className="text-2xl font-bold mb-4">Founders and product teams</h2>
            <p className="text-muted-foreground mb-6">
              You need a real v1, not a demo that breaks under real users. We scope one critical
              workflow, ship in visible milestones, and keep the same senior engineer on the build.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Scoped MVPs in weeks, not mystery sprints</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Mobile apps and web platforms</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Written scope before you commit</span>
              </li>
            </ul>
            <Link
              to="/mobile-app-development-south-africa"
              className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-primary hover:underline"
            >
              Mobile app development <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all">
            <Users className="w-10 h-10 text-primary mb-6" />
            <h2 className="text-2xl font-bold mb-4">Agencies and consultants</h2>
            <p className="text-muted-foreground mb-6">
              You sell strategy or design and need engineering that protects your reputation.
              We deliver white-label builds with clear milestones and no surprise handoffs to
              juniors.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>White-label Execution</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Senior-level Reliability</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Rapid Scaling Capacity</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all">
            <BarChart className="w-10 h-10 text-primary mb-6" />
            <h2 className="text-2xl font-bold mb-4">Operations and SMME teams</h2>
            <p className="text-muted-foreground mb-6">
              Spreadsheets and WhatsApp groups are failing. You need CRM, inventory, bookings, or
              payroll workflows in software your staff will actually use.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Custom SaaS Platforms</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Operational Automation</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Reporting your team can trust</span>
              </li>
            </ul>
            <Link
              to="/custom-software-development-south-africa"
              className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-primary hover:underline"
            >
              Custom software development <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Why One Person? */}
        <section className="mb-24 bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why one senior owner on the build</h2>
            <div className="grid sm:grid-cols-2 gap-8 text-left mt-12">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Fewer handoffs</h3>
                  <p className="text-sm text-muted-foreground">
                    The person who scoped the work writes the code. Decisions do not wait on a chain
                    of account managers.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Senior accountability</h3>
                  <p className="text-sm text-muted-foreground">
                    You are not paying for a senior pitch and a junior delivery. We own architecture,
                    implementation, and launch quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI-Powered Rapid Build Promotion */}
        <section className="mb-24 relative overflow-hidden rounded-3xl p-8 md:p-12 border border-accent-gold/20 bg-gradient-to-br from-accent-gold/5 via-transparent to-primary/5">
          <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-gold bg-accent-gold/10 rounded-full mb-4">
                Next-Gen Delivery Model
              </span>
              <h2 className="text-3xl font-bold mb-4">AI-powered rapid app development</h2>
              <p className="text-muted-foreground mb-6 max-w-xl">
                Need to ship a premium custom application or MVP under tight constraints? By combining senior-led software architecture with advanced, human-governed AI engineering workflows, we cut development timelines and cost by 50% without compromising on structural quality.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-semibold mb-6 md:mb-0">
                <span className="flex items-center gap-1.5 text-text-primary">
                  <Zap className="w-4 h-4 text-accent-gold" /> Shipped in 2 to 4 weeks
                </span>
                <span className="flex items-center gap-1.5 text-text-primary">
                  <Zap className="w-4 h-4 text-accent-gold" /> 50% cost reduction
                </span>
                <span className="flex items-center gap-1.5 text-text-primary">
                  <Zap className="w-4 h-4 text-accent-gold" /> Full codebase ownership
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end justify-center">
              <Link
                to="/services/ai-powered-rapid-app-development"
                className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold transition-all shadow-lg shadow-primary/10 inline-flex items-center justify-center gap-2"
              >
                Learn about rapid builds
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-muted-foreground mt-3 w-full md:text-right">
                Qualify with a pre-approved spec
              </p>
            </div>
          </div>
        </section>

        {/* Founder guides (buyer-intent SEO) */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-4 text-center">Founder guides</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
            Practical answers on cost, hiring, and builds in South Africa. No listicle fluff.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              {
                title: 'Mobile app development',
                path: '/mobile-app-development-south-africa',
                desc: 'Android, iOS, startup MVPs, and store-ready delivery.',
              },
              {
                title: 'Custom software development',
                path: '/custom-software-development-south-africa',
                desc: 'CRM, HR, inventory, property, and ops systems.',
              },
              {
                title: 'AI rapid app development',
                path: '/services/ai-powered-rapid-app-development',
                desc: 'Accelerated MVPs and custom apps via AI-assisted engineering.',
              },
              {
                title: 'App development cost (2026)',
                path: '/app-development-cost-south-africa',
                desc: 'MVP vs production, hidden costs, and rewrite risk.',
              },
              {
                title: 'MVP developer South Africa',
                path: '/mvp-developer-south-africa',
                desc: 'Scoped MVPs without agency overhead.',
              },
              {
                title: 'WhatsApp AI chatbot',
                path: '/whatsapp-ai-chatbot-south-africa',
                desc: 'Automation where your customers already message.',
              },
              {
                title: 'How to choose an app developer',
                path: '/best-app-developers-south-africa',
                desc: 'Compare freelancers, agencies, and senior partners.',
              },
            ].map((guide) => (
              <Link
                key={guide.path}
                to={guide.path}
                className="group p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-muted-foreground">{guide.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Industry Focus - pSEO Links */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">Strategic Industry Focus</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Fintech", slug: "fintech-founders-south-africa", desc: "Payments, ledgers, and secure transaction engines." },
              { name: "Logistics", slug: "logistics-apps-cape-town", desc: "Real-time tracking, dispatching, and fleet management." },
              { name: "HealthTech", slug: "healthcare-startups-johannesburg", desc: "Secure records, bookings, and HIPAA-aligned platforms." },
              { name: "EduTech", slug: "edutech-platforms-south-africa", desc: "Student management and cashless campus ecosystems." },
              { name: "Marketplaces", slug: "marketplace-founders-south-africa", desc: "Multi-sided platforms for on-demand services." },
              { name: "Established brands", slug: "digital-transformation-experts-south-africa", desc: "Custom systems when spreadsheets and off-the-shelf tools no longer fit." },
              { name: "AI & Automation", slug: "ai-integration-specialist-south-africa", desc: "Strategic LLM integration and production-ready AI agents." }
            ].map((industry) => (
              <Link 
                key={industry.slug}
                to={`/solutions/${industry.slug}`}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{industry.name} →</h3>
                <p className="text-sm text-muted-foreground">{industry.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <footer className="text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to scope a build?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#128C7E] transition-all shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Message us on WhatsApp
            </a>
            <Link
              to="/get-a-quote"
              className="px-8 py-4 bg-card border border-border rounded-xl font-bold hover:border-primary transition-all"
            >
              Get an estimate
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Want a ballpark first?{' '}
            <Link to="/app-development-cost-south-africa" className="text-primary hover:underline underline-offset-4">See 2026 build cost ranges</Link>.
          </p>
        </footer>
        </ScrollReveal>
      </PageShell>
    </>
  );
}
