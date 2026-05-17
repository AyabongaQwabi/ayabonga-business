import { ExternalLink } from 'lucide-react';
import type { ClientTestimonial } from '../../data/client-testimonials';
import { AvatarPlaceholder } from './AvatarPlaceholder';

type TestimonialCardProps = {
  testimonial: ClientTestimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const {
    quote,
    name,
    role,
    organization,
    location,
    projectSummary,
    projectUrl,
    imageSrc,
    imageAlt,
  } = testimonial;

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-surface-border bg-surface-raised p-5 md:p-6 transition-colors hover:border-accent-gold/25 motion-reduce:transition-none">
      <blockquote className="flex-1 mb-5">
        <p
          className="text-text-secondary leading-relaxed"
          style={{ fontSize: 'var(--type-body-sm, 0.875rem)' }}
        >
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>

      <div className="mb-5 rounded-xl border border-surface-border bg-surface-base/60 p-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-gold mb-1">
          Project delivered
        </p>
        <p className="text-sm text-text-secondary leading-snug">{projectSummary}</p>
        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent-gold hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-sm"
        >
          View live work
          <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </div>

      <figcaption className="flex items-center gap-3 border-t border-surface-border pt-4 mt-auto">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt ?? name}
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
            className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-surface-border"
          />
        ) : (
          <AvatarPlaceholder name={name} size={48} />
        )}
        <cite className="min-w-0 not-italic block">
          <p className="font-semibold text-text-primary text-sm truncate">{name}</p>
          <p className="text-xs text-text-secondary leading-snug">
            {role}, {organization}
          </p>
          <p className="text-xs text-text-muted mt-0.5">{location}</p>
        </cite>
      </figcaption>
    </figure>
  );
}
