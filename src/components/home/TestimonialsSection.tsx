import { MessageCircle } from 'lucide-react';
import { CLIENT_TESTIMONIALS } from '../../data/client-testimonials';
import { WHATSAPP_URL } from '../../lib/site-config';
import { MarketingSection } from '../shared/MarketingSection';
import { SectionLabel } from '../shared/SectionLabel';

export function TestimonialsSection() {
  return (
    <MarketingSection id="testimonials">
      <SectionLabel className="mb-3">What clients say</SectionLabel>
      <h2
        className="font-display font-bold text-text-primary mb-4 max-w-2xl"
        style={{
          fontSize: 'var(--type-display-md)',
          lineHeight: 'var(--leading-heading)',
          letterSpacing: '-0.02em',
        }}
      >
        Teams who needed software that keeps working
      </h2>
      <p
        className="text-text-secondary max-w-2xl mb-10"
        style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
      >
        Short notes from health, labs, and music partners. No agency account managers in the
        middle.
      </p>

      <ul className="grid gap-4 md:grid-cols-3 md:gap-5 list-none p-0 m-0">
        {CLIENT_TESTIMONIALS.map((item) => (
          <li key={item.id}>
            <figure className="flex h-full flex-col rounded-2xl border border-surface-border bg-surface-raised p-5 md:p-6">
              <blockquote className="flex-1 text-sm text-text-secondary leading-relaxed mb-6">
                <p>&ldquo;{item.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-surface-border pt-4">
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-surface-border"
                />
                <cite className="min-w-0 not-italic block">
                  <p className="font-semibold text-text-primary text-sm truncate">{item.name}</p>
                  <p className="text-xs text-text-secondary leading-snug">{item.role}</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    {item.organization} · {item.location}
                  </p>
                </cite>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary min-h-[44px]"
        >
          <MessageCircle className="w-5 h-5 shrink-0" aria-hidden />
          Discuss your stack on WhatsApp
        </a>
        <p className="text-sm text-text-secondary max-w-md">
          Tell me what you run today and what keeps breaking. If we fit, I send a written proposal
          with retainer tier and first priorities.
        </p>
      </div>
    </MarketingSection>
  );
}
