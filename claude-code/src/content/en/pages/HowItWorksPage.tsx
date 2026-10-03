import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, PageHead, Pager } from '../../../components/Bits'

export function HowItWorksPage() {
  return (
    <>
      <PageHead
        mark="1"
        title="How Claude Code thinks"
        lede="Goal: understand the working model, so you know why the commands and practices are the way they are."
        chips={['agentic loop', 'context', 'tools', 'permission modes']}
      />

      <Block title="Agentic loop: why it is not a chat">
        <p>
          A chatbot answers and waits. Claude Code receives a goal and enters a loop: reads files, searches the code, runs commands,
          makes changes, sees the result (test output, compiler errors) and continues until it judges the work done. You watch,
          redirect, or walk away.
        </p>
        <ul>
          <li><strong>Tools</strong>: Read, Edit, Write, Bash, Grep, Glob, WebFetch, plus everything from MCP servers and subagents.</li>
          <li><strong>The decisions are the model's</strong>: which file to read, which command to run. You set the goal, the context and the boundaries.</li>
          <li><strong>It stops when it looks done</strong>. Without a check it can run itself, "looks done" is its only signal. So always give it a check (<Link to="/verify">section 7</Link>).</li>
        </ul>
      </Block>

      <Block title="The context window: the only real limit">
        <p>
          Everything sits in the context: the system prompt, CLAUDE.md, skill descriptions and MCP tool names, the whole
          conversation, every file read, every command output. One debugging session or a tour of the codebase can eat tens of
          thousands of tokens.
        </p>
        <ul>
          <li>As the context fills, the model starts "forgetting" early instructions and makes more mistakes.</li>
          <li>Auto-compaction summarizes the history when nearing the limit. Manual: <Cmd>/compact</Cmd> with instructions on what to keep.</li>
          <li><Cmd>/context</Cmd> shows who takes how much. A status line with a context percentage (<Cmd>/statusline</Cmd>) is the most useful indicator on screen.</li>
          <li>Subagents work in their own context and return only a summary. That way exploration does not fill your session (<Link to="/subagents">section 10</Link>).</li>
        </ul>
        <Callout kind="tip">
          A rule from the official docs: if you have corrected Claude more than twice on the same thing, the context is polluted
          with failed attempts. <Cmd>/clear</Cmd> and a new, better prompt that includes what you learned.
        </Callout>
      </Block>

      <Block title="What Claude sees at the start of a session">
        <ul>
          <li>The Claude Code system prompt (fixed).</li>
          <li>CLAUDE.md from ~/.claude/, from the project root and from the current folder upward. Plus CLAUDE.local.md and .claude/rules/.</li>
          <li>Skill descriptions (not the full content) and MCP tool names (schemas load on demand).</li>
          <li>Auto memory: notes it wrote for itself in previous sessions.</li>
          <li>Git status and recent commits.</li>
        </ul>
        <p>It does not see: your code until it reads it; previous conversations unless you resume them; library documentation unless it fetches it.</p>
      </Block>

      <Block title="Permission modes in two words">
        <ul>
          <li><strong>Manual</strong>: asks for every change. Safe but tiring.</li>
          <li><strong>Accept edits</strong>: writes files freely, asks about commands.</li>
          <li><strong>Plan</strong>: only reads and plans. The start of every non-trivial task.</li>
          <li><strong>Auto</strong>: a classifier approves the routine and stops the risky. Default in recent versions.</li>
          <li><strong>Bypass</strong>: no checks. Only in an isolated environment.</li>
        </ul>
        <p>Switch with Shift+Tab. In detail, with a table of when to use which, in <Link to="/keys">Keys and modes</Link>.</p>
      </Block>

      <Block title="Models and thinking">
        <ul>
          <li>The strongest available model for planning, architecture, hard bugs and review. A smaller model only for clear, mechanical fixes.</li>
          <li>On the newest models extended thinking is always on. You control the depth with <Cmd>/effort</Cmd>, not with words like "think hard" in the prompt.</li>
          <li><Cmd>/model</Cmd> switches the model and saves it as default. Option+P switches without losing the prompt.</li>
        </ul>
      </Block>

      <Block title="What follows from all this">
        <ol>
          <li>One task, one clean session. An unrelated question in the middle: <Cmd>/btw</Cmd> or another session.</li>
          <li>A plan before code for anything above one file. You read and correct the plan.</li>
          <li>A short CLAUDE.md: only what Claude cannot infer from the code.</li>
          <li>A check Claude can run itself: tests, build, lint, screenshot.</li>
          <li>Exploration and review in subagents, so they do not fill the context and are not biased.</li>
        </ol>
      </Block>

      <Pager current="/how-it-works" />
    </>
  )
}
