import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  Database,
  FileText,
  Search,
  DollarSign,
  Calendar,
  Users,
  TrendingUp,
} from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { BookDiscoveryCallButton } from '../components/shared/BookDiscoveryCallButton';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  GET_ESTIMATE_LABEL,
  QUOTE_PAGE,
  SITE_NAME,
  TWITTER_HANDLE,
} from '../lib/site-config';
import {
  authorGraphNode,
  buildBreadcrumbSchema,
  buildCaseStudyArticleNode,
  buildJsonLdGraph,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from '../lib/entity-schema';

const PAGE_TITLE = 'Fundibot Case Study | College in Your Pocket';
const PAGE_DESCRIPTION =
  'How Qwabi Engineering built a free platform helping South African matriculants find courses, check APS requirements, and plan their futures — powered by 23+ scraped prospectuses and a custom enrichment pipeline.';
const CANONICAL_PATH = '/case-studies/fundibot';

const STATS = [
  { num: '75+', label: 'Institutions targeted' },
  { num: '23+', label: 'Prospectuses scraped' },
  { num: '3,000+', label: 'Courses mapped' },
];

const TECH_CARDS = [
  {
    num: '01',
    title: 'PDF scraping at scale',
    desc: '23+ university and TVET prospectuses processed, most as multi-hundred-page PDFs. Used a combination of pdfplumber, Tesseract OCR for scanned pages, and Claude AI for extraction and structuring where text layers were absent or corrupt.',
  },
  {
    num: '02',
    title: 'Admission system fragmentation',
    desc: 'SA institutions use at least 4 different points systems: standard NSC APS, UCT Faculty Points Score (FPS) and Weighted Points Score (WPS), and UWC\'s own Code-based points table. Each required a separate detection and calculation model.',
  },
  {
    num: '03',
    title: 'Enrichment pipeline (enrich_pipeline.py)',
    desc: 'A smart Python pipeline that detects: South African currency (R followed by digits, with thousand separators), admission requirement strings in formats like "Mathematics 4", "70% for English", "Engl HL/FAL 4 and Maths 4 and at least three of the designated 20 credit subjects", and qualification types including NCV Level 2/3/4, NATED N4–N6, Degrees, Diplomas, and Advanced Diplomas.',
  },
  {
    num: '04',
    title: 'TVET default logic',
    desc: 'TVET colleges follow DHET defaults that no prospectus states explicitly. NCV Level 2 requires Grade 9. NCV Level 3 requires NCV Level 2. NCV Level 4 requires NCV Level 3. NATED N4–N6 requires Matric. The pipeline infers these where no requirement is stated and flags inferred entries for review.',
  },
  {
    num: '05',
    title: 'Bursary scraping',
    desc: '976 unique bursaries with direct URLs scraped from zabursaries.co.za using Claude in Chrome browser automation. The site blocks Python requests — browser-level scraping was the only path. Data is structured by field of study category and subcategory.',
  },
  {
    num: '06',
    title: 'Structured JSON output',
    desc: 'All scraped and enriched data compiles to typed JSON datasets consumed by the frontend tools. Each dataset has a metadata block with source, scrape date, confidence indicators, and inferred-flag counts so the UI can surface data quality honestly.',
  },
];

const TOOLS = [
  {
    num: '01',
    icon: Search,
    title: 'Course and Institution Finder',
    desc: 'Enter a course name or institution. Filter by province, qualification type, and APS score. Returns matching programmes with admission requirements, fee estimates, and institution contact details.',
    status: 'live' as const,
  },
  {
    num: '02',
    icon: CheckCircle2,
    title: 'University Qualification Checker',
    desc: "Student enters their subjects and marks. The tool calculates APS, UCT FPS/WPS, and UWC points in parallel, then shows which programmes at which institutions they qualify for — with band indicators for guaranteed, probable, and possible admission.",
    status: 'live' as const,
  },
  {
    num: '03',
    icon: DollarSign,
    title: 'What Could You Earn?',
    desc: 'Subjects and marks map to career fields, then to specific occupations, then to real ZAR salary ranges from Paylab SA survey data. 154 occupations across 26 sectors. First result is a hero card with a counting salary animation.',
    status: 'live' as const,
  },
  {
    num: '04',
    icon: TrendingUp,
    title: 'Predict My Future',
    desc: 'A personalised timeline from current grade to marriage milestone. Pulls occupation from salary tool, institution from qualification checker, and employer from the SA companies dataset. Random positive and character-building events inserted for realism and fun.',
    status: 'live' as const,
  },
  {
    num: '05',
    icon: FileText,
    title: 'Bursary and Funding Matcher',
    desc: '976 bursaries with direct URLs to zabursaries.co.za. Student filters by field of study and province. NSFAS eligibility check included. Government bursaries filtered by province match.',
    status: 'live' as const,
  },
  {
    num: '06',
    icon: Calendar,
    title: 'Study Cost and Fee Calculator',
    desc: 'Estimates total cost to graduation including tuition, accommodation, and living costs. NSFAS coverage estimator. Year-by-year projector with 8% annual fee increase default. PDF export of cost summary.',
    status: 'coming' as const,
  },
  {
    num: '07',
    icon: Database,
    title: 'Institution Stats Dashboard',
    desc: 'Visualisations of the full dataset: programmes by institution, by province, by qualification type, by admission data coverage. Attribution block crediting all scraped sources.',
    status: 'live' as const,
  },
];

const IMPACT_STATS = [
  { num: '75+', label: 'Institutions in dataset' },
  { num: '3,000+', label: 'Courses mapped' },
  { num: '976', label: 'Bursaries with direct links' },
  { num: '154', label: 'SA occupations with salary ranges' },
  { num: '100%', label: 'Free, no login required' },
  { num: '9', label: 'Provinces targeted for coverage' },
  { num: '23+', label: 'Prospectuses processed' },
  { num: '0', label: 'Ads, paywalls, or gated content' },
];

const LESSONS = [
  {
    num: '01',
    heading: 'SA education data is fragmented by design, or neglect.',
    body: 'No two institutions publish admission data in the same format. Some APS tables are images. Some fee schedules are 4-year-old PDFs. Building Fundibot exposed how much friction sits between learners and the information they need to make life decisions.',
  },
  {
    num: '02',
    heading: 'PDF scraping at scale requires fallbacks at every step.',
    body: 'pdfplumber handles text PDFs well. Scanned PDFs need OCR. AI extraction handles the edge cases OCR misses. No single tool covers everything — the pipeline has to degrade gracefully and flag failures rather than silently drop data.',
  },
  {
    num: '03',
    heading: 'Fun tools are not shallow tools.',
    body: 'The Predict My Future timeline and salary estimator are the most engaged-with parts of the platform. Students do not want a database — they want to see themselves in the future. The emotional layer is the product.',
  },
  {
    num: '04',
    heading: "Saying 'work in progress' builds more trust than hiding it.",
    body: 'Every data point on Fundibot that was inferred rather than explicitly scraped is flagged. Users can see the coverage and the gaps. This transparency has generated more positive feedback than any polished-but-silent system would have.',
  },
];

const ROADMAP = [
  {
    label: 'Complete Western Cape coverage',
    desc: 'UCT, Stellenbosch, CPUT, UWC, and Western Cape TVET colleges fully enriched with programme, admission, and fee data',
  },
  {
    label: 'All 9 provinces',
    desc: 'Every public university and TVET college in South Africa represented with at minimum programme names and NQF levels',
  },
  {
    label: 'Private colleges',
    desc: 'Boston City Campus, Damelin, IMM, Rosebank College, and others added with distinct institution type labelling',
  },
  {
    label: 'Application deadline tracker',
    desc: 'Real opening and closing dates per institution, with status indicators and optional reminder links',
  },
  {
    label: 'Study group and peer matching',
    desc: 'Optional lightweight accounts for learners to save their profiles, share timelines, and connect with others in the same field',
  },
  {
    label: 'Improved pricing data',
    desc: 'Per-module fee breakdowns where available, not just institutional averages',
  },
];

export default function FundibotCaseStudy() {
  const canonical = absoluteUrl(CANONICAL_PATH);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Case studies', path: '/case-studies' },
    { name: 'Fundibot', path: CANONICAL_PATH },
  ]);

  const pageSchema = buildJsonLdGraph([
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    authorGraphNode(),
    breadcrumbSchema,
    buildCaseStudyArticleNode({
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      canonical,
      aboutName: 'Fundibot',
    }),
  ]);

  return (
    <>
      <Helmet>
        <title>{`${PAGE_TITLE} | ${SITE_NAME}`}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={`${PAGE_TITLE} | ${SITE_NAME}`} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <PageShell mainClassName="flex-1 pt-[4.5rem]">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden border-b border-surface-border"
          style={{ background: 'var(--color-surface-raised)' }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(var(--color-surface-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-surface-border) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #4ECDC4, transparent 70%)' }}
            aria-hidden
          />

          <div className="container py-16 md:py-24 relative z-10">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden />
              All case studies
            </Link>

            <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">
              {/* Left */}
              <div>
                <p
                  className="font-mono text-xs uppercase tracking-widest mb-4"
                  style={{ color: 'var(--color-accent-gold)', letterSpacing: 'var(--type-label-tracking)' }}
                >
                  Case Study — Personal project
                </p>

                <h1
                  className="font-display font-bold text-text-primary mb-6"
                  style={{ fontSize: 'var(--type-display-lg)', lineHeight: 'var(--leading-heading)' }}
                >
                  Fundibot: Making South African Higher Education Accessible
                </h1>

                <p
                  className="text-text-secondary max-w-2xl mb-6"
                  style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-relaxed)' }}
                >
                  A free, no-login platform helping matriculants find courses, check APS requirements,
                  calculate points scores, and plan their careers. Built from scraped prospectuses,
                  enriched JSON datasets, and a determination to give every South African learner
                  the information they deserve.
                </p>

                <p
                  className="font-mono text-xs uppercase mb-8"
                  style={{ color: 'var(--color-text-muted)', letterSpacing: 'var(--type-label-tracking)' }}
                >
                  Built by Ayabonga Qwabi · Qwabi Engineering · 2025 - ongoing
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <a
                    href="https://fundibot.qwabi.co.za/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary min-h-[44px] inline-flex items-center gap-2"
                  >
                    Visit Fundibot
                    <ExternalLink className="w-4 h-4" aria-hidden />
                  </a>
                  <Link to={QUOTE_PAGE} className="btn-outline min-h-[44px]">
                    {GET_ESTIMATE_LABEL}
                  </Link>
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold border"
                    style={{
                      color: 'var(--color-accent-gold)',
                      borderColor: 'var(--color-accent-gold)',
                      background: 'var(--color-surface-base)',
                      letterSpacing: 'var(--type-label-tracking)',
                    }}
                  >
                    Work in progress
                  </span>
                </div>
              </div>

              {/* Right: mascot + stats */}
              <div className="flex flex-col items-center gap-6 flex-shrink-0">
                <svg
                  width="200"
                  height="260"
                  viewBox="0 0 200 260"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Fundibot mascot — a friendly blue robot"
                  role="img"
                >
                  {/* Antenna */}
                  <line x1="100" y1="30" x2="100" y2="10" stroke="#4ECDC4" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="100" cy="7" r="5" fill="#4ECDC4" />
                  {/* Head */}
                  <rect x="60" y="30" width="80" height="70" rx="16" fill="#4ECDC4" />
                  {/* Eyes */}
                  <circle cx="82" cy="60" r="10" fill="white" />
                  <circle cx="118" cy="60" r="10" fill="white" />
                  <circle cx="84" cy="62" r="5" fill="#0a192f" />
                  <circle cx="120" cy="62" r="5" fill="#0a192f" />
                  {/* Smile */}
                  <path d="M84 84 Q100 96 116 84" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
                  {/* Neck */}
                  <rect x="90" y="100" width="20" height="12" rx="4" fill="#3ab8b0" />
                  {/* Body */}
                  <rect x="40" y="112" width="120" height="100" rx="20" fill="#4ECDC4" />
                  {/* Chest panel */}
                  <rect x="60" y="128" width="80" height="50" rx="10" fill="#3ab8b0" />
                  {/* Panel lights */}
                  <circle cx="78" cy="148" r="6" fill="#ffd700" />
                  <circle cx="100" cy="148" r="6" fill="white" opacity="0.8" />
                  <circle cx="122" cy="148" r="6" fill="#059669" />
                  {/* Arms */}
                  <rect x="10" y="118" width="30" height="60" rx="12" fill="#4ECDC4" />
                  <rect x="160" y="118" width="30" height="60" rx="12" fill="#4ECDC4" />
                  {/* Legs */}
                  <rect x="60" y="212" width="32" height="40" rx="10" fill="#3ab8b0" />
                  <rect x="108" y="212" width="32" height="40" rx="10" fill="#3ab8b0" />
                </svg>

                <div className="flex gap-3 flex-wrap justify-center">
                  {STATS.map((s) => (
                    <div
                      key={s.label}
                      className="flex flex-col items-center px-4 py-3 rounded-lg border"
                      style={{
                        background: 'var(--color-surface-overlay)',
                        borderColor: 'var(--color-surface-border)',
                      }}
                    >
                      <span
                        className="font-display font-bold text-lg leading-none"
                        style={{ color: 'var(--color-accent-gold)' }}
                      >
                        {s.num}
                      </span>
                      <span
                        className="font-mono text-center mt-1"
                        style={{ fontSize: 'var(--type-label)', color: 'var(--color-text-secondary)', letterSpacing: 'var(--type-label-tracking)' }}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROBLEM / SOLUTION ─────────────────────────────────────── */}
        <section className="container py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Problem */}
            <div>
              <p
                className="font-mono text-xs uppercase tracking-widest mb-3"
                style={{ color: 'var(--color-accent-gold)', letterSpacing: 'var(--type-label-tracking)' }}
              >
                The problem
              </p>
              <h2
                className="font-display font-bold text-text-primary mb-6"
                style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
              >
                Grade 12 ends. Then what?
              </h2>
              <ul className="space-y-4">
                {[
                  'University prospectuses are 200-page PDFs scattered across 26 different institutional websites',
                  'APS, FPS, WPS, and UWC Points are different systems — no single tool explains all of them',
                  'Thousands of Eastern Cape learners have no guidance counsellor and no data plan to research options',
                ].map((point) => (
                  <li key={point} className="flex gap-3 text-text-secondary" style={{ fontSize: 'var(--type-body-md)', lineHeight: 'var(--leading-relaxed)' }}>
                    <span
                      className="mt-2 h-2 w-2 flex-shrink-0 rounded-full"
                      style={{ background: 'var(--color-accent-gold)' }}
                      aria-hidden
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div>
              <p
                className="font-mono text-xs uppercase tracking-widest mb-3"
                style={{ color: 'var(--color-accent-gold)', letterSpacing: 'var(--type-label-tracking)' }}
              >
                The solution
              </p>
              <h2
                className="font-display font-bold text-text-primary mb-6"
                style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
              >
                One platform. Free. No login.
              </h2>
              <p
                className="text-text-secondary mb-6"
                style={{ fontSize: 'var(--type-body-md)', lineHeight: 'var(--leading-relaxed)' }}
              >
                Fundibot aggregates courses, admission requirements, fee estimates, bursaries, and
                career paths from across South Africa. A learner in Komani with a R5 data bundle
                can check what they qualify for, see what they could earn, and find bursaries that
                cover their field — all in one place.
              </p>
              <div
                className="rounded-lg p-5 border"
                style={{
                  borderLeft: '4px solid #4ECDC4',
                  background: 'var(--color-surface-raised)',
                  borderColor: 'var(--color-surface-border)',
                }}
              >
                <p
                  className="font-semibold text-text-primary mb-2"
                  style={{ fontSize: 'var(--type-body-md)' }}
                >
                  Current coverage
                </p>
                <p className="text-text-secondary" style={{ fontSize: 'var(--type-body-md)', lineHeight: 'var(--leading-relaxed)' }}>
                  Eastern Cape institutions are well covered — University of Fort Hare, Walter Sisulu
                  University, and multiple TVET colleges. Western Cape expansion (UCT, Stellenbosch,
                  CPUT) is in progress. 23+ prospectuses processed. 75+ institutions targeted nationwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── TECHNICAL APPROACH ─────────────────────────────────────── */}
        <section
          className="border-y border-surface-border py-16 md:py-20"
          style={{ background: 'var(--color-surface-raised)' }}
        >
          <div className="container">
            <p
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-accent-gold)', letterSpacing: 'var(--type-label-tracking)' }}
            >
              Technical approach
            </p>
            <h2
              className="font-display font-bold text-text-primary mb-4"
              style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
            >
              Scraping 200-page PDFs and making sense of them.
            </h2>
            <p
              className="text-text-secondary mb-10 max-w-2xl"
              style={{ fontSize: 'var(--type-body-md)', lineHeight: 'var(--leading-relaxed)' }}
            >
              South African institutions publish data in every format imaginable — scanned PDFs,
              Word documents exported to web, HTML tables with no structure. The enrichment pipeline
              had to handle all of it.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {TECH_CARDS.map((card) => (
                <div
                  key={card.num}
                  className="relative rounded-xl border p-6"
                  style={{
                    background: 'var(--color-surface-overlay)',
                    borderColor: 'var(--color-surface-border)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  <span
                    className="absolute top-4 right-5 font-mono font-bold opacity-[0.12]"
                    style={{ fontSize: '3rem', color: 'var(--color-text-muted)', lineHeight: 1 }}
                    aria-hidden
                  >
                    {card.num}
                  </span>
                  <h3
                    className="font-display font-bold text-text-primary mb-3 pr-12"
                    style={{ fontSize: 'var(--type-heading-sm)', lineHeight: 'var(--leading-heading)' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-text-secondary" style={{ fontSize: 'var(--type-body-md)', lineHeight: 'var(--leading-relaxed)' }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOOLS BUILT ────────────────────────────────────────────── */}
        <section className="container py-16 md:py-20">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-accent-gold)', letterSpacing: 'var(--type-label-tracking)' }}
          >
            What was built
          </p>
          <h2
            className="font-display font-bold text-text-primary mb-10"
            style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
          >
            Seven tools. One platform.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.num}
                  className="rounded-xl border p-5 flex flex-col transition-colors duration-200"
                  style={{
                    background: 'var(--color-surface-raised)',
                    borderColor: 'var(--color-surface-border)',
                    borderRadius: 'var(--radius)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,215,0,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-surface-border)';
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <Icon
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: '#4ECDC4' }}
                      aria-hidden
                    />
                    {tool.status === 'live' ? (
                      <span
                        className="inline-flex items-center gap-1.5 font-mono text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(5,150,105,0.12)',
                          color: 'var(--color-accent-emerald)',
                          letterSpacing: 'var(--type-label-tracking)',
                        }}
                      >
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ background: 'var(--color-accent-emerald)' }}
                          aria-hidden
                        />
                        Live
                      </span>
                    ) : (
                      <span
                        className="inline-flex items-center gap-1.5 font-mono text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(100,116,139,0.12)',
                          color: 'var(--color-text-muted)',
                          letterSpacing: 'var(--type-label-tracking)',
                        }}
                      >
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ background: 'var(--color-text-muted)' }}
                          aria-hidden
                        />
                        Coming soon
                      </span>
                    )}
                  </div>
                  <p
                    className="font-mono text-xs mb-2"
                    style={{ color: 'var(--color-text-muted)', letterSpacing: 'var(--type-label-tracking)' }}
                  >
                    {tool.num}
                  </p>
                  <h3
                    className="font-display font-bold text-text-primary mb-2"
                    style={{ fontSize: 'var(--type-heading-sm)', lineHeight: 'var(--leading-heading)' }}
                  >
                    {tool.title}
                  </h3>
                  <p className="text-text-secondary flex-1" style={{ fontSize: 'var(--type-body-sm)', lineHeight: 'var(--leading-relaxed)' }}>
                    {tool.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── IMPACT STATS ───────────────────────────────────────────── */}
        <section
          className="border-y border-surface-border py-16 md:py-20"
          style={{ background: 'var(--color-surface-raised)' }}
        >
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {IMPACT_STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="font-display font-bold leading-none mb-2"
                    style={{ fontSize: 'var(--type-display-md)', color: 'var(--color-accent-gold)' }}
                  >
                    {s.num}
                  </div>
                  <div
                    className="text-text-secondary"
                    style={{ fontSize: 'var(--type-body-sm)', lineHeight: 'var(--leading-body)' }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DATA DISCLAIMER ────────────────────────────────────────── */}
        <section className="container py-16 md:py-20">
          <div
            className="rounded-xl border p-6 md:p-8"
            style={{
              background: 'var(--color-surface-raised)',
              borderLeft: '4px solid var(--color-accent-gold)',
              borderColor: 'var(--color-surface-border)',
              borderRadius: 'var(--radius)',
            }}
          >
            <h2
              className="font-display font-bold text-text-primary mb-4"
              style={{ fontSize: 'var(--type-heading-md)', lineHeight: 'var(--leading-heading)' }}
            >
              Data transparency
            </h2>
            <p className="text-text-secondary" style={{ fontSize: 'var(--type-body-md)', lineHeight: 'var(--leading-relaxed)' }}>
              The data on Fundibot is compiled from publicly available prospectuses, university websites,
              zabursaries.co.za, nationalgovernment.co.za, Wikimedia, and other open sources. Each entry
              carries a source tag and, where data was inferred rather than scraped, an 'Inferred' flag so
              users know to verify. We strive for accuracy and update as institutions publish new information.
              Always verify admission requirements, fees, and closing dates directly with the institution
              before making any study decisions.
            </p>
          </div>
        </section>

        {/* ── LESSONS LEARNED ────────────────────────────────────────── */}
        <section
          className="border-y border-surface-border py-16 md:py-20"
          style={{ background: 'var(--color-surface-raised)' }}
        >
          <div className="container">
            <p
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-accent-gold)', letterSpacing: 'var(--type-label-tracking)' }}
            >
              What this project taught
            </p>
            <h2
              className="font-display font-bold text-text-primary mb-10"
              style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
            >
              Lessons from building at the edge of public data.
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {LESSONS.map((lesson) => (
                <div
                  key={lesson.num}
                  className="pt-6"
                  style={{ borderTop: '1px solid var(--color-surface-border)' }}
                >
                  <p
                    className="font-mono mb-3"
                    style={{ fontSize: 'var(--type-label)', color: 'var(--color-text-muted)', letterSpacing: 'var(--type-label-tracking)' }}
                  >
                    {lesson.num}
                  </p>
                  <h3
                    className="font-display font-bold text-text-primary mb-3"
                    style={{ fontSize: 'var(--type-heading-sm)', lineHeight: 'var(--leading-heading)' }}
                  >
                    {lesson.heading}
                  </h3>
                  <p className="text-text-secondary" style={{ fontSize: 'var(--type-body-sm)', lineHeight: 'var(--leading-relaxed)' }}>
                    {lesson.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FUTURE ROADMAP ─────────────────────────────────────────── */}
        <section className="container py-16 md:py-20">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-accent-gold)', letterSpacing: 'var(--type-label-tracking)' }}
          >
            What comes next
          </p>
          <h2
            className="font-display font-bold text-text-primary mb-10"
            style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
          >
            Fundibot is not finished.
          </h2>

          <ul className="space-y-5 max-w-3xl">
            {ROADMAP.map((item) => (
              <li
                key={item.label}
                className="flex gap-4 text-text-secondary"
                style={{ fontSize: 'var(--type-body-md)', lineHeight: 'var(--leading-relaxed)' }}
              >
                <CheckCircle2
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: 'var(--color-accent-emerald)' }}
                  aria-hidden
                />
                <span>
                  <strong className="text-text-primary">{item.label}</strong>
                  {' '}— {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section className="border-t border-surface-border">
          <div className="container py-16 md:py-24">
            <div className="max-w-2xl mx-auto text-center">
              <p
                className="font-mono text-xs uppercase mb-4"
                style={{ color: 'var(--color-accent-gold)', letterSpacing: 'var(--type-label-tracking)' }}
              >
                Want a system like this?
              </p>
              <h2
                className="font-display font-bold text-text-primary mb-4"
                style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
              >
                Every business problem has a system waiting to be built.
              </h2>
              <p className="text-text-secondary mb-8 max-w-xl mx-auto" style={{ lineHeight: 'var(--leading-relaxed)' }}>
                Fundibot is a personal project. But the same scraping, enrichment, and data pipeline
                thinking applies to any domain with messy, fragmented public or internal data.
                If you are sitting on a data problem, let's talk.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link to={QUOTE_PAGE} className="btn-primary min-h-[44px]">
                  {GET_ESTIMATE_LABEL}
                </Link>
                <BookDiscoveryCallButton variant="outline" />
              </div>
            </div>
          </div>
        </section>

      </PageShell>
    </>
  );
}
