#!/usr/bin/env node
/**
 * Vercel Build Output API — bundles API + static Vite dist.
 * Vercel compiles /api from git sources before npm run build finishes, so a
 * gitignored api/index.js never ships. This script emits .vercel/output instead.
 */
import { execSync } from 'node:child_process';
import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = path.join(root, '.vercel/output');
const funcDir = path.join(outputRoot, 'functions/api.func');
const staticDir = path.join(outputRoot, 'static');
const entry = path.join(root, 'api/_entry.ts');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const from = path.join(src, name);
    const to = path.join(dest, name);
    if (fs.statSync(from).isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

function run(cmd) {
  execSync(cmd, { cwd: root, stdio: 'inherit' });
}

if (!fs.existsSync(entry)) {
  console.error('[vercel-build] Missing api/_entry.ts');
  process.exit(1);
}

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(funcDir, { recursive: true });

await esbuild.build({
  entryPoints: [entry],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'cjs',
  outfile: path.join(funcDir, 'index.js'),
  // Bundle npm deps — .func output has no project node_modules on Vercel.
  logLevel: 'info',
});

fs.writeFileSync(
  path.join(funcDir, '.vc-config.json'),
  `${JSON.stringify(
    {
      runtime: 'nodejs20.x',
      handler: 'index.js',
      launcherType: 'Nodejs',
      maxDuration: 300,
    },
    null,
    2,
  )}\n`,
);

console.log('[vercel-build] Bundled api.func');

run('node scripts/list-vercel-functions.mjs');
run('vite build');
run('node scripts/prerender-developers.mjs');
run('node scripts/generate-sitemap.mjs');

const distDir = path.join(root, 'dist');
if (!fs.existsSync(distDir)) {
  console.error('[vercel-build] Missing dist/ after vite build');
  process.exit(1);
}

copyDir(distDir, staticDir);

const config = {
  version: 3,
  routes: [
    { handle: 'filesystem' },
    { src: '/api(?:/(.*))?', dest: '/api' },
    { src: '/(.*)', dest: '/index.html' },
  ],
};

fs.writeFileSync(path.join(outputRoot, 'config.json'), `${JSON.stringify(config, null, 2)}\n`);
console.log('[vercel-build] Wrote .vercel/output (static + api.func)');
