# Cursor Full-Site Implementation Prompt
## Ayabonga Qwabi Business Site — `business.qwabi.co.za`

---

## YOUR ROLE

You are an expert frontend engineer implementing the "Accessible Dark Authority" redesign for `business.qwabi.co.za`. You have two authoritative documents:

1. `CONSOLIDATED-DESIGN-GUIDELINES.md` — the design system, token values, layout rules, motion rules, and page-by-page specifications. This is your design bible. When in doubt, consult it.
2. This file — the implementation specification. It tells you exactly what to build, in what order, with what code.

You do not make design decisions. You implement the decisions already made in the guidelines. If you encounter a gap, ask before guessing.

---

## STACK

- **Framework:** Vite + React 18 + TypeScript
- **Styling:** Tailwind CSS (configured to reference CSS custom properties)
- **Animation:** GSAP (for hero kinetic typography only), CSS scroll-driven animations (for scroll reveals), CSS transitions (for micro-interactions)
- **Routing:** React Router v6
- **Fonts:** Google Fonts — Outfit, Space Grotesk, Inter

---

## PHASE 1: DESIGN SYSTEM FOUNDATION

### Task 1.1 — Update `src/index.css`

Replace the existing CSS with the following. Do not preserve any existing color variables or font declarations.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* === SURFACES === */
    --color-surface-base:    #0A192F;
    --color-surface-raised:  #112240;
    --color-surface-overlay: #1E3A5F;
    --color-surface-border:  #2D4A6E;

    /* === TEXT === */
    --color-text-primary:   #E2E8F0;
    --color-text-secondary: #94A3B8;
    --color-text-muted:     #64748B;
    --color-text-inverse:   #0A192F;

    /* === ACCENTS === */
    --color-accent-gold:         #FFD700;
    --color-accent-gold-hover:   #FFE033;
    --color-accent-emerald:      #059669;
    --color-accent-emerald-hover:#10B981;

    /* === SEMANTIC === */
    --color-success: #059669;
    --color-warning: #F59E0B;
    --color-error:   #EF4444;
    --color-info:    #3B82F6;

    /* === TYPE SCALE === */
    --type-display-hero: clamp(3.5rem, 9vw, 9rem);
    --type-display-lg:   clamp(2.75rem, 6vw, 6rem);
    --type-display-md:   clamp(2rem, 4vw, 4rem);
    --type-heading-lg:   clamp(1.5rem, 2.5vw, 2.25rem);
    --type-heading-md:   clamp(1.25rem, 2vw, 1.75rem);
    --type-heading-sm:   clamp(1rem, 1.5vw, 1.375rem);
    --type-body-lg:      clamp(1.0625rem, 1.5vw, 1.25rem);
    --type-body-md:      clamp(0.9375rem, 1.25vw, 1.0625rem);
    --type-body-sm:      0.875rem;
    --type-label:        0.75rem;
    --type-label-tracking: 0.12em;

    /* === LEADING === */
    --leading-display: 0.9;
    --leading-heading: 1.1;
    --leading-body:    1.65;
    --leading-relaxed: 1.8;

    /* === SPACING === */
    --space-1:  0.25rem;
    --space-2:  0.5rem;
    --space-3:  0.75rem;
    --space-4:  1rem;
    --space-6:  1.5rem;
    --space-8:  2rem;
    --space-12: 3rem;
    --space-16: 4rem;
    --space-24: 6rem;
    --space-32: 8rem;
  }

  /* === GLOBAL RESETS === */
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-surface-base);
    color: var(--color-text-primary);
    font-family: 'Space Grotesk', sans-serif;
    font-size: var(--type-body-md);
    line-height: var(--leading-body);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background-color: var(--color-accent-gold);
    color: var(--color-text-inverse);
  }

  /* === ACCESSIBILITY: REDUCED MOTION === */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* === SCROLL REVEAL (CSS-ONLY, ZERO JS) === */
  @supports (animation-timeline: scroll()) {
    .scroll-reveal {
      animation: reveal-up linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 40%;
    }

    @keyframes reveal-up {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  }

  @supports not (animation-timeline: scroll()) {
    .scroll-reveal { opacity: 1; transform: none; }
  }

  /* === MICRO-INTERACTIONS === */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background: var(--color-accent-gold);
    color: var(--color-text-inverse);
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: var(--type-body-sm);
    letter-spacing: 0.04em;
    padding: var(--space-3) var(--space-6);
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
    transition: background 150ms ease-out, transform 150ms ease-out;
    text-decoration: none;
  }
  .btn-primary:hover  { background: var(--color-accent-gold-hover); transform: scale(1.02); }
  .btn-primary:active { transform: scale(0.98); }
  .btn-primary:focus-visible {
    outline: 2px solid var(--color-accent-gold);
    outline-offset: 3px;
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background: transparent;
    color: var(--color-accent-gold);
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: var(--type-body-sm);
    letter-spacing: 0.04em;
    padding: var(--space-3) var(--space-6);
    border-radius: 0.375rem;
    border: 1px solid var(--color-accent-gold);
    cursor: pointer;
    transition: background 150ms ease-out, color 150ms ease-out;
    text-decoration: none;
  }
  .btn-outline:hover {
    background: rgba(255, 215, 0, 0.08);
  }
  .btn-outline:focus-visible {
    outline: 2px solid var(--color-accent-gold);
    outline-offset: 3px;
  }

  .form-input {
    width: 100%;
    background: var(--color-surface-raised);
    border: 1px solid var(--color-surface-border);
    border-radius: 0.375rem;
    padding: var(--space-3) var(--space-4);
    color: var(--color-text-primary);
    font-family: 'Space Grotesk', sans-serif;
    font-size: var(--type-body-md);
    transition: border-color 150ms ease, box-shadow 150ms ease;
  }
  .form-input:focus {
    outline: none;
    border-color: var(--color-accent-gold);
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.15);
  }
  .form-input.error {
    border-color: var(--color-error);
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
  }
  .form-input::placeholder {
    color: var(--color-text-muted);
  }

  .nav-link {
    position: relative;
    color: var(--color-text-secondary);
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 500;
    font-size: 0.8125rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    transition: color 200ms ease-out;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--color-accent-gold);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 200ms ease-out;
  }
  .nav-link:hover { color: var(--color-text-primary); }
  .nav-link:hover::after,
  .nav-link[aria-current="page"]::after { transform: scaleX(1); }

  /* === SERVICE CARDS === */
  .service-card {
    background: var(--color-surface-raised);
    border: 1px solid var(--color-surface-border);
    border-radius: 0.75rem;
    padding: var(--space-8);
    transition: background 200ms ease-out, border-color 200ms ease-out;
  }
  .service-card:hover {
    background: var(--color-surface-overlay);
    border-color: rgba(255, 215, 0, 0.4);
  }

  /* === SECTION LABEL === */
  .section-label {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 500;
    font-size: var(--type-label);
    letter-spacing: var(--type-label-tracking);
    text-transform: uppercase;
    color: var(--color-accent-gold);
  }

  /* === CONTAINER === */
  .container {
    width: 100%;
    max-width: 1280px;
    margin-inline: auto;
    padding-inline: clamp(1.5rem, 5vw, 4rem);
  }
}
```

### Task 1.2 — Update `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display:   ['Outfit', 'sans-serif'],
        technical: ['Space Grotesk', 'sans-serif'],
        body:      ['Inter', 'sans-serif'],
      },
      colors: {
        surface: {
          base:    'var(--color-surface-base)',
          raised:  'var(--color-surface-raised)',
          overlay: 'var(--color-surface-overlay)',
          border:  'var(--color-surface-border)',
        },
        text: {
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted:     'var(--color-text-muted)',
          inverse:   'var(--color-text-inverse)',
        },
        accent: {
          gold:    'var(--color-accent-gold)',
          emerald: 'var(--color-accent-emerald)',
        },
      },
    },
  },
  plugins: [],
};
```

### Task 1.3 — Update `index.html`

Add Google Fonts and set the page title and meta description.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Ayabonga Qwabi Engineering — Technical software partnerships for South African SMEs. Custom software, retainer development, and technical leadership." />
    <title>Ayabonga Qwabi Engineering</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&family=Space+Grotesk:wght@400;500;600&family=Inter:wght@400;500&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## PHASE 2: SHARED COMPONENTS

### Task 2.1 — `src/components/SiteNav.tsx`

```tsx
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Services',  href: '/#services' },
  { label: 'Work',      href: '/#work' },
  { label: 'Pricing',   href: '/pricing-strategy' },
  { label: 'About',     href: '/about' },
  { label: 'Blog',      href: '/blog' },
];

