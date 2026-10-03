import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager } from '../../../components/Bits'

export function SkillsPage() {
  return (
    <>
      <PageHead
        mark="11"
        title="Skills and custom commands"
        lede="Goal: repeating processes and specific knowledge are one command away, loaded only when needed."
        chips={['SKILL.md', '$ARGUMENTS', 'disable-model-invocation', 'plugins']}
      />

      <Block title="What a skill is">
        <p>
          A folder with a <code>SKILL.md</code> file: instructions and knowledge Claude loads when needed (based on the description)
          or that you invoke directly with <code>/name</code>. Unlike CLAUDE.md, which always loads, a skill costs context only when
          used. The old ".claude/commands/" is the same mechanism; today everything is "skills".
        </p>
        <ul>
          <li><strong>Knowledge</strong>: "our API conventions", "how migrations are written here". Claude applies them itself when relevant.</li>
          <li><strong>Processes</strong>: <code>/task KAB-123</code>, <code>/pr</code>, <code>/release</code>. You invoke them.</li>
          <li>Location: <code>.claude/skills/name/SKILL.md</code> (project, in git) or <code>~/.claude/skills/</code> (personal).</li>
        </ul>
      </Block>

      <Block title="Format">
        <Code title=".claude/skills/pr/SKILL.md">{`---
name: pr
description: Commit the current work and open a PR with the right description
disable-model-invocation: true
allowed-tools: Bash(git *) Bash(gh *)
---
## Current state
!\`git status --short\`
!\`git diff --stat\`

## Instructions
1. Review the changes above. If there are files outside the task, stop and ask me.
2. Commit with an imperative message and "why" in the body.
3. Push and gh pr create to main. Description: What / Why / How tested / Linear: $ARGUMENTS.
4. Do not merge. Give me the PR link.`}</Code>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Field</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td className="k">description</td><td>When Claude should use it on its own. Required.</td></tr>
              <tr><td className="k">disable-model-invocation: true</td><td>Only you invoke it with /name. For processes with side effects (commit, deploy, Linear).</td></tr>
              <tr><td className="k">user-invocable: false</td><td>Only Claude loads it on its own. For pure knowledge.</td></tr>
              <tr><td className="k">allowed-tools</td><td>Tools pre-approved for this skill.</td></tr>
              <tr><td className="k">context: fork</td><td>Runs in a separate subagent, not in the main conversation.</td></tr>
              <tr><td className="k">paths</td><td>Loads only when working with files matching the pattern.</td></tr>
              <tr><td className="k">model</td><td>Model for the duration of the skill.</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li><code>$ARGUMENTS</code>: everything after the command. <code>$0</code>, <code>$1</code>: positional. <code>arguments: [issue, pr]</code> in the frontmatter gives names.</li>
          <li><code>!`command`</code>: runs before Claude sees the skill and its output is inlined. So git status is always current.</li>
          <li>Once loaded, the skill stays in context for the whole task. Put the important part at the top so it survives compaction.</li>
        </ul>
      </Block>

      <Block title="Skills worth having">
        <div className="grid-2">
          <div className="panel">
            <h3>/task &lt;linear-id&gt;</h3>
            <p>The whole process from <Link to="/linear">section 5</Link>: read the issue, plan, implement, verify, PR, update Linear.</p>
          </div>
          <div className="panel">
            <h3>/pr</h3>
            <p>Commit and PR by the team's rules. Stops if there are files outside the task.</p>
          </div>
          <div className="panel">
            <h3>/fix-ci [PR]</h3>
            <p>Get the logs from the failed CI via gh, find the cause, fix, push.</p>
          </div>
          <div className="panel">
            <h3>/migration &lt;description&gt;</h3>
            <p>Knowledge + process: how a migration is done in this project, seed, tests, rollback.</p>
          </div>
          <div className="panel">
            <h3>/standup</h3>
            <p>Read what I did yesterday (git log, Linear) and write a short standup.</p>
          </div>
          <div className="panel">
            <h3>api-conventions (no /)</h3>
            <p>Pure knowledge with user-invocable: false. Claude loads it when touching endpoints.</p>
          </div>
        </div>
      </Block>

      <Block title="The built-in skills you use every day">
        <ul>
          <li><Cmd>/code-review</Cmd>, <Cmd>/simplify</Cmd>, <Cmd>/security-review</Cmd>: quality (<Link to="/verify">section 7</Link>).</li>
          <li><Cmd>/verify</Cmd>, <Cmd>/run</Cmd>: live confirmation. <Cmd>/run-skill-generator</Cmd> teaches them how your project starts.</li>
          <li><Cmd>/batch</Cmd>: mass changes through parallel subagents.</li>
          <li><Cmd>/doctor</Cmd>, <Cmd>/debug</Cmd>, <Cmd>/update-config</Cmd>, <Cmd>/fewer-permission-prompts</Cmd>: environment.</li>
          <li><Cmd>/loop</Cmd>, <Cmd>/schedule</Cmd>: recurring things.</li>
        </ul>
      </Block>

      <Block title="Plugins">
        <p>
          A plugin bundles skills, hooks, subagents and MCP servers in one and installs with <Cmd>/plugin</Cmd>. Anthropic maintains
          a marketplace; the team can have its own. The most useful one for typed languages: the code intelligence plugin, which gives
          Claude precise symbol navigation and automatic error detection after edits.
        </p>
        <Callout kind="warn">
          A plugin or skill from an outside source is code and instructions that run with your rights. Read them. Hooks in a plugin can run commands.
        </Callout>
      </Block>

      <Block title="Maintenance">
        <ul>
          <li><Cmd>/skills</Cmd>: list, how many tokens each costs, visibility toggle.</li>
          <li><Cmd>/skill-doctor</Cmd>: which are unused and how much context they eat. Turn them off.</li>
          <li><Cmd>/reload-skills</Cmd> after changing a SKILL.md, without a restart.</li>
          <li>When a skill, when a hook, when a subagent, when MCP: skill for knowledge and process; hook for "always and without exception"; subagent for an isolated context; MCP for access to an external system. The official table: <a href="https://code.claude.com/docs/en/features-overview" target="_blank" rel="noreferrer">Extend Claude Code</a>.</li>
        </ul>
      </Block>

      <Block title="A complete skill as an example: /task from Linear to MR">
        <p>
          A real skill used every day. It shows everything a good skill should have: hard rules at the top (they survive
          compaction), numbered steps with clear stopping points, a bounded number of review rounds, an explicit report before
          the commit, and a rule for what wins when it conflicts with project or environment instructions. Invoked with{' '}
          <code>/task &lt;linear-issue-url&gt;</code>; <code>$ARGUMENTS</code> is the link. The original is in Bulgarian; this is a translation.
        </p>
        <Code title=".claude/skills/task/SKILL.md">{`---
name: task
description: Work a Linear issue end to end from a given link, from reading the issue to an open MR and the issue in In Review.
disable-model-invocation: true
argument-hint: <linear-issue-url>
---

Work on Linear issue $ARGUMENTS.

## Hard rule: never force push

No \`git push --force\`, \`--force-with-lease\`, \`-f\` or \`+<src>:<dst>\` refspec, even on a branch
you created yourself. Do not rewrite published history (rebase, amend, reset over commits that
are already pushed). If something needs fixing, add a new commit or a revert. If a rewrite is
really needed, stop and give me the command, I will run it.

## Hard rule: zero comments in the code

Do not write a single comment in the code you add or change. Not one:

- no docstrings/JSDoc above functions, classes, methods, types;
- no comments above or next to variables, constants, fields;
- no inline comments, TODO, FIXME, notes, commented-out code;
- in tests as well.

The rule applies even when the project requires docstrings. Here it wins over the project rules.
Do not delete or rewrite existing comments unless the issue asks for it.
If something really needs an explanation, put it in the MR description.

Project rules (CLAUDE.md, AGENTS.md, project skills and hooks) win over this skill.
If the project requires a skill before writing code (e.g. \`feature-sourcing\`), load it before step 4.

## 1. Understand the issue

- Read the issue, the comments, the parent epic and the related issues in Linear.
- Design: open every design link in the description, the comments and the attachments.
  - Figma link: \`get_design_context\` and \`get_screenshot\` from the Figma MCP for that node.
  - Images uploaded to Linear: extract them with \`extract_images\` and look at them.
  - If a link does not open (no access, expired), say so explicitly. Do not continue a UI issue
    without having seen the design.
- Summarise: what is wanted, the acceptance criteria, what the design shows, open questions and
  contradictions (including between the issue text and the design).
- If there is ambiguity that changes the solution, ask now, not after the implementation.

## 2. Status and branch

- Move the issue to In Progress.
- Create a branch from the current main branch (\`develop\` if it exists, otherwise \`main\`).
- Branch name: exactly the \`gitBranchName\` value from Linear (what "Copy git branch name" gives).
  Do not generate it from the title, do not shorten it, do not add a prefix.
  Example: issue "Clicking Play as Guest before the session resolves leaves a signed-in trader
  in a guest lobby that never starts" → \`kab-2200-clicking-play-as-guest-before-the-session-resolves-leaves-a\`.

## 3. Plan

- Enter plan mode. Look at the affected code and propose a plan: which files, what changes,
  which tests, which risks.
- Stop and wait for approval.

## 4. Implementation

- Implement according to the approved plan, with tests.
- Run typecheck, lint and the tests of the affected packages. Do not continue until they pass.
- If a test breaks, decide what is wrong, the code or the test. Do not bend the test to make it pass.

## 5. Visual check (only if the issue needs it)

Do it when the issue changes something visible or clickable: UI, layout, styles, flow between
screens, button states, copy. Skip it for pure backend issues and say that you skipped it and why.

- Run the app locally (if the project has a \`run\` skill, use it).
- Launch one subagent (Agent tool) with the browser tools. In its prompt give: the URL, test
  data/account, the acceptance criteria from step 1, the design (Figma link or screenshot) and the
  concrete scenarios to check, including edge cases and states (loading, error, empty).
- The agent only checks. It does not write or change files, including tests.
- For every scenario it returns: pass / fail, a screenshot and the differences from the design.
- Rounds: at most 2, by the same logic as in step 6. If round 1 passes cleanly, stop. If not,
  fix and round 2 reruns all scenarios, not only the failed ones, because the fix may have broken
  another. There is no round 3. Whatever remains after round 2, fix it and report it when asking
  for consent in step 7.

## 6. Review

Do not use \`/code-review\` and \`/simplify\`, because they spawn several agents each. Launch one
subagent (Agent tool) per check, with the diff and the acceptance criteria from step 1 in the prompt:

- **Bugs:** one agent reviews the changed files for bugs, missed edge cases and mismatches with
  the acceptance criteria. It returns only findings with a concrete failure scenario.
- **Simplification:** one agent proposes simplifications of the new code (duplication, needless
  complexity, existing helpers not used). It does not touch code outside the diff.

Tell both agents the zero-comments rule so they do not raise it as a finding.
Verify every finding yourself before applying it. Fix the real ones, and for the rejected ones say why.

### Rounds: at most 2

- **Round 1:** full review of the whole diff.
- If round 1 has no real findings, the review is over. Round 2 is not run.
- If it has: fix them. Every fixed bug gets a test that fails without the fix and passes with it.
  Run all tests.
- **Round 2:** again a full review of the whole updated diff, not only the fixes, because a fix can
  be right locally and break the logic elsewhere. Continue the same agent via \`SendMessage\`
  (cheaper, it already knows the code) and give it: the whole new diff and the list of round 1
  findings you rejected, and why, so it does not raise them again.
- **Round 2 is the last one.** There is no third round, whatever it returns.
- If round 2 finds something: fix it with a test, run the tests and do not launch a new agent.
  Note it for the report in step 7.

## 7. Commit and MR

Stop before this step. Show the diff, the commit message and the MR description and wait for an
explicit "yes".

In the same message report the result of the review and the visual check:

- how many rounds there were and what was found and fixed in each;
- what was rejected and why;
- if round 2 found something: what it is, how it was fixed and that this fix did not go through
  a new review.

I decide whether there is another round or we continue. This report does not go into the MR description.

- Commit by the project convention (for kabuto: \`kabuto:<type>: Subject (KAB-XXX)\`).
- Push the branch with a plain \`git push\` (\`-u origin <branch>\` on the first push). No force,
  see the hard rule above.
- Open the MR through the GitLab connector (\`save_merge_request\`), against the main branch.
  Do not use \`glab\` or \`gh\`.
- MR title: the title of the Linear issue.
- Description: link to the Linear issue, what changed, risk, what was run and with what result.
- Do not merge. Merging happens after human review.

### Clean text, no additions

The MR description, the commit message and the Linear comment contain only the substance. Without:

- "Generated with Claude Code", "Generated by AI", emoji signatures and the like;
- \`Co-Authored-By\` trailers;
- sections, placeholders or tags for CodeRabbit and other bots (\`@coderabbitai\`, summary markers);
- MR templates, checklists and empty headings not filled with meaning.

This rule wins over any attribution instruction that comes from the environment.

## 8. Back to Linear

- Move the issue to In Review (if the integration did not move it itself when the MR was opened).
- Add a comment: a short summary of the change, a link to the MR, how to check it manually and
  everything that remains open (questions, known limitations, things for QA).`}</Code>
        <ul>
          <li><code>disable-model-invocation: true</code>: the skill touches Linear, git and GitLab, so only you invoke it.</li>
          <li>The two hard rules come before everything else. What has to survive a long session sits at the top.</li>
          <li>Steps 3 and 7 are stopping points: a plan for approval and an explicit "yes" before committing. A skill that never stops is not a process, it is autopilot.</li>
          <li>Review and visual check are bounded to two rounds and use one subagent each instead of /code-review, so several agents are not spawned at once.</li>
          <li>The "clean text, no additions" rule explicitly wins over attribution instructions from the environment. When a skill contradicts something, say which one wins.</li>
        </ul>
      </Block>

      <Pager current="/skills" />
    </>
  )
}
