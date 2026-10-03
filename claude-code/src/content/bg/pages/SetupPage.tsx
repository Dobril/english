import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager, Steps } from '../../../components/Bits'

export function SetupPage() {
  return (
    <>
      <PageHead
        mark="2"
        title="Инсталация и настройка"
        lede="Цел: средата да е настроена веднъж и правилно, за да не отговаряш на едни и същи въпроси за разрешение всеки ден."
        chips={['CLI', 'IDE', 'settings.json', 'разрешения', 'status line']}
      />

      <Block title="Инсталация и първи старт">
        <Code title="терминал">{`# macOS / Linux
curl -fsSL https://claude.ai/install.sh | bash

# или през npm
npm install -g @anthropic-ai/claude-code

cd ~/www/проект
claude            # първият старт отваря вход в акаунта
/doctor           # проверка на инсталацията и PATH
/terminal-setup   # Shift+Enter за нов ред (VS Code, Cursor, Zed, Alacritty)
/statusline       # status line с модел, branch и процент контекст`}</Code>
        <ul>
          <li>Claude Code работи в терминала, във VS Code и JetBrains (разширение), в Desktop приложението, в браузъра (claude.ai/code) и на телефона. Процесът е един и същ.</li>
          <li>Инсталирай <code>gh</code> (GitHub CLI) и направи <code>gh auth login</code>. Без него Claude пак може да ползва GitHub API, но неавтентикираните заявки удрят лимити и не може да отваря PR-и чисто.</li>
        </ul>
      </Block>

      <Block title="Къде живеят настройките и кое печели">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Ниво</th><th>Файл</th><th>За какво</th><th>В git?</th></tr></thead>
            <tbody>
              <tr><td className="cat">Managed</td><td className="k">от организацията</td><td>Политики, които никой не може да override-не</td><td>не</td></tr>
              <tr><td className="cat">CLI флагове</td><td className="k">--model, --permission-mode</td><td>Еднократно за тази сесия</td><td>не</td></tr>
              <tr><td className="cat">Local (проект)</td><td className="k">.claude/settings.local.json</td><td>Твоите лични настройки за този проект</td><td>не (gitignore)</td></tr>
              <tr><td className="cat">Project</td><td className="k">.claude/settings.json</td><td>Споделени с екипа: allow/deny, hooks</td><td>да</td></tr>
              <tr><td className="cat">User</td><td className="k">~/.claude/settings.json</td><td>Твоите подразбирани за всички проекти</td><td>не</td></tr>
            </tbody>
          </table>
        </div>
        <p className="muted small">Редът на приоритет е отгоре надолу: managed побеждава всичко, user е най-ниско. Стойностите се сливат, пропуснатите ключове се наследяват.</p>
      </Block>

      <Block title="Примерен .claude/settings.json за проект">
        <Code title=".claude/settings.json">{`{
  "permissions": {
    "allow": [
      "Bash(npm test *)",
      "Bash(npm run lint *)",
      "Bash(npm run typecheck *)",
      "Bash(npm run build *)",
      "Bash(git status *)",
      "Bash(git diff *)",
      "Bash(git log *)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(gh pr view *)",
      "Bash(gh pr list *)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force *)",
      "Bash(git push -f *)",
      "Bash(git reset --hard *)",
      "Edit(.env)",
      "Edit(.env.*)",
      "Read(.env)",
      "Read(.env.*)"
    ]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "npx prettier --write \\"$CLAUDE_FILE_PATHS\\" 2>/dev/null || true" }]
      }
    ]
  }
}`}</Code>
        <ul>
          <li><strong>allow</strong>: това, което и без това винаги одобряваш. Синтаксисът е <code>Инструмент(шаблон *)</code>.</li>
          <li><strong>deny</strong>: необратимите неща и тайните. Deny печели над allow.</li>
          <li>Hook-ът по-горе форматира всеки редактиран файл. Подробно в <Link to="/hooks">Hooks</Link>.</li>
          <li><Cmd>/fewer-permission-prompts</Cmd> сканира историята ти и предлага allow списък автоматично. <Cmd>/update-config</Cmd> редактира файла по твое описание.</li>
        </ul>
        <Callout kind="warn">
          Не ползвай <code>--dangerously-skip-permissions</code> на машината си. Същият ефект без риска: добър allow списък плюс
          auto mode или sandbox (<Cmd>/sandbox</Cmd>). Bypass режимът е за контейнери и CI без достъп до реални данни.
        </Callout>
      </Block>

      <Block title="Лични настройки в ~/.claude/settings.json">
        <Code title="~/.claude/settings.json">{`{
  "model": "opus",
  "permissions": {
    "allow": ["Read", "Grep", "Glob", "Bash(ls *)", "Bash(cat *)", "Bash(pwd)"]
  },
  "env": {
    "DISABLE_AUTOUPDATER": "0"
  }
}`}</Code>
        <p>Тук стои това, което искаш във всеки проект: модел, тема, read-only командите, личните hooks (например системна нотификация, когато Claude чака отговор).</p>
      </Block>

      <Block title="Полезни CLI флагове">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Флаг</th><th>Какво прави</th><th>Кога</th></tr></thead>
            <tbody>
              <tr><td className="k">claude -c</td><td>Продължава последната сесия</td><td>Връщаш се след пауза</td></tr>
              <tr><td className="k">claude -r [име]</td><td>Resume по име или от списък</td><td>Няколко задачи в движение</td></tr>
              <tr><td className="k">claude --permission-mode plan</td><td>Стартира в plan mode</td><td>Нова задача, непознат код</td></tr>
              <tr><td className="k">claude -w [име]</td><td>Нов git worktree и branch за сесията</td><td>Паралелни задачи в едно репо</td></tr>
              <tr><td className="k">claude --model opus</td><td>Модел за тази сесия</td><td>Трудна задача</td></tr>
              <tr><td className="k">claude -p "..."</td><td>Headless: един промпт, един отговор, изход</td><td>Скриптове, CI, pipe-ове</td></tr>
              <tr><td className="k">claude --add-dir ../shared</td><td>Още една директория</td><td>Monorepo</td></tr>
              <tr><td className="k">claude -n "име"</td><td>Име на сесията от старта</td><td>Винаги</td></tr>
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="Ред на настройване на нов проект">
        <Steps items={[
          { title: 'Отвори Claude в корена на репото и пусни /init', body: 'Получаваш начален CLAUDE.md. Още не го приемай за готов.' },
          { title: 'Режи CLAUDE.md', body: <>Остави само команди, стил, който се различава от стандартния, правила за git и капани. Под 200 реда. Виж <Link to="/claude-md">раздел 3</Link>.</> },
          { title: 'Пусни една дребна задача в Manual режим', body: 'Запиши кои команди одобряваш. Сложи ги в allow. Сложи опасните в deny.' },
          { title: 'Добави hooks за форматиране и тестове', body: 'PostToolUse за prettier/eslint. По желание Stop hook, който пуска тестовете преди Claude да приключи.' },
          { title: 'Свържи Linear и GitHub', body: <><code>claude mcp add --transport http linear-server https://mcp.linear.app/mcp</code>, после <Cmd>/mcp</Cmd> за вход. <code>gh auth login</code> за GitHub. По желание <Cmd>/install-github-app</Cmd> за @claude в PR-и.</> },
          { title: 'Commit-ни .claude/settings.json и CLAUDE.md', body: 'Екипът ползва същите правила. settings.local.json и CLAUDE.local.md остават лични.' },
        ]} />
      </Block>
      <Pager current="/setup" />
    </>
  )
}
