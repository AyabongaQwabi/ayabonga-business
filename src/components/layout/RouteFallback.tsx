import { PageShell } from './PageShell';

/** Route-level Suspense fallback; keeps nav/footer stable while chunks load. */
export function RouteFallback() {
  return (
    <PageShell mainClassName="mx-auto flex min-h-[50vh] max-w-3xl flex-1 items-center justify-center px-6 pt-24">
      <p className="text-sm uppercase tracking-widest text-muted-foreground" aria-busy="true" aria-live="polite">
        Loading…
      </p>
    </PageShell>
  );
}
