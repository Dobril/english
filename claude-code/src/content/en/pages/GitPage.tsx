import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager } from '../../../components/Bits'

export function GitPage() {
  return (
    <>
      <PageHead
        mark="8"
        title="Git, PRs and merging"
        lede="Goal: Claude commits and opens PRs, you decide what goes into main. With clear rules for when there are exceptions."
        chips={['branch', 'commit', 'gh', 'PR', 'merge', 'worktree', 'rewind vs git']}
      />

      <Block title="Division of roles">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Action</th><th>Who</th><th>Why</th></tr></thead>
            <tbody>
              <tr><td className="cat">Creating a branch</td><td>Claude (or the worktree at start)</td><td>Mechanical. The naming rule is in CLAUDE.md.</td></tr>
              <tr><td className="cat">Commit</td><td>Claude, on your command</td><td>It sees the whole diff and the conversation and writes a better message than you. But you say when.</td></tr>
              <tr><td className="cat">Push and PR</td><td>Claude via gh</td><td>The PR description comes from the same context. Saves you 10 minutes per task.</td></tr>
              <tr><td className="cat">Addressing comments</td><td>Claude</td><td>"Look at the comments on PR #45 and address them". You review the answers.</td></tr>
              <tr><td className="cat">PR review</td><td>You, plus @claude in a fresh context</td><td>The human carries the responsibility. Claude in the PR catches what the author-Claude missed.</td></tr>
              <tr><td className="cat">Merge into main</td><td><strong>You</strong></td><td>Irreversible for the team. Green CI plus your review.</td></tr>
              <tr><td className="cat">Force push, rebase of a shared branch, deletion</td><td>Nobody automatically</td><td>In the deny list.</td></tr>
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="Should Claude merge: the rules">
        <Callout kind="rule" title="Default">
          Claude does not merge. CLAUDE.md says "Do not merge: a human merges after review." The PR prompt says "Do not merge".
          Permissions do not include <code>gh pr merge</code>.
        </Callout>
        <p className="mt">Exceptions you decide and write into CLAUDE.md:</p>
        <ul>
          <li><strong>Personal project without a team</strong>: Claude may merge after green CI and your "ok" in the session. You still read the diff.</li>
          <li><strong>Mechanical PRs</strong> (formatting, a dependency bump with passing tests, generated files): allowed, with a label and a rule in CLAUDE.md.</li>
          <li><strong>Background tasks</strong> (<Cmd>/autofix-pr</Cmd>, routines): they push fixes to the branch, they do not merge.</li>
        </ul>
        <p>The reasoning: the merge is the only action in the process that affects everyone and cannot be undone with /rewind. Everything else Claude can do freely, because the branch is its sandbox.</p>
      </Block>

      <Block title="Rules for branches and commits (in CLAUDE.md)">
        <Code title="CLAUDE.md, Git section">{`## Git
- Always in a branch. Never commit directly to main.
- Branch: feature/<linear-id>-<short>, fix/<linear-id>-<short>
- Commit: imperative, under 72 chars in the subject, blank line, "why" in the body.
- One logical commit per step. No "WIP", no "fix" without context.
- Commit only when I ask or when the issue explicitly requires it.
- PR via gh: title like the commit, description with what/why/how tested/link to the issue.
- Do not merge. Do not force push. Do not delete branches.`}</Code>
        <p>Claude Code adds a co-author line to commit messages. If the team does not want it, say so in CLAUDE.md.</p>
      </Block>

      <Block title="Typical prompts">
        <Code title="commit">{`Commit the current changes. Look at git diff and git log -5 for the style.
One message, imperative, with "why" in the body. Do not add files outside the task.`}</Code>
        <Code title="PR">{`Push the branch and open a PR to main via gh pr create. Title under 70 chars.
Description: What / Why / How tested (with the commands) / Linear: KAB-123. Do not merge.`}</Code>
        <Code title="review comments">{`Look at the comments on PR #45 (gh pr view 45 --comments and gh api for review threads).
For each: either address it with a change, or explain to me why you disagree. Do not push before I review.`}</Code>
        <Code title="conflict">{`Rebase the branch onto main and resolve the conflicts, keeping the behavior from both sides.
Run the tests afterwards. Show me the conflict sites and how you resolved them.`}</Code>
      </Block>

      <Block title="@claude in GitHub">
        <ul>
          <li><Cmd>/install-github-app</Cmd> installs the Claude GitHub App and optionally the workflow file.</li>
          <li>Then in a PR or issue: "@claude review this PR for race conditions" or "@claude implement this issue".</li>
          <li>The review from the GitHub Action runs in a fresh context: it has not seen how the code was written. So it catches different things than the session.</li>
          <li>Boris Cherny adds a rule: when @claude catches an anti-pattern, it goes into CLAUDE.md so it does not repeat.</li>
        </ul>
      </Block>

      <Block title="Worktrees for parallel tasks">
        <Code title="terminal">{`claude -w KAB-123          # new worktree in .claude/worktrees/KAB-123 on branch worktree-KAB-123
claude -w KAB-123 -r       # resume the same one
git worktree list          # what exists
git worktree remove .claude/worktrees/KAB-123`}</Code>
        <ul>
          <li>Every session in its own copy of the repo: edits do not collide.</li>
          <li>Claude blocks attempts from a worktree to touch the main checkout.</li>
          <li><code>.worktreeinclude</code> copies gitignored files (.env) into every new worktree.</li>
          <li>On exit Claude asks whether to keep or remove the worktree. More in <Link to="/parallel">section 13</Link>.</li>
        </ul>
      </Block>

      <Block title="Rewind is not git">
        <ul>
          <li><Cmd>/rewind</Cmd> (Esc Esc) restores files to a checkpoint before a given prompt of yours. It tracks only changes made through Claude's tools, not Bash commands or external processes.</li>
          <li>Use it for "try the risky thing, if it fails we go back". Do not use it as a replacement for a commit.</li>
          <li>Small commits at every working step are the safest net. Ask for them in the refactor prompt.</li>
        </ul>
      </Block>

      <Block title="Git permissions in settings.json">
        <Code title=".claude/settings.json (excerpt)">{`"allow": [
  "Bash(git status *)", "Bash(git diff *)", "Bash(git log *)", "Bash(git branch *)",
  "Bash(git checkout -b *)", "Bash(git add *)", "Bash(git commit *)", "Bash(git push -u origin *)",
  "Bash(gh pr create *)", "Bash(gh pr view *)", "Bash(gh pr diff *)", "Bash(gh pr list *)"
],
"deny": [
  "Bash(git push --force *)", "Bash(git push -f *)", "Bash(git reset --hard *)",
  "Bash(git branch -D *)", "Bash(git clean *)", "Bash(gh pr merge *)"
]`}</Code>
      </Block>

      <Pager current="/git" />
    </>
  )
}
