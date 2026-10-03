import { Link } from '../../../components/Link'
import { nav } from '../data/nav'
import { Callout, Feat } from '../../../components/Bits'

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="eyebrow">Personal handbook, October 2026</div>
        <h1>How to work with Claude Desktop so that I get finished files, not advice on how to make them</h1>
        <p className="lede">
          Claude Desktop has two modes for office work. <Feat>Chat</Feat> is for questions, drafts and thinking. <Feat>Cowork</Feat> is an
          agent that works on your folders and returns Excel with formulas, presentations, documents and analyses. The handbook
          explains when to use which, how to write a brief, how to check the result, how to connect Gmail, Drive, Slack and Office,
          and how repeating work becomes a skill or a scheduled task.
        </p>
        <div className="meta">
          <span className="chip">19 sections</span>
          <span className="chip">50+ features with when and why</span>
          <span className="chip">verified videos and docs</span>
          <span className="chip">Bulgarian and English</span>
        </div>
      </section>

      <section className="grid-2">
        <div className="panel accent">
          <h3>One rule above all</h3>
          <p>
            <strong>Chat for a thought, Cowork for a result you will hand to someone.</strong> If what you want fits in a few
            exchanges, it is chat. If it is a file someone else will open, a deck you will present or a table that will be updated,
            it is Cowork. Almost every good practice here follows from that: an outcome-first brief, success criteria, checking the
            numbers before anything leaves your computer.
          </p>
          <p><Link to="/how-it-works">Why: how each of the two modes thinks</Link></p>
        </div>
        <div className="panel">
          <h3>Quick start for day one</h3>
          <ol>
            <li>Install the app, sign in, turn on <Feat>Memory</Feat> and "Code execution and file creation". (<Link to="/setup">section 2</Link>)</li>
            <li>Make a folder Documents/Cowork with INPUTS, OUTPUTS, TEMPLATES. Write 20 lines of <Feat>Global instructions</Feat>. (<Link to="/memory">section 3</Link>)</li>
            <li>Connect Google Drive or Microsoft 365 and your mail from Customize. (<Link to="/connectors">section 11</Link>)</li>
            <li>First task: something familiar where you know what a good result looks like. Ask Claude to repeat the ask and ask questions before it starts. (<Link to="/workflow">section 4</Link>)</li>
            <li>Open the file and check 3 numbers against the source. (<Link to="/verify">section 10</Link>)</li>
          </ol>
        </div>
        <div className="panel">
          <h3>The rhythm of one task</h3>
          <div className="flow">
            <div className="flow-step"><div className="n">1</div><div className="t">Inputs</div><div className="d">copies in the working folder</div></div>
            <div className="flow-step"><div className="n">2</div><div className="t">Brief</div><div className="d">outcome, format, criteria</div></div>
            <div className="flow-step"><div className="n">3</div><div className="t">Questions</div><div className="d">Claude repeats and asks</div></div>
            <div className="flow-step"><div className="n">4</div><div className="t">Work</div><div className="d">you watch, correct early</div></div>
            <div className="flow-step"><div className="n">5</div><div className="t">Check</div><div className="d">numbers, formulas, format</div></div>
          </div>
          <p className="muted">In detail, with briefs for every step, in <Link to="/workflow">Workflow for one task</Link>.</p>
        </div>
        <div className="panel">
          <h3>How the handbook is built</h3>
          <ul>
            <li><strong>Foundations</strong>: the two modes, one-time setup, instructions and memory.</li>
            <li><strong>Daily work</strong>: the process for one task, briefs, then by kind of work: spreadsheets, decks, documents, analyses, checking.</li>
            <li><strong>Extensions</strong>: connectors, skills and plugins, scheduled and background work, browser and Office add-ins. Once the basics are a habit.</li>
            <li><strong>Reference</strong>: all features with when and why, keys and settings, practices, resources, glossary.</li>
          </ul>
        </div>
      </section>

      <Callout kind="rule" title="Who is responsible for what">
        Claude: reads the inputs, asks, plans, builds the file, formats, runs the checks you gave it. You: choose the task, provide
        the inputs, approve the plan, verify numbers and facts, send and present. Nothing is sent, signed or deleted without you.
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
