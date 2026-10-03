import type { Resource } from '../../../data/types'

export const officialVideos: Resource[] = [
  { kind: 'video', title: 'Introducing Cowork: Claude Code for the rest of your work', by: 'Anthropic', url: 'https://www.youtube.com/watch?v=UAmKyyZ-b9E', note: 'Официалното представяне: какво е Cowork и защо е различно от чат. Гледай първо.' },
  { kind: 'video', title: 'Claude Cowork and chat are now one Claude', by: 'Claude (официален канал)', url: 'https://www.youtube.com/watch?v=qMUf-jwSpMo', note: 'Сливането на Chat и Cowork от септември 2026. Обяснява защо на Pro и Max вече не търсиш отделен таб.' },
  { kind: 'video', title: 'Claude Cowork: coming to mobile and web', by: 'Claude (официален канал)', url: 'https://www.youtube.com/watch?v=XNbc2HhL7J4', note: 'Cowork извън desktop приложението: какво работи от телефона и какво иска отворен компютър.' },
]

export const communityVideos: Resource[] = [
  { kind: 'video', title: 'Claude Cowork: Top 5 Tips for Productivity', by: 'Jeff Su', url: 'https://www.youtube.com/watch?v=4wvLHFgnQZQ', note: 'Петте навика, които най-много променят резултата: папка в Obsidian, CLAUDE.md до 300 реда, диета за паметта, пренасяне на Chat проекти, кога skill и кога проект. Основата на раздели 3 и 12.' },
  { kind: 'video', title: 'Claude Cowork Fundamentals In 22 Minutes', by: 'Tina Huang', url: 'https://www.youtube.com/watch?v=uGwDuvSqgYI', note: 'Плътно въведение с реални административни задачи. Добър втори клип.' },
  { kind: 'video', title: 'My Full Claude Cowork Setup (steal my workflows!)', by: 'Tina Huang', url: 'https://www.youtube.com/watch?v=gdrPkpXuNks', note: 'Цялостна подредба: папки, инструкции, skills, scheduled tasks. Когато основите са навик.' },
  { kind: 'video', title: 'Claude Cowork Tutorial for Beginners', by: 'Kevin Stratvert', url: 'https://www.youtube.com/watch?v=1oYDEa5Edho', note: 'Спокоен урок стъпка по стъпка за хора, които работят с Office. Ако започваш от нулата.' },
  { kind: 'video', title: 'How to Use Claude Cowork (Step-by-Step Tutorial)', by: 'Kevin Stratvert', url: 'https://www.youtube.com/watch?v=YYr7hw5EAtk', note: 'Файлове, анализ на данни, свързване на приложения, автоматизация. Продължение на горния.' },
  { kind: 'video', title: 'Claude Cowork - Full Course for Beginners', by: 'Tech With Tim', url: 'https://www.youtube.com/watch?v=tf_KmDNZXzI', note: 'Дълъг курс с много примери. За уикенд.' },
  { kind: 'video', title: 'Claude Cowork Full Tutorial: How to Use Claude Cowork Better Than 99% of People', by: 'Bart Slodyczka', url: 'https://www.youtube.com/watch?v=vMo-yRCN3QM', note: 'Практически трикове за брифове и организация на работата.' },
  { kind: 'video', title: 'Full Claude Cowork Tutorial for Beginners', by: 'Coupler.io Academy', url: 'https://www.youtube.com/watch?v=wp84rp3RVQY', note: 'С фокус върху анализ на данни и таблици. Допълва раздел 6.' },
  { kind: 'video', title: 'I tested Claude Cowork for 24 hours - here\'s what actually works', by: 'No Code MBA', url: 'https://www.youtube.com/watch?v=KqfTQfklbYU', note: 'Честна оценка: кое работи от първия път и кое не.' },
  { kind: 'video', title: 'I got a private lesson on Claude Cowork & Claude Code', by: 'Greg Isenberg', url: 'https://www.youtube.com/watch?v=DW4a1Cm8nG4', note: 'Разговор за начина на мислене при делегиране на работа, не само за бутоните.' },
]

