import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, 'md');
const manifest = JSON.parse(readFileSync(join(here, 'manifest.json'), 'utf8'));

const fileToSlug = new Map(manifest.pages.map((p) => [p.file, p.slug]));

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function makeMarked(page, headings) {
  let n = 0;
  const marked = new Marked({ gfm: true, breaks: false });
  marked.use({
    renderer: {
      code({ text, lang }) {
        if (lang === 'mermaid') {
          // The source lives in a script tag so the HTML parser leaves it alone.
          return (
            `<figure class="diagram">` +
            `<div class="mmd" data-state="pending"></div>` +
            `<script type="text/x-mermaid">${text.replace(/<\/script/gi, '<\\/script')}</script>` +
            `<figcaption><button type="button" class="zoom-btn">Увеличи</button></figcaption>` +
            `</figure>`
          );
        }
        const known = { ts: 'typescript', js: 'javascript', sql: 'sql', bash: 'bash', sh: 'bash', json: 'json', lua: 'lua', yaml: 'yaml', http: 'http' };
        const cls = lang && known[lang] ? ` class="language-${known[lang]}"` : ` class="nohighlight"`;
        return `<pre class="code"><code${cls}>${esc(text)}</code></pre>`;
      },
      heading({ tokens, depth }) {
        const html = this.parser.parseInline(tokens);
        const plain = html.replace(/<[^>]+>/g, '');
        if (depth === 1) {
          const title = plain.replace(/\s*-\s*System Design\s*$/i, '').trim();
          page.title = title;
          return `<header class="page-head"><p class="eyebrow">${esc(page.group)} · System Design</p><h1>${esc(title)}</h1></header>`;
        }
        const id = `${page.slug}-s${++n}`;
        if (depth === 2) headings.push({ id, text: plain });
        return `<h${depth} id="${id}">${html}</h${depth}>`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        let target = href;
        let external = false;
        try {
          const decoded = decodeURIComponent(href);
          const m = decoded.match(/^([^#]+\.md)(#.*)?$/);
          if (m && fileToSlug.has(m[1])) target = `#${fileToSlug.get(m[1])}`;
          else if (/^https?:/i.test(href)) external = true;
        } catch {
          /* leave href as is */
        }
        const t = title ? ` title="${esc(title)}"` : '';
        const ext = external ? ` target="_blank" rel="noopener"` : '';
        return `<a href="${esc(target)}"${t}${ext}>${text}</a>`;
      },
    },
  });
  return marked;
}

const pages = manifest.pages.map((p) => {
  const md = readFileSync(join(root, p.file), 'utf8');
  const headings = [];
  const page = { ...p, title: p.short };
  let html = makeMarked(page, headings).parse(md);
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  const diagrams = (html.match(/class="diagram"/g) || []).length;
  return { ...page, html, headings, diagrams };
});


const countBy = (g) => pages.filter((p) => p.group === g).length;
const groupsHome = [...new Set(pages.map((p) => p.group))];
const homeCardsByGroup = groupsHome
  .map((g) => `<h2 id="home-${groupsHome.indexOf(g)}">${esc(g)} <span class="count">${countBy(g)}</span></h2><div class="cards">${pages
    .filter((p) => p.group === g)
    .map(
      (p) =>
        `<a class="card" href="#${p.slug}"><strong>${esc(p.short)}</strong><span>${esc(p.blurb)}</span><span class="card-meta">${p.diagrams} ${p.diagrams === 1 ? 'диаграма' : 'диаграми'} · ${p.headings.length} секции</span></a>`,
    )
    .join('')}</div>`)
  .join('');
const homeHtml = `
<header class="page-head"><p class="eyebrow">Наръчник · ${pages.length} документа</p><h1>${esc(manifest.title)}</h1></header>
<p class="lead">${countBy('Системи')} системи, ${countBy('Градивни блокове')} градивни блока (брокери, консенсус, мрежа, Postgres, API), ${countBy('Дизайн патерни')} документа с дизайн патерни и ${countBy('Алгоритми')} с алгоритми, всички с Node.js код, плюс речник с архитектурните патерни и чеклист за изискванията, написани за подготовка за system design интервю на senior ниво. Всяка система има архитектурна диаграма, оразмеряване, модел на данните и въпросите, които наистина се задават. Диаграмите са в единен стил: услуги в заоблени кутии, хранилища като цилиндри, брокерът като кръг, всяка стрелка с протокол или тема.</p>
${homeCardsByGroup}
<h2 id="home-legend">Как да четеш диаграмите</h2>
<figure class="diagram"><div class="mmd" data-state="pending"></div><script type="text/x-mermaid">flowchart LR
    svc("Услуга или процес<br/>име и роля") -->|"синхронна заявка, протокол"| store[("Хранилище<br/>база, кеш, обектно хранилище")]
    svc -.->|"асинхронно събитие, тема"| bus(("Брокер<br/>Kafka, NATS, Pub/Sub"))
    ext[["Външна система<br/>Stripe, FCM, борса"]] -->|"webhook или feed"| svc</script><figcaption><button type="button" class="zoom-btn">Увеличи</button></figcaption></figure>
<p>Плътна стрелка е заявка, която някой чака. Пунктирана стрелка е работа след факта, която потребителят не чака. Етикетът на стрелката казва протокола, темата или операцията, защото стрелка без етикет означава само "свързани някак".</p>
`;

const navGroups = [];
for (const p of pages) {
  let g = navGroups.find((x) => x.name === p.group);
  if (!g) navGroups.push((g = { name: p.group, items: [] }));
  g.items.push(p);
}

const navHtml =
  `<a class="nav-item" href="#home" data-slug="home" data-search="начало home">Начало</a>` +
  navGroups
    .map(
      (g) =>
        `<div class="nav-group"><p class="nav-label">${esc(g.name)}</p>` +
        g.items
          .map(
            (p) =>
              `<a class="nav-item" href="#${p.slug}" data-slug="${p.slug}" data-search="${esc(
                (p.short + ' ' + p.title + ' ' + p.headings.map((h) => h.text).join(' ')).toLowerCase(),
              )}">${esc(p.short)}</a>`,
          )
          .join('') +
        `</div>`,
    )
    .join('') +
  (manifest.external && manifest.external.length
    ? `<div class="nav-group"><p class="nav-label">Връзки</p>` +
      manifest.external
        .map((e) => `<a class="nav-item ext" href="${esc(e.href)}" target="_blank" rel="noopener">${esc(e.label)}</a>`)
        .join('') +
      `</div>`
    : '');

const order = ['home', ...pages.map((p) => p.slug)];
const meta = Object.fromEntries([
  ['home', { title: 'Начало', headings: [...groupsHome.map((g, i) => ({ id: `home-${i}`, text: g })), { id: 'home-legend', text: 'Как да четеш диаграмите' }] }],
  ...pages.map((p) => [p.slug, { title: p.short, headings: p.headings }]),
]);

// Only the home page ships inline; every document is its own file, fetched when first opened.
const articles =
  `<article class="page" id="p-home" data-slug="home" hidden>${homeHtml}</article>` +
  pages
    .map((p) => `<article class="page" id="p-${p.slug}" data-slug="${p.slug}" data-src="pages/${p.slug}.html" hidden><p class="loading">Зареждам документа…</p></article>`)
    .join('');
mkdirSync(join(here, 'dist', 'pages'), { recursive: true });
for (const p of pages) writeFileSync(join(here, 'dist', 'pages', `${p.slug}.html`), p.html);

const template = readFileSync(join(here, 'template.html'), 'utf8');
const out = template
  .replaceAll('<!--TITLE-->', esc(manifest.title))
  .replace('<!--NAV-->', navHtml)
  .replace('<!--ARTICLES-->', articles)
  .replace('/*META*/', `const ORDER=${JSON.stringify(order)};const META=${JSON.stringify(meta)};`);

mkdirSync(join(here, 'dist'), { recursive: true });
writeFileSync(join(here, 'dist', 'index.html'), out);
const kb = (Buffer.byteLength(out) / 1024).toFixed(0);
console.log(`dist/index.html: ${kb} KB shell + ${pages.length} page files in dist/pages/, ${pages.reduce((a, p) => a + p.diagrams, 0) + 1} diagrams`);
for (const p of pages) console.log(`  ${p.slug.padEnd(16)} ${String(p.diagrams).padStart(2)} diagrams  ${p.headings.length} sections`);
