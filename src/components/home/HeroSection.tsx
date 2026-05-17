import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { animateHeroHeadline, animateHeroSupport } from '../../lib/animations';
import {
  APP_DEVELOPMENT_COST_PAGE,
  MVP_SCOPE_CHECKLIST_PAGE,
  PARTNERSHIP_CTA_LABEL,
  PRICING_STRATEGY_PAGE,
  WHATSAPP_URL,
} from '../../lib/site-config';
import { SectionLabel } from '../shared/SectionLabel';
import { ClientLogoStrip } from './ClientLogoStrip';

const HEADLINE_WORDS = [
  'Senior',
  'product',
  'engineer',
  'for',
  'South',
  'African',
  'founders',
  'building',
  'apps,',
  'platforms,',
  'and',
  'ops',
  'systems',
] as const;

const GOLD_WORD_INDICES = new Set([4, 5]);

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
  const trustRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headlineRef.current) animateHeroHeadline(headlineRef.current);
    const support: HTMLElement[] = [];
    if (subRef.current) support.push(subRef.current);
    if (ctaRef.current) support.push(ctaRef.current);
    if (proofRef.current) support.push(proofRef.current);
    if (trustRef.current) support.push(trustRef.current);
    if (visualRef.current) support.push(visualRef.current);
    if (support.length) animateHeroSupport(support);
  }, []);

  return (
    <section
      className="relative isolate flex min-h-0 flex-col justify-center py-8 sm:py-10 lg:min-h-[calc(100svh-4.5rem)] lg:min-h-[calc(100dvh-4.5rem)] lg:py-8 scroll-mt-0"
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
        <div className="mt-4 grid w-full max-w-none items-center gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] xl:max-w-6xl">
          <div className="min-w-0">
            <SectionLabel className="mb-2 sm:mb-3">
              App development company · South Africa
            </SectionLabel>

            <h1
              id="home-hero-heading"
              ref={headlineRef}
              className="font-display font-black text-text-primary mb-3 sm:mb-4 text-balance max-w-3xl"
              style={{
                fontSize: 'clamp(1.625rem, 3.6vw, 2.875rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.025em',
              }}
            >
              {HEADLINE_WORDS.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className={`hero-word inline-block mr-[0.2em] ${
                    GOLD_WORD_INDICES.has(i) ? 'text-accent-gold' : ''
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
              Researching first? See the{' '}
              <Link
                to={APP_DEVELOPMENT_COST_PAGE}
                className="text-accent-gold font-medium hover:underline underline-offset-4"
              >
                cost guide
              </Link>{' '}
              or{' '}
              <Link
                to={MVP_SCOPE_CHECKLIST_PAGE}
                className="text-accent-gold font-medium hover:underline underline-offset-4"
              >
                MVP checklist
              </Link>
              . If we fit after WhatsApp, I send a written proposal.
            </p>

            <div
              ref={ctaRef}
              className="mt-4 sm:mt-5 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary min-h-[44px]"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden />
                Message on WhatsApp
              </a>
              <Link to={PRICING_STRATEGY_PAGE} className="btn-outline min-h-[44px]">
                {PARTNERSHIP_CTA_LABEL}
              </Link>
              <Link to={APP_DEVELOPMENT_COST_PAGE} className="btn-outline min-h-[44px]">
                View 2026 build cost ranges
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden />
              </Link>
            </div>

            <p className="mt-3 text-sm text-text-secondary">
              Monthly retainers after go-live, not one-off handoffs.
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

        <div ref={trustRef} className="mt-8 lg:mt-10 max-w-3xl xl:max-w-none">
          <ClientLogoStrip />
        </div>
      </div>
    </section>
  );
}
