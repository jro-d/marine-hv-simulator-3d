// Builds a fully offline single-file edition of the simulator.
//
//   node tools/build-offline.mjs [input.html] [output.html]
//
// index.html stays the editable, zero-build source (it loads three@0.160.0 from unpkg).
// This script downloads the exact pinned Three.js modules that index.html imports ONCE at
// build time and embeds them in the import map as base64 data: URLs, so the output opens
// directly from disk with no network, server or install. The optional popover polyfill
// (dynamic import, guarded by try/catch) is the only remaining remote reference and is
// only requested on browsers without native popover support. The design-system
// stylesheets linked from index.html (tokens, components, embedded IBM Plex fonts) are
// inlined too.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = path.resolve(root, process.argv[2] || 'index.html');
const output = path.resolve(root, process.argv[3] || 'dist/marine-hv-simulator-3d-offline.html');

const THREE_VERSION = '0.160.0';
const CDN = `https://unpkg.com/three@${THREE_VERSION}`;

let html = await fs.readFile(input, 'utf8');
const mapMatch = html.match(/<script type="importmap">([\s\S]*?)<\/script>/);
if (!mapMatch) throw new Error('No import map found in ' + input);
const importMap = JSON.parse(mapMatch[1]);
if (!importMap.imports.three.includes(`three@${THREE_VERSION}`)) {
  throw new Error(`Import map does not pin three@${THREE_VERSION}; update THREE_VERSION deliberately.`);
}

// Every "three/addons/..." specifier used by the app's module script
const specifiers = new Set(['three']);
for (const m of html.matchAll(/from\s+'(three\/addons\/[^']+)'/g)) specifiers.add(m[1]);

// Optional: THREE_SRC=<path to an unpacked three@0.160.0 npm package> reads the same pinned
// files from disk instead of unpkg (for machines without access to the CDN).
const THREE_SRC = process.env.THREE_SRC ? path.resolve(process.env.THREE_SRC) : null;
if (THREE_SRC) {
  const pkg = JSON.parse(await fs.readFile(path.join(THREE_SRC, 'package.json'), 'utf8'));
  if (pkg.name !== 'three' || pkg.version !== THREE_VERSION) throw new Error(`THREE_SRC must be three@${THREE_VERSION} (found ${pkg.name}@${pkg.version})`);
}

async function fetchText(url) {
  if (THREE_SRC) return fs.readFile(path.join(THREE_SRC, url.slice(CDN.length + 1)), 'utf8');
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

const imports = {};
for (const spec of specifiers) {
  const url = spec === 'three' ? `${CDN}/build/three.module.js` : `${CDN}/examples/jsm/${spec.slice('three/addons/'.length)}`;
  const code = await fetchText(url);
  // Addons must only import the bare 'three' specifier (resolved through this same import map)
  const rel = [...code.matchAll(/from\s+['"](\.{1,2}\/[^'"]+)['"]/g)].map((m) => m[1]);
  if (rel.length) throw new Error(`${spec} has relative imports (${rel.join(', ')}); add them to the build.`);
  imports[spec] = 'data:text/javascript;base64,' + Buffer.from(code, 'utf8').toString('base64');
  console.log(`embedded ${spec.padEnd(52)} ${(code.length / 1024).toFixed(0)} KB`);
}

// Inline the design-system stylesheets linked by index.html (fonts.css already embeds IBM Plex)
for (const m of [...html.matchAll(/<link rel="stylesheet" href="(design-system\/[^"]+\.css)" \/>/g)]) {
  const css = await fs.readFile(path.resolve(path.dirname(input), m[1]), 'utf8');
  if (/url\(\s*(?!['"]?data:)/.test(css)) throw new Error(`${m[1]} references an external url(); embed it first.`);
  html = html.replace(m[0], () => `<style data-src="${m[1]}">\n${css}\n  </style>`);
  console.log(`inlined  ${m[1].padEnd(52)} ${(css.length / 1024).toFixed(0)} KB`);
}

const newMap = `<script type="importmap">\n${JSON.stringify({ imports }, null, 1)}\n  </script>`;
html = html.replace(mapMatch[0], () => newMap);
html = html.replace('<meta name="color-scheme" content="light dark" />',
  `<meta name="color-scheme" content="light dark" />\n  <!-- Offline edition: three@${THREE_VERSION} (MIT, (c) three.js authors) embedded. Built by tools/build-offline.mjs -->`);

await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, html);
console.log(`\nwrote ${path.relative(root, output)} (${(html.length / 1024 / 1024).toFixed(2)} MB)`);
