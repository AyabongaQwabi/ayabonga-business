/** Homepage #work section — curated from project catalog. */

import {
  getHomepageWorkProjects,
  type ProjectCatalogEntry,
  type ProjectCatalogLink,
} from './project-catalog';

export type WorkProjectLink = ProjectCatalogLink;

export type WorkProject = {
  title: string;
  category: string;
  description: string;
  url: string;
  tech: string[];
  featured?: boolean;
  wip?: boolean;
  statusLabel?: string;
  relatedLinks?: WorkProjectLink[];
  imageUrl?: string;
  imageAlt?: string;
};

function mapCatalogToWork(entry: ProjectCatalogEntry, index: number): WorkProject {
  const wip = entry.status === 'in-progress';
  const statusLabel =
    entry.status === 'white-label'
      ? 'White-label'
      : entry.status === 'live'
        ? undefined
        : wip
          ? 'In progress'
          : undefined;

  return {
    title: entry.title,
    category: entry.category,
    description: entry.description,
    url: entry.url,
    tech: entry.tech ?? [],
    featured: index === 0,
    wip,
    statusLabel,
    relatedLinks: entry.relatedLinks,
    imageUrl: entry.imageUrl,
    imageAlt: entry.imageAlt,
  };
}

export const WORK_PROJECTS: WorkProject[] = getHomepageWorkProjects().map(mapCatalogToWork);
