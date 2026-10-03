import { Link } from '../../../components/Link'
import { Block, Callout, Code, Feat, PageHead, Pager, Steps } from '../../../components/Bits'

export function SetupPage() {
  return (
    <>
      <PageHead
        mark="2"
        title="Инсталация и настройка"
        lede="Цел: за един час да имаш работещо приложение, работна папка, правилните разрешения и свързани инструменти. Прави се веднъж."
        chips={['macOS / Windows', 'Settings', 'Customize', 'работна папка', 'Microsoft 365 add-in']}
      />

      <Block title="Стъпки за първия ден">
        <Steps
          items={[
            {
              title: 'Инсталирай и влез',
              body: (
                <ul>
                  <li>Свали приложението от <a href="https://claude.com/download" target="_blank" rel="noreferrer">claude.com/download</a> за macOS или Windows и влез с акаунта си. Cowork изисква платен план (Pro, Max, Team или Enterprise).</li>
                  <li>Ако фирмата ти ползва Team или Enterprise, влез със служебния акаунт. Connectors и plugins често се добавят от администратор и ти само ги свързваш.</li>
                </ul>
              ),
            },
            {
              title: 'Settings → General: бърз достъп и диктовка',
              body: (
                <ul>
                  <li><Feat>Quick entry</Feat> (Mac): двойно натискане на Option отваря Claude над всяко приложение. Може да го смениш на Option+Space или своя комбинация.</li>
                  <li>Диктовка: по подразбиране е изключена, защото ползва Caps Lock. Включи я, ако предпочиташ да говориш брифовете.</li>
                  <li>macOS ще поиска права за Screen recording (снимки на екрана), Accessibility и Speech recognition (System Settings → Privacy &amp; Security).</li>
                </ul>
              ),
            },
            {
              title: 'Settings → Capabilities',
              body: (
                <ul>
                  <li>Включи <Feat>Memory</Feat>, за да помни кой си и как работиш.</li>
                  <li>Включи "Code execution and file creation". Без него Claude не може да създава Excel, Word и PowerPoint файлове и skills не работят.</li>
                  <li>Инструменти: "Load tools when needed", за да не товари контекста с всички connectors наведнъж.</li>
                </ul>
              ),
            },
            {
              title: 'Settings → Cowork',
              body: (
                <ul>
                  <li><Feat>Global instructions</Feat>: няколко реда, които важат за всяка Cowork сесия (език, тон, формат, къде да записва). Шаблон по-долу.</li>
                  <li>Режим на разрешения: започни с Manual (пита преди всяко действие). Премини на Auto, когато имаш доверие. Skip не ползвай върху важни папки.</li>
                  <li>Preferred browser: вграденият браузър или Claude in Chrome (<Link to="/browser">раздел 14</Link>).</li>
                </ul>
              ),
            },
            {
              title: 'Направи работна папка',
              body: (
                <ul>
                  <li>Например <code>Documents/Cowork</code>. Вътре: <code>ABOUT ME</code>, <code>PROJECTS</code>, <code>TEMPLATES</code>, <code>OUTPUTS</code>. Структурата по-долу.</li>
                  <li>Cowork вижда само папките, които си му дал. Файл в Downloads не съществува за него, докато не го копираш в работната папка или не дадеш достъп до Downloads.</li>
                  <li>Работи върху копия. Оригиналите на важни документи стоят извън папката или в подпапка само за четене.</li>
                </ul>
              ),
            },
            {
              title: 'Customize → Connectors, Skills, Plugins',
              body: (
                <ul>
                  <li>Свържи инструментите, в които живее работата ти: Google Drive, Gmail, Calendar, Microsoft 365, Slack, Notion. Всеки иска вход със собствения ти акаунт. <Link to="/connectors">Раздел 11</Link>.</li>
                  <li>Включи вградените skills на Anthropic за Excel, Word, PowerPoint и PDF. Те се зареждат сами, когато задачата ги иска. <Link to="/skills">Раздел 12</Link>.</li>
                  <li>Разгледай plugins за твоята роля (финанси, маркетинг, HR, право). Инсталирането не свързва connectors автоматично: отвори plugin-а и ги свържи поотделно.</li>
                </ul>
              ),
            },
            {
              title: 'Ако работиш в Excel, PowerPoint или Word',
              body: (
                <ul>
                  <li>Инсталирай "Claude for Microsoft 365" от Microsoft AppSource ("Get it now"). Отвори Excel, активирай add-in-а (Windows: Home → Add-ins; Mac: Tools → Add-ins) и влез с Claude акаунта си.</li>
                  <li>Един add-in покрива Excel, PowerPoint, Word и Outlook. Изисква Microsoft 365 абонамент; не работи на Office 2016/2019 и на iPad.</li>
                  <li>Разликата спрямо Cowork: add-in-ът работи върху отворения файл вътре в приложението, Cowork работи върху папки отвън. <Link to="/browser">Раздел 14</Link>.</li>
                </ul>
              ),
            },
            {
              title: 'По избор: Claude in Chrome',
              body: (
                <p>Разширение за Chrome или Edge, с което Claude работи в твоя браузър с твоите вече направени входове. Полезно за портали, системи зад логин и
                  уеб приложения без connector. Инсталирай го, когато ти потрябва, не преди това.</p>
              ),
            },
          ]}
        />
      </Block>

      <Block title="Структура на работната папка">
        <Code title="Documents/Cowork">{`Cowork/
├── CLAUDE.md            инструкции за всяка сесия в тази папка (до 200-300 реда)
├── MEMORY.md            какво Claude е научил за теб и работата (кратки записи)
├── ABOUT ME/
│   ├── role.md          роля, екип, приоритети за тримесечието
│   └── writing-style.md как пишеш: тон, забранени думи, примери
├── PROJECTS/
│   ├── budget-2027/     бриф, входни файлове, чернови
│   └── q3-report/
├── TEMPLATES/
│   ├── report.docx      фирмени шаблони за Word, PowerPoint, Excel
│   ├── deck.pptx
│   └── brand.md         цветове, шрифтове, лого, правила
└── OUTPUTS/             тук Claude записва готовите файлове`}</Code>
        <p>
          Защо така: Claude чете <code>CLAUDE.md</code> в началото на всяка сесия и знае къде какво е. Шаблоните на едно място значат, че всяка
          презентация тръгва от фирмения дизайн. <code>OUTPUTS</code> отделно значи, че никога не бъркаш чернова с оригинал. Съдържанието на
          файловете: <Link to="/memory">раздел 3</Link>.
        </p>
      </Block>

      <Block title="Шаблон за Global instructions">
        <Code title="Settings → Cowork → Edit Global Instructions">{`Пиши ми на български, освен ако документът не е за чуждестранен получател.
Работна папка: Documents/Cowork. Готовите файлове записвай в OUTPUTS/, никога върху оригинала.
Преди голяма задача: повтори какво разбра и задай въпросите си, после започни.
Числа: хиляди с интервал, десетична запетая, валута след числото (1 250,00 лв.).
Дати: ДД.ММ.ГГГГ. Excel: формули, не стойности. Презентации: шаблона от TEMPLATES/deck.pptx.
Когато не си сигурен в число или факт, маркирай го с [ПРОВЕРИ] вместо да предполагаш.`}</Code>
        <p className="muted small">Кратко. Всичко, което важи само за една папка или един проект, отива в CLAUDE.md на папката, не тук.</p>
      </Block>

      <Block title="Разрешения и безопасност">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Режим</th><th>Как работи</th><th>Кога</th></tr></thead>
            <tbody>
              <tr><td className="cat">Manual</td><td>Спира и пита преди всяко действие.</td><td>Първите седмици. Папки с важни документи.</td></tr>
              <tr><td className="cat">Auto</td><td>Класификатор проверява всяко действие и спира рисковите. Харчи повече от лимита заради проверките.</td><td>Ежедневна работа, когато познаваш поведението.</td></tr>
              <tr><td className="cat">Skip</td><td>Без паузи и без проверки.</td><td>Еднократни задачи върху копия, които не те е страх да загубиш.</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>Изтриване на файл винаги иска изрично "Allow", независимо от режима.</li>
          <li>Connectors имат собствени права за всеки инструмент: Always allow, Needs approval, Blocked (Customize → Connectors → конкретния connector).</li>
          <li>Файлове от външни източници (изтеглени шаблони, документи от контрагенти) могат да съдържат скрити инструкции. Четеш внимателно всяко потвърждение, което Claude иска върху такъв файл.</li>
        </ul>
        <Callout kind="warn">
          Cowork пише реални файлове на диска ти. Преди първата задача върху папка с важно съдържание: копие. Облачните папки (Drive, OneDrive) синхронизират
          промените веднага, така че и там работи върху копие.
        </Callout>
      </Block>

      <Block title="Проверка, че всичко е наред">
        <ul>
          <li>Нова Cowork сесия с работната папка. Бриф: "Прочети CLAUDE.md и ми кажи с едно изречение какво ще правиш различно заради него." Ако отговорът е верен, инструкциите се четат.</li>
          <li>Малка задача: "Направи в OUTPUTS/ Excel файл с таблица на месеците на 2026 и колона с броя работни дни, с формула за сбора." Отвори файла, провери формулата.</li>
          <li>Connector: "Какво имам в календара утре?" Ако пита за разрешение, отговори Allow once и виж резултата.</li>
          <li>Settings → Usage показва колко от лимита си похарчил. Погледни го след първите задачи, за да знаеш какво струва една доставка.</li>
        </ul>
        <p>Следващото: как да дадеш на Claude постоянна памет и инструкции, за да не повтаряш едно и също, в <Link to="/memory">раздел 3</Link>.</p>
      </Block>

      <Pager current="/setup" />
    </>
  )
}
