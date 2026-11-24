// Stages the GitHub Pages site into _site/ (served from the Pages root).
//
//   node tools/build-pages.mjs [outDir]
//
//   _site/index.html            the simulator (loads three@0.160.0 from unpkg, like index.html)
//   _site/design-system/*.css   the stylesheets index.html links (tokens, components, embedded IBM Plex)
//   _site/offline.html          the single-file offline edition (everything embedded)
//   _site/.nojekyll             serve files as-is
//
// The offline edition is rebuilt with `node tools/build-offline.mjs` and committed in dist/;
// this script only copies it. It fails if a file index.html needs is missing.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.resolve(root, process.argv[2] || '_site');

const html = await fs.readFile(path.join(root, 'index.html'), 'utf8');
const css = [...html.matchAll(/<link rel="stylesheet" href="(design-system\/[^"]+\.css)"/g)].map((m) => m[1]);
if (css.length < 3) throw new Error('index.html no longer links the design-system stylesheets; update tools/build-pages.mjs.');

await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(path.join(out, 'design-system'), { recursive: true });
await fs.copyFile(path.join(root, 'index.html'), path.join(out, 'index.html'));
for (const f of css) await fs.copyFile(path.join(root, f), path.join(out, f));
await fs.copyFile(path.join(root, 'dist/marine-hv-simulator-3d-offline.html'), path.join(out, 'offline.html'));
await fs.writeFile(path.join(out, '.nojekyll'), '');

const size = async (f) => ((await fs.stat(path.join(out, f))).size / 1024).toFixed(0).padStart(5) + ' KB';
for (const f of ['index.html', ...css, 'offline.html']) console.log(`${await size(f)}  ${f}`);
console.log(`staged ${path.relative(root, out) || '.'}/`);
