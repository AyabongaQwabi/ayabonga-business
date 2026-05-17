const KEYS = {
  promoDismissed: 'qwabi-promo-dismissed',
  exitDismissed: 'qwabi-exit-dismissed',
  bannerDismissed: 'qwabi-banner-dismissed',
  slideInShown: 'qwabi-slidein-shown',
  exitShown: 'qwabi-exit-shown',
  sessionConverted: 'qwabi-session-converted',
  whatsappClicked: 'qwabi-whatsapp-clicked',
  pageviewCount: 'qwabi-pageview-count',
  slideInCooldown: 'qwabi-slidein-last-shown',
} as const;

const PROMO_DISMISS_DAYS = 14;
const EXIT_DISMISS_DAYS = 7;
const BANNER_DISMISS_DAYS = 30;
const EXIT_AFTER_SLIDEIN_MS = 2 * 60 * 1000;

function daysToMs(days: number): number {
  return days * 24 * 60 * 60 * 1000;
}

function readDismissedAt(key: string): number | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const ts = Number.parseInt(raw, 10);
    return Number.isFinite(ts) ? ts : null;
  } catch {
    return null;
  }
}

function writeDismissedAt(key: string): void {
  try {
    localStorage.setItem(key, String(Date.now()));
  } catch {
    /* quota */
  }
}

export function isPromoDismissed(): boolean {
  const at = readDismissedAt(KEYS.promoDismissed);
  if (!at) return false;
  return Date.now() - at < daysToMs(PROMO_DISMISS_DAYS);
}

export function dismissPromo(): void {
  writeDismissedAt(KEYS.promoDismissed);
}

export function isExitDismissed(): boolean {
  const at = readDismissedAt(KEYS.exitDismissed);
  if (!at) return false;
  return Date.now() - at < daysToMs(EXIT_DISMISS_DAYS);
}

export function dismissExit(): void {
  writeDismissedAt(KEYS.exitDismissed);
}

export function isBannerDismissed(): boolean {
  const at = readDismissedAt(KEYS.bannerDismissed);
  if (!at) return false;
  return Date.now() - at < daysToMs(BANNER_DISMISS_DAYS);
}

export function dismissBanner(): void {
  writeDismissedAt(KEYS.bannerDismissed);
}

export function markSlideInShown(): void {
  try {
    sessionStorage.setItem(KEYS.slideInShown, '1');
    sessionStorage.setItem(KEYS.slideInCooldown, String(Date.now()));
  } catch {
    /* ignore */
  }
}

export function wasSlideInShownThisSession(): boolean {
  try {
    return sessionStorage.getItem(KEYS.slideInShown) === '1';
  } catch {
    return false;
  }
}

export function canShowExitAfterSlideIn(): boolean {
  try {
    const raw = sessionStorage.getItem(KEYS.slideInCooldown);
    if (!raw) return true;
    const ts = Number.parseInt(raw, 10);
    if (!Number.isFinite(ts)) return true;
    return Date.now() - ts >= EXIT_AFTER_SLIDEIN_MS;
  } catch {
    return true;
  }
}

export function markExitShown(): void {
  try {
    sessionStorage.setItem(KEYS.exitShown, '1');
  } catch {
    /* ignore */
  }
}

export function wasExitShownThisSession(): boolean {
  try {
    return sessionStorage.getItem(KEYS.exitShown) === '1';
  } catch {
    return false;
  }
}

export function markSessionConverted(): void {
  try {
    sessionStorage.setItem(KEYS.sessionConverted, '1');
  } catch {
    /* ignore */
  }
}

export function wasSessionConverted(): boolean {
  try {
    return sessionStorage.getItem(KEYS.sessionConverted) === '1';
  } catch {
    return false;
  }
}

export function markWhatsAppClicked(): void {
  try {
    sessionStorage.setItem(KEYS.whatsappClicked, '1');
  } catch {
    /* ignore */
  }
}

export function wasWhatsAppClicked(): boolean {
  try {
    return sessionStorage.getItem(KEYS.whatsappClicked) === '1';
  } catch {
    return false;
  }
}

export function incrementPageviewCount(): number {
  try {
    const prev = Number.parseInt(sessionStorage.getItem(KEYS.pageviewCount) ?? '0', 10);
    const next = Number.isFinite(prev) ? prev + 1 : 1;
    sessionStorage.setItem(KEYS.pageviewCount, String(next));
    return next;
  } catch {
    return 1;
  }
}

export function getPageviewCount(): number {
  try {
    const n = Number.parseInt(sessionStorage.getItem(KEYS.pageviewCount) ?? '0', 10);
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}
