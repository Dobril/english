import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager, Steps } from '../../../components/Bits'

export function SetupPage() {
  return (
    <>
      <PageHead
        mark="2"
        title="Install and configure"
        lede="Goal: set the environment up once and properly, so you do not answer the same permission prompts every day."
        chips={['CLI', 'IDE', 'settings.json', 'permissions', 'status line']}
      />

      <Block title="Installation and first start">
        <Code title="terminal">{`# macOS / Linux
curl -fsSL https://claude.ai/install.sh | bash

# or via npm
npm install -g @anthropic-ai/claude-code

cd ~/www/project
claude            # the first start opens account sign-in
/doctor           # checks installation and PATH
/terminal-setup   # Shift+Enter for newlines (VS Code, Cursor, Zed, Alacritty)
/statusline       # status line with model, branch and context percentage`}</Code>
        <ul>
          <li>Claude Code works in the terminal, in VS Code and JetBrains (extension), in the Desktop app, in the browser (claude.ai/code) and on the phone. The process is the same.</li>
          <li>Install <code>gh</code> (GitHub CLI) and run <code>gh auth login</code>. Without it Claude can still use the GitHub API, but unauthenticated requests hit rate limits and it cannot open PRs cleanly.</li>
        </ul>
      </Block>

      <Block title="Where settings live and which wins">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Level</th><th>File</th><th>Purpose</th><th>In git?</th></tr></thead>
            <tbody>
              <tr><td className="cat">Managed</td><td className="k">from the organization</td><td>Policies nobody can override</td><td>no</td></tr>
              <tr><td className="cat">CLI flags</td><td className="k">--model, --permission-mode</td><td>One-off for this session</td><td>no</td></tr>
              <tr><td className="cat">Local (project)</td><td className="k">.claude/settings.local.json</td><td>Your personal settings for this project</td><td>no (gitignore)</td></tr>
              <tr><td className="cat">Project</td><td className="k">.claude/settings.json</td><td>Shared with the team: allow/deny, hooks</td><td>yes</td></tr>
              <tr><td className="cat">User</td><td className="k">~/.claude/settings.json</td><td>Your defaults for all projects</td><td>no</td></tr>
            </tbody>
          </table>
        </div>
        <p className="muted small">Precedence is top to bottom: managed beats everything, user is lowest. Values merge; omitted keys are inherited.</p>
      </Block>

      <Block title="Example .claude/settings.json for a project">
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
          <li><strong>allow</strong>: what you always approve anyway. The syntax is <code>Tool(pattern *)</code>.</li>
          <li><strong>deny</strong>: the irreversible things and the secrets. Deny wins over allow.</li>
          <li>The hook above formats every edited file. Details in <Link to="/hooks">Hooks</Link>.</li>
          <li><Cmd>/fewer-permission-prompts</Cmd> scans your history and proposes an allow list automatically. <Cmd>/update-config</Cmd> edits the file from your description.</li>
        </ul>
        <Callout kind="warn">
          Do not use <code>--dangerously-skip-permissions</code> on your machine. Same effect without the risk: a good allow list plus
          auto mode or the sandbox (<Cmd>/sandbox</Cmd>). Bypass mode is for containers and CI without access to real data.
        </Callout>
      </Block>

      <Block title="Personal settings in ~/.claude/settings.json">
        <Code title="~/.claude/settings.json">{`{
  "model": "opus",
  "permissions": {
    "allow": ["Read", "Grep", "Glob", "Bash(ls *)", "Bash(cat *)", "Bash(pwd)"]
  },
  "env": {
    "DISABLE_AUTOUPDATER": "0"
  }
}`}</Code>
        <p>This holds what you want in every project: model, theme, the read-only commands, personal hooks (for example a system notification when Claude is waiting for an answer).</p>
      </Block>

      <Block title="Useful CLI flags">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Flag</th><th>What it does</th><th>When</th></tr></thead>
            <tbody>
              <tr><td className="k">claude -c</td><td>Continues the last session</td><td>Coming back after a break</td></tr>
              <tr><td className="k">claude -r [name]</td><td>Resume by name or from a list</td><td>Several tasks in flight</td></tr>
              <tr><td className="k">claude --permission-mode plan</td><td>Starts in plan mode</td><td>New task, unfamiliar code</td></tr>
              <tr><td className="k">claude -w [name]</td><td>New git worktree and branch for the session</td><td>Parallel tasks in one repo</td></tr>
              <tr><td className="k">claude --model opus</td><td>Model for this session</td><td>Hard task</td></tr>
              <tr><td className="k">claude -p "..."</td><td>Headless: one prompt, one answer, exit</td><td>Scripts, CI, pipes</td></tr>
              <tr><td className="k">claude --add-dir ../shared</td><td>One more directory</td><td>Monorepo</td></tr>
              <tr><td className="k">claude -n "name"</td><td>Session name from the start</td><td>Always</td></tr>
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="Order of setting up a new project">
        <Steps items={[
          { title: 'Open Claude in the repo root and run /init', body: 'You get a starter CLAUDE.md. Do not accept it as final yet.' },
          { title: 'Trim CLAUDE.md', body: <>Keep only commands, style that differs from the default, git rules and traps. Under 200 lines. See <Link to="/claude-md">section 3</Link>.</> },
          { title: 'Run one small task in Manual mode', body: 'Note which commands you approve. Put them in allow. Put the dangerous ones in deny.' },
          { title: 'Add hooks for formatting and tests', body: 'PostToolUse for prettier/eslint. Optionally a Stop hook that runs the tests before Claude finishes.' },
          { title: 'Connect Linear and GitHub', body: <><code>claude mcp add --transport http linear-server https://mcp.linear.app/mcp</code>, then <Cmd>/mcp</Cmd> to sign in. <code>gh auth login</code> for GitHub. Optionally <Cmd>/install-github-app</Cmd> for @claude in PRs.</> },
          { title: 'Commit .claude/settings.json and CLAUDE.md', body: 'The team uses the same rules. settings.local.json and CLAUDE.local.md stay personal.' },
        ]} />
      </Block>

      <Pager current="/setup" />
    </>
  )
}
