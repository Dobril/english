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

      <Pager current="/skills" />
    </>
  )
}
