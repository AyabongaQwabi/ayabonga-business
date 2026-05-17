/** Tech slug → logo asset and display metadata. */

export type TechLogoEntry = {
  slug: string;
  label: string;
  src: string;
};

const LOGO_BASE = '/images/logos';

export const TECH_LOGO_ENTRIES: Record<string, TechLogoEntry> = {
  react: { slug: 'react', label: 'React', src: `${LOGO_BASE}/react.svg` },
  'react-native': { slug: 'react-native', label: 'React Native', src: `${LOGO_BASE}/react.svg` },
  nodejs: { slug: 'nodejs', label: 'Node.js', src: `${LOGO_BASE}/nodejs.svg` },
  typescript: { slug: 'typescript', label: 'TypeScript', src: `${LOGO_BASE}/typescript.svg` },
  javascript: { slug: 'javascript', label: 'JavaScript', src: `${LOGO_BASE}/javascript.svg` },
  mongodb: { slug: 'mongodb', label: 'MongoDB', src: `${LOGO_BASE}/mongodb.svg` },
  postgresql: { slug: 'postgresql', label: 'PostgreSQL', src: `${LOGO_BASE}/postgresql.svg` },
  aws: { slug: 'aws', label: 'AWS', src: `${LOGO_BASE}/aws.svg` },
  'google-cloud': { slug: 'google-cloud', label: 'Google Cloud', src: `${LOGO_BASE}/google-cloud.svg` },
  azure: { slug: 'azure', label: 'Azure', src: `${LOGO_BASE}/azure.svg` },
  nextjs: { slug: 'nextjs', label: 'Next.js', src: `${LOGO_BASE}/nextjs.svg` },
  supabase: { slug: 'supabase', label: 'Supabase', src: `${LOGO_BASE}/supabase.svg` },
  firebase: { slug: 'firebase', label: 'Firebase', src: `${LOGO_BASE}/firebase.svg` },
  openai: { slug: 'openai', label: 'OpenAI', src: `${LOGO_BASE}/openai.svg` },
  python: { slug: 'python', label: 'Python', src: `${LOGO_BASE}/python.svg` },
  express: { slug: 'express', label: 'Express', src: `${LOGO_BASE}/express.svg` },
  flutter: { slug: 'flutter', label: 'Flutter', src: `${LOGO_BASE}/flutter.svg` },
  expo: { slug: 'expo', label: 'Expo', src: `${LOGO_BASE}/expo.svg` },
  vercel: { slug: 'vercel', label: 'Vercel', src: `${LOGO_BASE}/vercel.svg` },
  netlify: { slug: 'netlify', label: 'Netlify', src: `${LOGO_BASE}/netlify.svg` },
  vite: { slug: 'vite', label: 'Vite', src: `${LOGO_BASE}/vite.svg` },
  docker: { slug: 'docker', label: 'Docker', src: `${LOGO_BASE}/docker.svg` },
  kubernetes: { slug: 'kubernetes', label: 'Kubernetes', src: `${LOGO_BASE}/kubernetes.svg` },
  tailwindcss: { slug: 'tailwindcss', label: 'Tailwind CSS', src: `${LOGO_BASE}/tailwindcss.svg` },
  stripe: { slug: 'stripe', label: 'Stripe', src: `${LOGO_BASE}/stripe.svg` },
  gatsby: { slug: 'gatsby', label: 'Gatsby', src: `${LOGO_BASE}/gatsby.svg` },
  go: { slug: 'go', label: 'Go', src: `${LOGO_BASE}/go.svg` },
  clojure: { slug: 'clojure', label: 'Clojure', src: `${LOGO_BASE}/clojure.svg` },
  stitch: { slug: 'stitch', label: 'Stitch', src: `${LOGO_BASE}/stitch.svg` },
  'google-gemini': { slug: 'google-gemini', label: 'Google Gemini', src: `${LOGO_BASE}/google-gemini.svg` },
  anthropic: { slug: 'anthropic', label: 'Anthropic', src: `${LOGO_BASE}/anthropic.svg` },
  gitlab: { slug: 'gitlab', label: 'GitLab', src: `${LOGO_BASE}/gitlab.svg` },
  'github-actions': { slug: 'github-actions', label: 'GitHub Actions', src: `${LOGO_BASE}/github-actions.svg` },
};

/** Normalized labels and aliases → slug keys in TECH_LOGO_ENTRIES. */
const LABEL_TO_SLUG: Record<string, string> = {
  react: 'react',
  'react native': 'react-native',
  'react-native': 'react-native',
  'node.js': 'nodejs',
  node: 'nodejs',
  nodejs: 'nodejs',
  typescript: 'typescript',
  ts: 'typescript',
  javascript: 'javascript',
  js: 'javascript',
  mongodb: 'mongodb',
  mongo: 'mongodb',
  postgresql: 'postgresql',
  postgres: 'postgresql',
  aws: 'aws',
  'amazon web services': 'aws',
  gcp: 'google-cloud',
  'google cloud': 'google-cloud',
  'google cloud platform': 'google-cloud',
  azure: 'azure',
  'microsoft azure': 'azure',
  'next.js': 'nextjs',
  nextjs: 'nextjs',
  next: 'nextjs',
  supabase: 'supabase',
  firebase: 'firebase',
  openai: 'openai',
  python: 'python',
  express: 'express',
  'express.js': 'express',
  flutter: 'flutter',
  expo: 'expo',
  vercel: 'vercel',
  netlify: 'netlify',
  vite: 'vite',
  docker: 'docker',
  kubernetes: 'kubernetes',
  k8s: 'kubernetes',
  tailwind: 'tailwindcss',
  'tailwind css': 'tailwindcss',
  tailwindcss: 'tailwindcss',
  stripe: 'stripe',
  payments: 'stripe',
  gatsby: 'gatsby',
  go: 'go',
  golang: 'go',
  clojure: 'clojure',
  stitch: 'stitch',
  gemini: 'google-gemini',
  'google gemini': 'google-gemini',
  anthropic: 'anthropic',
  gitlab: 'gitlab',
  'github actions': 'github-actions',
  ai: 'openai',
};

function normalizeLabel(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function resolveTechSlug(input: string): string | null {
  const normalized = normalizeLabel(input);
  if (!normalized) return null;

  if (TECH_LOGO_ENTRIES[normalized]) return normalized;

  const fromAlias = LABEL_TO_SLUG[normalized];
  if (fromAlias) return fromAlias;

  const slugCandidate = normalized.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (TECH_LOGO_ENTRIES[slugCandidate]) return slugCandidate;

  return null;
}

export function resolveTechLogo(input: string): TechLogoEntry | null {
  const slug = resolveTechSlug(input);
  if (!slug) return null;
  const entry = TECH_LOGO_ENTRIES[slug];
  if (!entry) return null;
  return { ...entry, label: input.trim() || entry.label };
}

export function getTechLogoBySlug(slug: string): TechLogoEntry | null {
  return TECH_LOGO_ENTRIES[slug] ?? null;
}
