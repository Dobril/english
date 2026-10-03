import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager } from '../../../components/Bits'

export function HooksPage() {
  return (
    <>
      <PageHead
        mark="9"
        title="Hooks"
        lede="Цел: нещата, които трябва да се случват винаги и без изключение, да не зависят от това дали Claude е прочел инструкцията."
        chips={['PreToolUse', 'PostToolUse', 'Stop', 'settings.json', 'детерминистично']}
      />

      <Block title="Какво е hook и кога вместо CLAUDE.md">
        <p>
          Hook е скрипт (или HTTP заявка, или промпт към модел), който Claude Code изпълнява автоматично в определен момент:
          преди инструмент, след редакция, когато Claude иска да приключи хода, при старт на сесия. Инструкцията в CLAUDE.md е
          съвет, който моделът обикновено следва. Hook-ът е гаранция.
        </p>
        <ul>
          <li>Форматиране след всяка редакция: hook.</li>
          <li>Забрана за запис в <code>migrations/</code> или <code>.env</code>: hook (или deny правило).</li>
          <li>Тестовете да минат преди Claude да каже "готово": Stop hook.</li>
          <li>Нотификация, когато Claude чака отговор: Notification hook.</li>
          <li>"Предпочитай единични тестове пред целия suite": това е съвет, остава в CLAUDE.md.</li>
        </ul>
      </Block>

      <Block title="Събитията">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Събитие</th><th>Кога</th><th>Типична употреба</th></tr></thead>
            <tbody>
              <tr><td className="k">SessionStart</td><td>Начало на сесия или resume</td><td>Зареди контекст (напр. текущия Linear цикъл), провери средата</td></tr>
              <tr><td className="k">UserPromptSubmit</td><td>Ти пращаш промпт</td><td>Добави контекст към всеки промпт, блокирай тайни в промпта</td></tr>
              <tr><td className="k">PreToolUse</td><td>Преди Claude да извика инструмент</td><td>Блокирай опасни команди или пътища, искай потвърждение</td></tr>
              <tr><td className="k">PermissionRequest</td><td>Когато действие иска одобрение</td><td>Автоматично одобри/откажи по твои правила</td></tr>
              <tr><td className="k">PostToolUse</td><td>След инструмент с резултат</td><td>Prettier, eslint --fix, typecheck след Edit/Write</td></tr>
              <tr><td className="k">Notification</td><td>Claude чака вход или е готов</td><td>Системна нотификация, звук</td></tr>
              <tr><td className="k">Stop</td><td>Claude иска да приключи хода</td><td>Пусни тестовете; при провал го върни на работа</td></tr>
              <tr><td className="k">SubagentStop</td><td>Subagent приключва</td><td>Същото за subagents</td></tr>
              <tr><td className="k">PreCompact / PostCompact</td><td>Около компактиране</td><td>Запази важното, обнови външно състояние</td></tr>
              <tr><td className="k">SessionEnd</td><td>Край на сесия</td><td>Почистване, лог, обнови Linear</td></tr>
              <tr><td className="k">Setup</td><td>Преди първия ход (init/maintenance)</td><td>Инсталирай зависимости в нова среда</td></tr>
              <tr><td className="k">WorktreeCreate / WorktreeRemove</td><td>Около worktree</td><td>Собствена логика за не-git VCS</td></tr>
            </tbody>
          </table>
        </div>
        <p className="muted small">Пълният списък с входните и изходните данни на всяко събитие е в <a href="https://code.claude.com/docs/en/hooks" target="_blank" rel="noreferrer">Hooks reference</a>.</p>
      </Block>

      <Block title="Форма на конфигурацията">
        <Code title=".claude/settings.json">{`{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/format.sh", "timeout": 30 }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/guard.sh" }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          { "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/tests-before-stop.sh", "timeout": 300 }
        ]
      }
    ],
    "Notification": [
      {
        "hooks": [
          { "type": "command", "command": "osascript -e 'display notification \\"Claude чака отговор\\" with title \\"Claude Code\\"'" }
        ]
      }
    ]
  }
}`}</Code>
        <ul>
          <li><strong>matcher</strong>: за кои инструменти (regex по име: Edit, Write, Bash, mcp__linear__*). Без matcher: за всички.</li>
          <li><strong>type</strong>: command (shell), http, prompt (оценка от модел), mcp, subagent.</li>
          <li>Скриптът получава JSON на stdin с детайлите (инструмент, вход, изход, cwd, session id). Променливи като <code>$CLAUDE_PROJECT_DIR</code> са налични.</li>
          <li>Хуковете живеят в settings.json на всяко ниво (user, project, local). Проектните са в git и важат за екипа.</li>
        </ul>
      </Block>

      <Block title="Exit кодове: как hook-ът говори с Claude">
        <ul>
          <li><strong>0</strong>: успех. stdout може да добави контекст за Claude (при някои събития).</li>
          <li><strong>2</strong>: блокиращ отказ. За PreToolUse инструментът не се изпълнява; за Stop Claude не спира. Текстът от stderr се подава на Claude като обяснение.</li>
          <li><strong>друг код</strong>: неблокираща грешка. Показва се на теб, работата продължава.</li>
        </ul>
        <Callout kind="tip">
          Не пиши hooks на ръка, ако не искаш. "Напиши hook, който пуска eslint --fix след всяка редакция" или
          "Напиши hook, който блокира записи в папка migrations" работят отлично. <Cmd>/update-config</Cmd> прави същото.
        </Callout>
      </Block>

      <Block title="Три готови примера">
        <Code title=".claude/hooks/format.sh (PostToolUse)">{`#!/usr/bin/env bash
# Форматира само файла, който Claude току-що е редактирал.
file=$(jq -r '.tool_input.file_path // empty')
[ -z "$file" ] && exit 0
case "$file" in
  *.ts|*.tsx|*.js|*.json|*.css|*.md) npx prettier --write "$file" >/dev/null 2>&1 ;;
  *.go) gofmt -w "$file" ;;
esac
exit 0`}</Code>
        <Code title=".claude/hooks/guard.sh (PreToolUse за Bash)">{`#!/usr/bin/env bash
cmd=$(jq -r '.tool_input.command // empty')
if echo "$cmd" | grep -Eq 'rm -rf|git push --force|git push -f|db:reset|DROP TABLE'; then
  echo "Командата е забранена от guard hook: $cmd" >&2
  exit 2
fi
exit 0`}</Code>
        <Code title=".claude/hooks/tests-before-stop.sh (Stop)">{`#!/usr/bin/env bash
# Пуска тестовете само ако има променени файлове. При провал връща Claude на работа.
if git diff --quiet && git diff --cached --quiet; then exit 0; fi
if ! npm test --silent 2>&1 | tail -40 > /tmp/claude-tests.log; then
  echo "Тестовете не минават. Поправи ги преди да приключиш:" >&2
  cat /tmp/claude-tests.log >&2
  exit 2
fi
exit 0`}</Code>
        <p className="muted small">Направи скриптовете изпълними: <code>chmod +x .claude/hooks/*.sh</code>. Stop hook-ът има лимит на последователни блокирания, за да не зацикли.</p>
      </Block>

      <Block title="Добри практики">
        <ul>
          <li>Hook-ът трябва да е бърз. Форматирай само редактирания файл, не целия проект. Дълги проверки отиват в Stop, не в PostToolUse.</li>
          <li>Винаги <code>exit 0</code> по подразбиране. Hook, който пада заради липсващ инструмент, дразни всеки ход.</li>
          <li>Прегледай с <Cmd>/hooks</Cmd> какво е активно и откъде идва (user, project, plugin).</li>
          <li>Хуковете от plugins и от чужди репота са код, който се изпълнява на машината ти. Чети ги преди да ги включиш.</li>
          <li>Ако CLAUDE.md има правило, което Claude спазва и без него, махни правилото или го направи hook. Виж <Link to="/claude-md">раздел 3</Link>.</li>
        </ul>
      </Block>

      <Pager current="/hooks" />
    </>
  )
}
