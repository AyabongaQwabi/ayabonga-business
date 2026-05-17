const envSite =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL
    ? String(import.meta.env.VITE_SITE_URL).replace(/\/$/, '')
    : '';

/** Canonical site URL (no trailing slash). Set `VITE_SITE_URL` for previews/staging. */
export const SITE_ORIGIN = envSite || 'https://business.qwabi.co.za';

export const SITE_NAME = 'Ayabonga Qwabi';

export const DEFAULT_PAGE_TITLE =
  'Software Development Company South Africa | Qwabi Engineering';

export const DEFAULT_PAGE_DESCRIPTION =
  'Qwabi Engineering builds mobile apps, web platforms, and custom business software for South African teams. Based in the Eastern Cape, delivery nationwide and remote.';

/** Founder / senior engineer story (not the company homepage angle). */
export const ABOUT_PAGE = '/about';

export const FOUNDER_PAGE_LABEL = 'Meet the engineer';

/** Full project catalog and case studies. */
export const PROJECTS_PAGE = '/projects';

export const DEFAULT_OG_IMAGE =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/634131924_4362348684012184_2809328754212142225_n%20%281%29-n9dEY5Noh5Y0nxfTCK3TwAMABTs8KG.jpg';

export const TWITTER_HANDLE = '@ayabongaqwabi';

/** Primary contact: WhatsApp direct link with a pre-filled opening message. */
export const WHATSAPP_NUMBER = '27603116777';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I found Qwabi Engineering and I'd like to chat.")}`;

/** Discovery call scheduling (Cal.com / Calendly). Not live yet. */
export const DISCOVERY_CALL_LABEL = 'Book a discovery call';
export const DISCOVERY_CALL_ENABLED = false;
/** Set when live, e.g. https://cal.com/ayabonga-qwabi */
export const DISCOVERY_CALL_URL = '';

/** Retainer pricing philosophy and tiers. */
export const PRICING_STRATEGY_PAGE = '/pricing-strategy';

/** 2026 ZAR app development cost guide (SEO landing). */
export const APP_DEVELOPMENT_COST_PAGE = '/app-development-cost-south-africa';

/** Optional project scope estimator (secondary to partnership conversation). */
export const QUOTE_PAGE = '/get-a-quote';

export const GET_ESTIMATE_LABEL = 'Get an estimate';

/** Interactive MVP scope checklist (free tool, pre-quote). */
export const MVP_SCOPE_CHECKLIST_PAGE = '/mvp-scope-checklist';

export const MVP_SCOPE_CHECKLIST_LABEL = 'MVP scope checklist';

export const PARTNERSHIP_CTA_LABEL = 'Start a technical partnership';
export const QUOTE_TOOL_LABEL = 'Project scope estimator';

/** Disqus site shortname (https://disqus.com/admin/settings/general/) */
export const DISQUS_SHORTNAME = 'qwabi';

export function absoluteUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${p}`;
}

/** Absolute URL for Open Graph / Twitter when frontmatter is a path (`/images/...`) or already `https://`. */
export function absoluteMediaUrl(pathOrUrl: string): string {
  const s = pathOrUrl.trim();
  if (!s) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(s)) return s;
  return absoluteUrl(s.startsWith('/') ? s : `/${s}`);
}

/** Best-effort ISO date for JSON-LD from frontmatter display strings like "April 15, 2026". */
export function parsePostDateForSchema(dateStr: string): string | undefined {
  const t = Date.parse(dateStr);
  if (Number.isNaN(t)) return undefined;
  return new Date(t).toISOString().split('T')[0];
}
