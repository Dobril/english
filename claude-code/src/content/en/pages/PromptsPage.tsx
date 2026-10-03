import { Link } from '../../../components/Link'
import { BeforeAfter, Block, Callout, Cmd, Code, PageHead, Pager } from '../../../components/Bits'

export function PromptsPage() {
  return (
    <>
      <PageHead
        mark="6"
        title="How to write prompts"
        lede="Goal: the first prompt is precise enough that there is no third one. Structure, templates and before/after examples."
        chips={['structure', 'context with @', 'definition of done', 'constraints', 'templates']}
      />

      <Block title="The principle">
        <p>
          Claude can infer intent, but it cannot read minds. The more precise the prompt, the fewer corrections. Precise does not
          mean long: it means it contains the files, the constraints and what "done" is. A vague prompt is fine only when you are
          exploring and can afford to course-correct ("what would you improve in this file?").
        </p>
      </Block>

      <Block title="The five parts of a task prompt">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Part</th><th>What it contains</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td className="cat">1. Goal</td><td>What to achieve, in one sentence. The outcome, not the steps.</td><td>"Add retry on timeout in the webhook handler."</td></tr>
              <tr><td className="cat">2. Context</td><td>Files with @, examples to follow, links, screenshots, errors.</td><td>"@src/payments/webhook.ts; follow the pattern in @src/jobs/emailRetry.ts; the Sentry error: [paste]"</td></tr>
              <tr><td className="cat">3. Constraints</td><td>What not to touch, no new libraries, style, scope.</td><td>"No new dependencies. Do not change RetryPolicy. Do not touch src/legacy/."</td></tr>
              <tr><td className="cat">4. Definition of done</td><td>A check Claude can run and show itself.</td><td>"Tests for the three cases; npm test -- src/payments and typecheck pass; show the output."</td></tr>
              <tr><td className="cat">5. Response format</td><td>What you want to see at the end.</td><td>"At the end: list of changed files and what remains risky."</td></tr>
            </tbody>
          </table>
        </div>
        <Callout kind="rule">
          If the prompt lacks part 4, Claude stops when the code "looks done". The definition of done is the difference between a
          session you watch and one you can walk away from.
        </Callout>
      </Block>

      <Block title="Before and after (from the official best practices)">
        <BeforeAfter rows={[
          { label: 'Scope', before: 'add tests for foo.py', after: 'write a test for foo.py covering the edge case where the user is logged out. avoid mocks.' },
          { label: 'Source', before: 'why does ExecutionFactory have such a weird api?', after: 'look through ExecutionFactory\'s git history and summarize how its api came to be' },
          { label: 'Pattern', before: 'add a calendar widget', after: 'look at how existing widgets are implemented on the home page, HotDogWidget.php is a good example. follow the pattern to implement a calendar widget with month selection and year pagination. no new libraries.' },
          { label: 'Symptom', before: 'fix the login bug', after: 'users report that login fails after session timeout. check the auth flow in src/auth/, especially token refresh. write a failing test that reproduces the issue, then fix it.' },
          { label: 'Verification', before: 'implement a function that validates email addresses', after: 'write validateEmail. test cases: user@example.com is true, invalid is false, user@.com is false. run the tests after implementing.' },
          { label: 'UI', before: 'make the dashboard look better', after: '[screenshot] implement this design. take a screenshot of the result, compare it to the original, list the differences and fix them.' },
          { label: 'Root cause', before: 'the build is failing', after: 'the build fails with this error: [paste]. fix it and verify the build succeeds. address the root cause, do not suppress the error.' },
        ]} />
      </Block>

      <Block title="How to provide context">
        <ul>
          <li><strong>@file</strong> instead of a description. Claude reads it before answering. Works for folders too.</li>
          <li><strong>Screenshots</strong>: Ctrl+V or drag and drop. For UI bugs and designs it is irreplaceable.</li>
          <li><strong>Errors</strong>: paste the whole stack trace, not "it gives an error".</li>
          <li><strong>URLs</strong> to documentation. Allow frequently used domains with <Cmd>/permissions</Cmd>.</li>
          <li><strong>Pipe</strong>: <code>cat error.log | claude -p "explain the error"</code>.</li>
          <li><strong>Let it fetch</strong>: "look at the issue in Linear", "read the last 5 commits on this file", "check what the API returns with curl".</li>
        </ul>
      </Block>

      <Block title="Templates to copy">
        <Code title="New feature">{`Goal: [what, in one sentence]
Context: @file1 @file2. Follow the pattern in @example. Linear issue: KAB-###.
Constraints: no new dependencies; do not change [X]; do not touch [folder].
Done when: [criteria from the issue]. Run [test command] and [typecheck]; show the output.
At the end: list of changed files and what remains risky.`}</Code>
        <Code title="Bug">{`Symptom: [what happens, under which steps]
Error: [paste stack trace / log]
Likely location: @file (function ...)
Fixed when: [expected behavior].
First write a test that reproduces the bug and fails. Then fix it. Fix the cause, not the symptom.`}</Code>
        <Code title="Refactor">{`Goal: [e.g. extract the retry logic into a shared helper]
Behavior must NOT change: all existing tests pass without changes to them.
Scope: only @folder. No change to the public API of [module].
Do it in small steps with a commit after each; run the tests after each step.`}</Code>
        <Code title="Exploration (in plan mode)">{`How does [X] work in this project? Where is it called, what are the inputs and outputs, which edge cases does it handle?
Use subagents for the search so we do not fill the context. Do not change anything.
At the end: a short explanation and a list of the key files.`}</Code>
        <Code title="Reviewing someone else's code">{`Review the diff of PR #45 (gh pr diff 45). Look for: bugs, edge cases, race conditions,
inconsistencies with our middleware patterns in @src/middleware. Report only real problems,
not style preferences. For each finding: file, line, why it is a problem, a proposal.`}</Code>
        <Code title="Interview for a spec (big feature)">{`I want to build [brief description]. Interview me in detail using the AskUserQuestion tool.
Ask about technical implementation, UI/UX, edge cases, risks and tradeoffs.
Don't ask obvious questions, dig into the hard parts I might not have considered.
Once we have covered everything, write a complete spec to SPEC.md.`}</Code>
        <p className="muted small">After the spec: a new session (<Cmd>/clear</Cmd>) just for execution, with SPEC.md as context.</p>
      </Block>

      <Block title="Long prompts: structure with tags">
        <p>
          For a long prompt with several parts (context, instructions, examples, data), separate them with XML tags. Claude
          recognizes them better than paragraphs and does not confuse instructions with data. Tag names are free; what matters is consistency.
        </p>
        <Code title="example">{`<task>
Migrate these 3 components from class to function components with hooks.
</task>

<constraints>
- Behavior and the props API stay the same
- No new libraries
- Keep the existing tests unchanged
</constraints>

<files>
@src/components/Legacy/UserCard.tsx
@src/components/Legacy/UserList.tsx
@src/components/Legacy/UserFilter.tsx
</files>

<done_when>
npm test -- src/components/Legacy passes; npm run typecheck passes.
</done_when>`}</Code>
      </Block>

      <Block title="Corrections during work">
        <ul>
          <li>Short and concrete: "No, use the existing RetryPolicy. Remove the new class." Do not explain the history.</li>
          <li>Esc stops mid-action. Say what to do instead.</li>
          <li>Esc Esc returns to a checkpoint before the mistake. Often cheaper than an explanation.</li>
          <li>Second correction of the same thing: stop. <Cmd>/clear</Cmd>, a new prompt that includes "do not do X, because Y".</li>
          <li>You can type while Claude works: messages queue up. Ctrl+Enter sends them right away.</li>
        </ul>
      </Block>

      <Block title="What not to write">
        <ul>
          <li>"Think hard" and the like: on new models thinking is always on; depth is <Cmd>/effort</Cmd>.</li>
          <li>"Be careful", "write clean code": they carry no information. Write the concrete rule.</li>
          <li>A step-by-step recipe for something Claude knows how to do. Give the outcome and the constraints, leave the path.</li>
          <li>Five tasks in one prompt. Five prompts or five sub-issues.</li>
          <li>Data and instructions mixed without a separator. See the tags above.</li>
        </ul>
        <p>More on the issue → prompt link in <Link to="/linear">section 5</Link>, on verification in <Link to="/verify">section 7</Link>.</p>
      </Block>

      <Pager current="/prompts" />
    </>
  )
}
