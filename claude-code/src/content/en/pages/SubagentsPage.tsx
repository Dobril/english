import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager } from '../../../components/Bits'

export function SubagentsPage() {
  return (
    <>
      <PageHead
        mark="10"
        title="Subagents"
        lede="Goal: exploration and review happen in a separate context, so they do not fill your session and are not biased."
        chips={['.claude/agents/', 'Explore', 'Plan', 'adversarial review', '/subtask']}
      />

      <Block title="What a subagent is">
        <p>
          A separate Claude with its own context window, its own system prompt and its own set of allowed tools. The main session
          gives it a task, it works alone (reads dozens of files, runs commands) and returns only a summary. Your context gets one
          message instead of thousands of lines of code.
        </p>
        <ul>
          <li><strong>Built-in</strong>: Explore (code search, read-only), Plan (architecture plan), general-purpose (everything).</li>
          <li><strong>Your own</strong>: markdown files in <code>.claude/agents/</code> (project) or <code>~/.claude/agents/</code> (personal).</li>
          <li>Several subagents can work in parallel.</li>
        </ul>
      </Block>

      <Block title="When to use them">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Situation</th><th>Prompt</th><th>Why a subagent</th></tr></thead>
            <tbody>
              <tr><td className="cat">Exploring unfamiliar code</td><td>"Use subagents to investigate how the auth system handles token refresh and whether we have OAuth helpers to reuse."</td><td>Reading 40 files does not enter your context.</td></tr>
              <tr><td className="cat">Review after implementation</td><td>"Run a subagent to review the diff against the plan and report gaps."</td><td>Fresh context, not biased toward the code it just wrote.</td></tr>
              <tr><td className="cat">Parallel work</td><td><code>/subtask write the tests for the webhook module</code></td><td>You continue on the UI, the result returns to the session.</td></tr>
              <tr><td className="cat">Specialized role</td><td>"@agent-security-reviewer check the changes in src/auth"</td><td>Its own system prompt and restricted tools (read-only).</td></tr>
              <tr><td className="cat">Mass changes</td><td><code>/batch migrate all components to the new Button</code></td><td>5 to 30 subagents, each in its own worktree.</td></tr>
            </tbody>
          </table>
        </div>
        <Callout kind="tip">
          Say it explicitly. "Use a subagent for..." guarantees delegation. Without an explicit request Claude decides itself and often works in the main session.
        </Callout>
      </Block>

      <Block title="Format of a custom subagent">
        <Code title=".claude/agents/security-reviewer.md">{`---
name: security-reviewer
description: Reviews code for vulnerabilities. Use after changes to auth, payments, input or file operations.
tools: Read, Grep, Glob, Bash
model: opus
---
You are a senior security engineer. Review the code for:
- injections (SQL, XSS, OS commands)
- authentication and authorization flaws
- secrets and credentials in code
- insecure data and file handling

For each finding: file, line, why it is a problem, a concrete fix.
Report only real problems, not style preferences.`}</Code>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Field</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td className="k">name</td><td>Name for invocation (@agent-name)</td></tr>
              <tr><td className="k">description</td><td>When Claude should use it on its own. Write it as a condition: "Use when..."</td></tr>
              <tr><td className="k">tools / disallowedTools</td><td>Which tools it may use. A reviewer without Edit cannot "quietly fix".</td></tr>
              <tr><td className="k">model</td><td>A strong model for review and architecture, a faster one for mechanical things</td></tr>
              <tr><td className="k">permissionMode</td><td>default, acceptEdits, plan, auto</td></tr>
              <tr><td className="k">maxTurns</td><td>Turn limit</td></tr>
              <tr><td className="k">skills</td><td>Skills to preload</td></tr>
              <tr><td className="k">isolation: worktree</td><td>Works in its own git worktree</td></tr>
              <tr><td className="k">memory</td><td>Its own memory between sessions (user, project, local)</td></tr>
            </tbody>
          </table>
        </div>
        <p>You can also start it as the main session: <code>claude --agent security-reviewer</code>.</p>
      </Block>

      <Block title="Useful subagents for your process">
        <ul>
          <li><strong>explorer</strong> (read-only): "find all places where X is used and summarize how". Protects the context.</li>
          <li><strong>reviewer</strong> (read-only): review against plan and criteria. Reports gaps.</li>
          <li><strong>test-writer</strong> (Read, Edit, Bash with the tests): writes tests by criteria, without touching the implementation.</li>
          <li><strong>simplifier</strong>: the built-in <Cmd>/simplify</Cmd> already does this with four parallel agents.</li>
          <li><strong>linear-sync</strong> (Linear MCP): updates status and comments without entering the code.</li>
        </ul>
      </Block>

      <Block title="Limits and traps">
        <ul>
          <li>The subagent does not see your conversation (unless it is a fork via <Cmd>/subtask</Cmd>). Give it all the needed context in the task: files, criteria, what "done" is.</li>
          <li>It returns a summary. If you need details, ask for them in the task ("return a list of file:line for each finding").</li>
          <li>Every subagent costs tokens. Five parallel agents for a small task is waste.</li>
          <li>Hooks and permissions apply to subagents too. A reviewer with deny for Edit really cannot edit.</li>
          <li>Track them with <Cmd>/tasks</Cmd>. Ctrl+X Ctrl+K stops all background subagents.</li>
        </ul>
        <p>How they combine with skills and hooks: <Link to="/skills">section 11</Link>. The official table of which extension when: <a href="https://code.claude.com/docs/en/features-overview" target="_blank" rel="noreferrer">Extend Claude Code</a>.</p>
      </Block>

      <Pager current="/subagents" />
    </>
  )
}
