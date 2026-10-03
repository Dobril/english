import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager } from '../../../components/Bits'

export function SubagentsPage() {
  return (
    <>
      <PageHead
        mark="10"
        title="Subagents"
        lede="Цел: изследването и прегледът да стават в отделен контекст, за да не пълнят твоята сесия и да не са пристрастни."
        chips={['.claude/agents/', 'Explore', 'Plan', 'adversarial review', '/subtask']}
      />

      <Block title="Какво е subagent">
        <p>
          Отделен Claude със собствен контекстен прозорец, собствен системен промпт и собствен набор от позволени инструменти.
          Основната сесия му дава задача, той работи сам (чете десетки файлове, пуска команди) и връща само резюме. Твоят
          контекст получава едно съобщение вместо хиляди редове прочетен код.
        </p>
        <ul>
          <li><strong>Вградени</strong>: Explore (търсене в кода, само четене), Plan (архитектурен план), general-purpose (всичко).</li>
          <li><strong>Твои</strong>: markdown файлове в <code>.claude/agents/</code> (проект) или <code>~/.claude/agents/</code> (лични).</li>
          <li>Няколко subagents могат да работят паралелно.</li>
        </ul>
      </Block>

      <Block title="Кога да ги ползваш">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Ситуация</th><th>Промпт</th><th>Защо subagent</th></tr></thead>
            <tbody>
              <tr><td className="cat">Изследване на непознат код</td><td>"Използвай subagents, за да проучиш как auth системата обработва token refresh и дали имаме OAuth helper-и за преизползване."</td><td>Четенето на 40 файла не влиза в твоя контекст.</td></tr>
              <tr><td className="cat">Преглед след имплементация</td><td>"Пусни subagent да прегледа diff-а спрямо плана и да докладва пропуски."</td><td>Свеж контекст, не е пристрастен към кода, който току-що е написан.</td></tr>
              <tr><td className="cat">Паралелна работа</td><td><code>/subtask напиши тестовете за webhook модула</code></td><td>Ти продължаваш по UI-а, резултатът се връща в сесията.</td></tr>
              <tr><td className="cat">Специализирана роля</td><td>"@agent-security-reviewer провери промените в src/auth"</td><td>Собствен системен промпт и ограничени инструменти (само четене).</td></tr>
              <tr><td className="cat">Масови промени</td><td><code>/batch мигрирай всички компоненти към новия Button</code></td><td>5 до 30 subagents, всеки в собствен worktree.</td></tr>
            </tbody>
          </table>
        </div>
        <Callout kind="tip">
          Кажи го изрично. "Използвай subagent за..." гарантира делегиране. Без изрична заявка Claude сам решава и често работи в основната сесия.
        </Callout>
      </Block>

      <Block title="Формат на собствен subagent">
        <Code title=".claude/agents/security-reviewer.md">{`---
name: security-reviewer
description: Преглежда код за уязвимости. Ползвай след промени в auth, плащания, входни данни или файлови операции.
tools: Read, Grep, Glob, Bash
model: opus
---
Ти си старши инженер по сигурност. Прегледай кода за:
- инжекции (SQL, XSS, команди към ОС)
- проблеми в автентикация и оторизация
- тайни и креденшъли в кода
- несигурна обработка на данни и файлове

За всяка находка: файл, ред, защо е проблем, конкретна поправка.
Докладвай само реални проблеми, не стилови предпочитания.`}</Code>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Поле</th><th>За какво</th></tr></thead>
            <tbody>
              <tr><td className="k">name</td><td>Име за извикване (@agent-име)</td></tr>
              <tr><td className="k">description</td><td>Кога Claude да го ползва сам. Пиши го като условие: "Ползвай когато..."</td></tr>
              <tr><td className="k">tools / disallowedTools</td><td>Кои инструменти може. Ревюър без Edit не може да "поправи тихо".</td></tr>
              <tr><td className="k">model</td><td>Силен модел за преглед и архитектура, по-бърз за механични неща</td></tr>
              <tr><td className="k">permissionMode</td><td>default, acceptEdits, plan, auto</td></tr>
              <tr><td className="k">maxTurns</td><td>Лимит на ходовете</td></tr>
              <tr><td className="k">skills</td><td>Skills, които да зареди предварително</td></tr>
              <tr><td className="k">isolation: worktree</td><td>Работи в собствен git worktree</td></tr>
              <tr><td className="k">memory</td><td>Собствена памет между сесиите (user, project, local)</td></tr>
            </tbody>
          </table>
        </div>
        <p>Можеш и да го стартираш като основна сесия: <code>claude --agent security-reviewer</code>.</p>
      </Block>

      <Block title="Полезни subagents за твоя процес">
        <ul>
          <li><strong>explorer</strong> (само четене): "намери всички места, където се ползва X, и обобщи как". Пази контекста.</li>
          <li><strong>reviewer</strong> (само четене): преглед спрямо план и критерии. Докладва пропуски.</li>
          <li><strong>test-writer</strong> (Read, Edit, Bash с тестовете): пише тестове по критерии, без да пипа имплементацията.</li>
          <li><strong>simplifier</strong>: вграденият <Cmd>/simplify</Cmd> вече прави това с четири паралелни агента.</li>
          <li><strong>linear-sync</strong> (MCP Linear): обновява статус и коментари, без да влиза в кода.</li>
        </ul>
      </Block>

      <Block title="Ограничения и капани">
        <ul>
          <li>Subagent-ът не вижда разговора ти (освен ако не е fork чрез <Cmd>/subtask</Cmd>). Дай му целия нужен контекст в задачата: файлове, критерии, какво е "готово".</li>
          <li>Връща резюме. Ако трябват детайли, поискай ги в задачата ("върни списък с файл:ред за всяка находка").</li>
          <li>Всеки subagent струва токени. Пет паралелни агента за дребна задача е разхищение.</li>
          <li>Hooks и разрешения важат и за subagents. Ревюър с deny за Edit наистина не може да редактира.</li>
          <li>Следи ги с <Cmd>/tasks</Cmd>. Ctrl+X Ctrl+K спира всички фонови subagents.</li>
        </ul>
        <p>Как се комбинират със skills и hooks: <Link to="/skills">раздел 11</Link>. Официална таблица кога кое разширение: <a href="https://code.claude.com/docs/en/features-overview" target="_blank" rel="noreferrer">Extend Claude Code</a>.</p>
      </Block>

      <Pager current="/subagents" />
    </>
  )
}
