import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import {
  APP_DEVELOPMENT_COST_PAGE,
  PARTNERSHIP_CTA_LABEL,
  PRICING_STRATEGY_PAGE,
  WHATSAPP_URL,
} from '../lib/site-config';

type HomeHeroProps = {
  proofPoints: string[];
};

const ctaBase =
  'inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export function HomeHero({ proofPoints }: HomeHeroProps) {
  return (
    <section
      className="relative isolate pt-24 pb-12 md:pt-28 md:pb-16 scroll-mt-0"
      aria-labelledby="home-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-32 left-1/2 h-72 w-[min(100%,36rem)] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl motion-reduce:blur-none" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-accent/5 blur-3xl motion-reduce:blur-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          App development company · South Africa
        </p>

        <h1
          id="home-hero-heading"
          className="mt-4 text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.08] tracking-tight text-balance text-foreground"
        >
          Mobile and custom software for South African businesses
        </h1>

        <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl text-pretty">
          One senior product engineer from architecture to launch. Web, mobile, and business
          systems with local payments and retainers after go-live.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${ctaBase} bg-[#25D366] text-white hover:bg-[#128C7E] shadow-md shadow-black/20 focus-visible:ring-[#25D366]`}
          >
            <MessageCircle className="w-5 h-5 shrink-0" aria-hidden />
            Discuss your product
          </a>
          <Link
            to={APP_DEVELOPMENT_COST_PAGE}
            className={`${ctaBase} bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary`}
          >
            View cost ranges
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden />
          </Link>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          <Link
            to={PRICING_STRATEGY_PAGE}
            className="text-primary font-medium hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            {PARTNERSHIP_CTA_LABEL}
          </Link>
          <span className="text-muted-foreground/80"> · scoped for long-term ownership</span>
        </p>

        <ul
          className="mt-8 flex flex-wrap gap-2"
          aria-label="Why teams work with Qwabi Engineering"
        >
          {proofPoints.map((point) => (
            <li
              key={point}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/60 px-3 py-1.5 text-xs md:text-sm text-muted-foreground backdrop-blur-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
