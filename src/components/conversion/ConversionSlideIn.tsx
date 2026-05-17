import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import type { SlideInCopy } from './conversion-popup-copy';
import { trackConversion } from '../../lib/conversion-analytics';
import {
  dismissPromo,
  markSessionConverted,
  markSlideInShown,
} from '../../lib/conversion-popup-storage';

type ConversionSlideInProps = {
  copy: SlideInCopy;
  onClose: () => void;
};

export function ConversionSlideIn({ copy, onClose }: ConversionSlideInProps) {
  const handleDismiss = () => {
    dismissPromo();
    trackConversion('popup_dismiss', { surface: 'slide_in', variant: copy.variant });
    onClose();
  };

  const handleCta = () => {
    markSessionConverted();
    trackConversion('popup_cta', { surface: 'slide_in', variant: copy.variant });
    markSlideInShown();
    onClose();
  };

  return (
    <aside
      className="fixed bottom-6 left-4 right-4 sm:right-auto sm:max-w-[min(100%,22rem)] z-[55] rounded-xl border border-surface-border bg-surface-raised shadow-xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-300"
      role="dialog"
      aria-modal="false"
      aria-labelledby="conversion-slidein-title"
      aria-describedby="conversion-slidein-desc"
    >
      <div className="p-5 relative">
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-3 right-3 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-text-muted hover:text-text-primary hover:bg-surface-overlay/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
          aria-label="Close"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
        <h2
          id="conversion-slidein-title"
          className="font-display font-bold text-text-primary text-base pr-10"
        >
          {copy.headline}
        </h2>
        <p
          id="conversion-slidein-desc"
          className="mt-2 text-sm text-text-secondary leading-relaxed"
        >
          {copy.subhead}
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <Link
            to={copy.to}
            onClick={handleCta}
            className="btn-primary min-h-[44px] text-sm justify-center"
          >
            {copy.ctaLabel}
          </Link>
          <button
            type="button"
            onClick={handleDismiss}
            className="text-sm text-text-muted hover:text-text-secondary underline-offset-4 hover:underline min-h-[44px]"
          >
            Not now
          </button>
        </div>
      </div>
    </aside>
  );
}
