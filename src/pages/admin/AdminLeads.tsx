import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Search } from 'lucide-react';
import {
  fetchLeads,
  type LeadIndexEntry,
  type LeadKind,
  type LeadStatus,
} from '../../lib/admin-api';
import {
  leadEmailStatus,
  leadEmailStatusLabel,
  type LeadEmailStatus,
} from '../../lib/lead-email-status';
import { Skeleton } from '../../components/ui/skeleton';
import { Button } from '../../components/ui/button';

type Tab = 'all' | LeadKind;

const STATUS_OPTIONS: LeadStatus[] = [
  'new',
  'qualified',
  'contacted',
  'replied',
  'won',
  'lost',
];

const EMAIL_STATUS_CLASS: Record<LeadEmailStatus, string> = {
  sent: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  failed: 'bg-destructive/15 text-destructive',
  pending: 'bg-amber-500/15 text-amber-800 dark:text-amber-300',
  no_email: 'bg-muted text-muted-foreground',
};

function EmailStatusBadge({ entry }: { entry: LeadIndexEntry }) {
  const status = leadEmailStatus(entry);
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${EMAIL_STATUS_CLASS[status]}`}
      title={
        status === 'failed' && entry.lastSendError
          ? entry.lastSendError
          : entry.lastSentAt
            ? `Last sent ${new Date(entry.lastSentAt).toLocaleString('en-ZA')}`
            : leadEmailStatusLabel(status)
      }
    >
      {leadEmailStatusLabel(status)}
      {(entry.sendCount ?? 0) > 1 ? ` (${entry.sendCount})` : ''}
    </span>
  );
}

export default function AdminLeads() {
  const [tab, setTab] = useState<Tab>('all');
  const [status, setStatus] = useState<LeadStatus | ''>('');
  const [q, setQ] = useState('');
  const [entries, setEntries] = useState<LeadIndexEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchLeads({
      kind: tab === 'all' ? undefined : tab,
      status: status || undefined,
      q: q.trim() || undefined,
    })
      .then((data) => {
        if (!cancelled) setEntries(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tab, status, q]);

  const sorted = useMemo(() => {
    return [...entries].sort((a, b) => {
      const scoreA = a.score ?? 0;
      const scoreB = b.score ?? 0;
      if (scoreB !== scoreA) return scoreB - scoreA;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [entries]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Leads</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Inbound forms and outbound intelligence records.
          </p>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search name, email, company"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(['all', 'inbound', 'outbound'] as Tab[]).map((t) => (
          <Button
            key={t}
            type="button"
            size="sm"
            variant={tab === t ? 'default' : 'outline'}
            onClick={() => setTab(t)}
          >
            {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as LeadStatus | '')}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center border border-dashed border-border rounded-xl">
          No leads match this filter.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Kind</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Score</th>
                <th className="px-4 py-3 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr key={row.id} className="border-t border-border hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/leads/${row.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {row.name || row.email || row.id.slice(0, 8)}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.company || '—'}</td>
                  <td className="px-4 py-3 capitalize">{row.kind}</td>
                  <td className="px-4 py-3 capitalize">{row.status}</td>
                  <td className="px-4 py-3">
                    <EmailStatusBadge entry={row} />
                  </td>
                  <td className="px-4 py-3">
                    {row.score != null ? (
                      <span>
                        {row.score}
                        {row.tier ? ` · T${row.tier}` : ''}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {new Date(row.updatedAt).toLocaleDateString('en-ZA')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {loading ? (
        <p className="text-xs text-muted-foreground flex items-center gap-2">
          <Loader2 className="w-3 h-3 animate-spin motion-reduce:animate-none" aria-hidden />
          Loading
        </p>
      ) : null}
    </div>
  );
}
