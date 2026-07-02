#!/usr/bin/env node
/**
 * Audit which files in the git tree become Vercel Serverless Functions.
 * Uses the same paths Vercel sees on GitHub deploy (git ls-files), not just disk.
 *
 * Usage:
 *   npm run vercel:functions
 *   VERCEL_FUNCTION_LIMIT=12 node scripts/list-vercel-functions.mjs
 *
 * Set VERCEL_FUNCTION_CHECK=0 to warn without failing the build.
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const HOBBY_LIMIT = Number.parseInt(process.env.VERCEL_FUNCTION_LIMIT || '12', 10);
const FAIL_ON_LIMIT = process.env.VERCEL_FUNCTION_CHECK !== '0';
const API_FILE = /\.(ts|tsx|js|jsx|mts|cts|mjs|cjs)$/i;
const SKIP_API_BASENAMES = new Set(['tsconfig.json', 'next-env.d.ts']);

const NEXT_APP_ROUTE = /\/app\/api\/(.+)\/route\.(ts|tsx|js|jsx|mts|cts)$/i;
const NEXT_PAGES_API = /\/pages\/api\/(.+)\.(ts|tsx|js|jsx|mts|cts)$/i;

function readGitFiles() {
  try {
    return execSync('git ls-files -z', { cwd: root, encoding: 'utf8' })
      .split('\0')
      .filter(Boolean);
  } catch {
    console.warn('[vercel:functions] Not a git repo — scanning working tree.');
    return walkDir(root).map((abs) => path.relative(root, abs).replace(/\\/g, '/'));
  }
}

function walkDir(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.git') continue;
    const abs = path.join(dir, name);
    const st = fs.statSync(abs);
    if (st.isDirectory()) walkDir(abs, out);
    else out.push(abs);
  }
  return out;
}

function readIgnoreFile(filename) {
  const filePath = path.join(root, filename);
  if (!fs.existsSync(filePath)) return [];
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));
}

function matchesIgnore(relPath, patterns) {
  for (const pattern of patterns) {
    const p = pattern.replace(/\/$/, '');
    if (relPath === p || relPath.startsWith(`${p}/`)) return true;
    if (p.includes('*')) {
      const re = new RegExp(
        `^${p.replace(/\./g, '\\.').replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*')}$`,
      );
      if (re.test(relPath)) return true;
    }
  }
  return false;
}

function hasUnderscoreSegment(relPath) {
  return relPath.split('/').some((seg) => seg.startsWith('_'));
}

function apiRouteFromFile(relPath) {
  const inner = relPath.replace(/^api\//, '').replace(API_FILE, '');
  if (
    inner === 'index' ||
    inner === '[...path]' ||
    inner.startsWith('[...path].') ||
    inner === '_entry'
  ) {
    return '/api/* (router)';
  }
  return `/api/${inner.replace(/\\/g, '/')}`;
}

function nextAppRouteFromFile(relPath, match) {
  const segments = match[1];
  const url = segments
    .split('/')
    .map((seg) => {
      if (seg.startsWith('[[...') && seg.endsWith(']]')) return `:${seg.slice(5, -2)}*?`;
      if (seg.startsWith('[...') && seg.endsWith(']')) return `:${seg.slice(4, -1)}*`;
      if (seg.startsWith('[') && seg.endsWith(']')) return `:${seg.slice(1, -1)}`;
      return seg;
    })
    .join('/');
  return `/api/${url}`;
}

function nextPagesRouteFromFile(match) {
  return `/api/${match[1]}`;
}

function detectFunctions(files, vercelignore) {
  const functions = [];
  const skipped = [];

  const buildOutputHandler = path.join(root, '.vercel/output/functions/api.func/index.js');
  if (fs.existsSync(buildOutputHandler)) {
    functions.push({
      file: '.vercel/output/functions/api.func/index.js',
      kind: 'Build Output API',
      route: '/api/* (router)',
    });
  }

  for (const file of files) {
    const ignoredNote = matchesIgnore(file, vercelignore)
      ? ' (.vercelignore — may still count on Git deploy)'
      : '';

    const nextApp = file.match(NEXT_APP_ROUTE);
    if (nextApp) {
      functions.push({
        file,
        kind: 'Next.js App Router',
        route: nextAppRouteFromFile(file, nextApp) + ignoredNote,
      });
      continue;
    }

    const nextPages = file.match(NEXT_PAGES_API);
    if (nextPages && !hasUnderscoreSegment(file)) {
      functions.push({
        file,
        kind: 'Next.js Pages API',
        route: nextPagesRouteFromFile(nextPages) + ignoredNote,
      });
      continue;
    }

    if (!file.startsWith('api/') || !API_FILE.test(file)) continue;
    if (file.startsWith('api/lib/')) {
      functions.push({
        file,
        kind: 'Vercel /api (helper in api/lib — COUNTS)',
        route: apiRouteFromFile(file) + ignoredNote,
      });
      continue;
    }
    if (file === 'api/_entry.ts' || file === 'api/_entry.js') {
      if (!files.includes('api/index.js') && !fs.existsSync(path.join(root, 'api/index.js'))) {
        functions.push({
          file: 'api/index.js (from bundle)',
          kind: 'Vercel /api',
          route: '/api/* (router)' + ignoredNote,
        });
      }
      skipped.push({ file, reason: 'bundle source (deployed as api/index.js)' });
      continue;
    }

    if (hasUnderscoreSegment(file)) {
      skipped.push({ file, reason: 'underscore segment (Vercel ignores, e.g. api/_lib/)' });
      continue;
    }
    if (SKIP_API_BASENAMES.has(path.basename(file))) {
      skipped.push({ file, reason: 'config file' });
      continue;
    }

    functions.push({
      file,
      kind: 'Vercel /api',
      route: apiRouteFromFile(file) + ignoredNote,
    });
  }

  if (fs.existsSync(path.join(root, 'api/index.js'))) {
    const already = functions.some((fn) => fn.file === 'api/index.js' || fn.file.includes('index.js'));
    if (!already) {
      functions.push({
        file: 'api/index.js',
        kind: 'Vercel /api',
        route: '/api/* (router)',
      });
    }
  }

  return { functions, skipped };
}

function printReport(functions, skipped) {
  const line = '─'.repeat(72);
  console.log('\n' + line);
  console.log('Vercel Serverless Functions audit (from git ls-files)');
  console.log(line);

  if (functions.length === 0) {
    console.log('\nNo serverless function entry files detected.');
  } else {
    console.log(`\n${functions.length} function(s) — Hobby plan limit: ${HOBBY_LIMIT}\n`);
    functions.forEach((fn, i) => {
      const over = i + 1 > HOBBY_LIMIT ? '  ← OVER LIMIT' : '';
      console.log(`  ${String(i + 1).padStart(2, ' ')}. [${fn.kind}] ${fn.route}`);
      console.log(`      ${fn.file}${over}`);
    });
  }

  const underscoreHelpers = skipped.filter((s) => s.reason.includes('underscore'));
  if (underscoreHelpers.length > 0) {
    console.log(
      `\nExcluded ${underscoreHelpers.length} file(s) under api/_…/ (Vercel underscore rule).`,
    );
    console.log('Move shared API code to api/_lib/, not api/lib/, or each file becomes a function.');
  }

  if (skipped.length > 0 && process.env.VERCEL_FUNCTIONS_VERBOSE === '1') {
    console.log(`\nSkipped ${skipped.length} api/ paths (helpers/config):`);
    for (const s of skipped.slice(0, 20)) {
      console.log(`  - ${s.file} (${s.reason})`);
    }
    if (skipped.length > 20) console.log(`  ... and ${skipped.length - 20} more`);
  }

  console.log('\n' + line);
  if (functions.length > HOBBY_LIMIT) {
    console.log(
      `FAIL: ${functions.length} functions exceeds Hobby limit (${HOBBY_LIMIT}).`,
    );
    console.log(
      'Put helpers in api/_lib/ (underscore). api/lib/*.ts would each become a function.',
    );
    console.log(
      'Note: .vercelignore does not stop Git deploys from registering functions.',
    );
  } else {
    console.log(`OK: ${functions.length}/${HOBBY_LIMIT} functions within Hobby limit.`);
  }
  console.log(line + '\n');
}

const vercelignore = readIgnoreFile('.vercelignore');
const gitFiles = readGitFiles();
const { functions, skipped } = detectFunctions(gitFiles, vercelignore);
printReport(functions, skipped);

if (functions.length > HOBBY_LIMIT && FAIL_ON_LIMIT) {
  process.exit(1);
}
