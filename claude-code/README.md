# Наръчник за работа с Claude Code

Статичен React сайт (Vite + TypeScript + react-router с hash routing) на български и английски: как се работи с Claude Code, кога какво се вика, как се пишат задачи в Linear и промптове, какво се проверява след задача, кой мърджва, hooks, subagents, skills, MCP и паралелна работа. Същият стек като `../docs`.

## Езици

Всяка страница живее под езиков префикс: `#/bg/workflow` и `#/en/workflow`. Бутонът BG / EN в горната лента сменя езика, като запазва страницата. Изборът се помни в `localStorage`; `#/` препраща към последно избрания език (по подразбиране английски).

## Структура на съдържанието

Съдържанието е в паралелни папки с еднаква структура:

| Път | Какво има вътре |
| --- | --- |
| `src/content/bg/` и `src/content/en/` | Цялото съдържание за всеки език |
| `content/<lang>/ui.ts` | Низовете на интерфейса (бутони, етикети) |
| `content/<lang>/data/nav.ts` | Разделите в sidebar-а и редът им |
| `content/<lang>/data/commands.ts` | Всички slash команди: какво, кога, защо, честота на ползване |
| `content/<lang>/data/keys.ts` | Клавишни комбинации и режими на разрешения |
| `content/<lang>/data/resources.ts` | Проверени видеа, статии, документация, инструменти |
| `content/<lang>/data/glossary.ts` | Речник |
| `content/<lang>/pages/*.tsx` | Текстът на всеки раздел |
| `content/<lang>/index.ts` | Събира всичко в един обект `Content` |
| `src/components/`, `src/hooks/`, `src/data/types.ts` | Споделени между езиците |

Правило при промяна на съдържание: редактираш и двата езика. Кодовите примери, командите и примерните промптове са на английски и в двата варианта, защото така се пишат реално към Claude.

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
        working-directory: claude-code
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: claude-code/package-lock.json
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: claude-code/dist
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

## Поддръжка на съдържанието

Claude Code се сменя седмично. Командите са проверени спрямо официалната документация (code.claude.com/docs/en/commands) на 3 октомври 2026. При нова команда: добави запис в `src/content/bg/data/commands.ts` и `src/content/en/data/commands.ts`. При нов ресурс: `resources.ts` в двете папки.
