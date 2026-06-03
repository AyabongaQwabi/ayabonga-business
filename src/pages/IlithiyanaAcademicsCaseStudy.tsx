import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, ArrowLeft, CheckCircle2, XCircle, Zap } from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { BookDiscoveryCallButton } from '../components/shared/BookDiscoveryCallButton';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  GET_ESTIMATE_LABEL,
  QUOTE_PAGE,
  SITE_NAME,
  TWITTER_HANDLE,
} from '../lib/site-config';
import {
  buildBreadcrumbSchema,
  buildOrganizationSchema,
} from '../lib/entity-schema';
import { authorPersonSchema } from '../lib/author-profile';

const PAGE_TITLE = 'Ilithiyana Academics Case Study | Full Platform in 7 Days';
const PAGE_DESCRIPTION =
  'How Qwabi Engineering replaced WhatsApp and Excel with a full enrolment platform, PayFast payments, parent portal, tutor management, and admin dashboard for Ilithiyana Academics in 7 days.';
const CANONICAL_PATH = '/case-studies/ilithiyana';

const BEFORE_ITEMS = [
  'PDF application forms emailed in, manually captured into Excel',
  'Manual EFT payments tracked by hand — no payment gateway',
  'WhatsApp group chats for parent communication and reminders',
  'Google Meet links copied manually into calendar invites each week',
  'Tutors submitted paper log sheets — approved by hand at month end',
  'No visibility for parents on session balance, schedule, or reports',
];

const AFTER_ITEMS = [
  '6-step online enrolment wizard — account, children, payment, done',
  'PayFast integrated — subscriptions, webhooks, automated reminders',
  'Parent portal — schedules, session balance, school reports, billing',
  'Class schedules with live Google Meet join links in the platform',
  'Tutor portal — timesheet submission, admin approve/reject workflow',
  'Admin dashboard — applications, subscriptions, CRM, payroll totals',
];

const SCOPE_ITEMS = [
  {
    num: '01',
    area: 'Public site',
    title: 'Full site rebuild',
    desc: 'Home, About, Contact, Career guidance, Terms, Privacy Policy, and a machine-readable site index across 60+ pages with scroll-reveal animations.',
    value: 'R 5,700',
  },
  {
    num: '02',
    area: 'SEO',
    title: 'Competitor pages',
    desc: '10 alternatives pages, 10 head-to-head comparison pages, XML sitemap, and a CAPS subject choice lead magnet for email capture.',
    value: 'R 7,100',
  },
  {
    num: '03',
    area: 'Enrolment',
    title: 'Payment & onboarding',
    desc: '6-step wizard, PayFast checkout + ITN webhook, 28 Supabase migrations, automated Resend email reminders via cron.',
    value: 'R 13,500',
  },
  {
    num: '04',
    area: 'Parent portal',
    title: 'Parent dashboard',
    desc: 'Magic link auth, children management, class schedules with join links, school report OCR pipeline, subscription status.',
    value: 'R 7,800',
  },
  {
    num: '05',
    area: 'Tutor portal',
    title: 'Tutor management',
    desc: 'Become-a-tutor page, application + document uploads, class schedule view, monthly timesheet submission and approval.',
    value: 'R 6,500',
  },
  {
    num: '06',
    area: 'Admin portal',
    title: 'Operations dashboard',
    desc: 'Full admin console — applications, classes, subscriptions, timesheets, tutor vetting, parent CRM, leads and outreach.',
    value: 'R 9,800',
  },
];

const SCREENSHOTS = [
  { src: '/ilithiyana-case-study/1.png', label: 'ilithiyana.co.za — homepage', wide: true },
  { src: '/ilithiyana-case-study/2.png', label: '6-step enrolment wizard', wide: false },
  { src: '/ilithiyana-case-study/3.png', label: 'Parent portal — overview', wide: false },
  { src: '/ilithiyana-case-study/4.png', label: 'My children — learner cards', wide: false },
  { src: '/ilithiyana-case-study/5.png', label: 'Class schedules + join links', wide: false },
  { src: '/ilithiyana-case-study/6.png', label: 'School reports — OCR pipeline', wide: true },
];

const STACK = [
  'Next.js 14',
  'TypeScript',
  'Supabase',
  'PayFast',
  'Resend',
  'Vercel',
  'Row-level security',
  'OCR pipeline',
  'Cron jobs',
];

