import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager } from '../../../components/Bits'

export function McpPage() {
  return (
    <>
      <PageHead
        mark="12"
        title="MCP сървъри"
        lede="Цел: Claude да работи директно с Linear, GitHub, базата и браузъра, без ти да копираш данни напред-назад."
        chips={['claude mcp add', 'Linear', 'GitHub', 'Playwright/Chrome', '.mcp.json', 'сигурност']}
      />

      <Block title="Какво е MCP">
        <p>
          Model Context Protocol е отворен стандарт, чрез който външни системи дават инструменти на Claude: "list_issues",
          "create_comment", "query_database", "click". Claude ги вика като вградените си инструменти. Сървърът може да е
          отдалечен (HTTP, с OAuth) или локален процес (stdio) на машината ти.
        </p>
      </Block>

      <Block title="Добавяне на сървъри">
        <Code title="терминал">{`# Linear (отдалечен, OAuth)
claude mcp add --transport http linear-server https://mcp.linear.app/mcp

# GitHub (отдалечен, с токен)
claude mcp add --transport http github https://api.githubcopilot.com/mcp/ \\
  --header "Authorization: Bearer $GITHUB_PAT"

# Playwright (локален, браузър за тестове)
claude mcp add --transport stdio playwright -- npx -y @playwright/mcp@latest

# Postgres (локален, с env променлива)
claude mcp add --transport stdio db --env DSN=postgresql://user:pass@localhost:5432/app \\
  -- npx -y @bytebase/dbhub

# управление
claude mcp list
claude mcp get linear-server
claude mcp remove playwright
claude mcp login linear-server     # или /mcp в сесия`}</Code>
        <p>След добавяне на OAuth сървър: <Cmd>/mcp</Cmd>, избираш сървъра, Authenticate, браузърът се отваря.</p>
      </Block>

      <Block title="Обхвати: кой вижда конфигурацията">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Обхват</th><th>Команда</th><th>Файл</th><th>Кой</th></tr></thead>
            <tbody>
              <tr><td className="cat">local (по подразбиране)</td><td className="k">claude mcp add ...</td><td className="k">~/.claude.json</td><td>Само ти, само този проект</td></tr>
              <tr><td className="cat">project</td><td className="k">--scope project</td><td className="k">.mcp.json в репото</td><td>Целият екип (в git)</td></tr>
              <tr><td className="cat">user</td><td className="k">--scope user</td><td className="k">~/.claude.json</td><td>Ти, във всички проекти</td></tr>
            </tbody>
          </table>
        </div>
        <Code title=".mcp.json (за екипа)">{`{
  "mcpServers": {
    "linear-server": { "type": "http", "url": "https://mcp.linear.app/mcp" },
    "playwright": { "type": "stdio", "command": "npx", "args": ["-y", "@playwright/mcp@latest"] },
    "db": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@bytebase/dbhub"],
      "env": { "DSN": "\${DATABASE_URL}" }
    }
  }
}`}</Code>
        <p className="muted small">Тайните влизат през env променливи (<code>$&#123;VAR&#125;</code>), не в git. Конекторите от claude.ai се появяват автоматично и в CLI.</p>
      </Block>

      <Block title="Кои сървъри си струват">
        <ul>
          <li><strong>Linear</strong>: задачи, коментари, статуси. Основата на процеса в <Link to="/linear">раздел 5</Link>.</li>
          <li><strong>GitHub</strong>: ако <code>gh</code> CLI не ти стига (напр. четене на review threads). Иначе gh е по-евтин откъм контекст.</li>
          <li><strong>Chrome / Playwright</strong>: Claude тества UI-а в истински браузър, прави скрийншоти, чете console. Най-големият скок в качеството на UI работа.</li>
          <li><strong>База данни (read-only)</strong>: "защо тази заявка е бавна", "колко записа имат X".</li>
          <li><strong>Sentry</strong>: от грешка до задача до поправка без копиране.</li>
          <li><strong>Figma</strong>: дизайн към код.</li>
        </ul>
        <Callout kind="tip">
          CLI инструментите (gh, aws, gcloud, sentry-cli) често са по-ефективни откъм контекст от MCP. Ако има добър CLI, кажи на
          Claude да го ползва: "Използвай gh за всичко по PR-а".
        </Callout>
      </Block>

      <Block title="Контекст и производителност">
        <ul>
          <li>Всеки сървър добавя имена на инструменти в контекста при старт. Схемите се зареждат при нужда (tool search), но много сървъри пак тежат.</li>
          <li><Cmd>/context</Cmd> показва колко. Изключвай ненужните за задачата през <Cmd>/mcp</Cmd> или <code>disabledMcpServers</code> в settings.</li>
          <li>Linear предупреждава, че отдалечените връзки понякога искат повторен опит: <code>/mcp reconnect linear-server</code>.</li>
        </ul>
      </Block>

      <Block title="Сигурност">
        <ul>
          <li>MCP отговорите са данни, не инструкции. Но модел може да бъде подведен от текст в задача, страница или коментар (prompt injection). Затова: без bypass режим, когато Claude чете непроверено съдържание.</li>
          <li>Read-only варианти, където е възможно: Linear има <code>https://mcp.linear.app/mcp/readonly</code>; базата с read-only потребител.</li>
          <li>Сървърите с деструктивни инструменти (delete, merge, deploy) не влизат в auto mode без deny правила за тях.</li>
          <li>Boris Cherny: MCP конфигурацията е в git, но се следи за раздуване на контекста и за injection рискове.</li>
        </ul>
      </Block>

      <Pager current="/mcp" />
    </>
  )
}
