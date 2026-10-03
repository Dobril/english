import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, PageHead, Pager } from '../../../components/Bits'

export function PracticesPage() {
  return (
    <>
      <PageHead
        mark="✓"
        title="Best practices and common mistakes"
        lede="Condensed: the rules that keep proving true, and the mistakes everyone makes in the first month."
        chips={['official practices', 'Boris Cherny', 'Simon Willison', 'anti-patterns']}
      />

      <Block title="Fifteen rules">
        <ol>
          <li><strong>Context is the resource.</strong> <Cmd>/clear</Cmd> between tasks, subagents for exploration, a short CLAUDE.md.</li>
          <li><strong>Give a check Claude can run itself.</strong> Tests, build, lint, screenshot. Otherwise you are the check.</li>
          <li><strong>Explore and plan first, then code.</strong> Plan mode for anything above one file. Skip it for one-sentence diffs.</li>
          <li><strong>A concrete prompt: files with @, constraints, definition of done.</strong> A vague prompt only when exploring.</li>
          <li><strong>Correct early.</strong> Esc, redirect. After a second correction of the same thing: /clear and a better prompt.</li>
          <li><strong>Ask for evidence.</strong> Command output, not "the tests pass".</li>
          <li><strong>CLAUDE.md under 200 lines</strong> and only things not visible from the code. Maintain it like code.</li>
          <li><strong>Allow list instead of bypass.</strong> /permissions for safe commands, deny for irreversible ones.</li>
          <li><strong>Hooks for "always".</strong> Formatting, bans, tests before stopping.</li>
          <li><strong>Fresh context for review.</strong> /code-review, a subagent or a second session. The author is not a good reviewer of itself.</li>
          <li><strong>Small tasks.</strong> AI-ready: small scope, up to 5 criteria, one repo. The big gets split.</li>
          <li><strong>Claude commits and opens the PR, you merge.</strong> Exceptions are written in CLAUDE.md.</li>
          <li><strong>The strongest model for thinking.</strong> A cheaper model only for mechanical fixes.</li>
          <li><strong>Follow existing patterns.</strong> "Look at how X is done and do Y the same way" beats any description.</li>
          <li><strong>Write down what you learn.</strong> A recurring mistake: a line in CLAUDE.md. A recurring process: a skill. A recurring check: a hook.</li>
        </ol>
      </Block>

      <Block title="Common mistakes (from the official docs) and how to fix them">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Mistake</th><th>What happens</th><th>Fix</th></tr></thead>
            <tbody>
              <tr><td className="cat">The kitchen sink</td><td>One task, then an unrelated question, then back to the first. The context is full of noise.</td><td>/clear between tasks. /btw for side questions.</td></tr>
              <tr><td className="cat">Correction after correction</td><td>Wrong, you correct, still wrong, correct again. The context is full of failed attempts.</td><td>After a second correction: /clear and a new prompt with what you learned.</td></tr>
              <tr><td className="cat">Bloated CLAUDE.md</td><td>Important rules get lost in the noise and Claude ignores them.</td><td>Prune ruthlessly. A rule Claude follows without it gets removed or becomes a hook.</td></tr>
              <tr><td className="cat">Trust without verification</td><td>A plausible implementation without edge cases.</td><td>Always verify: tests, scripts, screenshots. Cannot verify: do not ship it.</td></tr>
              <tr><td className="cat">Infinite exploration</td><td>"Investigate X" with no scope. Hundreds of files in the context.</td><td>Narrow scope or subagents.</td></tr>
              <tr><td className="cat">Too many findings from a reviewer</td><td>The reviewer finds "problems" because it was asked to. You chase them all and get overengineering.</td><td>"Report only what affects correctness." The rest is optional.</td></tr>
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="What the people who use it best do">
        <ul>
          <li><strong>Boris Cherny (creator of Claude Code)</strong>: 5 parallel terminals and cloud sessions; always plan mode first; a team CLAUDE.md updated several times a week; @claude in code review; slash commands in git; a PostToolUse hook for formatting; /permissions instead of bypass; MCP for Slack, BigQuery, Sentry; a verification loop through the browser.</li>
          <li><strong>Simon Willison (Agentic Engineering Patterns)</strong>: run the existing tests first; red/green TDD with the agent; agentic manual testing through the browser; never commit unreviewed generated code that affects other people; "hoard things you know how to do": keep your working prompts and processes.</li>
          <li><strong>Anthropic's teams</strong>: Claude Code for onboarding into unfamiliar code (questions as to a colleague); for infrastructure incidents (reads logs and proposes); for prototypes that are later rewritten with a plan.</li>
        </ul>
      </Block>

      <Block title="When something goes wrong: a decision tree">
        <ul>
          <li><strong>Claude just went sideways</strong>: Esc, say what to do instead.</li>
          <li><strong>It made changes I do not want</strong>: Esc Esc, restore to the checkpoint before the prompt. Or "undo that".</li>
          <li><strong>It ignores a rule from CLAUDE.md</strong>: the file is long or ambiguous. Trim, rewrite, IMPORTANT on one line only. If it must always happen: a hook.</li>
          <li><strong>It asks things it knows</strong>: the wording in CLAUDE.md is unclear or the context is nearly full (/context).</li>
          <li><strong>Third correction of the same thing</strong>: /clear. A new prompt with "do not do X, because Y".</li>
          <li><strong>It claims done when it is not</strong>: you have no check in the prompt. Add a definition of done and "show the output".</li>
          <li><strong>Too many permission prompts</strong>: /permissions, /fewer-permission-prompts, auto mode.</li>
          <li><strong>Slow and expensive</strong>: /usage, /context; remove unneeded MCP and skills; /effort down for mechanical things.</li>
          <li><strong>MCP does not work</strong>: /mcp reconnect; /debug.</li>
        </ul>
        <Callout kind="rule">
          Develop intuition. Sometimes it is right to let the context grow because you are deep in one problem. Sometimes it is
          right to skip the plan because the task is exploratory. Notice what produced the good result and repeat it.
        </Callout>
        <p>The process step by step: <Link to="/workflow">section 4</Link>. Verification: <Link to="/verify">section 7</Link>.</p>
      </Block>

      <Pager current="/practices" />
    </>
  )
}
