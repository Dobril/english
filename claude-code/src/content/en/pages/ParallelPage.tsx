import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager } from '../../../components/Bits'

export function ParallelPage() {
  return (
    <>
      <PageHead
        mark="13"
        title="Parallel and background work"
        lede="Goal: once one Claude is a habit, multiply the work with several sessions, background agents and automation, without losing control."
        chips={['worktrees', 'multiple sessions', '/fork', '/subtask', 'claude -p', 'GitHub Actions', 'routines']}
      />

      <Block title="The ladder of autonomy">
        <div className="flow">
          <div className="flow-step"><div className="n">1</div><div className="t">One session</div><div className="d">you watch and steer</div></div>
          <div className="flow-step"><div className="n">2</div><div className="t">Several sessions</div><div className="d">worktrees, terminals 1..5</div></div>
          <div className="flow-step"><div className="n">3</div><div className="t">Background agents</div><div className="d">/subtask, /fork, /background</div></div>
          <div className="flow-step"><div className="n">4</div><div className="t">No interface</div><div className="d">claude -p in scripts and CI</div></div>
          <div className="flow-step"><div className="n">5</div><div className="t">On a schedule</div><div className="d">routines, @claude in PRs</div></div>
        </div>
        <p className="muted small">Every rung requires more verification built into the task (/goal, Stop hooks, tests), because you watch less.</p>
      </Block>

      <Block title="Several sessions with worktrees">
        <Code title="terminal">{`# terminal 1
claude -w KAB-123 -n "KAB-123 retry"
# terminal 2
claude -w KAB-130 -n "KAB-130 settings UI"
# terminal 3: only questions and review, no worktree
claude --permission-mode plan`}</Code>
        <ul>
          <li>Every session is in its own copy of the repo (<code>.claude/worktrees/name</code>) and its own branch. Edits do not collide.</li>
          <li>Boris Cherny works with 5 numbered terminals and system notifications when a Claude waits for input. Notification hook in <Link to="/hooks">section 9</Link>.</li>
          <li><code>.worktreeinclude</code> copies .env and other gitignored files into every new worktree.</li>
          <li>The Desktop app shows sessions visually, each optionally in its own worktree.</li>
        </ul>
        <Callout kind="tip" title="Writer / Reviewer">
          Session A writes. Session B (fresh context) reviews: "Review the rate limiter in @src/middleware/rateLimiter.ts for edge
          cases, race conditions and consistency with the other middleware." Bring the findings back to A. Same with tests: one writes tests, the other code.
        </Callout>
      </Block>

      <Block title="Background work in the same session">
        <ul>
          <li><Cmd>/subtask</Cmd>: a subagent that inherits the whole conversation and works on a task while you continue. The result returns here.</li>
          <li><Cmd>/fork</Cmd>: a copy of the conversation in a new background session, to try an alternative.</li>
          <li><Cmd>/background</Cmd>: detaches the current session as a background agent and frees the terminal. Follow it with <code>claude agents</code>.</li>
          <li>Ctrl+B sends a Bash command (dev server, long tests) to the background. <Cmd>/tasks</Cmd> shows everything in the background.</li>
          <li>Sessions can message each other (<Cmd>/list-agents</Cmd>, @session name). Useful for "tell session 2 that I changed the API".</li>
        </ul>
      </Block>

      <Block title="Headless: claude -p">
        <Code title="terminal">{`# one question, one answer
claude -p "Explain what this project does"

# structured output for scripts
claude -p "List all API endpoints" --output-format json | jq '.result'

# pipe
cat error.log | claude -p "explain the error and propose a fix"

# with restricted tools and no prompts
claude -p "Fix all lint errors" --allowedTools "Edit,Bash(npm run lint *)" --permission-mode auto

# fan-out over a list of files
for f in $(cat files.txt); do
  claude -p "Migrate $f to the new Button component. Return OK or FAIL." \\
    --allowedTools "Edit,Bash(git commit *)" --max-turns 15
done`}</Code>
        <ul>
          <li><code>--output-format json</code> returns an object with <code>result</code> and cost; <code>stream-json</code> gives one line at a time.</li>
          <li><code>--max-turns</code> and <code>--max-budget-usd</code> limit the damage of a loop.</li>
          <li><code>--bare</code> skips hooks, skills, MCP and CLAUDE.md: for clean CI runs.</li>
          <li>Try on 2 to 3 files, fix the prompt, then run on all. <Cmd>/batch</Cmd> does the same with worktrees and a plan.</li>
        </ul>
      </Block>

      <Block title="GitHub Actions and @claude">
        <ul>
          <li><Cmd>/install-github-app</Cmd> installs the app and creates the workflow (anthropics/claude-code-action).</li>
          <li>In a PR: "@claude review for race conditions". In an issue: "@claude implement this". Claude replies with a comment or a PR.</li>
          <li>The review in CI runs in a fresh context: it does not know how the code was written, so it catches other things.</li>
          <li><Cmd>/autofix-pr</Cmd>: a cloud session watches the PR and pushes fixes on red CI or comments. It does not merge.</li>
        </ul>
      </Block>

      <Block title="On a schedule and from afar">
        <ul>
          <li><Cmd>/schedule</Cmd>: routines in the cloud on a cron. "Every morning at 9: summarize the open PRs and the issues in In Review and send them to me."</li>
          <li><Cmd>/loop 10m ...</Cmd>: repeats a prompt while the session is open. "Check whether CI on PR #45 passed."</li>
          <li><Cmd>/remote-control</Cmd>: control the local session from claude.ai or your phone. <Cmd>/teleport</Cmd> pulls a cloud session locally.</li>
          <li>Claude Code in the cloud (claude.ai/code): sessions on Anthropic's infrastructure, with your repo.</li>
        </ul>
      </Block>

      <Block title="Rules for scaling safely">
        <ol>
          <li>The less you watch, the stricter the verification in the task: tests, <Cmd>/goal</Cmd>, Stop hook.</li>
          <li>Restricted tools in headless (<code>--allowedTools</code>). Never bypass with access to real data.</li>
          <li>Background agents do not merge. They open PRs.</li>
          <li>Budget: <Cmd>/usage</Cmd> regularly; <code>--max-budget-usd</code> in scripts.</li>
          <li>One human reviews every PR, no matter how many agents wrote it.</li>
        </ol>
      </Block>

      <Pager current="/parallel" />
    </>
  )
}
