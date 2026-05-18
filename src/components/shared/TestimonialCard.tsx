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
