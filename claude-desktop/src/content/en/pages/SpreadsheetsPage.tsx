import { Link } from '../../../components/Link'
import { Block, Brief, Callout, Feat, PageHead, Pager, Steps } from '../../../components/Bits'

export function SpreadsheetsPage() {
  return (
    <>
      <PageHead
        mark="6"
        title="Excel and spreadsheets"
        lede="Goal: spreadsheets with working formulas, reconciled totals and clearly flagged doubtful rows, without risking the only original."
        chips={['Chat', 'Cowork', 'Claude for Excel', 'formulas, not values', 'VERIFY']}
      />

      <Block title="Three ways to work with a spreadsheet">
        <div className="grid-3">
          <div className="panel">
            <h3><Feat>Chat</Feat></h3>
            <p>Upload the file and ask. Analysis, charts, explanations, a new xlsx through the built-in xlsx skill. Limits are around 20 files and 30 MB per conversation. For one-off questions and quick lookups.</p>
          </div>
          <div className="panel">
            <h3><Feat>Cowork</Feat></h3>
            <p>Works on the real files in your folder. Builds xlsx with working formulas and several sheets, processes whole folders of receipts, invoices or CSV exports, adds a totals row and flags VERIFY rows. For a result you will send to someone.</p>
          </div>
          <div className="panel">
            <h3><Feat>Claude for Excel</Feat></h3>
            <p>An add-in inside Excel. Questions with cell-level citations, changing assumptions without breaking formulas, root cause of #REF! and #DIV/0, filling templates. For a workbook that is already open in front of you.</p>
          </div>
        </div>
        <Callout kind="tip" title="Which one when">
          The file is open and you are asking about it: Excel add-in. The files are in a folder and a new file has to come out: Cowork.
          A one-off question about one file or you want a chart in the chat: Chat.
        </Callout>
      </Block>

      <Block title="Claude for Excel: what it does">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Task</th><th>How you ask</th></tr></thead>
            <tbody>
              <tr><td className="cat">Understanding the model</td><td>"Walk me through how the number in C42 is calculated." The answer has cell citations, click and you are there.</td></tr>
              <tr><td className="cat">Changing an assumption</td><td>"Change the discount rate to 8% and update dependent calculations." Formulas stay, dependent cells recompute.</td></tr>
              <tr><td className="cat">Errors</td><td>"Find the source of the #REF! error in the Summary tab." "Trace why H15 is returning #DIV/0."</td></tr>
              <tr><td className="cat">Templates and models</td><td>"Populate this budget template with the data from the Data sheet." "Build a monthly cash flow table from these rows."</td></tr>
              <tr><td className="cat">Native Excel operations</td><td>Sort, filter, pivot tables, conditional formatting, data validation dropdowns. Ask for them directly.</td></tr>
              <tr><td className="cat">Multiple tabs</td><td>Works across the whole workbook, not just the active sheet.</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li><strong>Persistent instructions.</strong> Settings in the add-in sidebar, Instructions field: "format numbers with thousand separators", "always bold column headers", "currency GBP". They apply only to Excel, separately from Word and PowerPoint.</li>
          <li><strong>Overwrite protection.</strong> Warns before overwriting existing data.</li>
          <li><strong>Long sessions.</strong> The conversation is compacted automatically so you do not run out of context.</li>
          <li><strong>Does not do:</strong> data tables, macros and VBA. Does not run on perpetual-licence Excel 2016/2019, iPad or Android.</li>
          <li><strong>Install:</strong> Microsoft AppSource, "Claude for Microsoft 365", then Home → Add-ins (Windows) or Tools → Add-ins (Mac), sign in with your Claude account. Available on Pro, Max, Team, Enterprise. Details in <Link to="/browser">section 14</Link>.</li>
        </ul>
        <Callout kind="warn">
          Files from external sources (downloaded templates, vendor files) can contain hidden instructions that make the add-in extract
          data or change values. Work with trusted files. Read every confirmation for a risky operation carefully.
        </Callout>
      </Block>

      <Block title="Typical admin tasks and briefs">
        <Brief title="Consolidating monthly exports">{`The folder Exports has 12 CSV files, one per month for 2026. Build one xlsx: a Data sheet with all rows plus an added Month column, a Summary sheet with a pivot by category and month, a Checks sheet with each month's total from Data against the total in the matching CSV. Formulas, not values. Save as Spend_2026.xlsx in OUTPUTS. Do not modify the CSV files.`}</Brief>
        <Brief title="Cleaning a list">{`Clean Contacts.xlsx into a new file Contacts_clean.xlsx: remove exact duplicates, normalise phones to +44 7XXX XXXXXX, fix capitalisation in names, trim stray spaces. Rows that look like duplicates but are not identical: do not delete, mark them in a Status column as "Possible duplicate". Give me a short list of what you changed and how many rows.`}</Brief>
        <Brief title="Expense report from receipt photos">{`The folder Receipts has about 60 photos of receipts. Build an xlsx with columns Date, Vendor, Category, Amount, File. Add a totals row and a summary by category on a second sheet. If something is blurry or the amount is unreadable, fill in what you can and put VERIFY in a Status column. Do not invent numbers.`}</Brief>
        <Brief title="Comparing two versions of a price list">{`Compare Prices_2025.xlsx and Prices_2026.xlsx by item number. Produce a sheet with: items with a changed price (old, new, difference in %), new items, removed items. Sort by largest percentage change. Conditional formatting: increases above 10% in red.`}</Brief>
        <Brief title="Budget vs actual">{`From Budget.xlsx and Actual_Q3.xlsx build a Comparison sheet by cost line: budget, actual, variance in currency and in percent, with formulas. Conditional formatting on the variance: above +5% red, below -5% green. An Assumptions sheet with the source of every number. A Checks sheet: the sum of the lines equals the grand total from each source.`}</Brief>
        <Brief title="Template and fill">{`Build a template Monthly_report.xlsx with an Input sheet (manually entered data, in yellow), a Calculations sheet (formulas only) and a Summary sheet (a chart and key numbers). Then fill it with the data from September.csv so I can see what it looks like for real.`}</Brief>
      </Block>

      <Block title="Rules for spreadsheets that will be updated">
        <ol>
          <li><strong>Formulas, not values.</strong> If the sheet will be updated, ask for formulas explicitly. Otherwise you get a snapshot of the numbers that dies at the first change.</li>
          <li><strong>An Assumptions sheet.</strong> Every number that does not come from the data (rate, percentage, limit) sits in one place with its source and date.</li>
          <li><strong>A Checks sheet or row.</strong> Totals reconcile with the source. A cell that shows OK or MISMATCH. Your check takes two seconds.</li>
          <li><strong>The only original is never touched.</strong> "Save as a new file" or a copy before work. Cowork asks before deleting, but overwriting content is a different thing.</li>
          <li><strong>Flag instead of invent.</strong> VERIFY for uncertain values, "To review" for unknown categories. Better an empty cell with a flag than a plausible wrong number.</li>
          <li><strong>Locale.</strong> State the currency, date format and decimal separator. Otherwise you get US formats.</li>
        </ol>
      </Block>

      <Block title="Process for a new spreadsheet in Cowork">
        <Steps
          items={[
            { title: 'Prepare the folder', body: <p>Input files in one folder, an OUTPUTS subfolder for results. If there is a good previous example, put it inside and point to it.</p> },
            { title: 'Brief with criteria', body: <p>Outcome, inputs, source of truth, format, 3 to 5 criteria, constraints. End with "repeat my ask and ask me your questions". The template is in <Link to="/briefs">section 5</Link>.</p> },
            { title: 'Answer the questions', body: <p>Period, currency, what to do with empty rows, date format. 30 seconds that save another cycle.</p> },
            { title: 'Review the structure before the data', body: <p>Ask for just the sheet and column structure first. If it is wrong, you fix it before a single row is processed.</p> },
            { title: 'Check', body: <p>The Checks sheet shows OK. Five random rows against the source. The grand total against the export. Details in <Link to="/verify">section 10</Link>.</p> },
            { title: 'Record what you learned', body: <p>A fix you made twice becomes an instruction in the project memory or in a skill (<Link to="/skills">section 12</Link>).</p> },
          ]}
        />
      </Block>

      <Block title="Google Sheets">
        <ul>
          <li>From the Output menu in Chat you can ask for the result as a Google Sheet (since September 2026), not just xlsx.</li>
          <li>With the Google Drive <Feat>Connectors</Feat> Claude reads and writes spreadsheets in Drive. Useful for shared sheets the team updates.</li>
          <li>For formulas and structure the rules are the same: formulas, assumptions, checks.</li>
        </ul>
        <p>How to check the spreadsheet before you send it: <Link to="/verify">section 10</Link>. Analysis on top of the spreadsheet data: <Link to="/analysis">section 9</Link>.</p>
      </Block>

      <Pager current="/spreadsheets" />
    </>
  )
}
