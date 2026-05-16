import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

export type BudgetBandOption =
  | 'under_50k'
  | '50k_150k'
  | '150k_plus'
  | 'funded_startup'
  | 'not_sure';

type LeadCaptureFormProps = {
  formType: string;
  sourcePage: string;
  headline?: string;
  subhead?: string;
};

const BUDGET_OPTIONS: { value: BudgetBandOption; label: string }[] = [
  { value: 'under_50k', label: 'Under R50k' },
  { value: '50k_150k', label: 'R50k to R150k' },
  { value: '150k_plus', label: 'R150k+' },
  { value: 'funded_startup', label: 'Funded startup' },
  { value: 'not_sure', label: 'Not sure yet' },
];

export function LeadCaptureForm({
  formType,
  sourcePage,
  headline = 'Tell me about the build',
  subhead = 'I reply within one business day. No newsletter spam.',
}: LeadCaptureFormProps) {
  const formId = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [budgetBand, setBudgetBand] = useState<BudgetBandOption>('not_sure');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (message.trim().length < 20) {
      setError('Please add a bit more detail (at least 20 characters).');
      return;
    }
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
          company: company.trim() || undefined,
          budgetBand,
          message: message.trim(),
          sourcePage,
          formType,
          consent: true,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Try WhatsApp instead.');
        return;
      }
      setSuccess(true);
    } catch {
      setError('Network error. Try again or use WhatsApp.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div
        className="p-6 md:p-8 rounded-2xl border border-primary/25 bg-primary/5"
        role="status"
      >
        <h2 className="text-lg font-bold text-foreground mb-2">Received</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Thanks, {name.split(' ')[0] || 'there'}. I will read your note and reply by email.
        </p>
      </div>
    );
  }

  return (
    <section
      className="p-6 md:p-8 rounded-2xl border border-border bg-card"
      aria-labelledby={`${formId}-heading`}
    >
      <h2 id={`${formId}-heading`} className="text-xl font-bold text-foreground mb-1">
        {headline}
      </h2>
      <p className="text-sm text-muted-foreground mb-6">{subhead}</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={`${formId}-name`}>Name</Label>
            <input
              id={`${formId}-name`}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              autoComplete="name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${formId}-email`}>Email</Label>
            <input
              id={`${formId}-email`}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={`${formId}-company`}>Company (optional)</Label>
            <input
              id={`${formId}-company`}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${formId}-budget`}>Budget band</Label>
            <select
              id={`${formId}-budget`}
              value={budgetBand}
              onChange={(e) => setBudgetBand(e.target.value as BudgetBandOption)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {BUDGET_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${formId}-message`}>What are you building?</Label>
          <textarea
            id={`${formId}-message`}
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Timeline, stack, payments, users, what is broken today..."
          />
        </div>

        <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 rounded border-input"
            required
          />
          <span>
            I agree to the{' '}
            <Link to="/privacy" className="text-primary underline underline-offset-2">
              privacy policy
            </Link>
            . My details are used to respond to this enquiry only.
          </span>
        </label>

        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin motion-reduce:animate-none" aria-hidden />
              Sending
            </>
          ) : (
            'Send enquiry'
          )}
        </Button>
      </form>
    </section>
  );
}
