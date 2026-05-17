import { Link } from 'react-router-dom';
import {
  PARTNERSHIP_CTA_LABEL,
  QUOTE_PAGE,
  QUOTE_TOOL_LABEL,
  WHATSAPP_URL,
} from '../../lib/site-config';

/**
 * Gold conversion block. Static render (no scroll-reveal).
 */
export function CtaSection() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 scroll-mt-24"
      style={{ background: 'var(--color-accent-gold)' }}
    >
      <div className="container text-center">
        <h2
          className="font-display font-black mb-4 text-balance"
          style={{
            fontSize: 'var(--type-display-md)',
            lineHeight: 'var(--leading-heading)',
            letterSpacing: '-0.02em',
            color: 'var(--color-text-inverse)',
          }}
        >
          Ready to stop guessing on tech?
        </h2>
        <p
          className="mb-8 max-w-[520px] mx-auto text-pretty"
          style={{
            fontSize: 'var(--type-body-lg)',
            lineHeight: 'var(--leading-body)',
            color: 'rgba(10, 25, 47, 0.75)',
          }}
        >
          Tell me what you run today, what is fragile, and where the product needs to go. I will
          reply with fit, a retainer band or build range, and what I would tackle first.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
          <Link
            to={QUOTE_PAGE}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-8 py-3.5 rounded-md font-technical font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-[0.98] motion-reduce:transform-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3"
            style={{
              background: 'var(--color-text-inverse)',
              color: 'var(--color-accent-gold)',
              outlineColor: 'var(--color-text-inverse)',
            }}
          >
            {PARTNERSHIP_CTA_LABEL}
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-8 py-3.5 rounded-md font-technical font-semibold text-sm transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3"
            style={{
              border: '1px solid rgba(10, 25, 47, 0.4)',
              color: 'var(--color-text-inverse)',
              outlineColor: 'var(--color-text-inverse)',
            }}
          >
            WhatsApp me directly
          </a>
        </div>
        <p className="mt-8 text-sm" style={{ color: 'rgba(10, 25, 47, 0.7)' }}>
          Planning a greenfield build?{' '}
          <Link
            to={QUOTE_PAGE}
            className="font-semibold underline underline-offset-4 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
            style={{ color: 'var(--color-text-inverse)' }}
          >
            {QUOTE_TOOL_LABEL}
          </Link>{' '}
          gives a rough scope ballpark. Retainers are agreed after we review your stack.
        </p>
      </div>
    </section>
  );
}
