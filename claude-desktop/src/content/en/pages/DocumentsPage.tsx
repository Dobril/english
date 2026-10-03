import { Link } from '../../../components/Link'
import { Block, Brief, Callout, Feat, PageHead, Pager } from '../../../components/Bits'

export function DocumentsPage() {
  return (
    <>
      <PageHead
        mark="8"
        title="Documents, reports and email"
        lede="Goal: text that sounds like you, rests on the real sources and never goes out to anyone before you have read it."
        chips={['Chat', 'Projects', 'Cowork', 'Claude for Word', 'Outlook and Gmail']}
      />

      <Block title="Which tool for which text">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Tool</th><th>For what</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td className="cat"><Feat>Chat</Feat></td><td>Drafts, rewriting, tone, translation, summaries, email replies. Anything that fits in a few exchanges.</td><td>"Rewrite this shorter and more polite."</td></tr>
              <tr><td className="cat"><Feat>Projects</Feat></td><td>A recurring type of document. A style guide and two good examples as knowledge, the tone instructions in the project. Every new chat inside already knows how you write.</td><td>Project "Proposals", project "Meeting minutes".</td></tr>
              <tr><td className="cat"><Feat>Cowork</Feat></td><td>A document built from many sources in a folder. Word and PDF through the built-in docx and pdf skills. Organising and renaming files by content.</td><td>10 PDFs into one summary. Meeting notes into minutes.</td></tr>
              <tr><td className="cat"><Feat>Claude for Word</Feat></td><td>The document is open in Word and you are editing it: selected text, tracked changes, comments, templates.</td><td>"Work through my open comments."</td></tr>
              <tr><td className="cat">Outlook, Gmail</td><td>Your mail: triage, thread summaries, draft replies. Nothing is sent without you.</td><td>"What is waiting for a reply from me since yesterday?"</td></tr>
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="Rules for text that sounds like you">
        <ol>
          <li><strong>Give a sample of your voice.</strong> Two or three of your emails or one of your reports. "Write like these" beats any description of tone.</li>
          <li><strong>A banned-words list.</strong> "Utilize", "leverage", "delve", "synergy", "innovative". Put it in the project instructions and stop repeating it every time.</li>
          <li><strong>Reader and length.</strong> "For a customer who is angry. 5 sentences." Without this you get generic text of medium length.</li>
          <li><strong>Two variants when tone matters.</strong> "One firm and one conciliatory." You choose instead of correcting.</li>
          <li><strong>You always read before you send.</strong> Claude writes drafts. You sign.</li>
          <li><strong>Personal data.</strong> Follow company policy on what may go into Claude and what may not. When in doubt, anonymise.</li>
        </ol>
        <Callout kind="rule">
          Nothing goes out in your name unread. This holds for an email, minutes, a contract and for an automatically generated weekly
          report. Claude can draft the reply in your mailbox, but you press "Send".
        </Callout>
      </Block>

      <Block title="Claude for Word: what it does">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Task</th><th>How you ask</th></tr></thead>
            <tbody>
              <tr><td className="cat">Questions about the document</td><td>"What's the liability cap and is it mutual?" The answer cites sections, click and you are there.</td></tr>
              <tr><td className="cat">Editing selected text</td><td>Select a paragraph: "Tighten this and drop the passive voice." Surrounding styles, numbering and formatting are preserved.</td></tr>
              <tr><td className="cat">Tracked changes</td><td>In tracked changes mode every edit is a revision you accept or reject in Word's review pane. "Rewrite section 4.2 to make the indemnification mutual."</td></tr>
              <tr><td className="cat">Comment-driven</td><td>"Work through my open comments." Edits the text each comment is anchored to and replies in the thread with what it changed.</td></tr>
              <tr><td className="cat">Counterparty redlines</td><td>"Summarise what the other side changed and flag anything worth discussing." Groups by severity.</td></tr>
              <tr><td className="cat">Filling a template</td><td>"Draft the Key Risks section with four risks in the template's style." Headings, bullets and tables inherit the document's styles.</td></tr>
              <tr><td className="cat">Semantic navigation</td><td>"Find every provision touching data retention." Finds by meaning, not just by keyword.</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>A legacy .doc file must be saved as .docx first.</li>
          <li>Persistent instructions in the add-in Settings: "formal tone", "follow citation style X". Word only.</li>
          <li>Not for a final document to a client or counterparty without human review.</li>
          <li>Install: one add-in "Claude for Microsoft 365" for Word, Excel and PowerPoint. <Link to="/browser">Section 14</Link>.</li>
        </ul>
      </Block>

      <Block title="Briefs for common cases">
        <Brief title="Chat or Cowork: meeting minutes">{`Attached is the transcript of the budget meeting. Produce minutes as docx using the template Minutes.docx: attendees, agenda, one item per decision (what, who, by when), open questions separately. If something was discussed but not decided, do not put it under decisions. Do not invent deadlines that were not said. One page max.`}</Brief>
        <Brief title="Chat: formal letter">{`Write a formal letter to the city council asking for a 14-day extension of the deadline to submit documents because of a delay by an external supplier. Business tone, no apologetic phrases, one request, one justification, one sentence offering a meeting. Half a page.`}</Brief>
        <Brief title="Cowork: weekly report from a folder of notes">{`The folder Week_40 has notes from 5 meetings and 3 emails. Write a weekly report as docx for my manager: Done, In progress, Blocked, Decisions needed. Every line with a source (file). No more than one page. Tone as in Report_Week_39.docx from the same folder.`}</Brief>
        <Brief title="Chat: reply to a complaint in two tones">{`Attached is a complaint email about a late delivery. Write two replies: one short and businesslike, one warmer with an apology. In both: we acknowledge the delay, we give the new date 10 October, we do not promise compensation. Up to 6 sentences each.`}</Brief>
        <Brief title="Cowork: organising 200 PDFs">{`The folder Archive has about 200 PDFs of contracts and amendments. Rename them as YYYY-MM-DD_Counterparty_Type.pdf based on content and sort them into subfolders by counterparty. Create Index.xlsx with new name, old name, date, counterparty, type. Delete nothing. Leave unreadable ones in "To review".`}</Brief>
        <Brief title="Cowork: contract comparison">{`Compare Contract_v3.docx with Contract_v4.docx. Produce a docx with a table: clause, old, new, what it means for us in one sentence. Put changes to prices, deadlines and liability at the top. Do not give a legal opinion, only describe the differences.`}</Brief>
      </Block>

      <Block title="Email: Outlook and Gmail">
        <div className="grid-2">
          <div className="panel">
            <h3>Claude for Outlook (beta)</h3>
            <p>An add-in in Outlook: triages the inbox by urgency, summarises long threads, drafts replies in your voice, finds meeting times. The draft stays in Outlook until you review it.</p>
          </div>
          <div className="panel">
            <h3>Gmail and Google Calendar through connectors</h3>
            <p>In Chat and Cowork with the connector on: "What have I not replied to this week?", "Draft replies for the three most urgent", "When do Ivan and I have a shared free hour next week?". Details in <Link to="/connectors">section 11</Link>.</p>
          </div>
        </div>
        <Brief title="Cowork with Gmail: morning review">{`Review the unread emails from the last 24 hours. Sort them into three groups: waiting for a reply from me, information only, can be archived. For the first group write a draft reply for each, in my tone (see Instructions), and leave them as drafts. Send nothing. Give me the list in the chat.`}</Brief>
        <p className="muted small">A review like this is a good candidate for a recurring task every morning: <Link to="/scheduled">section 13</Link>.</p>
      </Block>

      <Block title="Translation and bilingual documents">
        <ul>
          <li>State the direction and register: "from Bulgarian to English, business, for a British client".</li>
          <li>Give a glossary of terms that must be translated a specific way. In a project that is a Terminology.md file in the knowledge.</li>
          <li>For contracts and official documents: translation in tracked changes next to the original, so it can be compared line by line.</li>
          <li>Check: ask for a back-translation of the three riskiest paragraphs. Divergence shows where the meaning drifted.</li>
        </ul>
        <p>How to check a document before sending: <Link to="/verify">section 10</Link>. A recurring document type as a skill: <Link to="/skills">section 12</Link>. Tone instructions that always apply: <Link to="/memory">section 3</Link>.</p>
      </Block>

      <Pager current="/documents" />
    </>
  )
}