export const officialDocs: Resource[] = [
  { kind: 'docs', title: 'Get started with Claude Cowork', url: 'https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork', note: 'Какво е Cowork, планове, режими на разрешения, лимити, изтриване на файлове. Най-важната страница.' },
  { kind: 'docs', title: 'Best practices for getting started with Claude Cowork', url: 'https://claude.com/blog/best-practices-for-getting-started-with-claude-cowork', note: 'Официалните добри практики: кога чат, кога Cowork, петте съставки на добра задача, навикът "повтори ми заданието и питай". Раздели 1, 4 и 5 стъпват на нея.' },
  { kind: 'docs', title: 'Cowork overview (claude.com/docs)', url: 'https://claude.com/docs/cowork/overview', note: 'Кратък официален преглед с линкове към проекти, Dispatch, plugins.' },
  { kind: 'docs', title: 'Organize work with projects (Cowork)', url: 'https://claude.com/docs/cowork/guide/projects', note: 'Какво съдържа Cowork проект и как се различава от Chat проект.' },
  { kind: 'docs', title: 'Run tasks in the background with Dispatch', url: 'https://claude.com/docs/cowork/guide/dispatch', note: 'Фонов агент, подзадачи, възлагане от телефона.' },
  { kind: 'docs', title: 'Schedule recurring tasks in Cowork', url: 'https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-cowork', note: 'Честоти, създаване, какво могат и какво не могат насрочените задачи.' },
  { kind: 'docs', title: 'Use Claude Cowork on web, desktop, and mobile', url: 'https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile', note: 'Кое работи къде. Локалните неща искат отворено desktop приложение.' },
  { kind: 'docs', title: 'Use the built-in browser in Claude Cowork', url: 'https://support.claude.com/en/articles/16607400-use-the-built-in-browser-in-claude-cowork', note: 'Вграденият браузър: разрешения, импорт на логини, кога Chrome вместо него.' },
  { kind: 'docs', title: 'Get started with Claude in Chrome', url: 'https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome', note: 'Разширението за Chrome и Edge.' },
  { kind: 'docs', title: 'Use quick entry with Claude Desktop on Mac', url: 'https://support.claude.com/en/articles/12626668-use-quick-entry-with-claude-desktop-on-mac', note: 'Двоен Option, скрийншот, Caps Lock диктовка, права на macOS.' },
  { kind: 'docs', title: 'What are Projects?', url: 'https://support.claude.com/en/articles/9517075-what-are-projects', note: 'Chat проекти: знание, инструкции, споделяне, лимити.' },
  { kind: 'docs', title: 'Understanding Claude\'s personalization features', url: 'https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features', note: 'Инструкции за акаунта, инструкции за проект, skills: кое за какво.' },
  { kind: 'docs', title: 'Understanding usage and length limits', url: 'https://support.claude.com/en/articles/11647753-understanding-usage-and-length-limits', note: 'Лимити, дължина на разговора, как да пестиш.' },
  { kind: 'docs', title: 'Get started with connectors', url: 'https://claude.com/docs/connectors/getting-started', note: 'Добавяне, включване в разговор, tool permissions, disconnect.' },
  { kind: 'docs', title: 'Connectors directory', url: 'https://claude.com/docs/connectors/directory', note: 'Всички проверени и общностни connectors.' },
  { kind: 'docs', title: 'Skills overview', url: 'https://claude.com/docs/skills/overview', note: 'Как работят skills, вградените от Anthropic, включване.' },
  { kind: 'docs', title: 'Create custom skills', url: 'https://claude.com/docs/skills/how-to', note: 'SKILL.md, папки references/ assets/ scripts/, ZIP, тестване. Основата на раздел 12.' },
  { kind: 'docs', title: 'Install plugins (Cowork)', url: 'https://claude.com/docs/cowork/guide/plugins', note: 'Marketplace, GitHub репо като marketplace, лимити.' },
  { kind: 'docs', title: 'Claude for M365 overview', url: 'https://claude.com/docs/office-agents/overview', note: 'Excel, PowerPoint, Word, Outlook add-ins и работата между тях.' },
  { kind: 'docs', title: 'Use Claude for Excel', url: 'https://claude.com/docs/office-agents/excel', note: 'Възможности, примерни промптове, ограничения, инсталация.' },
  { kind: 'docs', title: 'Use Claude for PowerPoint', url: 'https://claude.com/docs/office-agents/powerpoint', note: 'Шаблони, редакции по слайд, графики, примерни промптове.' },
  { kind: 'docs', title: 'Use Claude for Word', url: 'https://claude.com/docs/office-agents/word', note: 'Tracked changes, коментари, redlines, шаблони.' },
  { kind: 'docs', title: 'Claude Desktop changelog', url: 'https://claude.com/docs/cowork/changelog', note: 'Какво е ново във всяка версия. Приложението се сменя седмично.' },
]

