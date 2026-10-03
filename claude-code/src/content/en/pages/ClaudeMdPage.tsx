import { Link } from '../../../components/Link'
import { Block, Callout, Cmd, Code, PageHead, Pager } from '../../../components/Bits'

export function ClaudeMdPage() {
  return (
    <>
      <PageHead
        mark="3"
        title="CLAUDE.md and memory"
        lede="Goal: Claude knows about the project what it cannot read from the code, and nothing more."
        chips={['CLAUDE.md', 'CLAUDE.local.md', '.claude/rules/', 'auto memory', '@import']}
      />

      <Block title="What CLAUDE.md is">
        <p>
          A Markdown file Claude reads at the start of every session. The project's long-term memory: build and test commands,
          style that differs from the default, rules for branches and PRs, known traps. There is no required format. Generate a
          starter with <Cmd>/init</Cmd>, then maintain it like code.
        </p>
      </Block>

      <Block title="Where it lives and how it loads">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>File</th><th>Scope</th><th>When it loads</th><th>In git?</th></tr></thead>
            <tbody>
              <tr><td className="k">~/.claude/CLAUDE.md</td><td>All your projects</td><td>Always</td><td>no</td></tr>
              <tr><td className="k">./CLAUDE.md</td><td>The project, shared with the team</td><td>Always</td><td>yes</td></tr>
              <tr><td className="k">./CLAUDE.local.md</td><td>The project, only for you</td><td>Always</td><td>no</td></tr>
              <tr><td className="k">packages/api/CLAUDE.md</td><td>Subfolder (monorepo)</td><td>When Claude works there</td><td>yes</td></tr>
              <tr><td className="k">.claude/rules/*.md</td><td>Rules for specific paths</td><td>When it opens a file matching paths:</td><td>yes</td></tr>
            </tbody>
          </table>
        </div>
        <p className="muted small">The files are additive: all levels combine. Check with <Cmd>/context</Cmd> that they loaded.</p>
      </Block>

      <Block title="What goes in and what does not">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Include</th><th>Exclude</th></tr></thead>
            <tbody>
              <tr><td>Bash commands Claude cannot guess (build, test, lint, migrations)</td><td>Anything visible from the code</td></tr>
              <tr><td>Style that differs from the language default</td><td>Standard conventions the model knows</td></tr>
              <tr><td>How tests run and which runner</td><td>Detailed API documentation (link to it)</td></tr>
              <tr><td>Rules for branches, commit messages, PRs</td><td>Things that change often</td></tr>
              <tr><td>Architecture decisions specific to the project</td><td>Long explanations and tutorials</td></tr>
              <tr><td>Environment quirks (env variables, ports)</td><td>A file-by-file description</td></tr>
              <tr><td>Traps and non-obvious behavior</td><td>"Write clean code" and other truisms</td></tr>
            </tbody>
          </table>
        </div>
        <Callout kind="rule">
          For every line ask: "If I remove it, will Claude make a mistake?" If not, cut it. A long CLAUDE.md makes Claude ignore the
          important rules too. If one rule keeps getting skipped, add "IMPORTANT" to that line only. If you emphasize ten lines,
          none stands out.
        </Callout>
      </Block>

      <Block title="Example CLAUDE.md for a Node/TypeScript project">
        <Code title="CLAUDE.md">{`# Project: Kabuto CMS (API + admin)

## Commands
- npm run dev            # API on :3000, admin on :5173
- npm test               # vitest; run single files: npm test -- src/x.test.ts
- npm run typecheck      # tsc --noEmit, required before commit
- npm run lint           # eslint + prettier check
- npm run db:migrate     # Prisma migrations; NEVER db:reset without explicit approval

## Style
- ES modules, no CommonJS. Destructure imports.
- Comments only for "why", not "what". No obvious comments.
- No em dash in text and messages; use a comma or a period.

## Git
- Branch: feature/<linear-id>-<short>, e.g. feature/KAB-123-retry-webhook
- Commit: imperative, under 72 chars, body with "why". No "WIP".
- PR via gh. Do not merge: a human merges after review.

## Traps
- src/legacy/ is not touched without an issue that explicitly asks for it.
- Payment tests use Stripe test mode; keys are in .env (do not read them).

## When compacting, keep
- the list of changed files and the test commands that were run`}</Code>
      </Block>

      <Block title="Imports and path-scoped rules">
        <Code title="CLAUDE.md with imports">{`See the team's shared rules: @docs/engineering-rules.md
API conventions: @packages/api/CONVENTIONS.md`}</Code>
        <Code title=".claude/rules/database.md">{`---
paths: ["prisma/**", "src/db/**"]
---
- Every schema change comes with a migration and an updated seed.
- Never modify old migrations; add a new one.`}</Code>
        <p>Path-scoped rules load only when Claude opens a matching file. So the context does not fill with database rules while you work on CSS.</p>
      </Block>

      <Block title="Auto memory: what Claude remembers on its own">
        <ul>
          <li>Between sessions Claude keeps notes (MEMORY.md) about what it learned: preferences, decisions, quirks.</li>
          <li><Cmd>/memory</Cmd> shows the entries, toggles the feature and opens the CLAUDE.md files for editing.</li>
          <li>You can say "remember that we always run migrations through docker compose" and the note stays for the next session.</li>
          <li>Auto memory is personal. Anything the team must know goes in CLAUDE.md, not in memory.</li>
        </ul>
      </Block>

      <Block title="Maintenance: CLAUDE.md is code">
        <ul>
          <li>Every time Claude makes a recurring mistake, add a line. The creator of Claude Code updates the team CLAUDE.md several times a week.</li>
          <li>Once a month: <Cmd>/doctor</Cmd> proposes what can be cut because it is derivable from the code.</li>
          <li>If Claude asks things that are in CLAUDE.md, the wording is ambiguous. Rewrite it.</li>
          <li>Workflows needed only sometimes (e.g. a release procedure) are not for CLAUDE.md. They are <Link to="/skills">skills</Link> and load on demand.</li>
          <li>Something that must happen always and without exception (formatting, a ban on writing to migrations/) is not an instruction but a <Link to="/hooks">hook</Link>.</li>
        </ul>
      </Block>

      <Pager current="/claude-md" />
    </>
  )
}
