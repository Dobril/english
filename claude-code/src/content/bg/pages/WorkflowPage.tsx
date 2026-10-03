import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager, Steps } from '../../../components/Bits'

export function WorkflowPage() {
  return (
    <>
      <PageHead
        mark="4"
        title="Работен процес по задача"
        lede="Цел: един и същ, повтаряем път от задача в Linear до мърджнат PR, с ясно кой какво прави на всяка стъпка."
        chips={['Explore → Plan → Code → Commit', 'plan mode', 'проверка', 'PR', 'Linear']}
      />

      <Block title="Процесът с един поглед">
        <div className="flow">
          <div className="flow-step"><div className="n">0</div><div className="t">Избор</div><div className="d">AI-ready задача, една сесия</div></div>
          <div className="flow-step"><div className="n">1</div><div className="t">Изследване</div><div className="d">plan mode, Claude чете</div></div>
          <div className="flow-step"><div className="n">2</div><div className="t">План</div><div className="d">ти четеш и коригираш</div></div>
          <div className="flow-step"><div className="n">3</div><div className="t">Изпълнение</div><div className="d">код + тестове + проверка</div></div>
          <div className="flow-step"><div className="n">4</div><div className="t">Самопреглед</div><div className="d">/diff, /code-review, /simplify</div></div>
          <div className="flow-step"><div className="n">5</div><div className="t">Commit и PR</div><div className="d">Claude през gh</div></div>
          <div className="flow-step"><div className="n">6</div><div className="t">Преглед и merge</div><div className="d">ти, след зелен CI</div></div>
          <div className="flow-step"><div className="n">7</div><div className="t">Затваряне</div><div className="d">Linear, CLAUDE.md</div></div>
        </div>
        <p className="muted small">Това е официалният "Explore, plan, code, commit" с добавени стъпките за Linear, самопреглед и merge.</p>
      </Block>

      <Block title="Стъпка по стъпка">
        <Steps items={[
          {
            title: 'Избери задачата и отвори чиста сесия',
            body: (
              <>
                <ul>
                  <li>Задачата е AI-ready: малък обхват, ясни критерии, едно репо (<Link to="/linear">раздел 5</Link>). Ако не е, първо я разбий на под-задачи.</li>
                  <li>Нова сесия: <Cmd>/clear</Cmd> или нов терминал. Ако работиш по няколко задачи паралелно, <code>claude -w KAB-123</code> ти дава отделен worktree и branch.</li>
                  <li>Дай име: <code>/rename KAB-123-retry-webhook</code>.</li>
                </ul>
              </>
            ),
          },
          {
            title: 'Изследване в plan mode',
            body: (
              <>
                <p>Shift+Tab до "⏸ plan mode on" или <code>claude --permission-mode plan</code>. Claude само чете.</p>
                <Code title="промпт">{`Вземи задача KAB-123 от Linear и я прочети внимателно.
Разгледай @src/payments/webhook.ts и как сега обработваме timeout.
Виж също как е направен retry в @src/jobs/retry.ts, за да следваме същия подход.
Не променяй нищо още. Кажи ми какво разбра и къде виждаш рискове.`}</Code>
                <p>За непознат код първо задай въпросите, които би задал на колега: "Как работи логването тук?", "Откъде минава auth?".</p>
              </>
            ),
          },
          {
            title: 'План, който ти четеш и поправяш',
            body: (
              <>
                <Code title="промпт">{`Направи план за имплементация: кои файлове се променят и защо,
какви тестове ще добавиш, какво НЕ влиза в обхвата.
Критерии за готово от задачата: [копирай ги от Linear].`}</Code>
                <ul>
                  <li>Ctrl+G отваря плана в редактора. Махни излишното, добави ограниченията, които Claude е пропуснал.</li>
                  <li>Не одобрявай план, който не разбираш. Питай "защо тук, а не в X".</li>
                  <li>За големи функционалности: нека Claude те интервюира и запише спецификация в SPEC.md, после нова сесия за изпълнение (<Link to="/prompts">раздел 6</Link>).</li>
                </ul>
                <Callout kind="tip">
                  Планът е излишен за дребни неща: typo, лог ред, преименуване. Ако можеш да опишеш diff-а в едно изречение, кажи го директно.
                </Callout>
              </>
            ),
          },
          {
            title: 'Изпълнение с вградена проверка',
            body: (
              <>
                <p>Одобри плана (излизаш от plan mode) и дай промпт, който включва проверката:</p>
                <Code title="промпт">{`Имплементирай плана. Напиши тестове за retry при timeout (3 опита, експоненциално изчакване,
след третия неуспех записваме в dead-letter таблицата). Пусни npm test -- src/payments и
npm run typecheck и поправи всичко, докато не минат. Покажи ми изхода от тестовете.`}</Code>
                <ul>
                  <li>Гледаш първите стъпки. Ако тръгне накриво: Esc, пренасочваш. Esc Esc връща към checkpoint.</li>
                  <li>Ако ще се отдалечиш: <code>/goal тестовете в src/payments минават и lint е чист</code>. Оценител проверява след всеки ход.</li>
                  <li>За UI промени: "направи скрийншот и го сравни с дизайна" (Chrome интеграция или <Cmd>/verify</Cmd>).</li>
                </ul>
              </>
            ),
          },
          {
            title: 'Самопреглед преди commit',
            body: (
              <>
                <ol>
                  <li><Cmd>/diff</Cmd>: четеш всяка промяна. Нищо извън обхвата на задачата.</li>
                  <li><Cmd>/code-review</Cmd>: преглед за бъгове в чист контекст. Поправи реалните находки, не всички.</li>
                  <li><Cmd>/simplify</Cmd>: преизползване и опростяване, когато тестовете вече минават.</li>
                  <li><Cmd>/security-review</Cmd>: при auth, плащания, входни данни, файлове, команди.</li>
                  <li>Всичко това подробно в <Link to="/verify">Проверка след задачата</Link>.</li>
                </ol>
              </>
            ),
          },
          {
            title: 'Commit и PR от Claude',
            body: (
              <>
                <Code title="промпт">{`Комитни с описателно съобщение (императив, с "защо" в тялото) и отвори PR към main през gh.
В описанието: какво и защо, как е тествано, линк към KAB-123. Не мърджвай.`}</Code>
                <ul>
                  <li>Claude пише добри commit съобщения, защото вижда целия diff и разговора. Ти проверяваш, че branch-ът е правилен.</li>
                  <li>Ако имаш <Cmd>/install-github-app</Cmd>, можеш да тагнеш @claude в PR-а за автоматичен преглед от свеж контекст.</li>
                </ul>
              </>
            ),
          },
          {
            title: 'Преглед и merge: твоята стъпка',
            body: (
              <>
                <ul>
                  <li>Чакаш зелен CI. Четеш PR-а в GitHub като PR на колега.</li>
                  <li>Коментари от ревюъри: "виж коментарите по PR #45 и ги адресирай" в същата или нова сесия.</li>
                  <li><strong>Мърджваш ти.</strong> Защо и кога има изключения: <Link to="/git">раздел 8</Link>.</li>
                </ul>
              </>
            ),
          },
          {
            title: 'Затваряне',
            body: (
              <>
                <Code title="промпт">{`Премести KAB-123 в Done и добави коментар с кратко резюме какво е направено и линк към PR-а.`}</Code>
                <ul>
                  <li>Ако Claude е сгрешил нещо повтарящо се по пътя: ред в CLAUDE.md сега, не "после".</li>
                  <li>Ако процесът е имал повтаряеми стъпки: направи го skill (<Link to="/skills">раздел 11</Link>), например <code>/task KAB-124</code>.</li>
                </ul>
              </>
            ),
          },
        ]} />
      </Block>

      <Block title="Варианти на процеса">
        <div className="grid-2">
          <div className="panel">
            <h3>Бъг с ясна грешка</h3>
            <ol>
              <li>Без план. Промпт със симптом, грешка, вероятно място и какво е "оправено".</li>
              <li>"Първо напиши тест, който възпроизвежда бъга, после го поправи."</li>
              <li>/diff, /code-review, PR.</li>
            </ol>
          </div>
          <div className="panel">
            <h3>Test-driven</h3>
            <ol>
              <li>"Напиши тестове за X по тези критерии. Не пиши имплементация. Пусни ги, за да видим, че падат."</li>
              <li>Commit на тестовете.</li>
              <li>"Сега напиши кода, докато тестовете минат. Не променяй тестовете."</li>
            </ol>
          </div>
          <div className="panel">
            <h3>Голяма функционалност</h3>
            <ol>
              <li>Сесия 1: интервю и SPEC.md.</li>
              <li>Разбиване на под-задачи в Linear (Claude може да ги създаде).</li>
              <li>Една сесия на под-задача. Всяка минава целия процес.</li>
            </ol>
          </div>
          <div className="panel">
            <h3>Изследване и въпроси</h3>
            <ol>
              <li>Plan mode. "Как работи X? Къде се ползва Y?"</li>
              <li>За обемни търсения: "използвай subagents, за да проучиш...".</li>
              <li>Нищо не се променя. Записваш си изводите в задачата.</li>
            </ol>
          </div>
        </div>
      </Block>

      <Block title="Кога да се намесиш и кога да оставиш">
        <ul>
          <li><strong>Намеси се веднага</strong>, когато Claude тръгне да променя файл извън обхвата, инсталира библиотека, която не си поискал, или "решава" грешка, като я скрива.</li>
          <li><strong>Остави го</strong> да итерира върху тестове и компилационни грешки. Това е силата му.</li>
          <li><strong>Спри и /clear</strong> след втора корекция на едно и също. Пренапиши промпта с наученото.</li>
          <li>Не мърмори корекции в дълга сесия. Кратко, конкретно: "Не, ползвай съществуващия RetryPolicy от src/jobs. Махни новия клас."</li>
        </ul>
      </Block>
      <Pager current="/workflow" />
    </>
  )
}
