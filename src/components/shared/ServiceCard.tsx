import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SectionLabel } from './SectionLabel';
import {
  ServiceIllustration,
  type ServiceIllustrationVariant,
} from '../ServiceIllustration';

export type ServiceCardProps = {
  label: string;
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
  illustration?: ServiceIllustrationVariant;
  className?: string;
};

export function ServiceCard({
  label,
  title,
  description,
  href,
  icon: Icon,
  illustration,
  className,
}: ServiceCardProps) {
  return (
    <Link
      to={href}
      className={cn(
        'service-card service-card--compact scroll-reveal flex h-full min-h-0 flex-col group',
        className,
      )}
    >
      {illustration ? (
        <ServiceIllustration
          variant={illustration}
          alt=""
          className="mb-3 aspect-[16/9] max-h-36 w-full max-w-none overflow-hidden rounded-lg"
        />
      ) : null}
      <SectionLabel as="span" className="mb-2 block">
        {label}
      </SectionLabel>
      {Icon ? (
        <Icon
          className="mb-2 h-6 w-6 shrink-0 text-accent-gold"
          aria-hidden
        />
      ) : null}
      <h3 className="font-display font-bold text-text-primary mb-2 text-[length:var(--type-heading-sm)] leading-[var(--leading-heading)] tracking-tight transition-colors group-hover:text-accent-gold">
        {title}
      </h3>
      <p className="mt-auto text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
    </Link>
  );
}
