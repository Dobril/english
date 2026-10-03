import type { Feature } from '../../../data/types'

export const featureCategories = [
  'Режими на работа',
  'Контекст, памет и персонализация',
  'Файлове и резултати',
  'Проучване и мислене',
  'Разширения: connectors, skills, plugins',
  'Автоматизация и фон',
  'Браузър и екран',
  'Office add-ins',
  'Приложението: вход, настройки, акаунт',
] as const

export const frequencyLabel = {
  daily: 'всеки ден',
  often: 'често',
  rare: 'рядко',
  beta: 'beta / rollout',
} as const

export const features: Feature[] = [
  {
    name: 'Chat', category: 'Режими на работа', surface: 'chat', frequency: 'daily',
    what: 'Разговор с Claude: въпроси, обяснения, чернови, пренаписване, бърз анализ на качен файл.',
    when: 'Когато резултатът е мисъл, решение или чернова, която ще довършиш ти, и се побира в няколко реплики.',
    tip: 'Ако след третата реплика искаш файл, който друг ще отвори, премини в Cowork.',
  },
  {
    name: 'Cowork', category: 'Режими на работа', surface: 'cowork', frequency: 'daily',
    what: 'Агент, който работи многостъпково върху папки на компютъра ти и връща готови файлове: Excel с формули, PowerPoint, Word, PDF, дашборд.',
    when: 'Когато резултатът е файл, който ще дадеш на някого, или задачата минава през няколко файла и приложения.',
    tip: 'Петте съставки на добра Cowork задача: много входове, файл на изхода, повтаря се, ясен критерий за готово, скучна среда.',
    url: 'https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork',
  },
  {
    name: 'Обединен Chat + Cowork', category: 'Режими на работа', surface: 'both', frequency: 'beta',
    what: 'На Pro и Max двата режима се сливат в един разговор: започваш като чат и Claude минава към работа по файлове, когато трябва. Новите сесии вървят в облака и се синхронизират между устройствата.',
    when: 'Ако го виждаш в твоя акаунт, не търси отделен таб Cowork: избираш Cowork от полето за съобщение или просто описваш резултата.',
    tip: 'Достъпът до локални папки, браузър и екран продължава да изисква отворено desktop приложение.',
  },
  {
    name: 'Cowork на web и mobile', category: 'Режими на работа', surface: 'cowork', frequency: 'often',
    what: 'Стартираш, насочваш и преглеждаш Cowork задачи от claude.ai и мобилното приложение. Сесиите вървят в облака.',
    when: 'Проверка на напредък и отговори на въпросите на Claude, когато не си на компютъра.',
    tip: 'Локални файлове, локални connectors и браузър работят само докато desktop приложението е отворено на този компютър.',
    url: 'https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile',
  },
  {
    name: 'Режими на разрешения', category: 'Режими на работа', surface: 'cowork', frequency: 'daily',
    what: 'Manual: пита преди всяко действие. Auto: класификатор за безопасност одобрява рутинното и спира рисковото. Skip: без паузи и без проверки.',
    when: 'Manual за нови или чувствителни задачи. Auto за познати процеси. Skip почти никога.',
    tip: 'Изтриване на файлове винаги иска изрично Allow, независимо от режима. Auto харчи повече usage заради допълнителните проверки.',
  },
  {
    name: 'Code (таб)', category: 'Режими на работа', surface: 'system', frequency: 'rare',
    what: 'Третият таб на desktop приложението: Claude Code за програмиране.',
    when: 'Не е предмет на този наръчник. Виж отделния наръчник за Claude Code.',
  },

  {
    name: 'Projects (Chat)', category: 'Контекст, памет и персонализация', surface: 'chat', frequency: 'daily',
    what: 'Работно пространство с инструкции, файлове със знание и собствена история на разговорите. На платените планове знанието се търси с RAG и побира до 10 пъти повече.',
    when: 'За повтарящ се тип работа: месечен отчет, договори с един клиент, вътрешни политики. Всеки разговор в проекта започва с контекста.',
    tip: 'Безплатните акаунти имат до 5 проекта. На Team и Enterprise проектите се споделят с права view / edit.',
    url: 'https://support.claude.com/en/articles/9517075-what-are-projects',
  },
  {
    name: 'Cowork projects', category: 'Контекст, памет и персонализация', surface: 'cowork', frequency: 'often',
    what: 'Локален проект: папки, постоянни инструкции, линкове, свързан Chat проект и собствена памет. Живее само на твоя компютър.',
    when: 'За област на работа с постоянни папки: "Фактури 2026", "Борд презентации", "Клиент X".',
    tip: 'Projects в лявата навигация, "+": Start from scratch, Import a project или Use an existing folder. Архивирането трие метаданните, не папките.',
    url: 'https://claude.com/docs/cowork/guide/projects',
  },
  {
    name: 'Memory', category: 'Контекст, памет и персонализация', surface: 'both', frequency: 'daily',
    what: 'Claude помни роля, предпочитания и текущи проекти между разговорите. В Cowork паметта е в MEMORY.md в папката или проекта.',
    when: 'Включи го веднъж (Settings > Capabilities > Memory). Казвай "запомни, че..." за неща, които не искаш да повтаряш.',
    tip: 'Диета за паметта: записи от 1 до 2 изречения, под 150 реда, старото в архив. Иначе важното се губи.',
  },
  {
    name: 'Instructions for Claude', category: 'Контекст, памет и персонализация', surface: 'chat', frequency: 'often',
    what: 'Инструкции за целия акаунт: език, тон, роля, формат по подразбиране.',
    when: 'Нещата, които са верни във всеки разговор. Всичко друго отива в проект или skill.',
    tip: 'Кратко. Правило, което Claude спазва и без него, се маха.',
  },
  {
    name: 'Global instructions (Cowork)', category: 'Контекст, памет и персонализация', surface: 'cowork', frequency: 'often',
    what: 'Постоянни указания за всяка Cowork сесия: къде да записва, как да именува файлове, какво никога да не прави.',
    when: 'Settings > Cowork > Edit Global Instructions. Веднъж, после само при повтарящ се проблем.',
    tip: 'Пример: "Никога не променяй оригинали. Записвай в OUTPUTS/ с дата в името. Маркирай несигурни стойности с VERIFY."',
  },
  {
    name: 'CLAUDE.md и инструкции за папка', category: 'Контекст, памет и персонализация', surface: 'cowork', frequency: 'often',
    what: 'Markdown файл в работната папка, който Claude чете в началото на сесията: структура, правила, къде какво е.',
    when: 'Когато една папка е постоянно работно място. Под 300 реда, само неща, които не се виждат от файловете.',
    tip: 'Отвори папката в Obsidian, за да четеш .md файловете удобно.',
  },
  {
    name: 'Styles', category: 'Контекст, памет и персонализация', surface: 'chat', frequency: 'rare',
    what: 'Готови или собствени стилове на отговора (кратък, формален, обяснителен) за конкретен разговор.',
    when: 'Когато тонът трябва да е различен от обичайния, без да пипаш акаунтните инструкции.',
  },

  {
    name: 'Artifacts', category: 'Файлове и резултати', surface: 'chat', frequency: 'daily',
    what: 'Страничен панел, в който Claude строи документ, таблица, слайдове или интерактивно приложение отделно от разговора. Версии, споделяне с линк.',
    when: 'Когато искаш да редактираш и преизползваш резултата отделно от чата.',
    tip: 'Live artifacts (Cowork) са дашборди с код зад тях, които се обновяват при отваряне.',
  },
  {
    name: 'Качване на файлове', category: 'Файлове и резултати', surface: 'chat', frequency: 'daily',
    what: 'PDF, Word, Excel, CSV, изображения, презентации в разговора. Claude чете и анализира.',
    when: 'Бърз анализ на един или няколко файла, без да ти трябва нов файл обратно.',
    tip: 'Ограничения в чата: около 20 файла на разговор и 30 MB на файл. За повече: папка в Cowork.',
  },
  {
    name: 'Достъп до локални папки', category: 'Файлове и резултати', surface: 'cowork', frequency: 'daily',
    what: 'Даваш на Cowork една или повече папки. Чете, създава, променя, подрежда файлове в тях. Може и домашната папка, Documents или цял диск.',
    when: 'Всяка задача върху реални файлове. Работи с копия в работна папка, не с единствения оригинал.',
    tip: 'Отделни файлове се четат до 50 MB. Изтриване винаги иска потвърждение.',
  },
  {
    name: 'Създаване на Excel, Word, PowerPoint, PDF', category: 'Файлове и резултати', surface: 'both', frequency: 'daily',
    what: 'Вградените skills на Anthropic (xlsx, docx, pptx, pdf) се включват сами, когато поискаш файл. Excel с работещи формули и няколко листа, презентации по шаблон, документи със стилове.',
    when: 'Винаги, когато резултатът е файл. Поискай формат и шаблон изрично.',
    tip: 'Изисква Settings > Capabilities > Code execution and file creation.',
  },
  {
    name: 'Google Docs, Sheets, Slides от Output picker', category: 'Файлове и резултати', surface: 'both', frequency: 'often',
    what: 'От септември 2026 резултатът може да се създаде направо като Google документ, таблица или презентация в твоя Drive.',
    when: 'Когато екипът работи в Google Workspace и файлът трябва да е споделен веднага.',
  },
  {
    name: 'Open with Claude', category: 'Файлове и резултати', surface: 'system', frequency: 'rare',
    what: 'Claude е в менюто "Open with" на операционната система за обичайни работни файлове.',
    when: 'Бърз старт на задача върху един файл от Finder или Explorer.',
  },

  {
    name: 'Research', category: 'Проучване и мислене', surface: 'chat', frequency: 'often',
    what: 'Дълбоко многостъпково проучване в интернет (и в свързаните ти приложения) с източници. Отнема минути, върху доклад с цитати.',
    when: 'Пазарен преглед, конкуренти, регулации, доставчици. Когато искаш източници, не мнение.',
    tip: 'Можеш да пишеш следващи съобщения, докато Research върви. Провери 2 до 3 източника сам.',
  },
  {
    name: 'Web search', category: 'Проучване и мислене', surface: 'both', frequency: 'daily',
    what: 'Бързо търсене в интернет по време на отговор.',
    when: 'Актуални факти, цени, дати. Изключи го за задачи върху вътрешни данни, за да не внася външен шум.',
  },
  {
    name: 'Extended thinking', category: 'Проучване и мислене', surface: 'both', frequency: 'daily',
    what: 'Моделът разсъждава преди отговора. При най-новите модели е винаги включено.',
    when: 'Анализи, планиране, сложни таблици. Няма нужда да го управляваш.',
  },
  {
    name: 'Effort level', category: 'Проучване и мислене', surface: 'both', frequency: 'often',
    what: 'Колко дълбоко да мисли моделът: low до max. Повече дълбочина, повече usage и време.',
    when: 'Max за анализи и важни документи. Low за механични неща: преименуване, форматиране, кратки резюмета.',
  },
  {
    name: 'Избор на модел', category: 'Проучване и мислене', surface: 'both', frequency: 'often',
    what: 'Превключване между моделите от падащото меню. Office add-ins показват подбран по-кратък списък.',
    when: 'Най-силният модел за мислене и писане. По-бърз за рутина.',
  },
  {
    name: 'Паралелни sub-agents', category: 'Проучване и мислене', surface: 'cowork', frequency: 'often',
    what: 'Cowork разделя голяма задача на части и ги работи едновременно: 10 файла, 10 резюмета, за минути вместо половин час.',
    when: 'Еднотипна работа върху много файлове или източници. Поискай го изрично: "за всеки файл отделно резюме".',
  },

  {
    name: 'Connectors', category: 'Разширения: connectors, skills, plugins', surface: 'both', frequency: 'daily',
    what: 'Връзка към външно приложение през MCP: Google Drive, Gmail, Calendar, Microsoft 365, Slack, Notion, HubSpot, Stripe, QuickBooks, Canva, Figma, Linear и други. Claude чете и действа там.',
    when: 'Когато данните са в приложение, не във файл. Включваш ги за разговор от "+" в полето за съобщение.',
    tip: 'Customize > Connectors. Инструментите, които пишат (пращат имейл, променят записи), дръж на Needs approval.',
    url: 'https://claude.com/docs/connectors/getting-started',
  },
  {
    name: 'Tool permissions', category: 'Разширения: connectors, skills, plugins', surface: 'both', frequency: 'often',
    what: 'За всеки инструмент на connector: Always allow, Needs approval или Blocked. При първо ползване: Allow once / Always allow.',
    when: 'Четене: Always allow. Писане и пращане: Needs approval. Опасното: Blocked.',
  },
  {
    name: 'Skills', category: 'Разширения: connectors, skills, plugins', surface: 'both', frequency: 'daily',
    what: 'Папка със SKILL.md: повтаряем процес или знание, което Claude зарежда, когато задачата съвпадне с описанието, или ти извикваш с "/".',
    when: 'Процес, който правиш по един и същ начин: месечен отчет, протокол от среща, брандирана презентация.',
    tip: 'Customize > Skills. Вградените xlsx, docx, pptx, pdf са винаги там. Качваш собствени като ZIP с папката вътре.',
    url: 'https://claude.com/docs/skills/overview',
  },
  {
    name: 'skill-creator', category: 'Разширения: connectors, skills, plugins', surface: 'both', frequency: 'rare',
    what: 'Skill от Anthropic, който ти помага да напишеш и тестваш собствен skill, с тестови промптове и сравнение със и без skill-а.',
    when: 'Когато си направил един процес добре в Cowork и искаш да го фиксираш: "създай skill, който улавя точно този процес".',
  },
  {
    name: 'Plugins', category: 'Разширения: connectors, skills, plugins', surface: 'both', frequency: 'often',
    what: 'Пакет от skills, connectors, агенти и команди, който се инсталира наведнъж. Marketplace на Anthropic, фирмен marketplace или GitHub репо.',
    when: 'Готови пакети по роля: финанси, маркетинг, правни, HR, малък бизнес. Фирмените се налагат от администратора.',
    tip: 'Инсталирането не те логва в connectors: отвори таба Connectors на plugin-а след това.',
    url: 'https://claude.com/docs/cowork/guide/plugins',
  },
  {
    name: 'Customize', category: 'Разширения: connectors, skills, plugins', surface: 'both', frequency: 'often',
    what: 'Страницата в sidebar-а, която събира Connectors, Skills и Plugins. Cowork зарежда включеното оттук при старт на сесия.',
    when: 'Включване и изключване на разширения. Cowork не чете ~/.claude на Claude Code: ако имаш skill там, добави го тук.',
  },

  {
    name: 'Scheduled tasks', category: 'Автоматизация и фон', surface: 'cowork', frequency: 'often',
    what: 'Задачи, които вървят сами: на час, дневно, седмично, само в работни дни или ръчно. Същите connectors, skills и plugins като нормална задача. Вървят в облака.',
    when: 'Сутрешен брифинг от пощата и Slack, седмичен отчет, петъчно подреждане. Първо го направи ръчно 3 пъти, после го насрочи.',
    tip: '/schedule в задача или Scheduled > New task. Не могат да ползват локална папка; работят с connectors и файлове в акаунта ти.',
    url: 'https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-cowork',
  },
  {
    name: 'Dispatch', category: 'Автоматизация и фон', surface: 'cowork', frequency: 'often',
    what: 'Дългоживеещ агент в sidebar-а: описваш резултат веднъж, той го разбива на подзадачи и пуска всяка като отделна Cowork сесия в проекта, който посочиш. От телефона можеш да му възлагаш работа, която върви на компютъра.',
    when: 'Работа, която искаш да започнеш и да се върнеш към нея по-късно. Pro и Max.',
    tip: 'Заявките за разрешение идват при теб и се отказват автоматично след 10 минути без отговор.',
    url: 'https://claude.com/docs/cowork/guide/dispatch',
  },
  {
    name: 'Няколко задачи едновременно', category: 'Автоматизация и фон', surface: 'cowork', frequency: 'often',
    what: 'Няколко Cowork сесии вървят паралелно и се виждат в sidebar-а със статус.',
    when: 'Независими задачи. Не слагай две различни цели в една сесия.',
  },
  {
    name: 'Опашка от съобщения', category: 'Автоматизация и фон', surface: 'both', frequency: 'daily',
    what: 'Пишеш следващото съобщение, докато Claude работи или Research върви. Изпраща се, когато ходът свърши.',
    when: 'Уточнения, които се сещаш по средата. Esc / Stop, ако трябва да спреш веднага.',
  },
  {
    name: 'Usage', category: 'Автоматизация и фон', surface: 'system', frequency: 'often',
    what: 'Settings > Usage показва колко от лимита си изразходвал и приблизителна цена. Многостъпкови задачи, connectors и Auto режим харчат повече.',
    when: 'Преди голяма задача и когато нещо е тръгнало да работи дълго.',
  },

  {
    name: 'Built-in browser', category: 'Браузър и екран', surface: 'cowork', frequency: 'often',
    what: 'Браузър в самото приложение: Claude отваря страници, чете, кликва, попълва форми, прави скрийншоти, докато гледаш. Иска Allow once / Always allow за всеки сайт. Можеш да импортираш логини от Chrome, Edge, Firefox сайт по сайт.',
    when: 'Когато данните са в сайт без connector. Приложението трябва да е отворено.',
    tip: 'Settings > Cowork > Preferred browser. Банки, лични данни и медицинска информация: не.',
    url: 'https://support.claude.com/en/articles/16607400-use-the-built-in-browser-in-claude-cowork',
  },
  {
    name: 'Claude in Chrome', category: 'Браузър и екран', surface: 'both', frequency: 'often',
    what: 'Разширение за Chrome и Edge: Claude работи в твоя браузър с твоите табове и логини. Страничен панел с Cowork на Max и Team, Pro се включва постепенно.',
    when: 'Когато работата е на страницата пред теб и вече си логнат.',
    url: 'https://claude.com/chrome',
  },
  {
    name: 'Computer use', category: 'Браузър и екран', surface: 'cowork', frequency: 'beta',
    what: 'Claude управлява приложения на екрана ти с разрешение за всяко приложение поотделно. macOS 14 или по-нова.',
    when: 'Само когато няма connector, файл или браузърен път. Бавно и скъпо.',
  },
  {
    name: 'Quick entry', category: 'Браузър и екран', surface: 'chat', frequency: 'daily',
    what: 'Mac: двоен Option (или Option+Space) отваря Claude над всяко приложение. Скрийншот, споделяне на прозорец, диктовка с Caps Lock.',
    when: 'Бърз въпрос за това, което е на екрана, без да сменяш приложението.',
    tip: 'Settings > General. Диктовката с Caps Lock е изключена по подразбиране. Трябват Screen recording и Accessibility права.',
    url: 'https://support.claude.com/en/articles/12626668-use-quick-entry-with-claude-desktop-on-mac',
  },
  {
    name: 'Dictation', category: 'Браузър и екран', surface: 'both', frequency: 'often',
    what: 'Микрофонът в полето за съобщение превръща речта ти в текст. Claude не говори обратно. Работи и в Office add-ins.',
    when: 'Дълги брифове, които е по-бързо да изговориш. Прегледай текста преди да пратиш.',
  },

  {
    name: 'Claude for Excel', category: 'Office add-ins', surface: 'office', frequency: 'daily',
    what: 'Add-in в Excel: въпроси с цитати по клетки, промяна на допускания със запазени формули, намиране на #REF! и #DIV/0, строене и попълване на модели, pivot, условно форматиране, валидация. Защита от презаписване.',
    when: 'Когато вече си в работната книга и искаш промени на място. Не за data tables и VBA макроси.',
    tip: 'Инсталация от Microsoft AppSource "Claude for Microsoft 365". Постоянни Instructions в настройките на add-in-а.',
    url: 'https://claude.com/docs/office-agents/excel',
  },
  {
    name: 'Claude for PowerPoint', category: 'Office add-ins', surface: 'office', frequency: 'often',
    what: 'Add-in в PowerPoint: чете slide master, layouts, шрифтове и цветове и строи слайдове в твоя шаблон. Точкови редакции на избран слайд, bullets в диаграми и редактируеми графики, преструктуриране на сюжета.',
    when: 'Презентация по корпоративен шаблон, която трябва да остане "on brand".',
    url: 'https://claude.com/docs/office-agents/powerpoint',
  },
  {
    name: 'Claude for Word', category: 'Office add-ins', surface: 'office', frequency: 'often',
    what: 'Add-in в Word: въпроси с цитати по секции, редакция на избран текст със запазени стилове и номерация, tracked changes режим, работа по коментари, обобщение на чужди redlines, попълване на шаблони, семантично търсене.',
    when: 'Договори, политики, дълги документи, където всяка промяна трябва да е видима ревизия.',
    tip: 'Стари .doc файлове първо се записват като .docx.',
    url: 'https://claude.com/docs/office-agents/word',
  },
  {
    name: 'Claude for Outlook', category: 'Office add-ins', surface: 'office', frequency: 'beta',
    what: 'Add-in в Outlook: сортиране на пощата, чернови на отговори в твоя тон, резюме на нишки, намиране на време за среща. Админът дава еднократно Microsoft Graph съгласие.',
    when: 'Сутрешна обработка на пощата. Нищо не се праща без теб.',
    url: 'https://claude.com/docs/office-agents/outlook',
  },
  {
    name: 'Работа между Office приложенията', category: 'Office add-ins', surface: 'office', frequency: 'often',
    what: 'Excel, PowerPoint, Word и Outlook споделят един разговор: "вземи обобщената таблица от книгата и я сложи на слайд 3".',
    when: 'Отчет, който минава от данни към слайдове към имейл без копиране.',
    url: 'https://claude.com/docs/office-agents/work-across-apps',
  },

  {
    name: 'Инсталация и вход', category: 'Приложението: вход, настройки, акаунт', surface: 'system', frequency: 'rare',
    what: 'claude.com/download за macOS и Windows. Вход със същия акаунт като claude.ai. Cowork изисква платен план.',
    when: 'Веднъж. После приложението се обновява само.',
    url: 'https://claude.com/download',
  },
  {
    name: 'Settings > Capabilities', category: 'Приложението: вход, настройки, акаунт', surface: 'system', frequency: 'rare',
    what: 'Memory, Code execution and file creation (нужно за skills и файлове), web search, кои инструменти да се зареждат ("load tools when needed").',
    when: 'В първия ден. После само при проблем.',
  },
  {
    name: 'Settings > Cowork', category: 'Приложението: вход, настройки, акаунт', surface: 'cowork', frequency: 'rare',
    what: 'Global instructions, режим на разрешения по подразбиране, предпочитан браузър, права за папки.',
    when: 'В първия ден и при повтарящ се проблем, който искаш да спреш веднъж завинаги.',
  },
  {
    name: 'Права на macOS', category: 'Приложението: вход, настройки, акаунт', surface: 'system', frequency: 'rare',
    what: 'System Settings > Privacy & Security: Screen recording, Accessibility, Speech recognition за quick entry и диктовка; достъп до папки за Cowork.',
    when: 'Когато функция мълчи или бутон не прави нищо.',
  },
  {
    name: 'Team и Enterprise', category: 'Приложението: вход, настройки, акаунт', surface: 'system', frequency: 'rare',
    what: 'Собственикът добавя connectors и plugins за организацията, споделя проекти, налага задължителни plugins, вижда adoption. Членовете свързват собствените си акаунти.',
    when: 'Ако нещо липсва в Customize, поискай го от собственика с Request.',
  },
]
