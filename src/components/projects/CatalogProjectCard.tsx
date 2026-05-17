import { ExternalLink } from 'lucide-react';
import {
  PROJECT_STATUS_LABELS,
  type ProjectCatalogEntry,
} from '../../data/project-catalog';
import { TechTag } from '../shared/TechTag';

type CatalogProjectCardProps = {
  project: ProjectCatalogEntry;
};

export function CatalogProjectCard({ project }: CatalogProjectCardProps) {
  const statusLabel = PROJECT_STATUS_LABELS[project.status];

  return (
    <article className="flex flex-col rounded-2xl border border-surface-border bg-surface-raised p-5 md:p-6 h-full transition-colors hover:border-accent-gold/25 motion-reduce:transition-none">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-gold">
          {project.category}
        </p>
        <span className="shrink-0 rounded-full border border-surface-border bg-surface-base px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-text-secondary">
          {statusLabel}
        </span>
      </div>

      <h3 className="font-display text-lg font-bold text-text-primary mb-2">{project.title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-4">{project.description}</p>

      {project.tech && project.tech.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <TechTag key={t} label={t} size="sm" />
          ))}
        </div>
      ) : null}

      <div className="mt-auto flex flex-col gap-2 pt-3 border-t border-surface-border">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent-gold hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-sm"
        >
          Visit project
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
          <span className="sr-only"> (opens in new tab)</span>
        </a>
        {project.relatedLinks?.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-sm"
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}
