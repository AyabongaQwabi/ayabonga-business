import { useEffect, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { trackConversion } from '../../lib/conversion-analytics';
import { markSessionConverted } from '../../lib/conversion-popup-storage';
import { MVP_SCOPE_CHECKLIST_PATH } from '../../data/mvp-scope-checklist';

type ChecklistEmailDialogProps = {
  open: boolean;
  summary: string;
  onOpenChange: (open: boolean) => void;
};

export function ChecklistEmailDialog({
  open,
  summary,
  onOpenChange,
}: ChecklistEmailDialogProps) {
  const formId = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      trackConversion('popup_view', { surface: 'checklist_email' });
    }
  }, [open]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!consent) {
      setError('Please accept the privacy notice to continue.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: `MVP scope checklist export:\n\n${summary}`,
          sourcePage: MVP_SCOPE_CHECKLIST_PATH,
          formType: 'mvp_checklist_email',
          consent: true,
          budgetBand: 'not_sure',
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Try WhatsApp instead.');
        return;
      }
      markSessionConverted();
      trackConversion('popup_submit', { surface: 'checklist_email' });
      setSuccess(true);
    } catch {
      setError('Network error. Try again or use WhatsApp.');
    } finally {
      setLoading(false);
    }
  }

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      trackConversion('popup_dismiss', { surface: 'checklist_email' });
    }
    onOpenChange(next);
    if (!next) {
      setSuccess(false);
      setError(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-surface-raised border-surface-border">
        <DialogHeader>
          <DialogTitle className="font-display text-text-primary">
            Email my checklist summary
          </DialogTitle>
          <DialogDescription className="text-text-secondary">
            Get your checked items in your inbox so you can share them with a co-founder or
            developer.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <p className="text-sm text-accent-emerald font-medium" role="status">
            Sent. Check your inbox for the summary.
          </p>
        ) : (
          <form id={formId} onSubmit={onSubmit} className="space-y-4" noValidate>
            <div>
              <Label htmlFor={`${formId}-name`}>Name</Label>
              <input
                id={`${formId}-name`}
                name="name"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input min-h-[44px] mt-1 w-full"
              />
            </div>
            <div>
              <Label htmlFor={`${formId}-email`}>Email</Label>
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input min-h-[44px] mt-1 w-full"
              />
            </div>
            <label className="flex gap-3 items-start text-sm text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-surface-border"
                required
              />
              <span>
                I agree to the{' '}
                <Link
                  to="/privacy"
                  className="text-accent-gold underline underline-offset-4"
                >
                  privacy policy
                </Link>
                . My checklist summary will be emailed to me and used to follow up on scope.
              </span>
            </label>
            {error ? (
              <p className="form-field-error" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary min-h-[44px] w-full justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                'Send my summary'
              )}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
