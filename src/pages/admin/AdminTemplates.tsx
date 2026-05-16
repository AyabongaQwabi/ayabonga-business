import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  fetchTemplates,
  saveTemplate,
  type EmailTemplate,
} from '../../lib/admin-api';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Skeleton } from '../../components/ui/skeleton';

export default function AdminTemplates() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selected, setSelected] = useState<EmailTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchTemplates()
      .then((t) => {
        setTemplates(t);
        if (t[0]) setSelected({ ...t[0] });
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load templates');
      })
      .finally(() => setLoading(false));
  }, []);

  function pick(slug: string) {
    const t = templates.find((x) => x.slug === slug);
    if (t) setSelected({ ...t });
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const saved = await saveTemplate({
        ...selected,
        updatedAt: new Date().toISOString(),
      });
      setTemplates((prev) => {
        const i = prev.findIndex((x) => x.slug === saved.slug);
        if (i >= 0) {
          const next = [...prev];
          next[i] = saved;
          return next;
        }
        return [...prev, saved];
      });
      setSelected(saved);
      setMessage('Template saved.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Email templates</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Cold outreach templates with placeholders merged per lead on send.
        </p>
      </div>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="text-sm text-primary" role="status">
          {message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {templates.map((t) => (
          <Button
            key={t.slug}
            type="button"
            size="sm"
            variant={selected?.slug === t.slug ? 'default' : 'outline'}
            onClick={() => pick(t.slug)}
          >
            {t.name}
          </Button>
        ))}
      </div>

      {selected ? (
        <form
          onSubmit={(e) => void onSave(e)}
          className="rounded-xl border border-border p-5 space-y-4 max-w-2xl"
        >
          <div className="space-y-2">
            <Label htmlFor="tpl-name">Name</Label>
            <input
              id="tpl-name"
              value={selected.name}
              onChange={(e) => setSelected({ ...selected, name: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tpl-subject">Subject</Label>
            <input
              id="tpl-subject"
              value={selected.subject}
              onChange={(e) => setSelected({ ...selected, subject: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tpl-text">Plain text body</Label>
            <textarea
              id="tpl-text"
              value={selected.text}
              onChange={(e) => setSelected({ ...selected, text: e.target.value })}
              rows={12}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
              required
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Slug: {selected.slug} · Use {'{{firstName}}'}, {'{{company}}'}, {'{{whyNow}}'},{' '}
            {'{{yourName}}'}, {'{{siteUrl}}'}
          </p>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin motion-reduce:animate-none" aria-hidden />
                Saving
              </>
            ) : (
              'Save template'
            )}
          </Button>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground">No templates yet. Run the seed script.</p>
      )}
    </div>
  );
}
