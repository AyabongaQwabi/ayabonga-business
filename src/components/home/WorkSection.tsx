import ProjectCard from '../shared/ProjectCard';
import { ScrollReveal } from '../ScrollReveal';
import { WORK_PROJECTS } from '../../data/work-projects';

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
            Custom software in production
          </h2>
          <p
            className="text-text-secondary max-w-2xl mb-10"
            style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
          >
            Shipped mobile app development and web development projects in South Africa, not
            mockups. Collaborations include Warner Music Africa and Western Cape Labs.
          </p>
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
                  showImage={false}
                  featured={project.featured}
                  wip={project.wip}
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
