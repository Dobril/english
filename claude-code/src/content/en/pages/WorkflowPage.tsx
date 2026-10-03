import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager, Steps } from '../../../components/Bits'

export function WorkflowPage() {
  return (
    <>
      <PageHead
        mark="4"
        title="Workflow for a task"
        lede="Goal: one repeatable path from an issue in Linear to a merged PR, with a clear owner for every step."
        chips={['Explore → Plan → Code → Commit', 'plan mode', 'verification', 'PR', 'Linear']}
      />

      <Block title="The process at a glance">
        <div className="flow">
          <div className="flow-step"><div className="n">0</div><div className="t">Pick</div><div className="d">AI-ready issue, one session</div></div>
          <div className="flow-step"><div className="n">1</div><div className="t">Explore</div><div className="d">plan mode, Claude reads</div></div>
          <div className="flow-step"><div className="n">2</div><div className="t">Plan</div><div className="d">you read and correct</div></div>
          <div className="flow-step"><div className="n">3</div><div className="t">Implement</div><div className="d">code + tests + checks</div></div>
          <div className="flow-step"><div className="n">4</div><div className="t">Self-review</div><div className="d">/diff, /code-review, /simplify</div></div>
          <div className="flow-step"><div className="n">5</div><div className="t">Commit and PR</div><div className="d">Claude via gh</div></div>
          <div className="flow-step"><div className="n">6</div><div className="t">Review and merge</div><div className="d">you, after green CI</div></div>
          <div className="flow-step"><div className="n">7</div><div className="t">Close</div><div className="d">Linear, CLAUDE.md</div></div>
        </div>
        <p className="muted small">This is the official "Explore, plan, code, commit" with the Linear, self-review and merge steps added.</p>
      </Block>

      <Block title="Step by step">
        <Steps items={[
          {
            title: 'Pick the issue and open a clean session',
            body: (
              <>
                <ul>
                  <li>The issue is AI-ready: small scope, clear criteria, one repo (<Link to="/linear">section 5</Link>). If not, split it into sub-issues first.</li>
                  <li>New session: <Cmd>/clear</Cmd> or a new terminal. If you work on several tasks in parallel, <code>claude -w KAB-123</code> gives you a separate worktree and branch.</li>
                  <li>Name it: <code>/rename KAB-123-retry-webhook</code>.</li>
                </ul>
              </>
            ),
          },
          {
            title: 'Explore in plan mode',
            body: (
              <>
                <p>Shift+Tab until "⏸ plan mode on", or <code>claude --permission-mode plan</code>. Claude only reads.</p>
                <Code title="prompt">{`Take issue KAB-123 from Linear and read it carefully.
Look at @src/payments/webhook.ts and how we currently handle timeouts.
Also look at how retry is done in @src/jobs/retry.ts so we follow the same approach.
Do not change anything yet. Tell me what you understood and where you see risks.`}</Code>
                <p>For unfamiliar code, first ask the questions you would ask a colleague: "How does logging work here?", "Where does auth go through?".</p>
              </>
            ),
          },
          {
            title: 'A plan you read and fix',
            body: (
              <>
                <Code title="prompt">{`Write an implementation plan: which files change and why,
which tests you will add, what is NOT in scope.
Acceptance criteria from the issue: [paste them from Linear].`}</Code>
                <ul>
                  <li>Ctrl+G opens the plan in the editor. Remove the excess, add the constraints Claude missed.</li>
                  <li>Do not approve a plan you do not understand. Ask "why here and not in X".</li>
                  <li>For big features: let Claude interview you and write a spec to SPEC.md, then a new session for execution (<Link to="/prompts">section 6</Link>).</li>
                </ul>
                <Callout kind="tip">
                  A plan is overhead for small things: a typo, a log line, a rename. If you can describe the diff in one sentence, just say it.
                </Callout>
              </>
            ),
          },
          {
            title: 'Implement with built-in verification',
            body: (
              <>
                <p>Approve the plan (leaving plan mode) and give a prompt that includes the check:</p>
                <Code title="prompt">{`Implement the plan. Write tests for retry on timeout (3 attempts, exponential backoff,
after the third failure we write to the dead-letter table). Run npm test -- src/payments and
npm run typecheck and fix everything until they pass. Show me the test output.`}</Code>
                <ul>
                  <li>Watch the first steps. If it goes sideways: Esc, redirect. Esc Esc returns to a checkpoint.</li>
                  <li>If you are stepping away: <code>/goal tests in src/payments pass and lint is clean</code>. An evaluator checks after every turn.</li>
                  <li>For UI changes: "take a screenshot and compare it with the design" (Chrome integration or <Cmd>/verify</Cmd>).</li>
                </ul>
              </>
            ),
          },
          {
            title: 'Self-review before commit',
            body: (
              <>
                <ol>
                  <li><Cmd>/diff</Cmd>: read every change. Nothing outside the scope of the issue.</li>
                  <li><Cmd>/code-review</Cmd>: a bug review in a fresh context. Fix the real findings, not all of them.</li>
                  <li><Cmd>/simplify</Cmd>: reuse and simplification, once tests already pass.</li>
                  <li><Cmd>/security-review</Cmd>: for auth, payments, input, files, commands.</li>
                  <li>All of this in detail in <Link to="/verify">Verifying after a task</Link>.</li>
                </ol>
              </>
            ),
          },
          {
            title: 'Commit and PR from Claude',
            body: (
              <>
                <Code title="prompt">{`Commit with a descriptive message (imperative, with "why" in the body) and open a PR to main via gh.
In the description: what and why, how it was tested, link to KAB-123. Do not merge.`}</Code>
                <ul>
                  <li>Claude writes good commit messages because it sees the whole diff and the conversation. You check that the branch is right.</li>
                  <li>If you have <Cmd>/install-github-app</Cmd>, you can tag @claude in the PR for an automatic review from a fresh context.</li>
                </ul>
              </>
            ),
          },
          {
            title: 'Review and merge: your step',
            body: (
              <>
                <ul>
                  <li>Wait for green CI. Read the PR in GitHub like a colleague's PR.</li>
                  <li>Reviewer comments: "look at the comments on PR #45 and address them" in the same or a new session.</li>
                  <li><strong>You merge.</strong> Why, and when there are exceptions: <Link to="/git">section 8</Link>.</li>
                </ul>
              </>
            ),
          },
          {
            title: 'Close',
            body: (
              <>
                <Code title="prompt">{`Move KAB-123 to Done and add a comment with a short summary of what was done and a link to the PR.`}</Code>
                <ul>
                  <li>If Claude made a recurring mistake along the way: a line in CLAUDE.md now, not "later".</li>
                  <li>If the process had repeatable steps: make it a skill (<Link to="/skills">section 11</Link>), e.g. <code>/task KAB-124</code>.</li>
                </ul>
              </>
            ),
          },
        ]} />
      </Block>

      <Block title="Variants of the process">
        <div className="grid-2">
          <div className="panel">
            <h3>Bug with a clear error</h3>
            <ol>
              <li>No plan. A prompt with symptom, error, likely location and what "fixed" looks like.</li>
              <li>"First write a test that reproduces the bug, then fix it."</li>
              <li>/diff, /code-review, PR.</li>
            </ol>
          </div>
          <div className="panel">
            <h3>Test-driven</h3>
            <ol>
              <li>"Write tests for X by these criteria. Do not write the implementation. Run them so we see them fail."</li>
              <li>Commit the tests.</li>
              <li>"Now write the code until the tests pass. Do not change the tests."</li>
            </ol>
          </div>
          <div className="panel">
            <h3>Big feature</h3>
            <ol>
              <li>Session 1: interview and SPEC.md.</li>
              <li>Split into sub-issues in Linear (Claude can create them).</li>
              <li>One session per sub-issue. Each goes through the whole process.</li>
            </ol>
          </div>
          <div className="panel">
            <h3>Exploration and questions</h3>
            <ol>
              <li>Plan mode. "How does X work? Where is Y used?"</li>
              <li>For large searches: "use subagents to investigate...".</li>
              <li>Nothing changes. Write the conclusions into the issue.</li>
            </ol>
          </div>
        </div>
      </Block>

      <Block title="When to step in and when to let it go">
        <ul>
          <li><strong>Step in immediately</strong> when Claude starts changing a file outside the scope, installs a library you did not ask for, or "solves" an error by hiding it.</li>
          <li><strong>Let it</strong> iterate on tests and compile errors. That is its strength.</li>
          <li><strong>Stop and /clear</strong> after a second correction of the same thing. Rewrite the prompt with what you learned.</li>
          <li>Do not mumble corrections in a long session. Short and concrete: "No, use the existing RetryPolicy from src/jobs. Remove the new class."</li>
        </ul>
      </Block>

      <Pager current="/workflow" />
    </>
  )
}
