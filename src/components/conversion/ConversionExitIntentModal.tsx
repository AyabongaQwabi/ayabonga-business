import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { EXIT_INTENT_COPY } from './conversion-popup-copy';
import { trackConversion } from '../../lib/conversion-analytics';
import {
  dismissExit,
  markSessionConverted,
  markExitShown,
  markWhatsAppClicked,
} from '../../lib/conversion-popup-storage';

type ConversionExitIntentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ConversionExitIntentModal({
  open,
  onOpenChange,
}: ConversionExitIntentModalProps) {
  const handleDismiss = () => {
    dismissExit();
    trackConversion('popup_dismiss', { surface: 'exit_intent' });
    onOpenChange(false);
  };

  const handleWhatsApp = () => {
    markWhatsAppClicked();
    markSessionConverted();
    trackConversion('popup_cta', { surface: 'exit_intent', action: 'whatsapp' });
    markExitShown();
    onOpenChange(false);
  };

  const handleSecondary = () => {
    markSessionConverted();
    trackConversion('popup_cta', { surface: 'exit_intent', action: 'retainers' });
    markExitShown();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) handleDismiss();
        else onOpenChange(next);
      }}
    >
      <DialogContent className="sm:max-w-[480px] bg-surface-raised border-surface-border">
        <DialogHeader>
          <DialogTitle className="font-display text-text-primary pr-8">
            {EXIT_INTENT_COPY.headline}
          </DialogTitle>
          <DialogDescription className="text-text-secondary leading-relaxed">
            {EXIT_INTENT_COPY.subhead}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-col gap-2 sm:space-x-0">
          <a
            href={EXIT_INTENT_COPY.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsApp}
            className="btn-primary min-h-[44px] w-full justify-center bg-[#25D366] hover:bg-[#128C7E] focus-visible:ring-[#25D366]"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden />
            {EXIT_INTENT_COPY.whatsappLabel}
          </a>
          <Link
            to={EXIT_INTENT_COPY.secondaryTo}
            onClick={handleSecondary}
            className="btn-outline min-h-[44px] w-full justify-center"
          >
            {EXIT_INTENT_COPY.secondaryLabel}
          </Link>
          <button
            type="button"
            onClick={handleDismiss}
            className="text-sm text-text-muted hover:text-text-secondary min-h-[44px]"
          >
            {EXIT_INTENT_COPY.declineLabel}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
