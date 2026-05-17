import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { STICKY_BANNER_COPY } from './conversion-popup-copy';
import { trackConversion } from '../../lib/conversion-analytics';
import { dismissBanner } from '../../lib/conversion-popup-storage';

type ConversionStickyBannerProps = {
  onDismiss: () => void;
};

export function ConversionStickyBanner({ onDismiss }: ConversionStickyBannerProps) {
  const handleDismiss = () => {
    dismissBanner();
    trackConversion('popup_dismiss', { surface: 'sticky_banner' });
    onDismiss();
  };

  const handleCta = () => {
    trackConversion('popup_cta', { surface: 'sticky_banner' });
  };

  return (
    <div
      className="fixed top-16 left-0 right-0 z-[90] border-b border-accent-gold/30 bg-[var(--color-text-inverse)] shadow-sm motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:duration-300"
      role="region"
      aria-label="Site announcement"
    >
      <div className="container flex flex-wrap items-center justify-between gap-2 py-2.5 pr-2">
        <p className="text-sm font-medium text-[var(--color-accent-gold)] flex-1 min-w-0">
          {STICKY_BANNER_COPY.message}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={STICKY_BANNER_COPY.to}
            onClick={handleCta}
            className="inline-flex items-center justify-center min-h-[36px] px-3 py-1.5 rounded-md text-xs font-semibold bg-[var(--color-accent-gold)] text-[var(--color-text-inverse)] hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)]"
          >
            {STICKY_BANNER_COPY.ctaLabel}
          </Link>
          <button
            type="button"
            onClick={handleDismiss}
            className="inline-flex items-center justify-center min-h-[36px] min-w-[36px] rounded-md text-[var(--color-accent-gold)]/80 hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)]"
            aria-label={STICKY_BANNER_COPY.dismissLabel}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