const METRICS = [
  { val: '7', unit: 'days', label: 'build to production' },
  { val: '69', unit: '', label: 'commits shipped' },
  { val: '28', unit: '', label: 'DB migrations' },
  { val: 'R50k', unit: '', label: 'project value' },
];

export default function IlithiyanaAcademicsCaseStudy() {
  const canonical = absoluteUrl(CANONICAL_PATH);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Case studies', path: '/case-studies' },
    { name: 'Ilithiyana Academics', path: CANONICAL_PATH },
  ]);

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      authorPersonSchema({ url: absoluteUrl('/about') }),
      breadcrumbSchema,
      {
        '@type': 'Article',
        headline: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        url: canonical,
        author: authorPersonSchema(),
        publisher: buildOrganizationSchema(),
        about: { '@type': 'Organization', name: 'Ilithiyana Academics' },
        inLanguage: 'en-ZA',
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{`${PAGE_TITLE} | ${SITE_NAME}`}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={`${PAGE_TITLE} | ${SITE_NAME}`} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <PageShell mainClassName="flex-1 pt-[4.5rem]">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-surface-border">
          {/* subtle grid bg */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(var(--color-surface-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-surface-border) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
            aria-hidden
          />
          {/* gold glow */}
          <div
            className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, var(--color-accent-gold), transparent 70%)' }}
            aria-hidden
          />

          <div className="container py-16 md:py-24 relative z-10">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden />
              All case studies
            </Link>

            {/* eyebrow */}
            <p
              className="font-mono text-xs tracking-widest uppercase mb-4"
              style={{ color: 'var(--color-accent-gold)', letterSpacing: 'var(--type-label-tracking)' }}
            >
              Education technology · Mthatha
            </p>

            <h1
              className="font-display font-bold text-text-primary mb-6"
              style={{ fontSize: 'var(--type-display-md)', lineHeight: 'var(--leading-display)' }}
            >
              Excel sheets to<br />
              <span style={{ color: 'var(--color-accent-gold)' }}>full platform.</span>
              <br />7 days.
            </h1>

            <p
              className="text-text-secondary max-w-2xl mb-10"
              style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-relaxed)' }}
            >
              An online tutoring centre running on WhatsApp and spreadsheets.
              We rebuilt everything — enrolment, payments, portals, and automation —
              from scratch, in production, in one week.
            </p>

            {/* stat row */}
            <div className="flex flex-wrap gap-x-10 gap-y-6 mb-10">
              {METRICS.map((m) => (
                <div key={m.label}>
                  <div
                    className="font-display font-bold text-text-primary leading-none"
                    style={{ fontSize: 'var(--type-display-md)' }}
                  >
                    {m.val}
                    {m.unit && (
                      <span style={{ color: 'var(--color-accent-gold)', fontSize: '0.5em' }}>
                        {' '}{m.unit}
                      </span>
                    )}
                  </div>
                  <div
                    className="font-mono text-text-muted uppercase mt-1"
                    style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--type-label-tracking)' }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://ilithiyana.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary min-h-[44px] inline-flex items-center gap-2"
              >
                View live site
                <ExternalLink className="w-4 h-4" aria-hidden />
              </a>
              <Link to={QUOTE_PAGE} className="btn-outline min-h-[44px]">
                {GET_ESTIMATE_LABEL}
              </Link>
            </div>
          </div>
        </section>

        {/* ── BEFORE / AFTER ─────────────────────────────────────────── */}
        <section className="container py-16 md:py-20">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-accent-gold)', letterSpacing: 'var(--type-label-tracking)' }}
          >
            The problem
          </p>
          <h2
            className="font-display font-bold text-text-primary mb-10"
            style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
          >
            From manual chaos to a real system.
          </h2>

          <div className="grid md:grid-cols-2 gap-px bg-surface-border rounded-2xl overflow-hidden">
            {/* BEFORE */}
            <div className="bg-surface-raised p-8 md:p-10">
              <div className="flex items-center gap-2 mb-6">
                <XCircle className="w-4 h-4 text-error flex-shrink-0" aria-hidden />
                <span
                  className="font-mono text-xs uppercase tracking-widest text-error"
                  style={{ letterSpacing: 'var(--type-label-tracking)' }}
                >
                  Before Qwabi Engineering
                </span>
              </div>
              <ul className="space-y-4">
                {BEFORE_ITEMS.map((item) => (
                  <li key={item} className="flex gap-3 text-text-secondary" style={{ fontSize: 'var(--type-body-md)' }}>
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-error"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* AFTER */}
            <div className="bg-surface-raised p-8 md:p-10">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: 'var(--color-accent-emerald)' }}
                  aria-hidden
                />
                <span
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: 'var(--color-accent-emerald)', letterSpacing: 'var(--type-label-tracking)' }}
                >
                  After — live on ilithiyana.co.za
                </span>
              </div>
              <ul className="space-y-4">
                {AFTER_ITEMS.map((item) => (
                  <li key={item} className="flex gap-3 text-text-secondary" style={{ fontSize: 'var(--type-body-md)' }}>
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: 'var(--color-accent-emerald)' }}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── SCREENSHOTS ─────────────────────────────────────────────── */}
        <section className="bg-surface-raised border-y border-surface-border py-16 md:py-20">
          <div className="container">
            <p
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-accent-gold)', letterSpacing: 'var(--type-label-tracking)' }}
            >
              The product
            </p>
            <h2
              className="font-display font-bold text-text-primary mb-3"
              style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
            >
              What we actually shipped.
            </h2>
            <p className="text-text-secondary mb-10 max-w-xl" style={{ fontSize: 'var(--type-body-md)' }}>
              Every screen below is live at ilithiyana.co.za — not a mockup, not a prototype.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SCREENSHOTS.map((s) => (
                <div
                  key={s.src}
                  className={`group relative rounded-xl overflow-hidden border border-surface-border${s.wide ? ' md:col-span-2' : ''}`}
                >
                  <img
                    src={s.src}
                    alt={s.label}
                    className="w-full block transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-surface-base/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
                    <span
                      className="font-mono text-xs text-text-secondary"
                      style={{ letterSpacing: 'var(--type-label-tracking)' }}
                    >
                      {s.label}
                    </span>
                    <span
                      className="font-mono text-xs px-2 py-0.5 rounded"
                      style={{
                        background: 'rgba(5,150,105,0.15)',
                        color: 'var(--color-accent-emerald)',
                        letterSpacing: 'var(--type-label-tracking)',
                      }}
                    >
                      live
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SCOPE OF WORK ─────────────────────────────────────────── */}
        <section className="container py-16 md:py-20">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-accent-gold)', letterSpacing: 'var(--type-label-tracking)' }}
          >
            Scope of work
          </p>
          <h2
            className="font-display font-bold text-text-primary mb-10"
            style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
          >
            6 areas. One week.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-surface-border rounded-2xl overflow-hidden">
            {SCOPE_ITEMS.map((item) => (
              <div
                key={item.num}
                className="bg-surface-raised p-7 flex flex-col hover:bg-surface-overlay transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span
                    className="font-mono text-text-muted"
                    style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--type-label-tracking)' }}
                  >
                    {item.num} — {item.area}
                  </span>
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded flex-shrink-0"
                    style={{
                      background: 'rgba(255,215,0,0.08)',
                      color: 'var(--color-accent-gold)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item.value}
                  </span>
                </div>
                <h3
                  className="font-display font-bold text-text-primary mb-2"
                  style={{ fontSize: 'var(--type-heading-sm)', lineHeight: 'var(--leading-heading)' }}
                >
                  {item.title}
                </h3>
                <p className="text-text-secondary flex-1" style={{ fontSize: 'var(--type-body-sm)', lineHeight: 'var(--leading-body)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* total */}
          <div className="mt-px bg-surface-border rounded-b-2xl">
            <div className="bg-surface-overlay px-7 py-5 flex items-center justify-between rounded-b-2xl">
              <span
                className="font-mono text-text-secondary uppercase"
                style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--type-label-tracking)' }}
              >
                Total · May 2026
              </span>
              <span
                className="font-display font-bold"
                style={{ fontSize: 'var(--type-heading-md)', color: 'var(--color-accent-gold)' }}
              >
                R 50,400
              </span>
            </div>
          </div>
        </section>

        {/* ── RAPID AI CALLOUT ──────────────────────────────────────── */}
        <section className="bg-surface-raised border-y border-surface-border py-16 md:py-20">
          <div className="container">
            <div
              className="rounded-2xl p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-center"
              style={{
                border: '0.5px solid rgba(255,215,0,0.2)',
                background: 'linear-gradient(135deg, rgba(255,215,0,0.04) 0%, rgba(5,150,105,0.03) 100%)',
              }}
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: 'var(--color-accent-gold)' }}
                    aria-hidden
                  />
                  <span
                    className="font-mono text-xs uppercase"
                    style={{ color: 'var(--color-accent-gold)', letterSpacing: 'var(--type-label-tracking)' }}
                  >
                    How we did it fast
                  </span>
                </div>
                <h2
                  className="font-display font-bold text-text-primary mb-4"
                  style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
                >
                  Built with our{' '}
                  <span style={{ color: 'var(--color-accent-gold)' }}>Rapid AI</span>{' '}
                  development process.
                </h2>
                <p className="text-text-secondary mb-6 max-w-2xl" style={{ fontSize: 'var(--type-body-md)', lineHeight: 'var(--leading-relaxed)' }}>
                  7 days isn't magic — it's method. Our Rapid AI development process compresses
                  architecture decisions, boilerplate, and scaffolding from weeks to hours.
                  Our engineers stay focused on business logic and integration — the parts that
                  actually matter. The result: production-grade systems, delivered at a pace
                  that used to be impossible.
                </p>
                <div className="flex flex-wrap gap-2">
                  {STACK.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-xs px-3 py-1.5 rounded-full border border-surface-border text-text-secondary hover:border-surface-overlay transition-colors"
                      style={{ fontSize: 'var(--type-label)' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center md:text-right flex-shrink-0">
                <div
                  className="font-display font-bold leading-none"
                  style={{ fontSize: 'clamp(5rem, 10vw, 8rem)', color: 'var(--color-accent-gold)' }}
                >
                  7
                </div>
                <div
                  className="font-mono text-text-muted uppercase"
                  style={{ fontSize: 'var(--type-label)', letterSpacing: 'var(--type-label-tracking)' }}
                >
                  days to<br />production
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OUTCOMES ─────────────────────────────────────────────── */}
        <section className="container py-16 md:py-20">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-accent-gold)', letterSpacing: 'var(--type-label-tracking)' }}
          >
            Results
          </p>
          <h2
            className="font-display font-bold text-text-primary mb-10"
            style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
          >
            What changed for the client.
          </h2>
          <ul className="space-y-5 max-w-3xl">
            {[
              'Went from zero digital infrastructure to a live, production-grade platform in 7 days — 69 commits across the staging branch',
              'Parents can apply, pay, track class schedules, view session balance, and upload school reports entirely online — no WhatsApp required',
              'Admin team moved from manual data entry into Excel to a centralised dashboard covering finance, subscriptions, applications, and CRM',
              'Tutors submit monthly timesheets digitally — admin approves or rejects with one click, payroll totals auto-calculated',
              'Automated payment reminders via Resend replace manual WhatsApp follow-ups, scaled to 3,000 emails per month at near-zero cost',
              'SEO competitor and comparison pages built into the platform to drive organic enrolment leads from day one',
              'Project delivered at R50,400 — less than one month of a full-time mid-level developer salary',
            ].map((outcome) => (
              <li key={outcome} className="flex gap-4 text-text-secondary" style={{ fontSize: 'var(--type-body-md)', lineHeight: 'var(--leading-relaxed)' }}>
                <CheckCircle2
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: 'var(--color-accent-emerald)' }}
                  aria-hidden
                />
                {outcome}
              </li>
            ))}
          </ul>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section className="border-t border-surface-border">
          <div className="container py-16 md:py-24">
            <div className="max-w-2xl mx-auto text-center">
              <p
                className="font-mono text-xs uppercase mb-4"
                style={{ color: 'var(--color-accent-gold)', letterSpacing: 'var(--type-label-tracking)' }}
              >
                Start your project
              </p>
              <h2
                className="font-display font-bold text-text-primary mb-4"
                style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
              >
                Your business deserves a real system.
              </h2>
              <p className="text-text-secondary mb-8 max-w-xl mx-auto" style={{ lineHeight: 'var(--leading-relaxed)' }}>
                Still running on spreadsheets and WhatsApp groups? Tell us what you're building —
                we'll come back with fit, risks, and a realistic ZAR range before you commit.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link to={QUOTE_PAGE} className="btn-primary min-h-[44px]">
                  {GET_ESTIMATE_LABEL}
                </Link>
                <BookDiscoveryCallButton variant="outline" />
              </div>
            </div>
          </div>
        </section>

      </PageShell>
    </>
  );
}
