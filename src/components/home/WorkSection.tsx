import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '../shared/ProjectCard';
import { ScrollReveal } from '../ScrollReveal';
import { WORK_PROJECTS } from '../../data/work-projects';
import { PROJECTS_PAGE } from '../../lib/site-config';

export function WorkSection() {
  return (
    <ScrollReveal>
      <section id="work" className="py-16 md:py-24 border-t border-surface-border scroll-mt-24">
        <div className="container">
          <p className="section-label mb-3">Selected work</p>
          <h2
            className="font-display font-bold text-text-primary mb-4"
            style={{
              fontSize: 'var(--type-display-md)',
              lineHeight: 'var(--leading-heading)',
              letterSpacing: '-0.02em',
            }}
          >
            Client systems we shipped
          </h2>
          <p
            className="text-text-secondary max-w-2xl mb-10"
            style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
          >
            A sample of live and handed-over builds across health, education, music, and
            operations. Each card matches a client story in the feedback section below. The full
            catalog includes white-label work and paused builds we still stand behind.
          </p>
          <Link
            to={PROJECTS_PAGE}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-gold hover:underline underline-offset-4 mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-sm"
          >
            View full project catalog
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
          <div className="grid md:grid-cols-2 gap-4">
            {WORK_PROJECTS.map((project) => (
              <div
                key={project.title}
                className={`flex flex-col gap-2 scroll-reveal ${
                  project.featured ? 'md:col-span-2' : ''
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-gold">
                  {project.category}
                </p>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  url={project.url}
                  tech={project.tech}
                  imageUrl={project.imageUrl}
                  imageAlt={project.imageAlt}
                  showImage={Boolean(project.imageUrl)}
                  featured={project.featured}
                  wip={project.wip}
                  statusLabel={project.statusLabel}
                />
                {project.relatedLinks && project.relatedLinks.length > 0 ? (
                  <p className="flex flex-wrap gap-x-4 gap-y-1 pl-1 text-sm">
                    {project.relatedLinks.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="interactive-link inline-flex items-center gap-1 text-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {link.label}
                        <span className="sr-only"> (opens in new tab)</span>
                      </a>
                    ))}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
