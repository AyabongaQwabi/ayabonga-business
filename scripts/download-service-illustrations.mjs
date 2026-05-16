#!/usr/bin/env node
/** Download service card illustrations from undraw-svg (jsDelivr npm). */
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../public/images/services');
const CDN = 'https://cdn.jsdelivr.net/npm/undraw-svg@1.0.0/svgs';
const BRAND_GOLD = '#FFD700';

const FILES = {
  mobile: 'mobile-apps.svg',
  web: 'website-builder.svg',
  business: 'business-analytics.svg',
  ecommerce: 'online-shopping.svg',
  ai: 'chat-bot.svg',
  bespoke: 'programming.svg',
};

await mkdir(OUT, { recursive: true });

for (const [name, remote] of Object.entries(FILES)) {
  const res = await fetch(`${CDN}/${remote}`);
  if (!res.ok) throw new Error(`Failed ${remote}: ${res.status}`);
  let svg = await res.text();
  svg = svg.replace(/fill="currentColor"/g, `fill="${BRAND_GOLD}"`);
  const dest = path.join(OUT, `${name}.svg`);
  await writeFile(dest, svg);
  const stat = await readFile(dest);
  console.log(`saved ${name}.svg (${Math.round(stat.length / 1024)}KB)`);
}
