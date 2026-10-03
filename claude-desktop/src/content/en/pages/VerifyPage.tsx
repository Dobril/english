import { Link } from '../../../components/Link'
import { Block, Brief, Callout, Feat, PageHead, Pager } from '../../../components/Bits'

export function VerifyPage() {
  return (
    <>
      <PageHead
        mark="10"
        title="Checking the result"
        lede="Goal: know what is true before you send, present or sign it. Claude checks what it can run on its own. You check what matters."
        chips={['spot check numbers', 'formulas, not values', 'open the file', 'Checks sheet', 'VERIFY']}
      />

      <Block title="Two kinds of checking">
        <div className="grid-2">
          <div className="panel accent">
            <h3>Checks Claude can run itself</h3>
            <p>If you ask for them in the brief, they happen before you see the file:</p>
            <ul>
              <li>Totals reconcile: the sum by category equals the grand total; the grand total equals the one in the source.</li>
              <li>Rows in equals rows out (plus an explanation for every difference).</li>
              <li>Formula audit: no hard-coded numbers where a formula should be.</li>
              <li>The file is reopened after saving and read back: sheets, columns and formats are as requested.</li>
              <li>Every source on the Sources sheet really exists and was opened.</li>
            </ul>
          </div>
          <div className="panel">
            <h3>Checks that are yours</h3>
            <p>Because you carry the responsibility, and because Claude does not see what you know:</p>
            <ul>
              <li>Whether the number is plausible against the reality you know.</li>
              <li>Whether the conclusion answers the question you were actually asked.</li>
              <li>Whether tone, format and recipient are right.</li>
              <li>Whether something sensitive ended up where it should not be.</li>
            </ul>
          </div>
        </div>
      </Block>

      <Block title="What you check, in order of importance">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>What</th><th>How</th><th>How much</th></tr></thead>
            <tbody>
              <tr><td className="cat">Numbers</td><td>Spot check against the source. Totals. Sign (plus or minus), unit (thousands or units), currency, period.</td><td>3 to 5 numbers, always including the largest and one from the middle.</td></tr>
              <tr><td className="cat">Formulas</td><td>Click into 2 to 3 cells: formula or value. Trace one chain from result to input. Claude for Excel can audit a whole sheet.</td><td>Every sheet with calculations.</td></tr>
              <tr><td className="cat">Facts and citations</td><td>Open 2 to 3 sources. Do they exist, do they say this, what is their date.</td><td>The key claims in the summary.</td></tr>
              <tr><td className="cat">Formatting</td><td>Open the file in the real application, not the preview. Template, fonts, text overflowing a slide, hidden columns, numbering in a document.</td><td>Every slide, first and last page, every sheet.</td></tr>
              <tr><td className="cat">Completeness</td><td>The success criteria from the brief, one by one. What was skipped and why.</td><td>All criteria.</td></tr>
              <tr><td className="cat">Nothing deleted or overwritten</td><td>Originals intact. <Feat>Cowork</Feat> always asks before deleting; overwriting a file is sneakier, so work on a copy.</td><td>The folder before and after.</td></tr>
              <tr><td className="cat">Sensitive data</td><td>Personal data, salaries, client names in a deck for outsiders, internal notes in a client document.</td><td>Every file that leaves the team.</td></tr>
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="Checklists by deliverable">
        <div className="grid-2">
          <div className="panel">
            <h3>xlsx</h3>
            <ul>
              <li>The grand total equals the one in the source.</li>
              <li>Calculations are formulas; assumptions live on a separate sheet.</li>
              <li>No #REF!, #DIV/0, #N/A. No hidden sheets with data you do not know about.</li>
              <li>Dates are dates, not text. Numbers are numbers.</li>
              <li>Every VERIFY row has been reviewed and resolved.</li>
            </ul>
          </div>
          <div className="panel">
            <h3>pptx</h3>
            <ul>
              <li>Opened in PowerPoint or Keynote, not only in the preview. Every slide.</li>
              <li>Text does not overflow its boxes. Fonts are from the template.</li>
              <li>Numbers on the slides match the Excel file behind them.</li>
              <li>Speaker notes contain nothing that should not be seen when shared.</li>
              <li>Details in <Link to="/presentations">section 7</Link>.</li>
            </ul>
          </div>
          <div className="panel">
            <h3>docx</h3>
            <ul>
              <li>Structure and numbering without gaps. The table of contents is updated.</li>
              <li>Defined terms are used consistently. Cross-references point where they should.</li>
              <li>Tracked changes reviewed one by one, not accepted in bulk.</li>
              <li>No template leftovers: [name], [date], yellow highlights.</li>
            </ul>
          </div>
          <div className="panel">
            <h3>Email</h3>
            <ul>
              <li>Recipients and copies. Attachments are attached and are the right version.</li>
              <li>The tone is yours. Nothing you would not say out loud.</li>
              <li>Nothing is sent automatically. The send tool stays on "Needs approval" (<Link to="/connectors">section 11</Link>).</li>
            </ul>
          </div>
          <div className="panel">
            <h3>Analysis</h3>
            <ul>
              <li>A Sources sheet exists and every row leads to a real document or address.</li>
              <li>Assumptions are listed. Confidence is stated per claim.</li>
              <li>The counter-argument was requested and read (<Link to="/analysis">section 9</Link>).</li>
            </ul>
          </div>
        </div>
      </Block>

      <Block title="Ask for the check in the brief">
        <p>The best check is the one requested before the work. Three lines at the end of the brief:</p>
        <Brief title="End of every brief for a file">{`Before you hand me the file:
1. Add a Checks sheet (or a final Checks page) with: every check you ran, the result, and what you could not verify.
2. Mark every number you are unsure about, or that comes from an unclear source, with VERIFY in the adjacent cell or a comment.
3. Reopen the saved file and confirm the sheets, columns and formats are exactly as requested.`}</Brief>
      </Block>

      <Block title="A second pair of eyes: self-review in a fresh session">
        <p>
          The author is a poor reviewer of their own work, and that includes when the author is Claude. The same conversation will
          defend its decisions. A fresh session that has not seen the reasoning finds different things.
        </p>
        <Brief title="New conversation, only the output file and the inputs attached">{`Review this file as a sceptical auditor. Do not fix it. List:
- every number on the Summary sheet you cannot trace to the input data or to Sources;
- every formula whose logic differs from its neighbours in the same column;
- every claim without a source, or with a source older than 2024;
- what you would ask the author before signing.`}</Brief>
        <p className="muted small">The same works for a document ("as the other side's lawyer") and for a deck ("as a board member with 5 minutes").</p>
      </Block>

      <Block title="When something is wrong">
        <ul>
          <li><strong>Small error, clear cause</strong>: fix it in the same session. "In cell D14 the total includes VAT, elsewhere it is net. Make everything net and recalculate."</li>
          <li><strong>Second correction of the same thing</strong>: stop. The context is full of failed attempts. New session with a better brief that says exactly what must not happen and why.</li>
          <li><strong>An error that will repeat</strong>: a line in the project instructions, in Global instructions or in the folder's CLAUDE.md (<Link to="/memory">section 3</Link>). "Always net of VAT. Always EUR. Always a Checks sheet."</li>
          <li><strong>An error in the process, not the content</strong>: update the skill, if the task runs from one (<Link to="/skills">section 12</Link>).</li>
        </ul>
        <Callout kind="rule" title="The rule above all others">
          Nothing is sent, presented or signed without a human reading it. The official documentation for Claude for Excel, Word and
          PowerPoint says the same: not for final client deliverables without human review, not for audit-critical calculations without verification.
        </Callout>
      </Block>

      <Pager current="/verify" />
    </>
  )
}
