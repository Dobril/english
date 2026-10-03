import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager } from '../../../components/Bits'

export function ParallelPage() {
  return (
    <>
      <PageHead
        mark="13"
        title="Паралелна и фонова работа"
        lede="Цел: когато един Claude ти е навик, да умножиш работата с няколко сесии, фонови агенти и автоматизация, без да загубиш контрол."
        chips={['worktrees', 'множество сесии', '/fork', '/subtask', 'claude -p', 'GitHub Actions', 'routines']}
      />

      <Block title="Стълбицата на автономността">
        <div className="flow">
          <div className="flow-step"><div className="n">1</div><div className="t">Една сесия</div><div className="d">гледаш и насочваш</div></div>
          <div className="flow-step"><div className="n">2</div><div className="t">Няколко сесии</div><div className="d">worktrees, терминали 1..5</div></div>
          <div className="flow-step"><div className="n">3</div><div className="t">Фонови агенти</div><div className="d">/subtask, /fork, /background</div></div>
          <div className="flow-step"><div className="n">4</div><div className="t">Без интерфейс</div><div className="d">claude -p в скриптове и CI</div></div>
          <div className="flow-step"><div className="n">5</div><div className="t">По разписание</div><div className="d">routines, @claude в PR</div></div>
        </div>
        <p className="muted small">Всяко стъпало изисква повече проверка, вградена в задачата (/goal, Stop hooks, тестове), защото гледаш по-малко.</p>
      </Block>

      <Block title="Няколко сесии с worktrees">
        <Code title="терминал">{`# терминал 1
claude -w KAB-123 -n "KAB-123 retry"
# терминал 2
claude -w KAB-130 -n "KAB-130 settings UI"
# терминал 3: само въпроси и преглед, без worktree
claude --permission-mode plan`}</Code>
        <ul>
          <li>Всяка сесия е в собствена копия на репото (<code>.claude/worktrees/име</code>) и собствен branch. Редакциите не се бият.</li>
          <li>Boris Cherny работи с 5 номерирани терминала и системни нотификации, когато някой Claude чака вход. Notification hook в <Link to="/hooks">раздел 9</Link>.</li>
          <li><code>.worktreeinclude</code> копира .env и други gitignored файлове във всяко ново worktree.</li>
          <li>Desktop приложението показва сесиите визуално, всяка в свое worktree по избор.</li>
        </ul>
        <Callout kind="tip" title="Writer / Reviewer">
          Сесия A пише. Сесия B (чист контекст) преглежда: "Прегледай rate limiter-а в @src/middleware/rateLimiter.ts за крайни
          случаи, race conditions и съответствие с другите middleware-и." Връщаш находките в A. Същото с тестове: едната пише тестове, другата код.
        </Callout>
      </Block>

      <Block title="Фонова работа в същата сесия">
        <ul>
          <li><Cmd>/subtask</Cmd>: subagent, който наследява целия разговор и работи по задача, докато ти продължаваш. Резултатът се връща тук.</li>
          <li><Cmd>/fork</Cmd>: копие на разговора в нова фонова сесия, за да пробваш алтернатива.</li>
          <li><Cmd>/background</Cmd>: откача текущата сесия като фонов агент и освобождава терминала. Следиш с <code>claude agents</code>.</li>
          <li>Ctrl+B праща Bash команда (dev сървър, дълги тестове) на заден фон. <Cmd>/tasks</Cmd> показва всичко фоново.</li>
          <li>Сесиите могат да си пращат съобщения (<Cmd>/list-agents</Cmd>, @име на сесия). Полезно за "кажи на сесия 2, че промених API-то".</li>
        </ul>
      </Block>

      <Block title="Headless: claude -p">
        <Code title="терминал">{`# един въпрос, един отговор
claude -p "Обясни какво прави този проект"

# структуриран изход за скриптове
claude -p "Изброй всички API endpoint-и" --output-format json | jq '.result'

# pipe
cat error.log | claude -p "обясни грешката и предложи поправка"

# с ограничени инструменти и без въпроси
claude -p "Поправи всички lint грешки" --allowedTools "Edit,Bash(npm run lint *)" --permission-mode auto

# fan-out през списък файлове
for f in $(cat files.txt); do
  claude -p "Мигрирай $f към новия Button компонент. Върни OK или FAIL." \\
    --allowedTools "Edit,Bash(git commit *)" --max-turns 15
done`}</Code>
        <ul>
          <li><code>--output-format json</code> връща обект с <code>result</code> и цена; <code>stream-json</code> дава ред по ред.</li>
          <li><code>--max-turns</code> и <code>--max-budget-usd</code> ограничават щетите при зацикляне.</li>
          <li><code>--bare</code> пропуска hooks, skills, MCP и CLAUDE.md: за чисти CI изпълнения.</li>
          <li>Пробвай на 2 до 3 файла, оправи промпта, после пусни на всички. <Cmd>/batch</Cmd> прави същото с worktrees и план.</li>
        </ul>
      </Block>

      <Block title="GitHub Actions и @claude">
        <ul>
          <li><Cmd>/install-github-app</Cmd> инсталира приложението и създава workflow (anthropics/claude-code-action).</li>
          <li>В PR: "@claude прегледай за race conditions". В issue: "@claude имплементирай това". Claude отговаря с коментар или PR.</li>
          <li>Прегледът в CI е в чист контекст: не знае как е написан кодът, затова хваща друго.</li>
          <li><Cmd>/autofix-pr</Cmd>: облачна сесия следи PR-а и бута поправки при червен CI или коментари. Не мърджва.</li>
        </ul>
      </Block>

      <Block title="По разписание и от разстояние">
        <ul>
          <li><Cmd>/schedule</Cmd>: routines в облака по cron. "Всяка сутрин в 9: обобщи отворените PR-и и задачите в In Review и ми ги прати."</li>
          <li><Cmd>/loop 10m ...</Cmd>: повтаря промпт, докато сесията е отворена. "Провери дали CI на PR #45 е минал."</li>
          <li><Cmd>/remote-control</Cmd>: управляваш локалната сесия от claude.ai или телефона. <Cmd>/teleport</Cmd> дърпа облачна сесия локално.</li>
          <li>Claude Code в облака (claude.ai/code): сесии на инфраструктура на Anthropic, с твоето репо.</li>
        </ul>
      </Block>

      <Block title="Правила за безопасно мащабиране">
        <ol>
          <li>Колкото по-малко гледаш, толкова по-строга проверка в задачата: тестове, <Cmd>/goal</Cmd>, Stop hook.</li>
          <li>Ограничени инструменти при headless (<code>--allowedTools</code>). Никога bypass с достъп до реални данни.</li>
          <li>Фоновите агенти не мърджват. Отварят PR-и.</li>
          <li>Бюджет: <Cmd>/usage</Cmd> редовно; <code>--max-budget-usd</code> в скриптове.</li>
          <li>Един човек преглежда всеки PR, независимо колко агента са го писали.</li>
        </ol>
      </Block>

      <Pager current="/parallel" />
    </>
  )
}
