#!/usr/bin/env node
/**
 * Find a logo for a tech/product name, copy it into public/images/logos/, print the web path.
 *
 * Usage:
 *   node scripts/lookup-logo.mjs react
 *   node scripts/lookup-logo.mjs "Adobe Illustrator" --json
 *   node scripts/lookup-logo.mjs amd --sources logos-taran
 *
 * Searches (in order):
 *   1. /Users/nonwork/dev/logos/logos.json + logos/
 *   2. /Users/nonwork/dev/logos-taran/ (recursive)
 */
import { access, copyFile, mkdir, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DEFAULT_OUT = path.join(ROOT, 'public/images/logos');

const LOGOS_JSON = '/Users/nonwork/dev/logos/logos.json';
const LOGOS_SVG_DIR = '/Users/nonwork/dev/logos/logos';
const LOGOS_TARAN_DIR = '/Users/nonwork/dev/logos-taran';

const IMAGE_EXT = new Set(['.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif']);
const EXT_RANK = { '.svg': 0, '.webp': 1, '.png': 2, '.avif': 3, '.jpg': 4, '.jpeg': 5, '.gif': 6 };

function slugify(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/\.(svg|png|jpe?g|webp|gif|avif)$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseArgs(argv) {
  const flags = {
    json: false,
    dryRun: false,
    quiet: false,
    outDir: DEFAULT_OUT,
    sources: ['logos', 'logos-taran'],
  };
  const positional = [];

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--json') flags.json = true;
    else if (arg === '--dry-run') flags.dryRun = true;
    else if (arg === '--quiet' || arg === '-q') flags.quiet = true;
    else if (arg === '--out-dir') {
      flags.outDir = path.resolve(argv[++i] ?? DEFAULT_OUT);
    } else if (arg === '--sources') {
      flags.sources = (argv[++i] ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (arg === '--help' || arg === '-h') {
      flags.help = true;
    } else if (!arg.startsWith('-')) {
      positional.push(arg);
    }
  }

  return { flags, query: positional.join(' ').trim() };
}

function printHelp() {
  console.log(`lookup-logo — copy a matching logo into public/images/logos

Usage:
  node scripts/lookup-logo.mjs <name> [options]

Options:
  --json           Output JSON { ok, publicPath, dest, source, match }
  --dry-run        Search only; do not copy
  --quiet, -q      Print only the public path (or JSON)
  --out-dir <dir>  Destination folder (default: public/images/logos)
  --sources <list> Comma-separated: logos, logos-taran (default: both)
  -h, --help       Show this help

Examples:
  node scripts/lookup-logo.mjs react
  node scripts/lookup-logo.mjs "Google Cloud" --json
`);
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function extRank(filePath) {
  return EXT_RANK[path.extname(filePath).toLowerCase()] ?? 99;
}

function preferLogoFile(files) {
  const sorted = [...files].sort((a, b) => {
    const aIcon = /-icon\./i.test(a) || /-icon$/i.test(path.basename(a, path.extname(a)));
    const bIcon = /-icon\./i.test(b) || /-icon$/i.test(path.basename(b, path.extname(b)));
    if (aIcon !== bIcon) return aIcon ? 1 : -1;
    const extDiff = extRank(a) - extRank(b);
    if (extDiff !== 0) return extDiff;
    return a.length - b.length;
  });
  return sorted[0];
}

/** @type {Map<string, { entry: object, files: string[] }>} */
let catalogBySlug = null;

async function loadCatalog() {
  if (catalogBySlug) return catalogBySlug;
  catalogBySlug = new Map();

  if (!(await fileExists(LOGOS_JSON))) return catalogBySlug;

  const raw = await readFile(LOGOS_JSON, 'utf8');
  const entries = JSON.parse(raw);
  if (!Array.isArray(entries)) return catalogBySlug;

  for (const entry of entries) {
    const keys = new Set();
    if (entry.shortname) keys.add(slugify(entry.shortname));
    if (entry.name) keys.add(slugify(entry.name));
    for (const file of entry.files ?? []) {
      keys.add(slugify(path.basename(file, path.extname(file))));
    }
    for (const key of keys) {
      if (!key) continue;
      const existing = catalogBySlug.get(key);
      if (!existing) {
        catalogBySlug.set(key, { entry, files: [...(entry.files ?? [])] });
      } else {
        const merged = new Set([...existing.files, ...(entry.files ?? [])]);
        existing.files = [...merged];
      }
    }
  }

  return catalogBySlug;
}

async function resolveFromCatalog(query, slug) {
  const catalog = await loadCatalog();
  const hit = catalog.get(slug);
  if (!hit?.files?.length) return null;

  const candidates = [];
  for (const file of hit.files) {
    const full = path.join(LOGOS_SVG_DIR, file);
    if (await fileExists(full)) candidates.push(full);
  }

  if (!candidates.length) return null;

  const source = preferLogoFile(candidates);
  return {
    source,
    match: 'catalog',
    label: hit.entry?.name ?? query,
    score: 100,
  };
}

async function walkImageFiles(dir, results = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return results;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      await walkImageFiles(full, results);
      continue;
    }
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (IMAGE_EXT.has(ext)) results.push(full);
  }
  return results;
}

/** @type {string[] | null} */
let taranIndex = null;

async function getTaranIndex() {
  if (taranIndex) return taranIndex;
  taranIndex = await walkImageFiles(LOGOS_TARAN_DIR);
  return taranIndex;
}

function scoreFilename(filePath, slug, queryLower) {
  const base = path.basename(filePath);
  const baseLower = base.toLowerCase();
  const stem = slugify(path.basename(base, path.extname(base)));
  const stemLower = stem.toLowerCase();

  if (stemLower === slug) return 90;
  if (baseLower === `${slug}${path.extname(base).toLowerCase()}`) return 90;
  if (stemLower === slugify(queryLower)) return 88;
  if (stemLower.startsWith(`${slug}-`) || stemLower.startsWith(`${slug}_`)) return 75;
  if (stemLower.includes(slug) && slug.length >= 3) return 60;
  if (baseLower.includes(queryLower) && queryLower.length >= 3) return 50;
  return 0;
}

async function resolveFromFilesystem(slug, query, sources) {
  const queryLower = query.toLowerCase();
  const candidates = [];

  if (sources.includes('logos')) {
    for (const ext of IMAGE_EXT) {
      const exact = path.join(LOGOS_SVG_DIR, `${slug}${ext}`);
      if (await fileExists(exact)) candidates.push({ source: exact, score: 85, match: 'exact-filename' });
    }
    if (await fileExists(LOGOS_SVG_DIR)) {
      const names = await readdir(LOGOS_SVG_DIR);
      for (const name of names) {
        const ext = path.extname(name).toLowerCase();
        if (!IMAGE_EXT.has(ext)) continue;
        const file = path.join(LOGOS_SVG_DIR, name);
        const score = scoreFilename(file, slug, queryLower);
        if (score > 0) candidates.push({ source: file, score, match: 'filename' });
      }
    }
  }

  if (sources.includes('logos-taran')) {
    const files = await getTaranIndex();
    for (const file of files) {
      const score = scoreFilename(file, slug, queryLower);
      if (score > 0) candidates.push({ source: file, score, match: 'taran-filename' });
    }
  }

  if (!candidates.length) return null;

  candidates.sort((a, B) => {
    if (B.score !== a.score) return B.score - a.score;
    const aIcon = /-icon\./i.test(a.source);
    const bIcon = /-icon\./i.test(B.source);
    if (aIcon !== bIcon) return aIcon ? 1 : -1;
    return extRank(a.source) - extRank(B.source);
  });

  const best = candidates[0];
  return {
    source: best.source,
    match: best.match,
    label: query,
    score: best.score,
  };
}

async function lookupLogo(query, sources) {
  const slug = slugify(query);
  if (!slug) {
    throw new Error('Provide a non-empty logo name (e.g. react, aws, "Adobe Illustrator").');
  }

  let result = null;
  if (sources.includes('logos')) {
    result = await resolveFromCatalog(query, slug);
  }
  if (!result) {
    result = await resolveFromFilesystem(slug, query, sources);
  }
  return { slug, result };
}

async function copyToPublic(source, slug, outDir) {
  const ext = path.extname(source).toLowerCase() || '.svg';
  const fileName = `${slug}${ext}`;
  const dest = path.join(outDir, fileName);
  await mkdir(outDir, { recursive: true });
  await copyFile(source, dest);
  const info = await stat(dest);
  const publicPath = `/images/logos/${fileName}`;
  return { dest, publicPath, bytes: info.size };
}

async function main() {
  const { flags, query } = parseArgs(process.argv.slice(2));

  if (flags.help || !query) {
    printHelp();
    process.exit(query ? 0 : 1);
  }

  const { slug, result } = await lookupLogo(query, flags.sources);

  if (!result) {
    const payload = {
      ok: false,
      query,
      slug,
      error: 'No matching logo found',
      searched: flags.sources,
    };
    if (flags.json) {
      console.log(JSON.stringify(payload, null, 2));
    } else {
      console.error(`No logo found for "${query}" (slug: ${slug}).`);
      console.error(`Searched: ${flags.sources.join(', ')}`);
    }
    process.exit(1);
  }

  let dest = null;
  let publicPath = null;
  let bytes = null;

  if (!flags.dryRun) {
    ({ dest, publicPath, bytes } = await copyToPublic(result.source, slug, flags.outDir));
  } else {
    const ext = path.extname(result.source).toLowerCase() || '.svg';
    publicPath = `/images/logos/${slug}${ext}`;
    dest = path.join(flags.outDir, path.basename(publicPath));
  }

  const output = {
    ok: true,
    query,
    slug,
    publicPath,
    dest,
    source: result.source,
    match: result.match,
    score: result.score,
    label: result.label,
    dryRun: flags.dryRun,
    bytes,
  };

  if (flags.json) {
    console.log(JSON.stringify(output, null, 2));
  } else if (flags.quiet) {
    console.log(publicPath);
  } else {
    console.log(publicPath);
    if (!flags.dryRun) {
      console.log(`copied from: ${result.source}`);
      console.log(`written to:  ${dest}`);
      if (bytes != null) console.log(`size:        ${bytes} bytes`);
    } else {
      console.log(`(dry-run) would copy from: ${result.source}`);
      console.log(`(dry-run) would write to:  ${dest}`);
    }
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
