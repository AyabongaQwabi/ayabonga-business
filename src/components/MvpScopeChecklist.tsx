import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ClipboardCopy,
  ListChecks,
  MessageCircle,
  RotateCcw,
} from 'lucide-react';
import {
  MVP_ESSENTIAL_ITEMS,
  MVP_PHASE2_ITEMS,
  MVP_SCOPE_CHECKLIST_SECTIONS,
} from '../data/mvp-scope-checklist';
import { QUOTE_PAGE } from '../lib/site-config';

const STORAGE_KEY = 'qwabi-mvp-scope-checklist-v1';

function loadChecked(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is string => typeof id === 'string'));
  } catch {
    return new Set();
  }
}

function buildSummary(checked: Set<string>): string {
  const mvpChecked = MVP_ESSENTIAL_ITEMS.filter((i) => checked.has(i.id)).length;
  const mvpTotal = MVP_ESSENTIAL_ITEMS.length;
  const phase2Checked = MVP_PHASE2_ITEMS.filter((i) => checked.has(i.id)).length;
  const lines = [
    'MVP scope checklist (Qwabi Engineering)',
    `MVP essentials: ${mvpChecked}/${mvpTotal}`,
    `Phase 2 items flagged: ${phase2Checked}`,
    '',
    'Checked:',
  ];
  for (const section of MVP_SCOPE_CHECKLIST_SECTIONS) {
    const sectionChecked = section.items.filter((i) => checked.has(i.id));
    if (!sectionChecked.length) continue;
    lines.push(`\n${section.title}`);
    for (const item of sectionChecked) {
      lines.push(`- ${item.label}`);
    }
  }
  lines.push('\nhttps://business.qwabi.co.za/mvp-scope-checklist');
  return lines.join('\n');
}

type ReadinessBand = 'early' | 'progress' | 'ready' | 'creep';

function getReadinessBand(mvpRatio: number, phase2Checked: number): ReadinessBand {
  if (phase2Checked >= 4 && mvpRatio < 0.75) return 'creep';
  if (mvpRatio >= 0.8) return 'ready';
  if (mvpRatio >= 0.45) return 'progress';
  return 'early';
}

const BAND_COPY: Record<ReadinessBand, { title: string; body: string }> = {
  early: {
    title: 'Still defining the MVP boundary',
    body: 'Work through the essentials below before you request quotes. A tight scope saves months of rebuild cost.',
  },
  progress: {
    title: 'Scope is taking shape',
    body: 'You have enough definition to compare approaches. Use the quote tool for a ZAR ballpark, or WhatsApp with your checklist export.',
  },
  ready: {
    title: 'Solid MVP boundary',
    body: 'Essentials are mostly covered. Next step is feature-level estimating and architecture, not more brainstorming.',
  },
  creep: {
    title: 'Phase 2 items are crowding the MVP',
    body: 'Move checked phase-two features out of the first release. Ship the smallest loop that proves demand, then expand on a retainer.',
  },
};

