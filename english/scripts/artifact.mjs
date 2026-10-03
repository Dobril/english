// Turns dist/index.html into dist/artifact.html: the same page without the document skeleton,
// because claude.ai Artifacts wrap the file in their own <html>/<head>/<body>.
import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8');
const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? '';
const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
// Keep only the viewport meta: it adds interactive-widget=resizes-content so the layout
// shrinks with the virtual keyboard (avoids offset taps in mobile Chrome). The wrapper adds charset.
const keep = head
  .replace(/<meta(?![^>]*name="viewport")[^>]*>/gi, '')
  .trim();
const out = `${keep}\n${body.trim()}\n`;
writeFileSync('dist/artifact.html', out);
console.log(`dist/artifact.html: ${(out.length / 1024).toFixed(0)} kB`);
