import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ClipboardList, MessageCircle } from 'lucide-react';
import { animateHeroHeadline, animateHeroSupport } from '../../lib/animations';
import {
  APP_DEVELOPMENT_COST_PAGE,
  MVP_SCOPE_CHECKLIST_LABEL,
  MVP_SCOPE_CHECKLIST_PAGE,
  PARTNERSHIP_CTA_LABEL,
  PRICING_STRATEGY_PAGE,
  WHATSAPP_URL,
} from '../../lib/site-config';
import { SectionLabel } from '../shared/SectionLabel';

const HEADLINE_WORDS = [
  'Custom',
  'software',
  'for',
  'South',
  'African',
  'teams',
];

const GOLD_WORD_INDEX = 1;

const DEFAULT_PROOF_POINTS = [
  'Software development company South Africa with 10+ years in production',
  'Mobile app development, web development, and custom business systems',
  'One senior engineer accountable for architecture and delivery',
  'Local payments, POPIA-aware patterns, and monthly retainers after launch',
];

type HeroSectionProps = {
  proofPoints?: string[];
};

export function HeroSection({ proofPoints = DEFAULT_PROOF_POINTS }: HeroSectionProps) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const proofRef = useRef<HTMLUListElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headlineRef.current) animateHeroHeadline(headlineRef.current);
    const support: HTMLElement[] = [];
    if (subRef.current) support.push(subRef.current);
    if (ctaRef.current) support.push(ctaRef.current);
    if (proofRef.current) support.push(proofRef.current);
    if (visualRef.current) support.push(visualRef.current);
    if (support.length) animateHeroSupport(support);
  }, []);

  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] min-h-[calc(100dvh-4.5rem)] flex-col justify-center py-6 sm:py-8 scroll-mt-0"
      style={{
        background:
          'radial-gradient(ellipse at 20% 50%, rgba(5, 150, 105, 0.06) 0%, transparent 60%)',
      }}
      aria-labelledby="home-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-32 left-1/2 h-72 w-[min(100%,36rem)] -translate-x-1/2 rounded-full bg-accent-gold/10 blur-3xl motion-reduce:blur-none" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-accent-emerald/10 blur-3xl motion-reduce:blur-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
      </div>

      <div className="container">
        <div className="mt-8 grid w-full max-w-none items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] xl:max-w-6xl">
          <div className="min-w-0">
            <SectionLabel className="mb-2 sm:mb-3">
              App development company · South Africa
            </SectionLabel>

            <h1
              id="home-hero-heading"
              ref={headlineRef}
              className="font-display font-black text-text-primary mb-3 sm:mb-4"
              style={{
                fontSize: 'var(--type-display-hero)',
                lineHeight: 'var(--leading-display)',
                letterSpacing: '-0.03em',
              }}
            >
              {HEADLINE_WORDS.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className={`hero-word inline-block mr-[0.2em] ${
                    i === GOLD_WORD_INDEX ? 'text-accent-gold' : ''
                  }`}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p
              ref={subRef}
              className="mt-3 sm:mt-4 text-text-secondary max-w-xl"
              style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
            >
              One senior product engineer from architecture to launch. Web, mobile, and business
              systems with local payments. Most clients move to a monthly retainer after go-live.
            </p>

            <p className="mt-3 text-sm text-text-muted max-w-xl">
              New here? Skim the{' '}
              <Link
                to={APP_DEVELOPMENT_COST_PAGE}
                className="text-accent-gold font-medium hover:underline underline-offset-4"
              >
                cost guide
              </Link>
              , run the{' '}
              <Link
                to={MVP_SCOPE_CHECKLIST_PAGE}
                className="text-accent-gold font-medium hover:underline underline-offset-4"
              >
                MVP checklist
              </Link>
              , then WhatsApp. If we fit, I send a proposal.
            </p>

            <div
              ref={ctaRef}
              className="mt-4 sm:mt-5 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3"
            >
              <Link to={APP_DEVELOPMENT_COST_PAGE} className="btn-primary min-h-[44px]">
                View 2026 build cost ranges
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden />
              </Link>
              <Link to={MVP_SCOPE_CHECKLIST_PAGE} className="btn-outline min-h-[44px]">
                <ClipboardList className="w-5 h-5 shrink-0" aria-hidden />
                {MVP_SCOPE_CHECKLIST_LABEL}
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline min-h-[44px] border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 focus-visible:ring-[#25D366]"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden />
                WhatsApp when you are ready
              </a>
            </div>

            <p className="mt-3 text-sm text-text-secondary">
              <Link
                to={PRICING_STRATEGY_PAGE}
                className="text-accent-gold font-medium hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-sm"
              >
                {PARTNERSHIP_CTA_LABEL}
              </Link>
              <span className="opacity-80"> · monthly retainers, not one-off handoffs</span>
            </p>

            <ul
              ref={proofRef}
              className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2"
              aria-label="Why teams work with Qwabi Engineering"
            >
              {proofPoints.map((point) => (
                <li
                  key={point}
                  className="inline-flex items-center gap-1.5 rounded-full border border-surface-border bg-surface-raised/80 px-3 py-1.5 text-xs md:text-sm text-text-secondary backdrop-blur-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-gold shrink-0" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={visualRef}
            className="hidden lg:block relative rounded-2xl border border-surface-border bg-surface-raised/60 p-2 shadow-lg shadow-black/20"
          >
            <img
              src="/images/utap-screenshot.png"
              alt="uTap student campus wallet app on mobile"
              width={420}
              height={840}
              loading="eager"
              decoding="async"
              className="w-full rounded-xl object-cover object-top max-h-[min(72vh,640px)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
