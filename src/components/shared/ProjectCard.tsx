import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { faviconForUrl } from '../../lib/marketing-images';
import { TechTag } from './TechTag';

export interface ProjectCardProps {
  title: string;
  description: string;
  url: string;
  tech: string[];
  imageUrl?: string;
  imageAlt?: string;
  /** When false, renders text-only card (no thumbnail). Defaults to true when imageUrl is set. */
  showImage?: boolean;
  featured?: boolean;
  wip?: boolean;
}

const cardClassName =
  'interactive-card group block overflow-hidden rounded-xl glass-dark hover:glass-gold hover:glow-primary transition-all duration-500 border border-white/5 hover:border-primary/50 motion-reduce:transition-none';

const featuredCardClassName =
  'interactive-card group block overflow-hidden rounded-xl glass-dark hover:glass-gold hover:glow-primary transition-all duration-500 border border-primary/25 hover:border-primary/50 ring-1 ring-primary/10 motion-reduce:transition-none';

function ProjectThumbnail({
  imageUrl,
  imageAlt,
  siteUrl,
  featured,
}: {
  imageUrl: string;
  imageAlt: string;
  siteUrl?: string;
  featured?: boolean;
}) {
  const [resolvedSrc, setResolvedSrc] = useState(imageUrl);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`w-full bg-gradient-to-br from-[#0A192F] via-secondary to-[#059669]/30 border-b border-white/5 ${
          featured ? 'aspect-[21/9]' : 'aspect-[16/9]'
        }`}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={`w-full overflow-hidden border-b border-white/5 bg-secondary/40 ${
        featured ? 'aspect-[21/9]' : 'aspect-[16/9]'
      }`}
    >
      <img
        src={resolvedSrc}
        alt={imageAlt}
        width={640}
        height={360}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:transform-none"
        onError={() => {
          const favicon = siteUrl ? faviconForUrl(siteUrl) : '';
          if (favicon && resolvedSrc !== favicon) {
            setResolvedSrc(favicon);
            return;
          }
          setFailed(true);
        }}
      />
    </div>
  );
}

function ProjectCardContent({
  title,
  description,
  tech,
  showExternalIcon,
  featured,
  wip,
}: {
  title: string;
  description: string;
  tech: string[];
  showExternalIcon: boolean;
  featured?: boolean;
  wip?: boolean;
}) {
  return (
    <div className={featured ? 'p-7 md:p-8' : 'p-6'}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <h3
            className={`font-semibold text-foreground group-hover:text-primary transition-all duration-300 motion-reduce:transition-none ${
              featured ? 'text-xl md:text-2xl' : 'text-lg'
            }`}
          >
            {title}
          </h3>
          {wip ? (
            <span className="shrink-0 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
              In progress
            </span>
          ) : null}
        </div>
        {showExternalIcon ? (
          <ExternalLink
            className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300 flex-shrink-0 mt-1 motion-reduce:transition-none motion-reduce:transform-none"
            aria-hidden
          />
        ) : null}
      </div>

      <p
        className={`text-muted-foreground leading-relaxed mb-4 group-hover:text-foreground/90 transition-colors motion-reduce:transition-none ${
          featured ? 'text-sm md:text-base' : 'text-sm'
        }`}
      >
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <TechTag key={t} label={t} size="md" />
        ))}
      </div>
    </div>
  );
}

const textOnlyFeaturedClassName =
  'border-l-[3px] border-l-primary/70 bg-gradient-to-br from-primary/[0.06] via-transparent to-transparent';

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  url,
  tech,
  imageUrl,
  imageAlt,
  showImage = true,
  featured,
  wip,
}) => {
  const isInternal = url.startsWith('/');
  const thumbnailAlt = imageAlt ?? `${title} project preview`;
  const displayImage = showImage && Boolean(imageUrl);
  const shellClass = [
    featured ? featuredCardClassName : cardClassName,
    !displayImage && featured ? textOnlyFeaturedClassName : '',
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      {displayImage && imageUrl ? (
        <ProjectThumbnail
          imageUrl={imageUrl}
          imageAlt={thumbnailAlt}
          siteUrl={isInternal ? undefined : url}
          featured={featured}
        />
      ) : null}
      <ProjectCardContent
        title={title}
        description={description}
        tech={tech}
        showExternalIcon={!isInternal}
        featured={featured}
        wip={wip}
      />
    </>
  );

  if (isInternal) {
    return (
      <Link to={url} className={shellClass}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={shellClass}>
      {inner}
    </a>
  );
};

export default ProjectCard;
