import { CLIENT_TRUST_LOGOS } from '../../data/client-trust-logos';

type ClientLogoStripProps = {
  className?: string;
};

export function ClientLogoStrip({ className = '' }: ClientLogoStripProps) {
  return (
    <div
      className={`border-t border-surface-border/70 pt-6 md:pt-8 ${className}`.trim()}
      aria-labelledby="client-trust-heading"
    >
      <p
        id="client-trust-heading"
        className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4"
      >
        Teams in production
      </p>
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 list-none p-0 m-0">
        {CLIENT_TRUST_LOGOS.map((client) => (
          <li key={client.id}>
            {client.url ? (
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-sm font-semibold text-text-secondary transition-colors hover:text-accent-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base rounded-sm"
              >
                {client.name}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            ) : (
              <span className="font-display text-sm font-semibold text-text-muted">{client.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
