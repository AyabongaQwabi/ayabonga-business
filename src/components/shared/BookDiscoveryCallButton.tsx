import { Calendar } from 'lucide-react';
import {
  DISCOVERY_CALL_ENABLED,
  DISCOVERY_CALL_LABEL,
  DISCOVERY_CALL_URL,
} from '../../lib/site-config';
import { cn } from '../../lib/utils';

type BookDiscoveryCallButtonProps = {
  variant?: 'primary' | 'outline' | 'inverse';
  className?: string;
  showComingSoon?: boolean;
};

/**
 * Discovery scheduling CTA. Disabled until Cal.com (or equivalent) is live.
 */
export function BookDiscoveryCallButton({
  variant = 'outline',
  className,
  showComingSoon = true,
}: BookDiscoveryCallButtonProps) {
  const enabled = DISCOVERY_CALL_ENABLED && Boolean(DISCOVERY_CALL_URL);

  const base =
    'relative inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-md font-technical font-semibold text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

  const variantClass =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'inverse'
        ? 'border border-text-inverse/40 text-text-inverse hover:bg-black/5 focus-visible:outline-text-inverse'
        : 'btn-outline';

  if (enabled) {
    return (
      <a
        href={DISCOVERY_CALL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variantClass, className)}
      >
        <Calendar className="w-5 h-5 shrink-0" aria-hidden />
        {DISCOVERY_CALL_LABEL}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      title="Discovery booking opens soon. Use WhatsApp or the estimate tool in the meantime."
      className={cn(
        base,
        variantClass,
        'cursor-not-allowed opacity-90',
        variant === 'primary' && 'brightness-[0.92] saturate-[0.85]',
        className,
      )}
    >
      <Calendar className="w-5 h-5 shrink-0 opacity-80" aria-hidden />
      <span>{DISCOVERY_CALL_LABEL}</span>
      {showComingSoon ? (
        <span
          className={cn(
            'ml-1 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider',
            variant === 'inverse'
              ? 'bg-text-inverse/15 text-text-inverse'
              : 'bg-surface-overlay text-text-muted',
          )}
        >
          Soon
        </span>
      ) : null}
    </button>
  );
}
