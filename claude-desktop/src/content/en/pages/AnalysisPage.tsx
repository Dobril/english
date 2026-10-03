import { Link } from '../../../components/Link'
import { Block, Brief, Callout, Feat, PageHead, Pager, Steps } from '../../../components/Bits'

export function AnalysisPage() {
  return (
    <>
      <PageHead
        mark="9"
        title="Complex analysis and research"
        lede="Goal: an analysis a decision can rest on. With sources, with assumptions, with numbers that trace back to the original."
        chips={['Research', 'many files', 'sub-agents', 'sources sheet', 'counter-argument']}
      />

      <Block title="What goes where">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Task</th><th>Chat</th><th>Cowork</th></tr></thead>
            <tbody>
              <tr><td className="cat">Market overview from the web</td><td><Feat>Research</Feat>: multi-step search with sources, takes minutes. You can queue messages while it runs.</td><td>When the result must be a file (xlsx competitor table, docx report) or must be combined with your internal documents.</td></tr>
              <tr><td className="cat">Analysis of 3 to 20 files</td><td>Upload them to the conversation or to <Feat>Projects</Feat>. Large knowledge bases use RAG in projects (paid plans).</td><td>Point at a folder. No uploads, no 20-file limit. Sub-agents read in parallel.</td></tr>
              <tr><td className="cat">50+ files, exports, transcripts</td><td>No. Context runs out and uploading is painful.</td><td>Yes. This is what Cowork is for. The result is written straight into the folder.</td></tr>
              <tr><td className="cat">Data from systems</td><td>Connectors work in Chat too (Drive, Sheets, Notion, Slack, Gmail).</td><td>Same connectors plus sites behind a login through the built-in browser or Claude in Chrome (<Link to="/browser">section 14</Link>).</td></tr>
              <tr><td className="cat">Interactive dashboard</td><td><Feat>Live artifacts</Feat>: a dashboard that opens and refreshes.</td><td>The same, saved as a file in the folder with the data next to it.</td></tr>
              <tr><td className="cat">Thinking out loud</td><td>Here. Questions, hypotheses, "what am I missing". <Feat>Extended thinking</Feat> is always on in the newest models.</td><td>No. Cowork is for a deliverable, not a conversation.</td></tr>
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="The method: eight steps for a serious analysis">
        <Steps items={[
          { title: 'The question and the decision behind it', body: <p>Not "analyse the market" but "we need to decide whether to enter Romania in 2027; what has to be true for that to make sense". The decision defines which data matters.</p> },
          { title: 'Inventory the sources and name the source of truth', body: <p>Which files, which systems, which sites. When two things disagree (CRM vs the sales Excel), you say up front which one wins.</p> },
          { title: 'Plan and assumptions first, work second', body: <p>"Before you start, write the analysis plan and every assumption you will make. Wait for approval." You correct the plan. Cheap here, expensive afterwards.</p> },
          { title: 'Run', body: <p>In Cowork: folder, connectors, a brief with success criteria. Let it work. Follow the steps in the sidebar; you can redirect mid-task.</p> },
          { title: 'Sources and assumptions sheet, confidence per claim', body: <p>Every result comes with a separate sheet or section: where each number came from, what was assumed, how confident (high, medium, low) and why.</p> },
          { title: 'Spot check', body: <p>Open 3 to 5 numbers against the original. If one is wrong, do not trust the rest until it is explained. Details in <Link to="/verify">section 10</Link>.</p> },
          { title: 'The counter-argument', body: <p>"What would make this conclusion wrong? Which data is missing? Who would argue and with what?" In a fresh session, so nobody defends their own work.</p> },
          { title: 'Only now the management summary', body: <p>One page: question, answer, the three most important numbers, risks, next steps. Appendices are for those who want to check.</p> },
        ]} />
      </Block>

      <Block title="An analysis brief: example">
        <Brief title="Cowork, folder Analysis/Romania-2027">{`We are preparing a decision on opening an office in Romania in 2027. The folder contains: our sales by country for 2024 to 2026 (xlsx), three market reports (pdf), transcripts of calls with two local partners (docx) and board notes (md).

Before you start: repeat the task back in your own words and ask me every clarifying question you have. Then write the analysis plan and the assumptions and wait for approval.

Deliverable: one xlsx with sheets Summary, Market, Our data, Scenarios (base, optimistic, pessimistic driven by an Assumptions sheet), Sources. Every number in Summary must trace to a cell or to a source in Sources. Mark numbers you are not sure about with VERIFY.

Source of truth when sources disagree: our sales xlsx. Currency: EUR, period: calendar years. Do not use web sources older than 2024.`}</Brief>
        <p className="muted small">The full rules for writing a brief: <Link to="/briefs">section 5</Link>.</p>
      </Block>

      <Block title="Templates for common analyses">
        <div className="grid-2">
          <div className="panel">
            <h3>Market overview with sources</h3>
            <p>Research in Chat for the web part, then Cowork to combine with internal data. Ask for: size, growth, players, regulation, and a table with source and date for every row.</p>
          </div>
          <div className="panel">
            <h3>Competitor matrix</h3>
            <p>Criteria you define (price, features, markets, team). One row per competitor, one column per criterion, a source for every cell. An empty cell instead of an invented one.</p>
          </div>
          <div className="panel">
            <h3>Budget vs actual</h3>
            <p>Two files, one result: variance per line in absolute and percent, top 5 variances with the explanation from the notes if there is one. Formulas, not values.</p>
          </div>
          <div className="panel">
            <h3>Survey responses to themes</h3>
            <p>Free text into 5 to 8 themes with counts and 2 to 3 verbatim quotes per theme. The sheet with every response and its assigned theme stays for checking.</p>
          </div>
          <div className="panel">
            <h3>Policy or contract comparison</h3>
            <p>Clause by clause, with section number and quote from each document. What one is missing relative to the other. Where they contradict.</p>
          </div>
          <div className="panel">
            <h3>Supplier due diligence</h3>
            <p>Registers and website through the browser, financial statements from the folder, news from Research. Result: profile, red flags, questions for the meeting.</p>
          </div>
          <div className="panel">
            <h3>Scenarios with an Assumptions sheet</h3>
            <p>Every assumption is a cell on a separate sheet and the scenarios calculate from it. Change one number and everything recomputes. Otherwise it is a picture, not a model.</p>
          </div>
          <div className="panel">
            <h3>Weekly report from systems</h3>
            <p>Connectors to Search Console, Ads, CRM. Once it is done well it becomes a <Link to="/scheduled">recurring task</Link> and you only read the result.</p>
          </div>
        </div>
      </Block>

      <Block title="Where it breaks">
        <ul>
          <li><strong>Invented numbers and citations.</strong> The model can write a plausible number with no source. That is why the Sources sheet is mandatory, not optional. A number without a source gets VERIFY or gets removed.</li>
          <li><strong>Bias in the brief.</strong> "Prove Romania is a good idea" produces an analysis that proves it. Ask neutrally and request the counter-argument separately.</li>
          <li><strong>Weak web sources.</strong> A blog, a repost, a page without a date. Say which sources you accept (regulators, official statistics, annual reports) and a minimum year.</li>
          <li><strong>Mixed currencies and periods.</strong> Fiscal vs calendar year, EUR vs USD, with and without VAT. Fix them in the brief and ask for a column with the original unit.</li>
          <li><strong>Prompt injection.</strong> A PDF from an outside supplier or a web page can carry hidden instructions. Do not run analyses over unverified documents with "act without asking". Details in <Link to="/connectors">section 11</Link>.</li>
          <li><strong>Context runs out.</strong> A long conversation with many files loses the instructions from the start. In Chat: a new conversation with a summary. In Cowork: a folder and sub-agents instead of one long conversation.</li>
        </ul>
        <Callout kind="rule">
          An analysis without a sources and assumptions sheet is shown to nobody. An analysis without a spot check is not called verified.
        </Callout>
      </Block>

      <Block title="Small habits that raise quality">
        <ul>
          <li>Ask first for "what I would want to know that the data does not contain". It removes the illusion of completeness.</li>
          <li>Give an example of a previous good analysis: "follow the structure of Q2-review.xlsx". Structure transfers better than description.</li>
          <li>Ask for a separate file for management and a separate one for the reviewers. Not one file trying to be both.</li>
          <li>Write what worked into the project instructions (<Link to="/memory">section 3</Link>). The next analysis starts from there.</li>
        </ul>
      </Block>

      <Pager current="/analysis" />
    </>
  )
}
