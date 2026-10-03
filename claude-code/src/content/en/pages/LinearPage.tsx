import { Link } from '../../../components/Link'
import { Block, Callout, Code, PageHead, Pager } from '../../../components/Bits'

export function LinearPage() {
  return (
    <>
      <PageHead
        mark="5"
        title="Issues in Linear"
        lede="Goal: write the issue so that Claude gets it right the first time and you can verify the result."
        chips={['AI-ready', 'acceptance criteria', 'Linear MCP', 'sub-issues']}
      />

      <Block title="Why the issue is half the result">
        <p>
          Claude works from what is written. A vague issue yields plausible code for the wrong problem. The good news: a good issue
          for Claude is also a good issue for a human: short, plain language, verifiable criteria. Linear themselves recommend
          "write issues, not user stories".
        </p>
      </Block>

      <Block title="The five criteria for an AI-ready issue">
        <ol>
          <li><strong>Small scope</strong>: a few files, one repo.</li>
          <li><strong>Verifiable acceptance criteria</strong>: up to 5, each can be tested or seen.</li>
          <li><strong>Under 2 to 3 hours of work</strong> for a human. Bigger gets split.</li>
          <li><strong>No known traps</strong>: if you know of a trap, write it in the issue.</li>
          <li><strong>Clear entry point</strong>: which file or module to start from, which example to follow.</li>
        </ol>
        <p>Good candidates: bugs with a clear error, UI tweaks, error handling improvements, new endpoints following an existing pattern, tests. Bad candidates for one issue: swapping the auth provider, a big refactor, "make it faster", a memory leak without a repro.</p>
        <Callout kind="tip">
          Add an <code>ai-ready</code> label in Linear. Issues with it get delegated to Claude in batches. The rest first go through you for splitting or clarification.
        </Callout>
      </Block>

      <Block title="Issue description template">
        <Code title="Linear issue">{`Title: Add retry on timeout in payments webhook

## Context
The Stripe webhook sometimes gets a timeout from our API (see Sentry KAB-98).
We currently lose the event. We want up to 3 attempts with exponential backoff.

## What
- Retry logic in src/payments/webhook.ts, using the existing RetryPolicy from src/jobs/retry.ts
- After the third failure, write the event to table payment_events_dead_letter

## Acceptance criteria
- [ ] On a simulated timeout the handler retries 3 times with 1s, 2s, 4s delays
- [ ] After the third failure there is a dead-letter row with payload and error
- [ ] A successful attempt after a retry does not create a duplicate row in payments
- [ ] Tests cover the three cases; npm test -- src/payments passes
- [ ] Migration for the new table + updated seed

## Out of scope
- UI for viewing dead-letter rows (separate issue)
- Changing RetryPolicy

## Technical notes
- Example to follow: src/jobs/emailRetry.ts
- Do not touch src/legacy/

## How to verify
npm test -- src/payments && npm run typecheck`}</Code>
        <ul>
          <li><strong>Title</strong>: verb + object. "Add", "Fix", "Remove", not "Webhook problem".</li>
          <li><strong>Context</strong>: why. Two sentences and links (Sentry, design, previous issue).</li>
          <li><strong>Acceptance criteria</strong>: this is also the prompt for the tests. More than 5 means the issue is big.</li>
          <li><strong>Out of scope</strong>: the most underrated section. Stops Claude from "improving" the neighbours too.</li>
          <li><strong>Technical notes</strong>: files and examples. Claude follows existing patterns far better than it invents new ones.</li>
        </ul>
      </Block>

      <Block title="Splitting a big issue">
        <ul>
          <li>A parent issue (or project) with the goal and the spec. Sub-issues, each AI-ready, each for one session.</li>
          <li>Order of sub-issues: schema and models first, then logic, then API, then UI. Each leaves the code working.</li>
          <li>Claude can do the splitting: in plan mode, "read KAB-120 and propose sub-issues with criteria for each; create them in Linear as sub-issues once I approve".</li>
          <li>A diff under 300 lines per sub-issue is a good boundary: a human can review it in 15 minutes.</li>
        </ul>
      </Block>

      <Block title="Connecting Linear to Claude Code (MCP)">
        <Code title="terminal">{`claude mcp add --transport http linear-server https://mcp.linear.app/mcp
# then in a session:
/mcp            # pick linear-server → Authenticate (OAuth in the browser)

# read-only, if you want Claude unable to change issues:
claude mcp add --transport http linear-ro https://mcp.linear.app/mcp/readonly`}</Code>
        <ul>
          <li>Add with <code>--scope project</code> if you want the configuration in <code>.mcp.json</code> for the whole team.</li>
          <li>Linear warns that remote MCP connections sometimes need a second attempt. On trouble: <code>/mcp reconnect linear-server</code>.</li>
          <li>Details on MCP, scopes and security in <Link to="/mcp">section 12</Link>.</li>
        </ul>
      </Block>

      <Block title="What Claude can do in Linear">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Moment</th><th>Prompt</th></tr></thead>
            <tbody>
              <tr><td className="cat">Start of a task</td><td>"Take KAB-123 from Linear, read the description and comments, summarize the acceptance criteria for me."</td></tr>
              <tr><td className="cat">Planning</td><td>"Split KAB-120 into sub-issues with criteria and create them as sub-issues once I approve."</td></tr>
              <tr><td className="cat">During work</td><td>"Move KAB-123 to In Progress and add a comment with the plan."</td></tr>
              <tr><td className="cat">Question about the issue</td><td>"Add a comment to KAB-123 with this question for the product owner: ..."</td></tr>
              <tr><td className="cat">End</td><td>"Move to In Review, add a summary and a link to PR #45."</td></tr>
              <tr><td className="cat">Cycle planning</td><td>"Show me the issues labeled ai-ready in the current cycle, ordered by priority."</td></tr>
              <tr><td className="cat">Bug from Sentry</td><td>"Create a Linear issue from this error: [paste]. Context, reproduction steps, criteria."</td></tr>
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="A skill for the whole routine">
        <p>When the "take issue, plan, do, PR, update Linear" process repeats, make it one command:</p>
        <Code title=".claude/skills/task/SKILL.md">{`---
name: task
description: Execute a Linear issue end to end
disable-model-invocation: true
---
Work on Linear issue $ARGUMENTS.

1. Read the issue and its comments from Linear. Summarize the acceptance criteria.
2. Move it to In Progress.
3. In plan mode: look at the affected code and propose a plan. Stop and wait for approval.
4. Implement with tests. Run npm test and npm run typecheck until they pass.
5. Run /code-review and address the real findings.
6. Commit and open a PR via gh with a link to the issue. Do not merge.
7. Move the issue to In Review and add a comment with a summary and the PR link.`}</Code>
        <p>Invocation: <code>/task KAB-123</code>. Details on skills in <Link to="/skills">section 11</Link>.</p>
      </Block>

      <Block title="Common mistakes when writing issues">
        <ul>
          <li>"Fix payments": no symptom, no criterion. Claude will fix something.</li>
          <li>Criteria like "works well" or "is fast". Write a number or a test.</li>
          <li>Five things in one issue. Five sub-issues.</li>
          <li>Missing "out of scope". You also get a refactor you did not ask for.</li>
          <li>A solution instead of a problem: "add Redis" instead of "query X takes over 2s at 10k rows". Leave the solution to the plan, unless it is truly decided.</li>
        </ul>
      </Block>

      <Pager current="/linear" />
    </>
  )
}
