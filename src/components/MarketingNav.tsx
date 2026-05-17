import { SiteNav } from './SiteNav';

type MarketingNavProps = {
  onNavigateSection?: (id: string) => void;
};

/** @deprecated Use SiteNav. Kept for imports until Phase 4 homepage cleanup. */
export function MarketingNav(props: MarketingNavProps) {
  return <SiteNav {...props} />;
}
