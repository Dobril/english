import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager } from '../../../components/Bits'

export function HooksPage() {
  return (
    <>
      <PageHead
        mark="9"
        title="Hooks"
        lede="Goal: the things that must happen always and without exception should not depend on whether Claude read the instruction."
        chips={['PreToolUse', 'PostToolUse', 'Stop', 'settings.json', 'deterministic']}
      />

      <Block title="What a hook is and when to use it instead of CLAUDE.md">
        <p>
          A hook is a script (or an HTTP request, or a prompt to a model) that Claude Code runs automatically at a given moment:
          before a tool, after an edit, when Claude wants to end the turn, at session start. An instruction in CLAUDE.md is advice
          the model usually follows. A hook is a guarantee.
        </p>
        <ul>
          <li>Formatting after every edit: hook.</li>
          <li>A ban on writing to <code>migrations/</code> or <code>.env</code>: hook (or a deny rule).</li>
          <li>Tests must pass before Claude says "done": Stop hook.</li>
          <li>A notification when Claude is waiting for an answer: Notification hook.</li>
          <li>"Prefer single tests over the whole suite": that is advice, it stays in CLAUDE.md.</li>
        </ul>
      </Block>

      <Block title="The events">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Event</th><th>When</th><th>Typical use</th></tr></thead>
            <tbody>
              <tr><td className="k">SessionStart</td><td>Session start or resume</td><td>Load context (e.g. the current Linear cycle), check the environment</td></tr>
              <tr><td className="k">UserPromptSubmit</td><td>You send a prompt</td><td>Add context to every prompt, block secrets in the prompt</td></tr>
              <tr><td className="k">PreToolUse</td><td>Before Claude calls a tool</td><td>Block dangerous commands or paths, require confirmation</td></tr>
              <tr><td className="k">PermissionRequest</td><td>When an action needs approval</td><td>Auto-approve/deny by your rules</td></tr>
              <tr><td className="k">PostToolUse</td><td>After a tool returns a result</td><td>Prettier, eslint --fix, typecheck after Edit/Write</td></tr>
              <tr><td className="k">Notification</td><td>Claude waits for input or is done</td><td>System notification, sound</td></tr>
              <tr><td className="k">Stop</td><td>Claude wants to end the turn</td><td>Run the tests; on failure send it back to work</td></tr>
              <tr><td className="k">SubagentStop</td><td>A subagent finishes</td><td>The same for subagents</td></tr>
              <tr><td className="k">PreCompact / PostCompact</td><td>Around compaction</td><td>Preserve what matters, update external state</td></tr>
              <tr><td className="k">SessionEnd</td><td>Session end</td><td>Cleanup, log, update Linear</td></tr>
              <tr><td className="k">Setup</td><td>Before the first turn (init/maintenance)</td><td>Install dependencies in a fresh environment</td></tr>
              <tr><td className="k">WorktreeCreate / WorktreeRemove</td><td>Around worktrees</td><td>Custom logic for non-git VCS</td></tr>
            </tbody>
          </table>
        </div>
        <p className="muted small">The full list with each event's input and output is in the <a href="https://code.claude.com/docs/en/hooks" target="_blank" rel="noreferrer">Hooks reference</a>.</p>
      </Block>

      <Block title="Shape of the configuration">
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
          { "type": "command", "command": "osascript -e 'display notification \\"Claude is waiting\\" with title \\"Claude Code\\"'" }
        ]
      }
    ]
  }
}`}</Code>
        <ul>
          <li><strong>matcher</strong>: which tools (regex by name: Edit, Write, Bash, mcp__linear__*). Without a matcher: all.</li>
          <li><strong>type</strong>: command (shell), http, prompt (evaluated by a model), mcp, subagent.</li>
          <li>The script gets JSON on stdin with the details (tool, input, output, cwd, session id). Variables like <code>$CLAUDE_PROJECT_DIR</code> are available.</li>
          <li>Hooks live in settings.json at every level (user, project, local). Project ones are in git and apply to the team.</li>
        </ul>
      </Block>

      <Block title="Exit codes: how the hook talks to Claude">
        <ul>
          <li><strong>0</strong>: success. stdout can add context for Claude (for some events).</li>
          <li><strong>2</strong>: blocking refusal. For PreToolUse the tool does not run; for Stop, Claude does not stop. The text from stderr is passed to Claude as the explanation.</li>
          <li><strong>other code</strong>: non-blocking error. Shown to you, work continues.</li>
        </ul>
        <Callout kind="tip">
          You do not have to write hooks by hand. "Write a hook that runs eslint --fix after every edit" or
          "Write a hook that blocks writes to the migrations folder" work well. <Cmd>/update-config</Cmd> does the same.
        </Callout>
      </Block>

      <Block title="Three ready examples">
        <Code title=".claude/hooks/format.sh (PostToolUse)">{`#!/usr/bin/env bash
# Formats only the file Claude just edited.
file=$(jq -r '.tool_input.file_path // empty')
[ -z "$file" ] && exit 0
case "$file" in
  *.ts|*.tsx|*.js|*.json|*.css|*.md) npx prettier --write "$file" >/dev/null 2>&1 ;;
  *.go) gofmt -w "$file" ;;
esac
exit 0`}</Code>
        <Code title=".claude/hooks/guard.sh (PreToolUse for Bash)">{`#!/usr/bin/env bash
cmd=$(jq -r '.tool_input.command // empty')
if echo "$cmd" | grep -Eq 'rm -rf|git push --force|git push -f|db:reset|DROP TABLE'; then
  echo "Command blocked by the guard hook: $cmd" >&2
  exit 2
fi
exit 0`}</Code>
        <Code title=".claude/hooks/tests-before-stop.sh (Stop)">{`#!/usr/bin/env bash
# Runs the tests only if there are changed files. On failure, sends Claude back to work.
if git diff --quiet && git diff --cached --quiet; then exit 0; fi
if ! npm test --silent 2>&1 | tail -40 > /tmp/claude-tests.log; then
  echo "Tests are failing. Fix them before finishing:" >&2
  cat /tmp/claude-tests.log >&2
  exit 2
fi
exit 0`}</Code>
        <p className="muted small">Make the scripts executable: <code>chmod +x .claude/hooks/*.sh</code>. The Stop hook has a cap on consecutive blocks so it cannot loop forever.</p>
      </Block>

      <Block title="Good practices">
        <ul>
          <li>A hook must be fast. Format only the edited file, not the whole project. Long checks go in Stop, not PostToolUse.</li>
          <li>Always <code>exit 0</code> by default. A hook that fails because a tool is missing annoys on every turn.</li>
          <li>Check with <Cmd>/hooks</Cmd> what is active and where it comes from (user, project, plugin).</li>
          <li>Hooks from plugins and from other people's repos are code that runs on your machine. Read them before enabling.</li>
          <li>If CLAUDE.md has a rule Claude follows even without it, remove the rule or make it a hook. See <Link to="/claude-md">section 3</Link>.</li>
        </ul>
      </Block>

      <Pager current="/hooks" />
    </>
  )
}
