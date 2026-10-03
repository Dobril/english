import { Link } from '../../../components/Link'
import { BeforeAfter, Block, Brief, Callout, Feat, PageHead, Pager } from '../../../components/Bits'

export function BriefsPage() {
  return (
    <>
      <PageHead
        mark="5"
        title="How to write a brief"
        lede="Goal: describe the outcome so that Claude gets it right the first time and you can check it in 15 seconds."
        chips={['outcome, not steps', 'success criteria', 'source of truth', 'clarifying questions']}
      />

      <Block title="A brief, not a prompt">
        <p>
          In <Feat>Chat</Feat> you ask a question and get an answer. In <Feat>Cowork</Feat> you hand over work and get a file. So the text
          you give Cowork looks more like a brief to a colleague than a question: what should come out, from which materials, in what
          shape, and how you will know it is good. Most weak results come from a missing piece in the brief, not from a weak model.
        </p>
        <Callout kind="rule">
          Describe the outcome, not the steps. "Build a table of spend by category with a totals row" beats "open the file, copy
          column B, then...". Claude works out the steps. You know what you want to hold in your hand at the end.
        </Callout>
      </Block>

      <Block title="The five parts of a good brief">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Part</th><th>What it answers</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td className="cat">Outcome</td><td>Which file, for whom, which decision it supports.</td><td>"An Excel budget vs actual for Q3, for the CFO, to decide where to cut."</td></tr>
              <tr><td className="cat">Inputs</td><td>Which files, folders, connectors. Which one is the source of truth when they disagree.</td><td>"Folder Q3/exports. If the ERP export and the manual sheet differ, trust the ERP."</td></tr>
              <tr><td className="cat">Format</td><td>xlsx, pptx, docx; template; language; length; tone.</td><td>"In Template_Report.docx, in English, two pages max, formal tone."</td></tr>
              <tr><td className="cat">Success criteria</td><td>3 to 5 things you can check.</td><td>"The grand total matches the export. Every category has a row. No blank cells in the Amount column."</td></tr>
              <tr><td className="cat">Constraints</td><td>What not to do.</td><td>"Do not touch the originals. Mark uncertain values VERIFY. Do not invent numbers. Ask before deleting."</td></tr>
            </tbody>
          </table>
        </div>
        <p className="muted small">Not every task needs all five. A short summary of one email needs only outcome and format. A file that will reach your manager needs all of them.</p>
      </Block>

      <Block title="A complete example">
        <Brief title="Brief to Cowork: expense report">{`You are in a Cowork session with access to the folder Q3. Save everything you create in Q3/OUTPUTS.

Outcome: an Excel expense report for July, August and September, for the CFO. He will decide which categories to restrict in Q4.

Inputs: the three CSV exports in Q3/exports (one per month) and Q3/categories.xlsx with the vendor → category map. If an export and a manual note disagree, trust the export.

Format: one xlsx with three sheets: Data (all rows, cleaned), Summary (by category and month, with formulas, not values), Checks (each month's total against the total in the export).

Success criteria:
1. The total in Summary matches the total in Data for every month.
2. No row without a category. Unknown vendors go to the category "To review".
3. Numbers use a thousands separator and two decimals.
4. The Checks sheet shows "OK" on every row.

Constraints: do not modify the files in exports. Do not invent categories that are not in categories.xlsx. If an amount is unreadable or implausible, leave it and mark the row VERIFY.

Before we begin, repeat my ask back to me in your own words and ask me every clarifying question you have.`}</Brief>
      </Block>

      <Block title="The habit that saves the most time">
        <p>
          End every larger brief with one sentence: "Before we begin, repeat my ask back to me and ask me every clarifying question
          you have." Answering five questions takes 30 seconds. The same five gaps found after the file is done cost another cycle
          and more tokens. The questions surface things you did not think to say: the period, the currency, what to do with empty
          rows, which date format.
        </p>
        <div className="grid-2">
          <div className="panel">
            <h3>Role and audience</h3>
            <p>"You are writing for a manager without a finance background. Prioritise clarity over completeness." Changes the tone, depth and vocabulary of the whole result.</p>
          </div>
          <div className="panel">
            <h3>Example instead of description</h3>
            <p>"Make it like Report_August.docx" beats three paragraphs explaining what a "good report" means. Put the good example in the folder and point to it.</p>
          </div>
          <div className="panel">
            <h3>Session context</h3>
            <p>First sentence in Cowork: "You are in a Cowork session with access to folder X. Save all outputs in X/OUTPUTS." Removes a whole class of file-location mistakes.</p>
          </div>
          <div className="panel">
            <h3>Parallel</h3>
            <p>"Process each of these 10 files and produce a separate one-page summary for each." Claude splits the work and runs it at the same time instead of one after another.</p>
          </div>
        </div>
      </Block>

      <Block title="Weak and good briefs">
        <BeforeAfter
          rows={[
            { label: 'Outcome instead of steps', before: 'Open the file, find the date column, sort it, then copy into a new sheet...', after: 'Create a sheet "By month" with the order count and total amount for each month of 2026, sorted chronologically.' },
            { label: 'Checkable criteria', before: 'Make a nice, professional presentation.', after: '8 slides, one message per slide, titles are conclusions, not topics. Template is Corporate.pptx. Last slide is "Next steps" with three points.' },
            { label: 'Source of truth', before: 'Here are three tables, merge them.', after: 'Merge the three tables. For a duplicated customer, trust CRM_export.xlsx. Describe the differences in a separate sheet "Discrepancies".' },
            { label: 'File, not advice', before: 'What do you think, how should I organise these photos?', after: 'Sort the 150 photos into subfolders by event and date with descriptive names. Delete nothing. Give me a list of what went where.' },
            { label: 'Audience', before: 'Explain the survey results.', after: 'Survey summary for leadership: 1 page, the three most important findings at the top, one recommendation for each. No methodology.' },
            { label: 'Constraints', before: 'Clean up the contact list.', after: 'Clean the list: remove exact duplicates, normalise phones to +44..., fix capitalisation in names. Flag suspected duplicates, do not delete them.' },
          ]}
        />
      </Block>

      <Block title="Common mistakes">
        <ul>
          <li><strong>Vague adjectives.</strong> "Nice", "professional", "detailed" mean different things to you and to Claude. Replace them with numbers and examples.</li>
          <li><strong>No success criteria.</strong> Then Claude decides when it is done. Write three things you will check and it will check them before you do.</li>
          <li><strong>Two deliverables in one brief.</strong> "Make the report and then a deck from it" works better in two steps: first the report, you review it, then the deck from the approved report.</li>
          <li><strong>No source of truth.</strong> With three files showing different numbers, Claude will pick one. Say which one is right up front.</li>
          <li><strong>"Recommend" when you mean "do".</strong> If you want the file, ask for the file. "How should I organise" gives advice; "Organise" gives a sorted folder.</li>
          <li><strong>Missing format.</strong> Without "xlsx" or "docx" you may get markdown or text in the chat.</li>
        </ul>
      </Block>

      <Block title="Correcting along the way">
        <ul>
          <li>Correct early. If the first intermediate result goes sideways, stop and say what to do instead. Do not wait for the end.</li>
          <li>Say "why" when correcting: "Use formulas, not values, because the sheet will be updated every month." The rule then carries forward.</li>
          <li>After a second correction on the same thing: start a new session with an improved brief that states it from the start. A long session full of fixes gives worse results than a clean session with a clear brief.</li>
          <li>Anything you fix every time is a candidate for an instruction in memory or for a skill (<Link to="/memory">section 3</Link>, <Link to="/skills">section 12</Link>).</li>
        </ul>
        <Callout kind="tip">
          Keep your working briefs. A Briefs.md file in the working folder with the briefs that produced good results. Next time you
          copy and change the names. After the third copy, turn it into a skill.
        </Callout>
      </Block>

      <Block title="Short briefs for every day">
        <Brief title="Chat: email">{`Reply to this email. Tone: polite but firm, we are declining the discount. Three sentences. Do not promise anything about timelines.`}</Brief>
        <Brief title="Chat: summary">{`Summarise the transcript in 200 words max: decisions, owners, deadlines. If something was discussed but not decided, put it under "Open questions".`}</Brief>
        <Brief title="Cowork: tidy up">{`The folder Downloads/Invoices has about 80 PDFs. Rename them as YYYY-MM-DD_Vendor_Number.pdf based on their content and sort them into subfolders by year. Delete nothing. If you cannot read a date or vendor, leave the file in a subfolder "To review".`}</Brief>
        <p>Briefs for specific kinds of work: <Link to="/spreadsheets">spreadsheets</Link>, <Link to="/presentations">presentations</Link>, <Link to="/documents">documents</Link>, <Link to="/analysis">analysis</Link>. How to check the result: <Link to="/verify">section 10</Link>.</p>
      </Block>

      <Pager current="/briefs" />
    </>
  )
}
