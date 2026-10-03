import { Link } from '../../../components/Link'
import { nav } from '../data/nav'
import { Callout, Cmd } from '../../../components/Bits'

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="eyebrow">Personal handbook, October 2026</div>
        <h1>How to work with Claude Code so it does the job instead of doing it twice</h1>
        <p className="lede">
          Claude Code is not a chat that writes code. It is an executor with tools: it reads files, runs commands, makes changes and
          verifies the result on its own. This handbook explains when to do what, why each command exists, how to write an issue in
          Linear and a prompt for Claude, what to run for verification and who merges.
        </p>
        <div className="meta">
          <span className="chip">18 sections</span>
          <span className="chip">over 80 commands explained</span>
          <span className="chip">verified videos and articles</span>
          <span className="chip">Bulgarian and English</span>
        </div>
      </section>

      <section className="grid-2">
        <div className="panel accent">
          <h3>One rule above all</h3>
          <p>
            <strong>Context is the most valuable resource.</strong> Everything Claude has read, said and seen in the session sits in
            the context window. It fills up fast and quality drops as it fills. Almost every good practice here follows from that:
            a clean session per task (<Cmd>/clear</Cmd>), a plan before code, a short CLAUDE.md, exploration through subagents,
            verification instead of trust.
          </p>
          <p><Link to="/how-it-works">Why that is: how Claude Code thinks</Link></p>
        </div>
        <div className="panel">
          <h3>Quick start for day one</h3>
          <ol>
            <li>Install, sign in, run <Cmd>/doctor</Cmd> and <Cmd>/statusline</Cmd>. (<Link to="/setup">section 2</Link>)</li>
            <li>In the project: <Cmd>/init</Cmd>, then trim CLAUDE.md to under 200 lines. (<Link to="/claude-md">section 3</Link>)</li>
            <li>Add the safe commands to allow with <Cmd>/permissions</Cmd>, the dangerous ones to deny.</li>
            <li>Connect Linear and GitHub: <code>claude mcp add</code> and <code>gh auth login</code>. (<Link to="/mcp">section 12</Link>)</li>
            <li>First task: pick an AI-ready issue, Shift+Tab into plan mode, plan, implement, <Cmd>/code-review</Cmd>, PR. (<Link to="/workflow">section 4</Link>)</li>
          </ol>
        </div>
        <div className="panel">
          <h3>The rhythm of one task</h3>
          <div className="flow">
            <div className="flow-step"><div className="n">1</div><div className="t">Issue</div><div className="d">AI-ready in Linear</div></div>
            <div className="flow-step"><div className="n">2</div><div className="t">Plan</div><div className="d">plan mode, you correct it</div></div>
            <div className="flow-step"><div className="n">3</div><div className="t">Code</div><div className="d">with tests and checks</div></div>
            <div className="flow-step"><div className="n">4</div><div className="t">Review</div><div className="d">/diff, /code-review</div></div>
            <div className="flow-step"><div className="n">5</div><div className="t">PR and merge</div><div className="d">Claude opens, you merge</div></div>
          </div>
          <p className="muted">In detail, with commands and prompts for every step, in <Link to="/workflow">Workflow for a task</Link>.</p>
        </div>
        <div className="panel">
          <h3>How the handbook is built</h3>
          <ul>
            <li><strong>Foundations</strong>: how the tool works and how to set it up once.</li>
            <li><strong>Daily work</strong>: the process from issue to merge, prompts, Linear, verification, git.</li>
            <li><strong>Extensions</strong>: hooks, subagents, skills, MCP, parallel work. Once the basics are habit.</li>
            <li><strong>Reference</strong>: all commands with when and why, keys, practices, resources, glossary.</li>
          </ul>
        </div>
      </section>

      <Callout kind="rule" title="Who is responsible for what">
        Claude: explores, plans, writes, tests, opens the PR, updates Linear. You: pick the issue, approve the plan, read the diff,
        review the PR and merge. Automate the checks with hooks, not the trust.
      </Callout>

      <section>
        <div className="eyebrow">All sections</div>
        {nav.slice(1).map((g) => (
          <div key={g.title}>
            <h3 className="mt" style={{ fontSize: '1rem', marginTop: 16 }}>{g.title}</h3>
            <div className="page-cards">
              {g.items.map((it) => (
                <Link key={it.to} to={it.to} className="page-card">
                  <div className="page-card-num">{it.mark}</div>
                  <div className="page-card-title">{it.label}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
