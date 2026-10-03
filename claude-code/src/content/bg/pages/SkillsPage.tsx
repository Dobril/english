import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager } from '../../../components/Bits'

export function SkillsPage() {
  return (
    <>
      <PageHead
        mark="11"
        title="Skills и собствени команди"
        lede="Цел: повтарящите се процеси и специфичните знания да са на една команда, заредени само когато трябват."
        chips={['SKILL.md', '$ARGUMENTS', 'disable-model-invocation', 'plugins']}
      />

      <Block title="Какво е skill">
        <p>
          Папка с файл <code>SKILL.md</code>: инструкции и знания, които Claude зарежда при нужда (по описанието) или които ти
          извикваш директно с <code>/име</code>. За разлика от CLAUDE.md, който се зарежда винаги, skill-ът струва контекст само когато
          се ползва. Старото име ".claude/commands/" е същият механизъм; днес всичко е "skills".
        </p>
        <ul>
          <li><strong>Знания</strong>: "API конвенциите ни", "как се пишат миграции тук". Claude ги прилага сам, когато са релевантни.</li>
          <li><strong>Процеси</strong>: <code>/task KAB-123</code>, <code>/pr</code>, <code>/release</code>. Извикваш ги ти.</li>
          <li>Място: <code>.claude/skills/име/SKILL.md</code> (проект, в git) или <code>~/.claude/skills/</code> (лични).</li>
        </ul>
      </Block>

      <Block title="Формат">
        <Code title=".claude/skills/pr/SKILL.md">{`---
name: pr
description: Комитни текущата работа и отвори PR с правилното описание
disable-model-invocation: true
allowed-tools: Bash(git *) Bash(gh *)
---
## Текущо състояние
!\`git status --short\`
!\`git diff --stat\`

## Инструкции
1. Прегледай промените по-горе. Ако има файлове извън задачата, спри и ме питай.
2. Комитни с императивно съобщение и "защо" в тялото.
3. Push и gh pr create към main. Описание: Какво / Защо / Как е тествано / Linear: $ARGUMENTS.
4. Не мърджвай. Дай ми линка към PR-а.`}</Code>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Поле</th><th>За какво</th></tr></thead>
            <tbody>
              <tr><td className="k">description</td><td>Кога Claude да го ползва сам. Задължително.</td></tr>
              <tr><td className="k">disable-model-invocation: true</td><td>Само ти го извикваш с /име. За процеси със странични ефекти (commit, deploy, Linear).</td></tr>
              <tr><td className="k">user-invocable: false</td><td>Само Claude го зарежда сам. За чисто знание.</td></tr>
              <tr><td className="k">allowed-tools</td><td>Инструменти, одобрени предварително за този skill.</td></tr>
              <tr><td className="k">context: fork</td><td>Изпълнява се в отделен subagent, не в основния разговор.</td></tr>
              <tr><td className="k">paths</td><td>Зарежда се само при работа с файлове по шаблона.</td></tr>
              <tr><td className="k">model</td><td>Модел за времето на skill-а.</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li><code>$ARGUMENTS</code>: всичко след командата. <code>$0</code>, <code>$1</code>: позиционни. Във frontmatter <code>arguments: [issue, pr]</code> дава имена.</li>
          <li><code>!`команда`</code>: изпълнява се преди Claude да види skill-а и изходът влиза вътре. Така git status е винаги актуален.</li>
          <li>Веднъж зареден, skill-ът остава в контекста за цялата задача. Важното отива най-отгоре, за да оцелее компактиране.</li>
        </ul>
      </Block>

      <Block title="Skills, които си струва да имаш">
        <div className="grid-2">
          <div className="panel">
            <h3>/task &lt;linear-id&gt;</h3>
            <p>Целият процес от <Link to="/linear">раздел 5</Link>: прочети задачата, план, имплементация, проверка, PR, обнови Linear.</p>
          </div>
          <div className="panel">
            <h3>/pr</h3>
            <p>Commit и PR по правилата на екипа. Спира, ако има файлове извън задачата.</p>
          </div>
          <div className="panel">
            <h3>/fix-ci [PR]</h3>
            <p>Вземи логовете от падналия CI през gh, намери причината, поправи, push.</p>
          </div>
          <div className="panel">
            <h3>/migration &lt;описание&gt;</h3>
            <p>Знание + процес: как се прави миграция в този проект, seed, тестове, rollback.</p>
          </div>
          <div className="panel">
            <h3>/standup</h3>
            <p>Прочети какво съм правил вчера (git log, Linear) и напиши кратък standup.</p>
          </div>
          <div className="panel">
            <h3>api-conventions (без /)</h3>
            <p>Чисто знание с user-invocable: false. Claude го зарежда, когато пипа endpoint-и.</p>
          </div>
        </div>
      </Block>

      <Block title="Вградените skills, които ползваш всеки ден">
        <ul>
          <li><Cmd>/code-review</Cmd>, <Cmd>/simplify</Cmd>, <Cmd>/security-review</Cmd>: качество (<Link to="/verify">раздел 7</Link>).</li>
          <li><Cmd>/verify</Cmd>, <Cmd>/run</Cmd>: живо потвърждение. <Cmd>/run-skill-generator</Cmd> ги учи как се стартира проектът ти.</li>
          <li><Cmd>/batch</Cmd>: масови промени през паралелни subagents.</li>
          <li><Cmd>/doctor</Cmd>, <Cmd>/debug</Cmd>, <Cmd>/update-config</Cmd>, <Cmd>/fewer-permission-prompts</Cmd>: среда.</li>
          <li><Cmd>/loop</Cmd>, <Cmd>/schedule</Cmd>: повтарящи се неща.</li>
        </ul>
      </Block>

      <Block title="Plugins">
        <p>
          Plugin пакетира skills, hooks, subagents и MCP сървъри в едно и се инсталира с <Cmd>/plugin</Cmd>. Anthropic поддържа
          marketplace; екипът може да има собствен. Най-полезният за типизирани езици: code intelligence plugin, който дава на Claude
          точна навигация по символи и автоматично засичане на грешки след редакция.
        </p>
        <Callout kind="warn">
          Plugin и skill от чужд източник са код и инструкции, които се изпълняват с твоите права. Прочети ги. Hooks в plugin могат да пускат команди.
        </Callout>
      </Block>

      <Block title="Поддръжка">
        <ul>
          <li><Cmd>/skills</Cmd>: списък, колко токени струва всеки, превключване на видимостта.</li>
          <li><Cmd>/skill-doctor</Cmd>: кои не се ползват и колко контекст ядат. Изключи ги.</li>
          <li><Cmd>/reload-skills</Cmd> след промяна по SKILL.md, без рестарт.</li>
          <li>Кога skill, кога hook, кога subagent, кога MCP: skill за знание и процес; hook за "винаги и без изключение"; subagent за изолиран контекст; MCP за достъп до външна система. Официалната таблица: <a href="https://code.claude.com/docs/en/features-overview" target="_blank" rel="noreferrer">Extend Claude Code</a>.</li>
        </ul>
      </Block>

      <Pager current="/skills" />
    </>
  )
}
