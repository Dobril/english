import { Link } from '../../../components/Link'
import { Block, Brief, Callout, Code, Feat, PageHead, Pager, Steps } from '../../../components/Bits'

export function PresentationsPage() {
  return (
    <>
      <PageHead
        mark="7"
        title="Presentations and design"
        lede="Goal: a deck with one idea per slide, in the corporate template, with charts from real data, built slide by slide instead of regenerated at every fix."
        chips={['Chat', 'Cowork', 'Claude for PowerPoint', 'storyline first', 'brand skill']}
      />

      <Block title="Three ways to make a deck">
        <div className="grid-3">
          <div className="panel">
            <h3><Feat>Chat</Feat></h3>
            <p>Structure, storyline, slide text, speaker notes. Slides as <Feat>Artifacts</Feat> for a quick look. A finished pptx through the built-in pptx skill. For thinking and drafts.</p>
          </div>
          <div className="panel">
            <h3><Feat>Cowork</Feat></h3>
            <p>Builds a pptx from the files in your folder: a report, a spreadsheet, notes. Uses an existing template from the folder. Applies a brand skill with colours and fonts. Charts are native, from the data. For a deck that will be presented.</p>
          </div>
          <div className="panel">
            <h3><Feat>Claude for PowerPoint</Feat></h3>
            <p>An add-in inside PowerPoint. Reads the slide master, layouts, fonts and colour scheme. New slides in your template, pinpoint edits on a selected slide, diagrams and charts from bullets. For a deck that is already open.</p>
          </div>
        </div>
        <Callout kind="tip" title="Which one when">
          You have nothing yet and are looking for what to say: Chat. The materials are in a folder and you want a finished file: Cowork.
          You have a deck and are fixing it: PowerPoint add-in. Often it is all three in that order.
        </Callout>
      </Block>

      <Block title="Story first, slides second">
        <p>
          A bad deck with good design is still bad. Before asking for a slide, ask for a storyline: a list of 6 to 10 sentences, one per
          slide, each one a conclusion, not a topic. "Transport costs are up 18% because of new routes" is a slide title. "Transport
          costs" is a topic. Once the storyline is approved, the slides almost make themselves.
        </p>
        <Brief title="Chat: storyline before slides">{`Read the attached Q3 report. Propose a storyline for 8 slides to leadership: one sentence per slide, each sentence a conclusion that can stand as a title. The last slide is the decision we want from them. Do not write the slides yet, only the sentences. Once I approve them, we continue.`}</Brief>
        <ul>
          <li><strong>Action titles.</strong> The title states the conclusion. The body proves it.</li>
          <li><strong>3 to 5 bullets.</strong> More is a document, not a slide. Details go into speaker notes or an appendix.</li>
          <li><strong>Charts from data, not pictures.</strong> Ask for native, editable charts. A picture of a chart cannot be fixed.</li>
          <li><strong>A "Sources" slide.</strong> Where every number comes from. Saves awkward questions.</li>
          <li><strong>Speaker notes.</strong> Ask for them explicitly. Everything you want to say but not show goes there.</li>
        </ul>
      </Block>

      <Block title="Claude for PowerPoint: what it does">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Task</th><th>How you ask</th></tr></thead>
            <tbody>
              <tr><td className="cat">New slides in the template</td><td>"Create a market sizing section, 3 slides covering TAM, SAM, SOM with supporting visuals." Uses layouts, fonts and colours from the slide master.</td></tr>
              <tr><td className="cat">Pinpoint edit</td><td>Select the slide: "Simplify the text on this slide." "Add a chart showing the quarterly trend." Other slides are untouched.</td></tr>
              <tr><td className="cat">Whole deck</td><td>A blank file with the template: "Build an internal project update with timeline and next steps, 10 slides."</td></tr>
              <tr><td className="cat">Bullets into diagrams</td><td>"Turn these bullets into a process flow diagram." "Create a bar chart comparing Q1 to Q4." The result is editable.</td></tr>
              <tr><td className="cat">Restructuring</td><td>"Reorder slides to lead with recommendations first." "Combine slides 5 and 6." "Create an agenda slide that reflects the current structure."</td></tr>
              <tr><td className="cat">Storyline across slides</td><td>"Restructure the storyline across slides 4 to 7 so it leads to the decision on slide 8."</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li><strong>Persistent instructions.</strong> Settings in the add-in: "always use one-line bullets", "use the blue accent colour for highlights", "always a sources slide at the end". They apply only to PowerPoint.</li>
          <li><strong>Template first.</strong> Open the deck with the corporate template already applied before asking for content. Otherwise you get default styles.</li>
          <li><strong>Install:</strong> AppSource, "Claude for Microsoft 365", one add-in for Excel, PowerPoint and Word. Available on Pro, Max, Team, Enterprise. <Link to="/browser">Section 14</Link>.</li>
          <li><strong>Not for:</strong> final client deliverables without human review; replacing your judgment on design and narrative.</li>
        </ul>
      </Block>

      <Block title="Briefs for common cases">
        <Brief title="Cowork: executive status update">{`The folder Project_X has Status_Report_Sept.docx and Budget.xlsx. Build a 6-slide deck for leadership using Corporate.pptx from the same folder: 1) where we are in one sentence, 2) achieved in September, 3) budget vs plan with a chart from Budget.xlsx, 4) risks with an owner, 5) next steps to year end, 6) the decision we want. Titles are conclusions. Up to 4 bullets per slide. Speaker notes under every slide. Save as Status_Sept.pptx in OUTPUTS.`}</Brief>
        <Brief title="Cowork: from 20 pages to 8 slides">{`Read Market_Report.pdf (20 pages). Build 8 slides for managers who will not read the report: one conclusion per slide, the number that proves it, and where it comes from (page in the report). Last slide: the three decisions the report implies. Template: Corporate.pptx. No methodology, no text below 18pt.`}</Brief>
        <Brief title="PowerPoint add-in: overloaded slide">{`This slide has 11 bullets and three tables. Split it into two slides with one idea each. Turn the tables into one chart that shows the trend. Titles must be conclusions. Keep the fonts and colours from the template.`}</Brief>
        <Brief title="Cowork: quarterly review with charts">{`From Q3_Data.xlsx build a 10-slide quarterly review: revenue by month (line chart), costs by category (bar chart), top 5 customers (table), comparison with Q2 (two columns). Every chart is native, from the data in the Summary sheet. A sources slide at the end. Template Corporate.pptx. Apply the brand skill if it is turned on.`}</Brief>
      </Block>

      <Block title="Slide-by-slide process">
        <Steps
          items={[
            { title: 'Storyline', body: <p>6 to 10 conclusion sentences. You approve them in Chat or at the start of the Cowork session. This is where changes are cheapest.</p> },
            { title: 'Template and data', body: <p>The corporate pptx template and the spreadsheets with the numbers are in the folder. Point to them. Without a template you get something generic.</p> },
            { title: 'First version', body: <p>Ask for the whole deck. Review it for story and numbers, not pixels.</p> },
            { title: 'Fixes on specific slides', body: <p>"Slide 4: the chart should be by month, not by quarter." Do not ask to "do it again", you lose the good slides.</p> },
            { title: 'Check', body: <p>Every number against its source. Every title is a conclusion. No slide has more than 5 bullets. Fonts and colours are from the template. <Link to="/verify">Section 10</Link>.</p> },
          ]}
        />
        <Callout kind="rule">
          Fix slide by slide. "Regenerate" throws away the approved slides along with the bad one. Both the add-in and Cowork can touch
          only what you point at.
        </Callout>
      </Block>

      <Block title="Brand skill: colours, fonts, logo">
        <p>
          If every deck must follow the company standard, write it once as a skill. Claude loads it on its own when it makes a deck or a
          document. Skills in detail in <Link to="/skills">section 12</Link>.
        </p>
        <Code title="brand-guidelines/SKILL.md">{`---
name: brand-guidelines
description: Apply the company rules for colours, fonts and logo usage to presentations and documents.
---
Apply to every presentation or document for external use.

## Colours
- Primary: #0B3C5D. Accent: #F28C28. Neutral: #2E2E2E. Background: white.
- At most two colours per chart. Red only for negative variances.

## Fonts
- Headings: Montserrat Bold, 28pt. Body: Open Sans, never below 18pt on a slide.

## Slides
- The title is a conclusion, not a topic. Up to 5 bullets. Logo bottom right on every slide except the title slide.
- Last slide is always "Sources".`}</Code>
      </Block>

      <Block title="Design beyond PowerPoint">
        <ul>
          <li><strong>Google Slides.</strong> From the Output menu in Chat the result can be Google Slides directly (since September 2026). The storyline rules are the same.</li>
          <li><strong>Canva connector.</strong> Claude works with designs in Canva through <Feat>Connectors</Feat>: posters, social posts, brochures from your templates there.</li>
          <li><strong>Figma connector.</strong> For teams with a design system in Figma. Claude reads and creates designs, diagrams in FigJam.</li>
          <li><strong>Diagrams.</strong> Processes, org charts, timelines: ask for them as native diagrams in the slide, not as pictures.</li>
        </ul>
        <p>The numbers in the charts come from spreadsheets: <Link to="/spreadsheets">section 6</Link>. Slide text often starts from a document: <Link to="/documents">section 8</Link>.</p>
      </Block>

      <Pager current="/presentations" />
    </>
  )
}
