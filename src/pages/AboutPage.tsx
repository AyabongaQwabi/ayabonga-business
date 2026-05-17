import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SupportingPageShell } from '../components/SupportingPageShell';
import { buildProfilePageSchema } from '../lib/entity-schema';
import {
  AUTHOR_EMAIL,
  AUTHOR_EXPERIENCE_YEARS,
  AUTHOR_JOB_TITLE,
  AUTHOR_LOCATION,
  AUTHOR_PROFILE_IMAGE,
  AUTHOR_SAME_AS,
} from '../lib/author-profile';
import { TechTag } from '../components/shared/TechTag';
import { FOUNDER_PAGE_LABEL, SITE_NAME, WHATSAPP_URL } from '../lib/site-config';

const ABOUT_STACK = [
  'React',
  'Next.js',
  'Node.js',
  'TypeScript',
  'Python',
  'GCP',
  'AWS',
  'Azure',
  'Supabase',
  'Firebase',
] as const;

const shippedWork = [
  {
    name: 'Laundry Marketplace',
    url: 'https://laundry.qwabi.co.za/',
    note: 'Marketplace for local laundry providers',
  },
  {
    name: 'ClinicPlus',
    url: 'https://clinicplusbookings.co.za/',
    note: 'Clinic appointment booking for occupational health',
  },
  {
    name: 'Queens Connect',
    url: 'https://queensconnect.qwabi.co.za/',
    note: 'Community AI assistant for Queenstown',
  },
  {
    name: 'Kingly',
    url: 'https://kingly.qwabi.co.za/',
    note: 'AI tooling for developer documentation and prompts',
  },
];

const ABOUT_META_TITLE = `Meet ${SITE_NAME} | Senior product engineer & technical founder`;
const ABOUT_META_DESCRIPTION = `${AUTHOR_JOB_TITLE} behind Qwabi Engineering. About ${AUTHOR_EXPERIENCE_YEARS} years shipping production apps, platforms, and AI tools for South African founders. Queenstown, Eastern Cape; remote across SA.`;

export default function AboutPage() {
  return (
    <SupportingPageShell
      title={ABOUT_META_TITLE}
      description={ABOUT_META_DESCRIPTION}
      canonicalPath="/about"
      jsonLd={buildProfilePageSchema()}
    >
      <PageHero
        className="mb-12"
        eyebrow={FOUNDER_PAGE_LABEL}
        title={SITE_NAME}
        subtitle={`${AUTHOR_JOB_TITLE} in ${AUTHOR_LOCATION}. I lead Qwabi Engineering: architecture, build, and launch without agency handoffs. Serving South Africa and remote clients.`}
      />

      <div className="trust-prose">
        <div className="not-prose flex flex-col sm:flex-row gap-6 mb-10">
          <img
            src={AUTHOR_PROFILE_IMAGE}
            alt={`Portrait of ${SITE_NAME}`}
            width={128}
            height={128}
            className="w-28 h-28 rounded-xl object-cover border border-surface-border"
          />
          <div>
            <p className="font-technical text-accent-gold font-medium">{AUTHOR_JOB_TITLE}</p>
            <p className="text-sm text-text-secondary mt-1">{AUTHOR_LOCATION}</p>
          </div>
        </div>

        <p>
          I am the senior product engineer and technical founder behind{' '}
          <strong>Qwabi Engineering</strong>. With about {AUTHOR_EXPERIENCE_YEARS} years in software,
          I help founders turn ideas into working apps, platforms, and AI tools without agency
          overhead or the junior-dev lottery.
        </p>

        <p>
          If you landed here from our homepage, that page is the company view: services, pricing, and
          how we work. This page is the person behind the delivery: how I think, what I ship, and
          how to reach me directly.
        </p>

        <p>
          My stack is mostly React, Next.js, Node.js, TypeScript, and Python, with cloud work on GCP,
          AWS, and Azure. I use Supabase and Firebase when a project needs a fast, real-time backend.
        </p>
        <ul className="not-prose flex flex-wrap gap-2 mb-8" aria-label="Technologies I work with">
          {ABOUT_STACK.map((tech) => (
            <li key={tech}>
              <TechTag label={tech} size="md" />
            </li>
          ))}
        </ul>

        <h2>Selected shipped work</h2>
        <ul className="space-y-3">
          {shippedWork.map((item) => (
            <li key={item.url}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
              <span className="text-text-muted"> · {item.note}</span>
            </li>
          ))}
        </ul>

        <h2>Writing</h2>
        <p>
          I publish notes on product engineering, AI, cloud architecture, and Eastern Cape culture and
          history on my personal site. Some posts are hands-on build logs; others are researched
          explainers. See{' '}
          <Link to="/editorial">editorial standards</Link> for how I treat sources and updates.
        </p>

        <h2>Contact</h2>
        <p className="not-prose flex flex-wrap items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <MessageCircle className="w-4 h-4" aria-hidden />
            WhatsApp
          </a>
          <a href={`mailto:${AUTHOR_EMAIL}`} className="btn-outline">
            {AUTHOR_EMAIL}
          </a>
        </p>

        <h2>Profiles</h2>
        <ul>
          {AUTHOR_SAME_AS.map((url) => (
            <li key={url}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-sm text-text-muted">
          <Link to="/privacy" className="text-primary hover:underline underline-offset-4">
            Privacy policy
          </Link>
        </p>
      </div>
    </SupportingPageShell>
  );
}
