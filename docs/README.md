# Пътна карта AI Engineer

Статичен React сайт (Vite + TypeScript + react-router с hash routing). Съдържанието е в `src/data/`:

| Файл | Какво има вътре |
| --- | --- |
| `phases.ts` | 9-те фази: цел, понятия, ресурси, инструменти, мини упражнения, проект, чеклист |
| `projects.ts` | 13 проекта с технологии, стъпки, очакван резултат |
| `tools.ts` | Инструменти с описание, къде се ползват и колко дълбоко да се знаят |
| `papers.ts` | Papers за четене |
| `stay.ts` | Newsletters, първоизточници, правила |

Напредъкът по чеклистите се пази в `localStorage` на браузъра.

## Команди

```bash
npm install
npm run dev       # локално на http://localhost:5173
npm run build     # билд в dist/
npm run preview   # преглед на билда
```

## Качване в GitHub Pages

Билдът ползва `base: './'` и hash routing, затова работи от всяка папка и не иска сървърна конфигурация.

### Вариант 1: ръчно

1. `npm run build`
2. Качи съдържанието на `dist/` в branch `gh-pages` (или в папка, която Pages сервира).
3. В Settings → Pages избери branch-а.

### Вариант 2: GitHub Actions

Създай `.github/workflows/pages.yml` в корена на репото:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: docs
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: docs/package-lock.json
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

След това в Settings → Pages избери Source: GitHub Actions.