export function MvpScopeChecklist() {
  const [checked, setChecked] = useState<Set<string>>(() => loadChecked());
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...checked]));
    } catch {
      /* ignore quota / private mode */
    }
  }, [checked]);

  const mvpCheckedCount = useMemo(
    () => MVP_ESSENTIAL_ITEMS.filter((i) => checked.has(i.id)).length,
    [checked],
  );
  const mvpTotal = MVP_ESSENTIAL_ITEMS.length;
  const phase2CheckedCount = useMemo(
    () => MVP_PHASE2_ITEMS.filter((i) => checked.has(i.id)).length,
    [checked],
  );
  const mvpRatio = mvpTotal > 0 ? mvpCheckedCount / mvpTotal : 0;
  const band = getReadinessBand(mvpRatio, phase2CheckedCount);
  const bandCopy = BAND_COPY[band];
  const progressPercent = Math.round(mvpRatio * 100);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setChecked(new Set());
    setCopyStatus('idle');
  }, []);

  const copySummary = useCallback(async () => {
    const text = buildSummary(checked);
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus('copied');
      if (process.env.NODE_ENV === 'development') {
        console.log('[MvpScopeChecklist] Copied summary', {
          mvpCheckedCount,
          phase2CheckedCount,
        });
      }
    } catch (err) {
      setCopyStatus('error');
      if (process.env.NODE_ENV === 'development') {
        console.error('[MvpScopeChecklist] Copy failed', err, { textLength: text.length });
      }
    }
    window.setTimeout(() => setCopyStatus('idle'), 2500);
  }, [checked, mvpCheckedCount, phase2CheckedCount]);

  const whatsappShareUrl = useMemo(() => {
    const intro = encodeURIComponent(
      `Hi Ayabonga, I ran your MVP scope checklist: ${mvpCheckedCount}/${mvpTotal} essentials checked, ${phase2CheckedCount} phase-2 items. I'd like to discuss fit.`,
    );
    return `https://wa.me/27603116777?text=${intro}`;
  }, [mvpCheckedCount, mvpTotal, phase2CheckedCount]);

  return (
    <div className="max-w-3xl">
      <div
        className="mb-8 rounded-xl border border-surface-border bg-surface-raised p-5 sm:p-6"
        aria-live="polite"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-gold/15 text-accent-gold">
              <ListChecks className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-medium text-text-primary">MVP essentials progress</p>
              <p className="text-2xl font-display font-bold text-accent-gold tabular-nums">
                {mvpCheckedCount}
                <span className="text-text-muted text-lg font-normal"> / {mvpTotal}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors min-h-[44px] px-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Reset
          </button>
        </div>

        <div
          className="h-2 rounded-full bg-surface-overlay overflow-hidden mb-4"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="MVP essentials completion"
        >
          <div
            className="h-full rounded-full bg-accent-emerald transition-all duration-300 motion-reduce:transition-none"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <h2 className="font-display font-semibold text-text-primary text-lg mb-1">
          {bandCopy.title}
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed">{bandCopy.body}</p>

        {band === 'creep' ? (
          <p className="mt-3 flex items-start gap-2 text-sm text-amber-200/90">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" aria-hidden />
            Uncheck phase-two rows you do not need in v1, or move them to a later roadmap doc.
          </p>
        ) : null}

        <div className="mt-5 flex flex-col sm:flex-row flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => void copySummary()}
            className="btn-outline min-h-[44px]"
          >
            <ClipboardCopy className="w-4 h-4 shrink-0" aria-hidden />
            {copyStatus === 'copied'
              ? 'Copied'
              : copyStatus === 'error'
                ? 'Copy failed'
                : 'Copy scope summary'}
          </button>
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary min-h-[44px] bg-[#25D366] hover:bg-[#128C7E] focus-visible:ring-[#25D366]"
          >
            <MessageCircle className="w-5 h-5 shrink-0" aria-hidden />
            Share on WhatsApp
          </a>
          {mvpRatio >= 0.45 ? (
            <Link to={QUOTE_PAGE} className="btn-outline min-h-[44px]">
              Get ZAR ballpark
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden />
            </Link>
          ) : null}
        </div>
      </div>

      <div className="space-y-8">
        {MVP_SCOPE_CHECKLIST_SECTIONS.map((section) => (
          <section
            key={section.id}
            aria-labelledby={`checklist-section-${section.id}`}
            className="rounded-xl border border-surface-border bg-surface-raised/60 overflow-hidden"
          >
            <header className="px-4 sm:px-5 py-4 border-b border-surface-border bg-surface-raised">
              <h3
                id={`checklist-section-${section.id}`}
                className="font-display font-semibold text-text-primary"
                style={{ fontSize: 'var(--type-heading-sm)' }}
              >
                {section.title}
              </h3>
              {section.description ? (
                <p className="mt-1 text-sm text-text-secondary">{section.description}</p>
              ) : null}
            </header>
            <ul className="divide-y divide-surface-border">
              {section.items.map((item) => {
                const isChecked = checked.has(item.id);
                const isPhase2 = item.tier === 'phase2';
                return (
                  <li key={item.id}>
                    <label
                      className={`flex gap-3 px-4 sm:px-5 py-3.5 cursor-pointer transition-colors hover:bg-surface-overlay/40 min-h-[44px] items-start ${
                        isPhase2 ? 'bg-surface-base/30' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggle(item.id)}
                        className="sr-only peer"
                      />
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-accent-gold peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-base ${
                          isChecked
                            ? 'border-accent-emerald bg-accent-emerald text-text-inverse'
                            : 'border-surface-border bg-surface-base'
                        }`}
                        aria-hidden
                      >
                        {isChecked ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-sm sm:text-base ${
                              isChecked ? 'text-text-primary' : 'text-text-secondary'
                            }`}
                          >
                            {item.label}
                          </span>
                          {isPhase2 ? (
                            <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full border border-surface-border text-text-muted">
                              Phase 2
                            </span>
                          ) : null}
                        </span>
                        {item.hint ? (
                          <span className="block mt-1 text-xs text-text-muted">{item.hint}</span>
                        ) : null}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}