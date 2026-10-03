import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager } from '../../../components/Bits'

export function McpPage() {
  return (
    <>
      <PageHead
        mark="12"
        title="MCP servers"
        lede="Goal: Claude works directly with Linear, GitHub, the database and the browser, without you copying data back and forth."
        chips={['claude mcp add', 'Linear', 'GitHub', 'Playwright/Chrome', '.mcp.json', 'security']}
      />

      <Block title="What MCP is">
        <p>
          Model Context Protocol is an open standard through which external systems give Claude tools: "list_issues",
          "create_comment", "query_database", "click". Claude calls them like its built-in tools. The server can be remote (HTTP,
          with OAuth) or a local process (stdio) on your machine.
        </p>
      </Block>

      <Block title="Adding servers">
        <Code title="terminal">{`# Linear (remote, OAuth)
claude mcp add --transport http linear-server https://mcp.linear.app/mcp

# GitHub (remote, with a token)
claude mcp add --transport http github https://api.githubcopilot.com/mcp/ \\
  --header "Authorization: Bearer $GITHUB_PAT"

# Playwright (local, a browser for tests)
claude mcp add --transport stdio playwright -- npx -y @playwright/mcp@latest

# Postgres (local, with an env variable)
claude mcp add --transport stdio db --env DSN=postgresql://user:pass@localhost:5432/app \\
  -- npx -y @bytebase/dbhub

# management
claude mcp list
claude mcp get linear-server
claude mcp remove playwright
claude mcp login linear-server     # or /mcp in a session`}</Code>
        <p>After adding an OAuth server: <Cmd>/mcp</Cmd>, pick the server, Authenticate, the browser opens.</p>
      </Block>

      <Block title="Scopes: who sees the configuration">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Scope</th><th>Command</th><th>File</th><th>Who</th></tr></thead>
            <tbody>
              <tr><td className="cat">local (default)</td><td className="k">claude mcp add ...</td><td className="k">~/.claude.json</td><td>Only you, only this project</td></tr>
              <tr><td className="cat">project</td><td className="k">--scope project</td><td className="k">.mcp.json in the repo</td><td>The whole team (in git)</td></tr>
              <tr><td className="cat">user</td><td className="k">--scope user</td><td className="k">~/.claude.json</td><td>You, in all projects</td></tr>
            </tbody>
          </table>
        </div>
        <Code title=".mcp.json (for the team)">{`{
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
        <p className="muted small">Secrets come in through env variables (<code>$&#123;VAR&#125;</code>), not git. Connectors from claude.ai appear automatically in the CLI too.</p>
      </Block>

      <Block title="Which servers are worth it">
        <ul>
          <li><strong>Linear</strong>: issues, comments, statuses. The basis of the process in <Link to="/linear">section 5</Link>.</li>
          <li><strong>GitHub</strong>: if the <code>gh</code> CLI is not enough (e.g. reading review threads). Otherwise gh is cheaper in context.</li>
          <li><strong>Chrome / Playwright</strong>: Claude tests the UI in a real browser, takes screenshots, reads the console. The biggest jump in UI work quality.</li>
          <li><strong>Database (read-only)</strong>: "why is this query slow", "how many rows have X".</li>
          <li><strong>Sentry</strong>: from error to issue to fix without copying.</li>
          <li><strong>Figma</strong>: design to code.</li>
        </ul>
        <Callout kind="tip">
          CLI tools (gh, aws, gcloud, sentry-cli) are often more context-efficient than MCP. If there is a good CLI, tell Claude to
          use it: "Use gh for everything about the PR".
        </Callout>
      </Block>

      <Block title="Context and performance">
        <ul>
          <li>Every server adds tool names to the context at startup. Schemas load on demand (tool search), but many servers still weigh.</li>
          <li><Cmd>/context</Cmd> shows how much. Disable the ones not needed for the task via <Cmd>/mcp</Cmd> or <code>disabledMcpServers</code> in settings.</li>
          <li>Linear warns that remote connections sometimes need a retry: <code>/mcp reconnect linear-server</code>.</li>
        </ul>
      </Block>

      <Block title="Security">
        <ul>
          <li>MCP responses are data, not instructions. But a model can be misled by text in an issue, a page or a comment (prompt injection). Hence: no bypass mode when Claude reads unverified content.</li>
          <li>Read-only variants where possible: Linear has <code>https://mcp.linear.app/mcp/readonly</code>; the database with a read-only user.</li>
          <li>Servers with destructive tools (delete, merge, deploy) do not go into auto mode without deny rules for them.</li>
          <li>Boris Cherny: the MCP configuration is in git, but watched for context bloat and injection risks.</li>
        </ul>
      </Block>

      <Pager current="/mcp" />
    </>
  )
}
