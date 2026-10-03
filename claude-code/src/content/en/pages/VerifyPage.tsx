import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager } from '../../../components/Bits'

export function VerifyPage() {
  return (
    <>
      <PageHead
        mark="7"
        title="Verifying after a task"
        lede="Goal: nothing is called done until something that returns pass or fail has checked it, and a human has read the diff."
        chips={['tests', '/code-review', '/simplify', '/security-review', '/verify', 'diff']}
      />

      <Block title="Why verification is the most important practice">
        <p>
          Claude stops when the work looks done. If there is no check it can run itself, you become the check and every mistake waits
          for you to notice it. Give it something that returns a signal (tests, build, lint, a screenshot against a design) and the
          loop closes on its own: it does, checks, reads the result, fixes. According to the official docs this is the difference
          between a session you watch and one you can walk away from.
        </p>
        <Callout kind="rule">
          Ask for evidence, not claims. "The tests pass" is not evidence. The command output is.
        </Callout>
      </Block>

      <Block title="The four layers of verification">
        <div className="grid-2">
          <div className="panel">
            <h3>1. Automatic, in the prompt</h3>
            <ul>
              <li>Tests for the affected module, then the whole suite.</li>
              <li>Typecheck (<code>tsc --noEmit</code>, <code>go vet</code>).</li>
              <li>Lint and format.</li>
              <li>Build.</li>
            </ul>
            <p className="muted">You put them in the prompt itself: "run X and Y and fix until they pass; show the output".</p>
          </div>
          <div className="panel">
            <h3>2. The built-in reviews</h3>
            <ul>
              <li><Cmd>/diff</Cmd>: you read the changes.</li>
              <li><Cmd>/code-review</Cmd>: bugs, in a fresh context.</li>
              <li><Cmd>/simplify</Cmd>: reuse and simplification.</li>
              <li><Cmd>/security-review</Cmd>: vulnerabilities.</li>
            </ul>
            <p className="muted">Order: diff, code-review, simplify, security-review when needed.</p>
          </div>
          <div className="panel">
            <h3>3. Live confirmation</h3>
            <ul>
              <li><Cmd>/verify</Cmd> or <Cmd>/run</Cmd>: starts the app and observes the result.</li>
              <li>Chrome integration: Claude clicks in the real browser and takes screenshots.</li>
              <li>curl to the new endpoint, a real query against the dev database.</li>
            </ul>
            <p className="muted">Mandatory for UI and API changes. Tests do not see "looks broken".</p>
          </div>
          <div className="panel">
            <h3>4. Independent review</h3>
            <ul>
              <li>A subagent that sees only the diff and the criteria, not the reasoning.</li>
              <li>A second session (Writer/Reviewer pattern).</li>
              <li>@claude in the PR via GitHub Action.</li>
              <li>You, in GitHub, before merge.</li>
            </ul>
          </div>
        </div>
      </Block>

      <Block title="Prompts for the review itself">
        <Code title="review against the plan">{`Use a subagent to review the diff against PLAN.md. Check that every requirement is
implemented, that the listed edge cases have tests, and that nothing outside the scope changed.
Report gaps, not style preferences.`}</Code>
        <Code title="screenshot against design">{`Start the app, open /settings and take a screenshot. Compare with [Image #1].
List the differences in layout, spacing and colors and fix them. Repeat until there are none.`}</Code>
        <Code title="evidence">{`Show me the exact commands you ran and their full output. If you did not run something, say so.`}</Code>
        <Callout kind="warn">
          A reviewer asked to find problems usually finds some. Do not chase every finding: it leads to extra abstractions and tests
          for impossible cases. Tell it to report only what affects correctness or the stated requirements, and treat the rest as optional.
        </Callout>
      </Block>

      <Block title="Making it automatic">
        <ul>
          <li><strong>/goal</strong>: <code>/goal all tests in packages/api pass and npm run lint is clean</code>. A separate evaluator checks after every turn; Claude does not stop until the goal is met.</li>
          <li><strong>Stop hook</strong>: a script that runs the tests when Claude wants to end the turn and sends it back to work on failure. Deterministic, no exceptions. Example in <Link to="/hooks">section 9</Link>.</li>
          <li><strong>PostToolUse hook</strong>: formatting and lint after every edit, so they never reach CI.</li>
          <li><strong>CI</strong>: the same checks in GitHub Actions. Claude does not merge, so a red CI stops everything naturally.</li>
        </ul>
      </Block>

      <Block title="Definition of Done for a task with Claude">
        <ol>
          <li>The acceptance criteria from the issue are met and each has a test or visible evidence.</li>
          <li>Tests, typecheck, lint, build pass. The output is shown.</li>
          <li><Cmd>/diff</Cmd> has been read. Every change is understood and within the scope of the issue.</li>
          <li><Cmd>/code-review</Cmd> has run; the real findings are fixed.</li>
          <li>For sensitive code: <Cmd>/security-review</Cmd>.</li>
          <li>The change has been seen live (app, screenshot, curl).</li>
          <li>No new dependencies you did not ask for. No "temporary" solutions without a TODO and an issue.</li>
          <li>A PR with a description: what, why, how it was tested, link to the issue.</li>
        </ol>
      </Block>

      <Block title="Red flags in Claude's output">
        <ul>
          <li>A test changed so that it passes. Ask why before accepting.</li>
          <li>A suppressed error: try/catch without handling, <code>// @ts-ignore</code>, <code>eslint-disable</code>. Root cause, not symptom.</li>
          <li>A new library for something the project already has a helper for.</li>
          <li>Changes in files that are not in the issue ("while I was there I also fixed...").</li>
          <li>"It should work" without command output.</li>
          <li>A mock that replaces exactly the thing that was supposed to be tested.</li>
        </ul>
      </Block>

      <Pager current="/verify" />
    </>
  )
}
