import { cn } from '../../lib/utils';
import { TechLogo } from '../shared/TechLogo';

type CaseStudyTechStackProps = {
  /** Labels from case study `technologiesUsed` (e.g. React, Node.js, MongoDB). */
  technologies: string[];
  className?: string;
};

/**
 * Case study technical stack: white circular logo (when mapped) beside each technology name.
 *
 * 1. Add logo file: `node scripts/lookup-logo.mjs <name>` → `public/images/logos/`
 * 2. Register slug/alias: `src/data/tech-logos.ts`
 * 3. Pass strings in `technologiesUsed` on the case study record
 */
export function CaseStudyTechStack({ technologies, className }: CaseStudyTechStackProps) {
  if (technologies.length === 0) return null;

  return (
    <ul className={cn('list-none p-0 m-0 grid gap-3 sm:grid-cols-2 max-w-3xl', className)}>
      {technologies.map((tech) => (
        <li
          key={tech}
          className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-base px-4 py-3"
        >
          <TechLogo name={tech} size="md" title={tech} />
          <span className="text-sm font-technical font-medium text-text-primary leading-snug">
            {tech}
          </span>
        </li>
      ))}
    </ul>
  );
}
