import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { HOMEPAGE_TESTIMONIALS } from '../../data/client-testimonials';
import { WHATSAPP_URL } from '../../lib/site-config';
import { BookDiscoveryCallButton } from '../shared/BookDiscoveryCallButton';
import { MarketingSection } from '../shared/MarketingSection';
import { SectionLabel } from '../shared/SectionLabel';
import { TestimonialCard } from '../shared/TestimonialCard';

export function TestimonialsSection() {
  return (
    <MarketingSection id="testimonials">
      <SectionLabel className="mb-3">Client feedback</SectionLabel>
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
        Polished feedback from health, education, music, and consulting partners. Each entry
        links to the system we shipped.
      </p>

      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 md:gap-5 list-none p-0 m-0">
        {HOMEPAGE_TESTIMONIALS.map((item) => (
          <li key={item.id}>
            <TestimonialCard testimonial={item} />
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <BookDiscoveryCallButton variant="primary" />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline min-h-[44px]"
        >
          <MessageCircle className="w-5 h-5 shrink-0" aria-hidden />
          Message on WhatsApp
        </a>
        <p className="text-sm text-text-secondary max-w-md">
          Discovery booking opens soon. Until then, WhatsApp or the{' '}
          <Link
            to="/get-a-quote"
            className="text-accent-gold font-medium hover:underline underline-offset-4"
          >
            project scope estimator
          </Link>{' '}
          are the fastest paths.
        </p>
      </div>
    </MarketingSection>
  );
}