export function SiteNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`site-nav fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled
          ? 'bg-[rgba(10,25,47,0.88)] backdrop-blur-[12px] border-b border-surface-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Brand */}
        <Link
          to="/"
          className="font-display font-bold text-[1.125rem] text-accent-gold tracking-tight"
        >
          Qwabi Engineering
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="nav-link">
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/get-a-quote" className="btn-outline text-xs px-4 py-2">
            Get a Quote
          </a>
          <a
            href="https://wa.me/27XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs px-4 py-2"
          >
            WhatsApp
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-text-primary p-2"
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <span className="block w-5 h-0.5 bg-current mb-1 transition-all" />
          <span className="block w-5 h-0.5 bg-current mb-1 transition-all" />
          <span className="block w-5 h-0.5 bg-current transition-all" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-surface-raised border-t border-surface-border">
          <nav className="container py-6 flex flex-col gap-4" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="nav-link text-base"
                onClick={() => setIsMobileOpen(false)}
              >
                {label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-surface-border">
              <a href="/get-a-quote" className="btn-outline text-center">Get a Quote</a>
              <a href="https://wa.me/27XXXXXXXXX" className="btn-primary text-center" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
```

### Task 2.2 — `src/components/SiteFooter.tsx`

```tsx
import { Link } from 'react-router-dom';

const FOOTER_LINKS = {
  Services: [
    { label: 'Custom Software', href: '/services/custom-software' },
    { label: 'Technical Retainer', href: '/services/retainer' },
    { label: 'App Development', href: '/services/app-development' },
    { label: 'Technical Leadership', href: '/services/technical-leadership' },
  ],
  Resources: [
    { label: 'App Development Cost', href: '/app-development-cost-south-africa' },
    { label: 'Retainer Pricing', href: '/pricing-strategy' },
    { label: 'Get a Quote', href: '/get-a-quote' },
    { label: 'Blog', href: '/blog' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Personal Site', href: 'https://www.qwabi.co.za', external: true },
    { label: 'GitHub', href: 'https://github.com/ayabongaqwabi', external: true },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/ayabongaqwabi', external: true },
  ],
};

export function SiteFooter() {
  return (
    <footer className="bg-surface-raised border-t border-surface-border mt-auto">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div>
            <p className="font-display font-bold text-[1.125rem] text-accent-gold mb-3">
              Qwabi Engineering
            </p>
            <p className="text-text-secondary text-sm leading-relaxed max-w-[220px]">
              Technical software partnerships for South African SMEs.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="section-label mb-4">{group}</p>
              <ul className="flex flex-col gap-2">
                {links.map(({ label, href, external }) => (
                  <li key={label}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-200"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        to={href}
                        className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-200"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-surface-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} Ayabonga Qwabi Engineering. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">
            Based in South Africa. Working with SMEs across Africa.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

---

## PHASE 3: ANIMATION INFRASTRUCTURE

### Task 3.1 — Install GSAP

```bash
npm install gsap
```

### Task 3.2 — `src/lib/animations.ts`

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Animates a hero headline with a staggered word entrance.
 * Words must have the class "hero-word" and be direct children of containerEl.
 * Silently returns if the user prefers reduced motion.
 */
export const animateHeroHeadline = (containerEl: HTMLElement): void => {
  if (prefersReducedMotion()) return;

  const words = containerEl.querySelectorAll<HTMLElement>('.hero-word');
  if (!words.length) return;

  gsap.fromTo(
    words,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.2,
    }
  );
};

/**
 * Animates supporting elements (subheadline, CTA) after the hero headline.
 * Silently returns if the user prefers reduced motion.
 */
export const animateHeroSupport = (elements: HTMLElement[]): void => {
  if (prefersReducedMotion()) return;

  gsap.fromTo(
    elements,
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.9,
    }
  );
};
```

