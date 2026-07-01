import { escapeHtml } from '../format';
import { EMAIL_BRAND, wrapBrandedEmail, type BrandedEmailOptions } from '../emailLayout';

const SITE_URL = process.env.SITE_URL?.replace(/\/$/, '') || 'https://business.qwabi.co.za';

export function brandedLogoUrl(variant: 'wide' | 'square' = 'wide'): string {
  return `${SITE_URL}/${variant === 'wide' ? 'logo-wide.png' : 'logo.png'}`;
}

/** Plain-text paragraphs → simple HTML blocks (skips duplicate greeting). */
export function outreachTextToBodyHtml(text: string, firstName: string): string {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks: string[] = [];
  for (const line of lines) {
    if (/^Hi\s+/i.test(line)) continue;
    if (line.startsWith('http://') || line.startsWith('https://')) {
      blocks.push(
        `<p style="margin:0 0 14px;font-size:14px;line-height:1.6;"><a href="${escapeHtml(line)}" style="color:${EMAIL_BRAND.cyan};text-decoration:none;">${escapeHtml(line)}</a></p>`,
      );
      continue;
    }
    blocks.push(
      `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:${EMAIL_BRAND.text};">${escapeHtml(line)}</p>`,
    );
  }
  return blocks.join('\n');
}

export function buildBrandedOutreachEmail(options: {
  firstName: string;
  bodyText: string;
  preheader?: string;
  primaryCta?: BrandedEmailOptions['primaryCta'];
  secondaryCta?: BrandedEmailOptions['secondaryCta'];
}): string {
  return wrapBrandedEmail({
    firstName: options.firstName,
    preheader: options.preheader,
    bodyHtml: outreachTextToBodyHtml(options.bodyText, options.firstName),
    primaryCta: options.primaryCta ?? {
      label: 'Get a scoped estimate',
      href: `${SITE_URL}/get-a-quote`,
    },
    secondaryCta: options.secondaryCta ?? {
      label: 'See shipped work',
      href: `${SITE_URL}/case-studies`,
    },
    logoUrl: brandedLogoUrl('wide'),
  });
}

export function outreachPlainFooter(): string {
  return `\n\nAyabonga Qwabi · Qwabi Engineering\n${SITE_URL}\n`;
}