export const articles: Resource[] = [
  { kind: 'article', title: 'Top 5 Claude Cowork Tips I Wish I Knew from Day One', by: 'Jeff Su', url: 'https://www.jeffsu.org/top-5-claude-cowork-tips-i-wish-i-knew-from-day-one/', note: 'Текстовата версия на видеото, с шаблони за CLAUDE.md и MEMORY.md.' },
  { kind: 'article', title: 'Learn 80% of Claude Cowork in Under 20 Minutes', by: 'Jeff Su', url: 'https://www.jeffsu.org/learn-80-of-claude-cowork-in-under-20-minutes/', note: 'Седемте възможности на Cowork с примерни брифове. Chat срещу Cowork, настройки, памет, connectors, skills, проекти, насрочени задачи.' },
  { kind: 'article', title: 'Claude best practices 2026: the complete power user guide', by: 'The AI Corner', url: 'https://www.the-ai-corner.com/p/claude-best-practices-power-user-guide-2026', note: 'Файлова система за Cowork (ABOUT ME, PROJECTS, TEMPLATES, OUTPUTS), структура на промптовете, handoff документи.' },
  { kind: 'article', title: 'Claude Cowork: Practical Tips That Actually Make a Difference', by: 'Engincan Veske', url: 'https://engincanveske.substack.com/p/claude-cowork-practical-tips-that', note: 'Кратки практически бележки от ежедневна употреба.' },
  { kind: 'article', title: 'The 15 Best Claude Cowork Use Cases for Business in 2026', by: 'AI Agents Library', url: 'https://www.aiagentslibrary.com/blog/claude-cowork-use-cases/', note: 'Списък с идеи за задачи по отдели. За вдъхновение, не за процес.' },
  { kind: 'article', title: 'Claude Desktop explained: chat, Cowork and Code', by: 'Clickforest', url: 'https://www.clickforest.com/en/blog/claude-desktop-explained', note: 'Трите режима в едно сравнение с дати на промените през 2026.' },
]

export const tools: Resource[] = [
  { kind: 'tool', title: 'Claude Desktop (изтегляне)', url: 'https://claude.com/download', note: 'macOS и Windows.' },
  { kind: 'tool', title: 'Claude for Microsoft 365 в AppSource', url: 'https://marketplace.microsoft.com/en-us/product/office/WA200010725?tab=Overview', note: 'Един add-in за Excel, PowerPoint, Word и Outlook.' },
  { kind: 'tool', title: 'Claude in Chrome', url: 'https://claude.com/chrome', note: 'Разширението за Chrome и Edge.' },
  { kind: 'tool', title: 'Anthropic skills (GitHub)', url: 'https://github.com/anthropics/skills/tree/main/skills', note: 'Работещи примерни skills: brand-guidelines, internal-comms, pdf, skill-creator. Копирай структурата.' },
  { kind: 'tool', title: 'Agent Skills specification', url: 'https://agentskills.io/specification', note: 'Отвореният стандарт за SKILL.md.' },
  { kind: 'tool', title: 'Obsidian', url: 'https://obsidian.md/', note: 'Безплатен редактор за .md файлове. Отвори Cowork папката като vault, за да четеш CLAUDE.md и MEMORY.md.' },
]
