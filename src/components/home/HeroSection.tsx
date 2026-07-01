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
import { HeroMetricStrip } from '../HeroMetricStrip';
import { HeroTeamShowcase } from '../HeroTeamShowcase';
import { ClientLogoStrip } from './ClientLogoStrip';

const HEADLINE_WORDS = [
  'Software',
  'that',
  'ships',
  'in',
  'days,',
  'not',
  'quarters',
] as const;

const GOLD_WORD_INDICES = new Set([4, 6]);

export function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as Window & { __PRERENDER__?: boolean }).__PRERENDER__) {
      return;
    }
    if (headlineRef.current) animateHeroHeadline(headlineRef.current);
    const support: HTMLElement[] = [];
    if (subRef.current) support.push(subRef.current);
    if (ctaRef.current) support.push(ctaRef.current);
    if (metricsRef.current) support.push(metricsRef.current);
    if (teamRef.current) support.push(teamRef.current);
    if (trustRef.current) support.push(trustRef.current);
    if (support.length) animateHeroSupport(support);
  }, []);

  return (
    <section
      className="relative isolate flex min-h-0 flex-col justify-center py-8 sm:py-10 lg:min-h-[calc(100svh-4.5rem)] lg:min-h-[calc(100dvh-4.5rem)] lg:py-8 scroll-mt-0"
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

      <div className="container max-w-none xl:max-w-7xl">
        <div className="mt-4 w-full lg:mt-8">
          <SectionLabel className="mb-3 sm:mb-4">
            Qwabi Engineering · South Africa
          </SectionLabel>

          <h1
            id="home-hero-heading"
            ref={headlineRef}
            className="font-display font-black text-text-primary mb-4 sm:mb-5 text-balance max-w-[18ch]"
            style={{
              fontSize: 'var(--type-display-mega)',
              lineHeight: 'var(--leading-display)',
              letterSpacing: '-0.04em',
            }}
          >
            {HEADLINE_WORDS.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className={`hero-word inline-block mr-[0.18em] ${
                  GOLD_WORD_INDICES.has(i) ? 'text-accent-gold' : ''
                }`}
              >
                {word}
              </span>
            ))}
          </h1>

          <p
            ref={subRef}
            className="mt-3 sm:mt-4 text-text-secondary max-w-xl text-pretty"
            style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
          >
            We build the systems. You run the business. Custom software, mobile apps, and AI
            automation for South African SMEs. One senior engineer from architecture to launch.
          </p>

          <p className="mt-3 text-sm text-text-muted max-w-xl">
            <Link
              to={ABOUT_PAGE}
              className="text-accent-gold font-medium hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold rounded-sm"
            >
              {FOUNDER_PAGE_LABEL}
            </Link>
            {' · '}
            <Link
              to={APP_DEVELOPMENT_COST_PAGE}
              className="text-accent-gold font-medium hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold rounded-sm"
            >
              cost guide
            </Link>
            {', '}
            <Link
              to={MVP_SCOPE_CHECKLIST_PAGE}
              className="text-accent-gold font-medium hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold rounded-sm"
            >
              MVP checklist
            </Link>
            {', or '}
            <Link
              to="/services/ai-powered-rapid-app-development"
              className="text-accent-gold font-medium hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold rounded-sm"
            >
              rapid build system
            </Link>
            .
          </p>

          <div
            ref={ctaRef}
            className="mt-5 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3"
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

          <div ref={metricsRef} className="mt-8 sm:mt-10 lg:mt-12">
            <HeroMetricStrip />
          </div>

          <div ref={teamRef} className="mt-1">
            <HeroTeamShowcase />
          </div>
        </div>

        <div ref={trustRef} className="mt-8 lg:mt-10">
          <ClientLogoStrip />
        </div>
      </div>
    </section>
  );
}
