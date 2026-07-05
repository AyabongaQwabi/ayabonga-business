import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Send } from 'lucide-react';
import {
  fetchLead,
  fetchTemplates,
  patchLead,
  sendLeadEmail,
  type EmailTemplate,
  type LeadRecord,
  type LeadStatus,
} from '../../lib/admin-api';
import {
  leadEmailStatus,
  leadEmailStatusLabel,
} from '../../lib/lead-email-status';
import { previewOutreachContent } from '../../lib/merge-template';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Skeleton } from '../../components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../components/ui/alert-dialog';

const STATUSES: LeadStatus[] = [
  'new',
  'qualified',
  'contacted',
  'replied',
  'won',
  'lost',
];

export default function AdminLeadDetail() {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<LeadRecord | null>(null);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<LeadStatus>('new');
  const [templateSlug, setTemplateSlug] = useState('');
  const [draftSubject, setDraftSubject] = useState('');
  const [draftText, setDraftText] = useState('');

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const [l, t] = await Promise.all([fetchLead(id), fetchTemplates()]);
      setLead(l);
      setTemplates(t);
      setNotes(l.notes ?? '');
      setStatus(l.status);
      setTemplateSlug(l.outreachDraft?.templateSlug ?? t[0]?.slug ?? '');
      setDraftSubject(l.outreachDraft?.subject ?? '');
      setDraftText(l.outreachDraft?.text ?? '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load lead');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  const selectedTemplate = useMemo(
    () => templates.find((t) => t.slug === templateSlug) ?? null,
    [templates, templateSlug],
  );

  const mergedPreview = useMemo(() => {
    if (!lead) return null;
    return previewOutreachContent(lead, {
      template: selectedTemplate,
      draftSubject,
      draftText,
    });
  }, [lead, selectedTemplate, draftSubject, draftText]);

  function applyTemplate(slug: string) {
    const t = templates.find((x) => x.slug === slug);
    if (!t) return;
    setTemplateSlug(slug);
    setDraftSubject(t.subject);
    setDraftText(t.text);
  }

  async function saveNotesAndStatus() {
    if (!id) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await patchLead(id, {
        status,
        notes,
        outreachDraft: {
          subject: draftSubject,
          text: draftText,
          templateSlug: templateSlug || undefined,
        },
      });
      setLead(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function confirmSend() {
    if (!id || !lead?.email) return;
    setSending(true);
    setError(null);
    try {
      const updated = await sendLeadEmail(id, {
        templateSlug: templateSlug || undefined,
        subject: draftSubject,
        text: draftText,
      });
      setLead(updated);
      setStatus(updated.status);
      if (updated.outreachDraft?.subject) {
        setDraftSubject(updated.outreachDraft.subject);
      }
      if (updated.outreachDraft?.text) {
        const bodyOnly = updated.outreachDraft.text.split('\n\nAyabonga Qwabi')[0];
        setDraftText(bodyOnly);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Send failed');
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!lead) {
    return (
      <p className="text-destructive">
        {error || 'Lead not found.'}{' '}
        <Link to="/admin/leads" className="underline">
          Back to list
        </Link>
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <Link
        to="/admin/leads"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden />
        All leads
      </Link>

      <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{lead.name || lead.company || 'Lead'}</h1>
          <p className="text-sm text-muted-foreground">
            {lead.email || 'No email'} · {lead.kind}
            {lead.campaign ? ` · ${lead.campaign}` : ''} · {lead.company || 'No company'}
          </p>
          <p className="text-sm mt-2">
            <span className="font-medium">Outreach: </span>
            {leadEmailStatusLabel(leadEmailStatus(lead))}
            {lead.lastSentAt ? (
              <span className="text-muted-foreground">
                {' '}
                · last sent {new Date(lead.lastSentAt).toLocaleString('en-ZA')}
              </span>
            ) : null}
            {(lead.sendCount ?? 0) > 0 ? (
              <span className="text-muted-foreground"> · {lead.sendCount} send(s)</span>
            ) : null}
          </p>
          {lead.lastSendError ? (
            <p className="text-sm text-destructive mt-1" role="alert">
              Last send failed: {lead.lastSendError}
              {lead.lastSendAttemptAt
                ? ` (${new Date(lead.lastSendAttemptAt).toLocaleString('en-ZA')})`
                : ''}
            </p>
          ) : null}
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as LeadStatus)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm w-full sm:w-auto"
          aria-label="Lead status"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </header>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border p-5 space-y-3">
          <h2 className="font-semibold">Intelligence</h2>
          {lead.score != null ? (
            <p className="text-sm">
              Score <strong>{lead.score}</strong>
              {lead.tier ? ` · Tier ${lead.tier}` : ''}
            </p>
          ) : null}
          {lead.whyNow ? (
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Why now: </span>
              {lead.whyNow}
            </p>
          ) : null}
          {lead.warmPath ? (
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Warm path: </span>
              {lead.warmPath}
            </p>
          ) : null}
          {lead.budgetSignal ? (
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Budget: </span>
              {lead.budgetSignal}
            </p>
          ) : null}
          {lead.verticals?.length ? (
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Verticals: </span>
              {lead.verticals.join(', ')}
            </p>
          ) : null}
          {lead.linkedInUrl ? (
            <a
              href={lead.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary underline"
            >
              LinkedIn profile
            </a>
          ) : null}
          {lead.message ? (
            <div className="text-sm">
              <p className="font-medium mb-1">Message</p>
              <p className="text-muted-foreground whitespace-pre-wrap">{lead.message}</p>
            </div>
          ) : null}
          {lead.sourcePage ? (
            <p className="text-xs text-muted-foreground">
              Source: {lead.sourcePage} ({lead.formType})
            </p>
          ) : null}
        </section>

        <section className="rounded-xl border border-border p-5 space-y-4">
          <h2 className="font-semibold">Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Call notes, intro path, objections..."
          />
          <Button type="button" onClick={() => void saveNotesAndStatus()} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin motion-reduce:animate-none" aria-hidden />
                Saving
              </>
            ) : (
              'Save notes and status'
            )}
          </Button>
        </section>
      </div>

      <section className="rounded-xl border border-border p-5 space-y-4">
        <h2 className="font-semibold">Outreach draft</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="template-pick">Template</Label>
            <select
              id="template-pick"
              value={templateSlug}
              onChange={(e) => applyTemplate(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">Custom draft</option>
              {templates.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="draft-subject">Subject</Label>
          <input
            id="draft-subject"
            value={draftSubject}
            onChange={(e) => setDraftSubject(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="draft-text">Body</Label>
          <textarea
            id="draft-text"
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            rows={10}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Placeholders merge on send. Edit with {'{{firstName}}'}, {'{{company}}'}, {'{{whyNow}}'},
          {' {{yourName}}'}, {'{{siteUrl}}'}.
        </p>

        {mergedPreview ? (
          <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Preview after merge
            </p>
            <p className="text-sm">
              <span className="font-medium">Subject: </span>
              {mergedPreview.subject || '(empty)'}
            </p>
            <pre className="text-xs whitespace-pre-wrap font-sans text-muted-foreground max-h-48 overflow-y-auto">
              {mergedPreview.text || '(empty body)'}
            </pre>
            {mergedPreview.hasUnresolved ? (
              <p className="text-xs text-destructive" role="alert">
                Unresolved placeholders remain. Send will be blocked until these are fixed.
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => void saveNotesAndStatus()}
            disabled={saving}
          >
            Save draft
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                disabled={
                  !lead.email ||
                  lead.status === 'lost' ||
                  sending ||
                  mergedPreview?.hasUnresolved
                }
              >
                <Send className="w-4 h-4 mr-2" aria-hidden />
                Send email
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Send this email?</AlertDialogTitle>
                <AlertDialogDescription asChild>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      Send via Resend to <strong className="text-foreground">{lead.email}</strong>
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Subject: </span>
                      {mergedPreview?.subject || draftSubject || '(empty)'}
                    </p>
                    <p className="text-xs">
                      Body opens with &quot;Hi {mergedPreview?.firstName ?? 'there'}&quot; and uses
                      merged values, not raw {'{{placeholders}}'}.
                    </p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => void confirmSend()}>
                  {sending ? 'Sending…' : 'Send now'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {lead.outreachDraft?.lastSentAt ? (
          <p className="text-xs text-muted-foreground">
            Last sent: {new Date(lead.outreachDraft.lastSentAt).toLocaleString('en-ZA')}
          </p>
        ) : null}
      </section>

      {lead.sendHistory?.length ? (
        <section className="rounded-xl border border-border p-5 space-y-3">
          <h2 className="font-semibold">Send history</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr>
                  <th className="pb-2 pr-4 font-medium">When</th>
                  <th className="pb-2 pr-4 font-medium">To</th>
                  <th className="pb-2 pr-4 font-medium">Subject</th>
                  <th className="pb-2 pr-4 font-medium">Template</th>
                </tr>
              </thead>
              <tbody>
                {[...lead.sendHistory].reverse().map((entry, i) => (
                  <tr key={`${entry.sentAt}-${i}`} className="border-t border-border">
                    <td className="py-2 pr-4 whitespace-nowrap">
                      {new Date(entry.sentAt).toLocaleString('en-ZA')}
                    </td>
                    <td className="py-2 pr-4">{entry.email}</td>
                    <td className="py-2 pr-4">{entry.subject}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{entry.templateSlug}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  );
}