---

## PHASE 4: HOMEPAGE

### Task 4.1 — `src/pages/HomePage.tsx`

Build the homepage in this exact section order. Each section is a separate component imported into `HomePage.tsx`.

```
src/
  pages/
    HomePage.tsx
  components/
    home/
      HeroSection.tsx
      ServicesSection.tsx
      PartnershipSection.tsx
      BuildCostsTeaser.tsx
      PricingSection.tsx
      WorkSection.tsx
      CtaSection.tsx
```

**`HeroSection.tsx`** — Kinetic typography, full viewport.

```tsx
import { useEffect, useRef } from 'react';
import { animateHeroHeadline, animateHeroSupport } from '../../lib/animations';

const HEADLINE_WORDS = ['Stop', 'winning', 'the', 'junior', 'dev', 'lottery.'];

export function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headlineRef.current) animateHeroHeadline(headlineRef.current);
    if (subRef.current && ctaRef.current) {
      animateHeroSupport([subRef.current, ctaRef.current]);
    }
  }, []);

  return (
    <section
      className="relative min-h-svh flex items-center pt-16"
      style={{
        background: 'radial-gradient(ellipse at 20% 50%, rgba(5, 150, 105, 0.06) 0%, transparent 60%)',
      }}
    >
      <div className="container">
        <div className="max-w-[900px]">
          {/* Section label */}
          <p className="section-label mb-6">Technical Software Partnerships</p>

          {/* Headline — kinetic typography */}
          <h1
            ref={headlineRef}
            className="font-display font-black mb-8"
            style={{
              fontSize: 'var(--type-display-hero)',
              lineHeight: 'var(--leading-display)',
              letterSpacing: '-0.03em',
            }}
          >
            {HEADLINE_WORDS.map((word, i) => (
              <span key={i} className="hero-word inline-block mr-[0.2em]">
                {word}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p
            ref={subRef}
            className="text-text-secondary max-w-[560px] mb-10"
            style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
          >
            I build and maintain software for South African SMEs as a dedicated technical partner.
            No agencies. No handoffs. Direct access to a senior engineer who owns your codebase.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <a href="/get-a-quote" className="btn-primary">
              Start a technical partnership
            </a>
            <a href="/#work" className="btn-outline">
              See the work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**`ServicesSection.tsx`** — Bento Grid layout.

```tsx
const SERVICES = [
  {
    label: 'Core Service',
    title: 'Custom Software Development',
    description: 'Full-stack web and mobile applications built to your exact requirements. React, Node.js, TypeScript, PostgreSQL.',
    size: 'primary', // spans 7 columns
  },
  {
    label: 'Ongoing',
    title: 'Technical Retainer',
    description: 'A dedicated engineering partner on a monthly retainer. Feature development, bug fixes, and technical decisions.',
    size: 'secondary', // spans 5 columns
  },
  {
    label: 'Mobile',
    title: 'App Development',
    description: 'React Native mobile apps for iOS and Android.',
    size: 'tertiary', // spans 4 columns
  },
  {
    label: 'Leadership',
    title: 'Technical Leadership',
    description: 'CTO-as-a-service. Architecture reviews, team mentoring, and technical strategy.',
    size: 'tertiary',
  },
  {
    label: 'Integrations',
    title: 'API & Systems Integration',
    description: 'Connect your tools, automate workflows, and integrate third-party services.',
    size: 'tertiary',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24">
      <div className="container">
        <p className="section-label mb-3">What I Build</p>
        <h2
          className="font-display font-bold text-text-primary mb-12"
          style={{ fontSize: 'var(--type-display-md)', lineHeight: 'var(--leading-heading)', letterSpacing: '-0.02em' }}
        >
          Engineering services
        </h2>

        {/* Bento Grid */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}
        >
          {SERVICES.map((service) => {
            const colSpan =
              service.size === 'primary'   ? 'md:col-span-7' :
              service.size === 'secondary' ? 'md:col-span-5' : 'md:col-span-4';
            const rowSpan = service.size === 'primary' ? 'md:row-span-2' : '';

            return (
              <div
                key={service.title}
                className={`service-card scroll-reveal col-span-12 ${colSpan} ${rowSpan}`}
              >
                <p className="section-label mb-3">{service.label}</p>
                <h3
                  className="font-display font-bold text-text-primary mb-3"
                  style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
                >
                  {service.title}
                </h3>
                <p className="text-text-secondary" style={{ fontSize: 'var(--type-body-md)' }}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

**`PricingSection.tsx`** — No animation. Evaluation zone.

```tsx
const TIERS = [
  {
    name: 'Starter',
    price: 'R 8,500',
    period: '/month',
    description: 'For SMEs that need reliable ongoing development without a full-time hire.',
    features: ['20 hours/month', 'Bug fixes & maintenance', 'Monthly progress report', 'WhatsApp access'],
    cta: 'Start Starter',
    recommended: false,
  },
  {
    name: 'Growth',
    price: 'R 18,000',
    period: '/month',
    description: 'For businesses actively building new features and scaling their product.',
    features: ['40 hours/month', 'Feature development', 'Weekly check-ins', 'Priority response', 'Architecture advice'],
    cta: 'Start Growth',
    recommended: true,
  },
  {
    name: 'Scale',
    price: 'R 32,000',
    period: '/month',
    description: 'For companies that need a dedicated technical partner across all engineering decisions.',
    features: ['80 hours/month', 'Full-stack development', 'Technical leadership', 'Team mentoring', 'On-site available'],
    cta: 'Start Scale',
    recommended: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24">
      <div className="container">
        <p className="section-label mb-3">Retainer Pricing</p>
        <h2
          className="font-display font-bold text-text-primary mb-4"
          style={{ fontSize: 'var(--type-display-md)', lineHeight: 'var(--leading-heading)', letterSpacing: '-0.02em' }}
        >
          Predictable monthly investment
        </h2>
        <p className="text-text-secondary mb-12 max-w-[520px]" style={{ fontSize: 'var(--type-body-lg)' }}>
          No hourly billing surprises. A fixed monthly investment for a dedicated engineering partner.
        </p>

        {/* Pricing grid — NO scroll-reveal class, renders immediately */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className="bg-surface-raised rounded-xl p-8 flex flex-col"
              style={{
                border: tier.recommended
                  ? '1px solid var(--color-accent-emerald)'
                  : '1px solid var(--color-surface-border)',
              }}
            >
              {tier.recommended && (
                <p className="section-label text-accent-emerald mb-4">Recommended</p>
              )}
              <p className="font-technical font-semibold text-text-secondary text-sm mb-2">{tier.name}</p>
              <div className="flex items-end gap-1 mb-3">
                <span
                  className="font-display font-black text-text-primary"
                  style={{ fontSize: 'var(--type-display-md)', lineHeight: 1 }}
                >
                  {tier.price}
                </span>
                <span className="text-text-secondary text-sm mb-1">{tier.period}</span>
              </div>
              <p className="text-text-secondary text-sm mb-6 leading-relaxed">{tier.description}</p>
              <ul className="flex flex-col gap-2 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="text-accent-emerald">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/get-a-quote"
                className={tier.recommended ? 'btn-primary text-center' : 'btn-outline text-center'}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**`CtaSection.tsx`** — Gold background, maximum contrast.

```tsx
export function CtaSection() {
  return (
    <section
      className="py-24"
      style={{ background: 'var(--color-accent-gold)' }}
    >
      <div className="container text-center">
        <h2
          className="font-display font-black mb-4"
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
          className="mb-8 max-w-[480px] mx-auto"
          style={{
            fontSize: 'var(--type-body-lg)',
            color: 'rgba(10, 25, 47, 0.7)',
          }}
        >
          Let's talk about your product, your timeline, and what a technical partnership looks like for your business.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/get-a-quote"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-technical font-semibold text-sm"
            style={{ background: 'var(--color-text-inverse)', color: 'var(--color-accent-gold)' }}
          >
            Start a technical partnership
          </a>
          <a
            href="https://wa.me/27XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-technical font-semibold text-sm"
            style={{ border: '1px solid rgba(10, 25, 47, 0.4)', color: 'var(--color-text-inverse)' }}
          >
            WhatsApp me directly
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

## PHASE 5: CONVERSION PAGES

### Task 5.1 — `/get-a-quote`

This page contains the scope estimator form. Implement with full keyboard navigability and micro-interactions.

- All `<input>`, `<select>`, and `<textarea>` elements use the `form-input` class.
- All `<label>` elements are explicitly associated with their input via `htmlFor`.
- Validation errors display below the field in `var(--color-error)` text.
- The estimated price result is displayed in `Outfit` 800, large, `var(--color-accent-gold)` text.
- No scroll animations on this page.

### Task 5.2 — `/pricing-strategy`

This page is a detailed breakdown of the retainer pricing model. Implement as a clean, readable page:

- Use the same `PricingSection` component from the homepage.
- Add a comparison table below it using `bg-surface-raised` and `Space Grotesk`.
- No scroll animations.
- Primary CTA at the bottom: "Start a technical partnership" (gold button).

---

## RULES SUMMARY

| Rule | Detail |
|---|---|
| No light mode | Do not write `dark:` Tailwind variants. The base is dark. |
| No drop shadows | Use `bg-surface-raised` + `border-surface-border` for elevation. |
| No animations in evaluation zones | Pricing, forms, `/get-a-quote`, `/pricing-strategy` render statically. |
| Reduced motion | Every GSAP call is wrapped in `prefersReducedMotion()` check. CSS uses `@media (prefers-reduced-motion: reduce)`. |
| WCAG AA | All text must meet 4.5:1 contrast ratio. Use the token values defined in the guidelines. |
| Keyboard nav | All interactive elements are reachable by Tab. Focus indicators are visible. |
| Copy rules | No em dashes. Direct, technical tone. Specific CTAs (not "Learn more"). |
