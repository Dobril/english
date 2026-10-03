import { Link } from '../../../components/Link'
import { Block, Brief, Callout, Feat, PageHead, Pager } from '../../../components/Bits'

export function HowItWorksPage() {
  return (
    <>
      <PageHead
        mark="1"
        title="Chat or Cowork: how each one thinks"
        lede="Goal: pick the right mode in under a minute, without losing time in the wrong one."
        chips={['Chat', 'Cowork', 'context', 'sandbox', 'desktop app']}
      />

      <Block title="The three tabs of Claude Desktop">
        <p>
          The app has three tabs: <strong>Chat</strong>, <strong>Cowork</strong> and <strong>Code</strong>. Code is for developers and
          is not part of this handbook. The other two cover everything else: spreadsheets, presentations, reports, letters, analyses,
          tidying up files. The difference between them is not model strength. It is what you get at the end and what Claude is allowed to touch.
        </p>
        <div className="grid-2">
          <div className="panel">
            <h3>Chat</h3>
            <p>A conversation. You ask, you get an answer, you refine. The output is <strong>a thought in your head</strong>: an explanation,
              an idea, a draft, a judgement. You upload files by hand and download the result by hand.</p>
            <p className="muted small">For: questions, explanations, brainstorming, a quick email draft, "read this and tell me what you think".</p>
          </div>
          <div className="panel">
            <h3>Cowork</h3>
            <p>An executor. You describe an outcome and Claude gets there in several steps on its own: reads your folder, opens the files,
              builds new ones, checks them and writes them back. The output is <strong>a file you will hand to someone</strong>: Excel, PowerPoint, Word, PDF.</p>
            <p className="muted small">For: a deliverable someone will open; tasks across many files or several apps at once.</p>
          </div>
        </div>
      </Block>

      <Block title="How Chat works">
        <ul>
          <li>Everything you upload and say sits in one context window. It fills up and quality drops as it fills. New conversation for a new topic.</li>
          <li>Files: you upload them into the conversation (roughly up to 20 per conversation, up to 30 MB each). Claude reads them but cannot change them in place; it gives you a new file to download.</li>
          <li><Feat>Projects</Feat> hold standing knowledge and instructions for one area. <Feat>Memory</Feat> holds who you are and how you like to work. See <Link to="/memory">section 3</Link>.</li>
          <li><Feat>Artifacts</Feat>: a side panel where Claude builds a document, spreadsheet, slides or an interactive page that you edit and download separately from the chat.</li>
          <li><Feat>Research</Feat>: a long multi-step web investigation with sources. Web search for the quick things.</li>
          <li>Extended thinking and effort level: deeper reasoning for hard questions, lower for routine ones, to save your usage limit.</li>
        </ul>
      </Block>

      <Block title="How Cowork works">
        <ul>
          <li>The same agentic architecture as Claude Code, without a terminal. Claude plans, acts with tools (read a file, write a file, search the web, call a connector), sees the result and keeps going until the task is done.</li>
          <li>It works directly in the folders you grant: reads, writes, creates, organizes. Nothing is uploaded by hand. Since September 2026 you can also attach your home folder, Documents or a whole drive.</li>
          <li>Execution runs in an isolated sandbox, separated from the rest of your computer. Claude sees only the permitted folders and the connected tools.</li>
          <li>For large tasks it runs sub-agents in parallel: one reads the invoices, one builds the table, one writes the summary.</li>
          <li>It produces working files: Excel with real formulas, PowerPoint in your template, Word, PDF, and live artifacts (dashboards that refresh when opened).</li>
          <li>You see every step. You can stop and redirect midway. See <Link to="/workflow">section 4</Link>.</li>
        </ul>
        <Callout kind="tip" title="One sentence to remember">
          Chat is for when the output is a thought in your head. Cowork is for when the output is something you will hand to someone else.
        </Callout>
      </Block>

      <Block title="The five ingredients of a good Cowork task">
        <p>Anthropic's official guidance. A task that hits several of these belongs in Cowork. A task that hits none belongs in Chat.</p>
        <ol>
          <li><strong>Multiple inputs.</strong> Different files, folders, file types, plus connected apps.</li>
          <li><strong>A file as output.</strong> Something you will share, present or reuse.</li>
          <li><strong>Recurring.</strong> You do it every week or every month. A candidate for <Feat>Scheduled tasks</Feat>.</li>
          <li><strong>Clear success criteria.</strong> You will recognise a good result within 15 seconds of opening it.</li>
          <li><strong>A boring middle.</strong> The thinking happens at the start and the end. The extracting, compiling and reformatting in between is what you delegate.</li>
        </ol>
      </Block>

      <Block title="Examples: which goes where">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Task</th><th>Mode</th><th>Why</th></tr></thead>
            <tbody>
              <tr><td className="cat">"How do I decline a supplier without souring the relationship?"</td><td>Chat</td><td>The output is a judgement and a two-sentence draft.</td></tr>
              <tr><td className="cat">Expense report from 80 receipt photos into Excel with categories and a total</td><td>Cowork</td><td>Many inputs, a file as output, boring middle.</td></tr>
              <tr><td className="cat">"Explain the difference between EBITDA and operating profit"</td><td>Chat</td><td>A question with a few-line answer.</td></tr>
              <tr><td className="cat">A 12-slide deck in the company template from three Word documents and one spreadsheet</td><td>Cowork</td><td>A file you will present; works over many inputs.</td></tr>
              <tr><td className="cat">Market research on five competitors with sources</td><td>Chat with Research, or Cowork</td><td>If you want to read the result: Research in Chat. If you want a Word report with a table: Cowork.</td></tr>
              <tr><td className="cat">A weekly summary of incoming email every Monday at 7:00</td><td>Cowork, scheduled</td><td>Recurring and uses a mail connector.</td></tr>
              <tr><td className="cat">Sort the Downloads folder by type and month</td><td>Cowork</td><td>Touches files on disk.</td></tr>
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="How to write to each">
        <p>In Chat you describe a task. In Cowork you describe a result. Same intent, different wording:</p>
        <Brief title="Chat: a task">{`Review these 15 photos and recommend how I should organize and name them.`}</Brief>
        <Brief title="Cowork: a result">{`Organize these 15 photos into subfolders by event and rename them with descriptive names in the format YYYY-MM-DD_event_number. Before you begin, repeat my ask back to me and ask me your questions.`}</Brief>
        <p>Briefs in detail: <Link to="/briefs">section 5</Link>.</p>
      </Block>

      <Block title="What changed in 2026 and what it means for you">
        <ul>
          <li>Cowork is on every paid plan (Pro, Max, Team, Enterprise). The Windows version arrived in February 2026.</li>
          <li>On Pro and Max, since mid-September Chat and Cowork are merging into one conversation: you start as a chat and Claude takes over as Cowork when the task calls for it. The split in this handbook stays useful as a way of thinking.</li>
          <li>New Cowork tasks are moving to run in the cloud and sync across devices (web and mobile in beta since July 2026). Access to local folders, local connectors, the browser and computer use still goes through the desktop app, which has to be open.</li>
          <li>Claude for Excel, PowerPoint, Word and Outlook work inside those apps themselves. See <Link to="/browser">section 14</Link>.</li>
        </ul>
        <Callout kind="rule" title="The context rule applies here too">
          Everything Claude has read in a session sits in the context and weighs on it. One task per session. A new session for a new deliverable.
          A folder with a clear structure and short instructions (<Link to="/memory">section 3</Link>) is the best way for Claude to start every time with a clean and correct context.
        </Callout>
      </Block>

      <Pager current="/how-it-works" />
    </>
  )
}
