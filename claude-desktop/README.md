# Наръчник за работа с Claude Desktop (Chat и Cowork)

Статичен React сайт (Vite + TypeScript + react-router с hash routing) на български и английски: как се работи с Claude Desktop извън кода. Chat за въпроси и чернови, Cowork за готови файлове: Excel и таблици, презентации и дизайн на слайдове, документи, отчети и имейли, комплексни анализи, проверка на резултата, connectors, skills и plugins, насрочени и фонови задачи, браузър и Office add-ins. Нищо за програмиране и задачи за разработчици; за това е `../claude-code`.

Същият стек и същата структура като `../claude-code`.

## Езици

Всяка страница живее под езиков префикс: `#/bg/workflow` и `#/en/workflow`. Бутонът BG / EN в горната лента сменя езика, като запазва страницата. Изборът се помни в `localStorage`; `#/` препраща към последно избрания език (по подразбиране английски).

## Структура на съдържанието

| Път | Какво има вътре |
| --- | --- |
| `src/content/bg/` и `src/content/en/` | Цялото съдържание за всеки език |
| `content/<lang>/ui.ts` | Низовете на интерфейса |
| `content/<lang>/data/nav.ts` | Разделите в sidebar-а и редът им |
| `content/<lang>/data/features.ts` | Всички функции на Chat, Cowork и Office add-ins: какво, кога, защо, честота, къде работи |
| `content/<lang>/data/keys.ts` | Клавишни комбинации и карта на настройките |
| `content/<lang>/data/resources.ts` | Проверени видеа, статии, документация, инструменти |
| `content/<lang>/data/glossary.ts` | Речник |
| `content/<lang>/pages/*.tsx` | Текстът на всеки раздел |
| `content/<lang>/index.ts` | Събира всичко в един обект `Content` |
| `src/components/`, `src/hooks/`, `src/data/types.ts` | Споделени между езиците |

Правило при промяна на съдържание: редактираш и двата езика. Примерните брифове са на езика на страницата (на български в BG версията, на английски в EN), защото в офис работа се пишат на езика на екипа. Имената на функциите и настройките (Cowork, Customize, Settings > Capabilities) са както в приложението.

## Команди

```bash
npm install
npm run dev       # локално на http://localhost:5173
npm run build     # билд в dist/
npm run preview   # преглед на билда
```

## Качване в GitHub Pages

Билдът ползва `base: './'` и hash routing, затова работи от всяка папка. Деплойва се от общия workflow в корена на репото (`.github/workflows/deploy-pages.yml`), който билдва всеки проект от списъка `PROJECTS` и го сервира в подпапка със същото име.

## Поддръжка на съдържанието

Claude Desktop се обновява почти всяка седмица. Функциите са проверени спрямо claude.com/docs, support.claude.com и официалния блог на 3 октомври 2026. При нова функция: добави запис в `src/content/bg/data/features.ts` и `src/content/en/data/features.ts`. При нов ресурс: `resources.ts` в двете папки. Линковете към YouTube са проверени през oEmbed (заглавие и канал).
