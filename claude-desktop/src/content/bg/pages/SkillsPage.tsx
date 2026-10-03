import { Link } from '../../../components/Link'
import { Block, Brief, Callout, Code, Feat, PageHead, Pager, Steps } from '../../../components/Bits'

export function SkillsPage() {
  return (
    <>
      <PageHead
        mark="12"
        title="Skills и plugins"
        lede="Цел: процесите, които повтаряш, да са записани веднъж и да се изпълняват еднакво всеки път, в Chat, в Cowork и в Excel, Word и PowerPoint."
        chips={['SKILL.md', 'Customize > Skills', '/име', 'zip', 'plugins']}
      />

      <Block title="Какво е skill">
        <p>
          Папка с файл <code>SKILL.md</code>: инструкции и знание, което Claude зарежда само когато задачата му отговаря. В началото на
          разговора Claude вижда само името и едноредовото описание на всеки skill. Когато заявката ти съвпадне с описанието, чете целия
          файл. Ако skill-ът сочи към допълнителни файлове, отваря ги чак когато стъпката ги иска. Можеш и сам да го извикаш: напиши
          <code>/</code> в полето за писане и избери skill-а.
        </p>
        <ul>
          <li><strong>Вградени от Anthropic</strong>: docx, xlsx, pptx, pdf. Създават Word, Excel, PowerPoint и PDF файлове и се включват сами, когато поискаш такъв файл.</li>
          <li><strong>Партньорски</strong>: от компании с connectors, учат Claude как се ползва техният продукт.</li>
          <li><strong>От организацията</strong>: Owner в Team или Enterprise ги разпространява за всички.</li>
          <li><strong>Твои</strong>: месечен отчет, протокол от среща, брандови правила за презентации. Това е разделът за тях.</li>
          <li>Изискване: платен план и Settings &gt; Capabilities &gt; Code execution and file creation включено. Skills се изпълняват в sandbox-а за код.</li>
        </ul>
      </Block>

      <Block title="Формат">
        <Code title="monthly-report/SKILL.md">{`---
name: monthly-report
description: Build the monthly operations report (xlsx + one-page docx summary) from the exports in the Reports/<month> folder. Use when asked for the monthly report, month-end report, or ops report.
---

# Monthly operations report

## Inputs
- Reports/<month>/sales-export.csv (source of truth for revenue)
- Reports/<month>/support-tickets.xlsx
- Reports/<month>/notes.md (commentary from team leads, may be missing)

## Steps
1. Read all inputs. If a file is missing, stop and ask; do not estimate.
2. Build <month>-ops-report.xlsx with sheets: Summary, Revenue, Support, Checks.
   Every number in Summary is a formula pointing to Revenue or Support.
3. Revenue: by product and by country, current month vs previous month vs same month last year. Currency EUR, net of VAT.
4. Support: ticket volume, median first response time, top 5 categories.
5. Checks sheet: totals reconcile to the exports, row counts in and out, list of anything marked VERIFY.
6. Write <month>-ops-summary.docx: one page, template in assets/summary-template.docx. Three headline numbers, three risks, next steps.

## Rules
- Never overwrite last month's files. New files only.
- Mark any number you cannot trace to an input with VERIFY.
- File names: YYYY-MM-ops-report.xlsx and YYYY-MM-ops-summary.docx.`}</Code>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Част</th><th>За какво</th></tr></thead>
            <tbody>
              <tr><td className="k">name</td><td>Малки букви, цифри и тирета, до 64 знака. Трябва да е същото като името на папката.</td></tr>
              <tr><td className="k">description</td><td>Какво прави и кога се ползва, до 1024 знака. Единственото, което Claude чете, преди да реши дали да зареди skill-а. Сложи думите, с които би поискал задачата.</td></tr>
              <tr><td className="k">тялото</td><td>Инструкциите: стъпки, примери за вход и изход, шаблони, крайни случаи. Под 500 реда. Дългото отива в отделни файлове.</td></tr>
              <tr><td className="k">references/</td><td>Документация, която Claude чете само когато стъпка я поиска. Спомени файла в стъпката.</td></tr>
              <tr><td className="k">assets/</td><td>Шаблони, лога, таблици за справка. Неща, които Claude копира или попълва, не чете за напътствие.</td></tr>
              <tr><td className="k">scripts/</td><td>Код, който се пуска по време на skill-а. Рядко нужен за административна работа.</td></tr>
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="Създаване и качване">
        <Steps items={[
          { title: 'Напиши го или го поискай', body: <p>Най-бързо: включи skill-а skill-creator от Anthropic (Customize &gt; Skills &gt; Discover) и кажи "направи ми skill за месечния отчет, ето как го правя". Редактираш резултата. Или пишеш SKILL.md сам по формата горе.</p> },
          { title: 'Папка с име на skill-а', body: <p><code>monthly-report/SKILL.md</code>, плюс assets и references, ако има. Името на папката е равно на name във frontmatter-а.</p> },
          { title: 'Zip на папката, не на съдържанието', body: <p>Архивът трябва да съдържа папката на първо ниво: <code>monthly-report.zip</code> → <code>monthly-report/SKILL.md</code>. SKILL.md директно в корена на zip-а не се разпознава.</p> },
          { title: 'Customize > Skills > Create skill', body: <p>Качи zip-а. Skill-ът се появява в Your skills под Created by you. Включи го с превключвателя.</p> },
          { title: 'Тествай', body: <p>Напиши три заявки, които трябва да го задействат, и една, която не трябва. Виж в разсъжденията дали се зарежда. Ако не: коригирай description, не тялото.</p> },
        ]} />
        <Callout kind="tip" title="В Cowork: първо свърши работата, после я запиши">
          Направи задачата веднъж в Cowork. Давай обратна връзка, докато резултатът е точно какъвто го искаш. После: "Създай skill, който улавя точно
          този работен процес: входовете, стъпките, проверките, имената на файловете." Получаваш SKILL.md, написан от работещия пример, не от
          въображението.
        </Callout>
      </Block>

      <Block title="Skills, които си струва да имаш">
        <div className="grid-2">
          <div className="panel">
            <h3>brand-guidelines</h3>
            <p>Цветове, шрифтове, правила за логото, структура на слайд. Активира се сам при всяка презентация и документ за навън. Шаблонът в assets/.</p>
          </div>
          <div className="panel">
            <h3>monthly-report</h3>
            <p>Примерът горе. Входове, листове, формули, проверки, имена на файлове. Пуска се с /monthly-report или става <Link to="/scheduled">планирана задача</Link>.</p>
          </div>
          <div className="panel">
            <h3>meeting-minutes</h3>
            <p>От транскрипт или бележки към протокол: решения, отговорници, срокове, отворени въпроси. Един и същи формат всеки път, за да може да се търси.</p>
          </div>
          <div className="panel">
            <h3>expense-report</h3>
            <p>Колони, категории, правило VERIFY за неясни суми, валута, ред с общ сбор. От снимки на касови бележки до xlsx.</p>
          </div>
          <div className="panel">
            <h3>client-email</h3>
            <p>Тонът към клиенти, задължителни елементи (тема, обръщение, следваща стъпка, подпис), какво никога не се пише. Чернова, не изпращане.</p>
          </div>
          <div className="panel">
            <h3>data-cleaning</h3>
            <p>Как се чисти експорт преди анализ: дати, дубликати, празни клетки, единици. Листът Raw остава непипнат, работи се върху Clean.</p>
          </div>
        </div>
      </Block>

      <Block title="Skill, проект, инструкции или connector">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Инструмент</th><th>Какво е</th><th>Кога се зарежда</th><th>Пример</th></tr></thead>
            <tbody>
              <tr><td className="cat">Skill</td><td>Повтаряема процедура</td><td>Когато задачата съвпадне с описанието или при /име</td><td>Как се прави месечният отчет</td></tr>
              <tr><td className="cat"><Feat>Projects</Feat></td><td>Фоново знание за една област</td><td>Винаги, във всеки разговор в проекта</td><td>Договорите и историята на един клиент</td></tr>
              <tr><td className="cat">Инструкции</td><td>Предпочитания за всичко</td><td>Винаги, във всеки разговор</td><td>"Пиши кратко, на български, без удивителни"</td></tr>
              <tr><td className="cat"><Feat>Connectors</Feat></td><td>Живи данни от система</td><td>Когато е включен в разговора</td><td>Днешните имейли, записите в CRM</td></tr>
            </tbody>
          </table>
        </div>
        <p className="muted small">Skill-ът може да казва как да се ползва connector ("новите задачи отиват в проект X с етикет Y"), но не може сам да стигне до системата. Подробно за проекти и инструкции в <Link to="/memory">раздел 3</Link>.</p>
      </Block>

      <Block title="Plugins">
        <p>
          Plugin е пакет: skills, connectors, специализирани агенти, понякога команди и hooks, инсталирани наведнъж. Инсталираш го от
          Customize &gt; Plugins. Табът Discover показва официалния каталог на Anthropic. Можеш да добавиш друг marketplace по адрес
          на GitHub репо (<code>owner/repo</code>) или да качиш пакет от файл.
        </p>
        <ul>
          <li>Инсталирането не те вписва в connector-ите на plugin-а. Отвори таба Connectors на plugin-а и свържи всеки отделно.</li>
          <li>Disable plugin спира всичко в него наведнъж. Skills от plugin се виждат в Your skills с името на plugin-а.</li>
          <li>Организацията може да направи plugin задължителен. Тогава пише "required by your organization" и не може да се махне.</li>
          <li>Готови пакети по роля: Legal, Small Business, Marketing Ops, Financial Services, HR и други. Добро начало, преди да пишеш свои.</li>
          <li>Веднъж инсталиран, plugin-ът е на акаунта ти: ползва се в Chat, Cowork, Claude Code и в add-in-ите за Excel, Word и PowerPoint.</li>
        </ul>
        <Callout kind="warn">
          Skill и plugin от чужд източник са инструкции, които се изпълняват с твоите права и твоите connectors. Качените от теб и споделените с
          теб не са прегледани от Anthropic. Отвори SKILL.md и го прочети, преди да го включиш. Никога не слагай пароли и ключове в skill:
          всеки, с когото го споделиш, получава файловете.
        </Callout>
      </Block>

      <Block title="Поддръжка">
        <ul>
          <li>Skill, който не се задейства: описанието е твърде общо или не съдържа думите, с които питаш. Пренапиши го с тях.</li>
          <li>Skill, който се задейства, когато не трябва: описанието е твърде широко. Стесни го, добави "Do not use for ...".</li>
          <li>Един skill, една задача. Няколко малки се комбинират по-добре от един голям; Claude може да ползва повече от един в разговор.</li>
          <li>След всяка промяна: една реална заявка, не само четене. Ако резултатът се е влошил, върни предишната версия.</li>
          <li>Share и Publish to org (Team и Enterprise) от страницата на skill-а, както при plugin.</li>
        </ul>
        <Brief title="Поискай преглед на skill-а">{`Прочети SKILL.md на monthly-report и ми кажи: кои стъпки са двусмислени, кои входове не са описани достатъчно, къде може да сгрешиш, ако нещо липсва в папката. Предложи редакции, без да ги прилагаш.`}</Brief>
      </Block>

      <Pager current="/skills" />
    </>
  )
}
