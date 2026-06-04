import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { animateHeroHeadline, animateHeroSupport } from '../../lib/animations';
import {
  ABOUT_PAGE,
  APP_DEVELOPMENT_COST_PAGE,
  FOUNDER_PAGE_LABEL,
  GET_ESTIMATE_LABEL,
  MVP_SCOPE_CHECKLIST_PAGE,
  PRICING_STRATEGY_PAGE,
  RETAINER_CTA_LABEL,
  QUOTE_PAGE,
  WHATSAPP_URL,
} from '../../lib/site-config';
import { BookDiscoveryCallButton } from '../shared/BookDiscoveryCallButton';
import { SectionLabel } from '../shared/SectionLabel';
import { ClientLogoStrip } from './ClientLogoStrip';

const HEADLINE_WORDS = [
  'Custom',
  'software',
  'development',
  'for',
  'South',
  'African',
  'businesses',
] as const;

const GOLD_WORD_INDICES = new Set([4, 5]);

export function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as Window & { __PRERENDER__?: boolean }).__PRERENDER__) {
      return;
    }
    if (headlineRef.current) animateHeroHeadline(headlineRef.current);
    const support: HTMLElement[] = [];
    if (subRef.current) support.push(subRef.current);
    if (ctaRef.current) support.push(ctaRef.current);
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
              Software development company · South Africa
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
              We build custom software, mobile apps, business systems, and web platforms for teams
              across South Africa. A senior engineer leads delivery from architecture to launch.
              Based in the Eastern Cape; remote-friendly nationwide. Many clients move to a
              monthly retainer after go-live.
            </p>

            <p className="mt-3 text-sm text-text-muted max-w-xl">
              <Link
                to={ABOUT_PAGE}
                className="text-accent-gold font-medium hover:underline underline-offset-4"
              >
                {FOUNDER_PAGE_LABEL}
              </Link>
              {' · '}
              Researching first? See the{' '}
              <Link
                to={APP_DEVELOPMENT_COST_PAGE}
                className="text-accent-gold font-medium hover:underline underline-offset-4"
              >
                cost guide
              </Link>
              {', '}
              <Link
                to={MVP_SCOPE_CHECKLIST_PAGE}
                className="text-accent-gold font-medium hover:underline underline-offset-4"
              >
                MVP checklist
              </Link>
              {', or '}
              <Link
                to="/services/ai-powered-rapid-app-development"
                className="text-accent-gold font-medium hover:underline underline-offset-4"
              >
                rapid build system
              </Link>
              . If we fit after WhatsApp, we send a written proposal with scope and next steps.
            </p>

            <div
              ref={ctaRef}
              className="mt-4 sm:mt-5 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3"
            >
              <Link to={QUOTE_PAGE} className="btn-primary min-h-[44px]">
                {GET_ESTIMATE_LABEL}
              </Link>
              <BookDiscoveryCallButton variant="outline" />
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline min-h-[44px]"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden />
                WhatsApp
              </a>
              <Link to={PRICING_STRATEGY_PAGE} className="btn-outline min-h-[44px]">
                {RETAINER_CTA_LABEL}
              </Link>
              <Link
                to={APP_DEVELOPMENT_COST_PAGE}
                className="btn-outline min-h-[44px] hidden sm:inline-flex"
              >
                View 2026 build cost ranges
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden />
              </Link>
            </div>

            <p className="mt-3 text-sm text-text-secondary">
              Monthly retainers after go-live, not one-off handoffs.
            </p>
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
