import type React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { faviconForUrl } from '../lib/marketing-images';

interface ProjectCardProps {
  title: string;
  description: string;
  url: string;
  tech: string[];
  imageUrl?: string;
  imageAlt?: string;
}

const cardClassName =
  'interactive-card group block overflow-hidden rounded-xl glass-dark hover:glass-gold hover:glow-primary transition-all duration-500 border border-white/5 hover:border-primary/50 motion-reduce:transition-none';

function ProjectThumbnail({
  imageUrl,
  imageAlt,
  siteUrl,
}: {
  imageUrl: string;
  imageAlt: string;
  siteUrl?: string;
}) {
  const [resolvedSrc, setResolvedSrc] = useState(imageUrl);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="aspect-[16/9] w-full bg-gradient-to-br from-[#0A192F] via-secondary to-[#059669]/30 border-b border-white/5"
        aria-hidden
      />
    );
  }

  return (
    <div className="aspect-[16/9] w-full overflow-hidden border-b border-white/5 bg-secondary/40">
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
}: {
  title: string;
  description: string;
  tech: string[];
  showExternalIcon: boolean;
}) {
  return (
    <div className="p-6">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-all duration-300 motion-reduce:transition-none">
          {title}
        </h3>
        {showExternalIcon ? (
          <ExternalLink
            className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300 flex-shrink-0 mt-1 motion-reduce:transition-none motion-reduce:transform-none"
            aria-hidden
          />
        ) : null}
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed mb-4 group-hover:text-foreground/90 transition-colors motion-reduce:transition-none">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span
            key={t}
            className="px-2 py-1 text-xs font-mono bg-secondary text-muted-foreground rounded"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  url,
  tech,
  imageUrl,
  imageAlt,
}) => {
  const isInternal = url.startsWith('/');
  const thumbnailAlt = imageAlt ?? `${title} project preview`;

  const inner = (
    <>
      {imageUrl ? (
        <ProjectThumbnail imageUrl={imageUrl} imageAlt={thumbnailAlt} siteUrl={isInternal ? undefined : url} />
      ) : null}
      <ProjectCardContent
        title={title}
        description={description}
        tech={tech}
        showExternalIcon={!isInternal}
      />
    </>
  );

  if (isInternal) {
    return (
      <Link to={url} className={cardClassName}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={cardClassName}>
      {inner}
    </a>
  );
};

export default ProjectCard;
