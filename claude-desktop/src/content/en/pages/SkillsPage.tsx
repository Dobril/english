import { Link } from '../../../components/Link'
import { Block, Brief, Callout, Code, Feat, PageHead, Pager, Steps } from '../../../components/Bits'

export function SkillsPage() {
  return (
    <>
      <PageHead
        mark="12"
        title="Skills and plugins"
        lede="Goal: the processes you repeat are written down once and run the same way every time, in Chat, in Cowork and in Excel, Word and PowerPoint."
        chips={['SKILL.md', 'Customize > Skills', '/name', 'zip', 'plugins']}
      />

      <Block title="What a skill is">
        <p>
          A folder with a <code>SKILL.md</code> file: instructions and knowledge Claude loads only when the task matches. At the start of a
          conversation Claude sees only each skill's name and one-line description. When your request matches the description, it reads the
          whole file. If the skill points to extra files, it opens them only when a step calls for them. You can also call it yourself: type
          <code>/</code> in the message box and pick the skill.
        </p>
        <ul>
          <li><strong>Built in from Anthropic</strong>: docx, xlsx, pptx, pdf. They create Word, Excel, PowerPoint and PDF files and switch on by themselves when you ask for such a file.</li>
          <li><strong>Partner skills</strong>: from companies with connectors, teaching Claude how their product is used.</li>
          <li><strong>From your organisation</strong>: an Owner on Team or Enterprise rolls them out to everyone.</li>
          <li><strong>Yours</strong>: monthly report, meeting minutes, brand rules for decks. This section is about those.</li>
          <li>Requirement: a paid plan and Settings &gt; Capabilities &gt; Code execution and file creation turned on. Skills run in the code sandbox.</li>
        </ul>
      </Block>

      <Block title="Format">
        <Code title="monthly-report/SKILL.md">{`---
name: monthly-report
description: Build the monthly operations report (xlsx + one-page docx summary) from the exports in the Reports/<month> folder. Use when asked for the monthly report, month-end report, or ops report.
---

# Monthly operations report

## Inputs
- Reports/<month>/sales-export.csv (source of truth for revenue)
- Reports/<month>/support-tickets.xlsx
- Reports/<month>/notes.md (commentary from team leads, may be missing)

## Steps
1. Read all inputs. If a file is missing, stop and ask; do not estimate.
2. Build <month>-ops-report.xlsx with sheets: Summary, Revenue, Support, Checks.
   Every number in Summary is a formula pointing to Revenue or Support.
3. Revenue: by product and by country, current month vs previous month vs same month last year. Currency EUR, net of VAT.
4. Support: ticket volume, median first response time, top 5 categories.
5. Checks sheet: totals reconcile to the exports, row counts in and out, list of anything marked VERIFY.
6. Write <month>-ops-summary.docx: one page, template in assets/summary-template.docx. Three headline numbers, three risks, next steps.

## Rules
- Never overwrite last month's files. New files only.
- Mark any number you cannot trace to an input with VERIFY.
- File names: YYYY-MM-ops-report.xlsx and YYYY-MM-ops-summary.docx.`}</Code>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Part</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td className="k">name</td><td>Lowercase letters, numbers and hyphens, up to 64 characters. Must match the folder name.</td></tr>
              <tr><td className="k">description</td><td>What it does and when to use it, up to 1,024 characters. The only thing Claude reads before deciding to load the skill. Use the words you would use to ask for the task.</td></tr>
              <tr><td className="k">body</td><td>The instructions: steps, example inputs and outputs, templates, edge cases. Under 500 lines. Long material goes into separate files.</td></tr>
              <tr><td className="k">references/</td><td>Documentation Claude reads only when a step calls for it. Mention the file at that step.</td></tr>
              <tr><td className="k">assets/</td><td>Templates, logos, lookup tables. Things Claude copies or fills in rather than reads for guidance.</td></tr>
              <tr><td className="k">scripts/</td><td>Code that runs during the skill. Rarely needed for administrative work.</td></tr>
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="Creating and uploading">
        <Steps items={[
          { title: 'Write it or ask for it', body: <p>Fastest: turn on the skill-creator skill from Anthropic (Customize &gt; Skills &gt; Discover) and say "make me a skill for the monthly report, here is how I do it". Edit the result. Or write SKILL.md yourself in the format above.</p> },
          { title: 'A folder named after the skill', body: <p><code>monthly-report/SKILL.md</code>, plus assets and references if any. The folder name equals name in the frontmatter.</p> },
          { title: 'Zip the folder, not its contents', body: <p>The archive must contain the folder at its top level: <code>monthly-report.zip</code> → <code>monthly-report/SKILL.md</code>. A SKILL.md sitting at the root of the zip is not recognised.</p> },
          { title: 'Customize > Skills > Create skill', body: <p>Upload the zip. The skill appears in Your skills under Created by you. Turn it on with the switch.</p> },
          { title: 'Test', body: <p>Write three requests that should trigger it and one that should not. Check in the reasoning whether it loads. If not: fix the description, not the body.</p> },
        ]} />
        <Callout kind="tip" title="In Cowork: do the work first, then record it">
          Do the task once in Cowork. Give feedback until the result is exactly what you want. Then: "Create a skill that captures this exact
          workflow: the inputs, the steps, the checks, the file names." You get a SKILL.md written from a working example, not from imagination.
        </Callout>
      </Block>

      <Block title="Skills worth having">
        <div className="grid-2">
          <div className="panel">
            <h3>brand-guidelines</h3>
            <p>Colours, fonts, logo rules, slide structure. Activates on its own for every external deck and document. The template lives in assets/.</p>
          </div>
          <div className="panel">
            <h3>monthly-report</h3>
            <p>The example above. Inputs, sheets, formulas, checks, file names. Run with /monthly-report or turn it into a <Link to="/scheduled">scheduled task</Link>.</p>
          </div>
          <div className="panel">
            <h3>meeting-minutes</h3>
            <p>From transcript or notes to minutes: decisions, owners, deadlines, open questions. Same format every time so it can be searched.</p>
          </div>
          <div className="panel">
            <h3>expense-report</h3>
            <p>Columns, categories, a VERIFY rule for unclear amounts, currency, a totals row. From receipt photos to xlsx.</p>
          </div>
          <div className="panel">
            <h3>client-email</h3>
            <p>Tone towards clients, required elements (subject, greeting, next step, signature), what is never written. Draft, not send.</p>
          </div>
          <div className="panel">
            <h3>data-cleaning</h3>
            <p>How an export is cleaned before analysis: dates, duplicates, blanks, units. The Raw sheet stays untouched; work happens on Clean.</p>
          </div>
        </div>
      </Block>

      <Block title="Skill, project, instructions or connector">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Tool</th><th>What it is</th><th>When it loads</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td className="cat">Skill</td><td>A repeatable procedure</td><td>When the task matches the description, or on /name</td><td>How the monthly report is built</td></tr>
              <tr><td className="cat"><Feat>Projects</Feat></td><td>Background knowledge for one area</td><td>Always, in every conversation in the project</td><td>One client's contracts and history</td></tr>
              <tr><td className="cat">Instructions</td><td>Preferences for everything</td><td>Always, in every conversation</td><td>"Write short, in English, no exclamation marks"</td></tr>
              <tr><td className="cat"><Feat>Connectors</Feat></td><td>Live data from a system</td><td>When turned on in the conversation</td><td>Today's emails, the CRM records</td></tr>
            </tbody>
          </table>
        </div>
        <p className="muted small">A skill can say how to use a connector ("new tasks go in project X with label Y") but cannot reach the system itself. Projects and instructions in detail in <Link to="/memory">section 3</Link>.</p>
      </Block>

      <Block title="Plugins">
        <p>
          A plugin is a package: skills, connectors, specialised agents, sometimes commands and hooks, installed in one step. You install it from
          Customize &gt; Plugins. The Discover tab shows Anthropic's official catalogue. You can add another marketplace by GitHub repository
          address (<code>owner/repo</code>) or upload a package from a file.
        </p>
        <ul>
          <li>Installing does not sign you in to the plugin's connectors. Open the plugin's Connectors tab and connect each one separately.</li>
          <li>Disable plugin switches everything in it off at once. A plugin's skills show in Your skills labelled with the plugin's name.</li>
          <li>Your organisation can make a plugin required. Then it says "required by your organization" and cannot be removed.</li>
          <li>Ready-made bundles by role: Legal, Small Business, Marketing Ops, Financial Services, HR and more. A good start before writing your own.</li>
          <li>Once installed, a plugin is on your account: it is used in Chat, Cowork, Claude Code and in the Excel, Word and PowerPoint add-ins.</li>
        </ul>
        <Callout kind="warn">
          A skill or plugin from someone else is a set of instructions that runs with your permissions and your connectors. Ones you upload or that
          are shared with you are not reviewed by Anthropic. Open SKILL.md and read it before turning it on. Never put passwords or keys in a skill:
          everyone you share it with receives the files.
        </Callout>
      </Block>

      <Block title="Maintenance">
        <ul>
          <li>A skill that does not trigger: the description is too generic or does not contain the words you use. Rewrite it with them.</li>
          <li>A skill that triggers when it should not: the description is too broad. Narrow it, add "Do not use for ...".</li>
          <li>One skill, one task. Several small ones combine better than one big one; Claude can use more than one in a conversation.</li>
          <li>After every change: one real request, not just a read-through. If the result got worse, restore the previous version.</li>
          <li>Share and Publish to org (Team and Enterprise) from the skill's page, same as a plugin.</li>
        </ul>
        <Brief title="Ask for a review of the skill">{`Read the SKILL.md of monthly-report and tell me: which steps are ambiguous, which inputs are under-described, where you could go wrong if something is missing from the folder. Propose edits without applying them.`}</Brief>
      </Block>

      <Pager current="/skills" />
    </>
  )
}
