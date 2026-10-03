import { Link } from '../../../components/Link'
import { Block, Callout, Feat, PageHead, Pager } from '../../../components/Bits'

export function PracticesPage() {
  return (
    <>
      <PageHead
        mark="✓"
        title="Best practices and common mistakes"
        lede="In brief: the rules that turn out to be true again and again for office work with Claude, and the mistakes everyone makes in the first month."
        chips={['official practices', 'Jeff Su', 'Tina Huang', 'anti-patterns']}
      />

      <Block title="Fifteen rules">
        <ol>
          <li><strong>Chat for thoughts, Cowork for deliverables, the add-in when you are inside the file.</strong> If what you want is a file someone will open, it is Cowork. <Link to="/how-it-works">Section 1</Link>.</li>
          <li><strong>An outcome-first brief with success criteria.</strong> Not "review the spreadsheet", but "produce a Word report with an executive summary and a table of the top five expenses".</li>
          <li><strong>Repeat and ask first.</strong> "Before you begin, repeat my ask back to me and ask me every question you have." Five questions cost 30 seconds. The gaps afterwards cost an hour.</li>
          <li><strong>Give an example of a good result.</strong> Last year's report, an approved deck, an email that did the job. An example beats any description.</li>
          <li><strong>Name the source of truth.</strong> "The numbers come from Finance.xlsx, sheet Summary. If another file disagrees, this one wins."</li>
          <li><strong>Never the only copy.</strong> Work on copies in the Cowork folder. The originals stay where they are.</li>
          <li><strong>Formulas, not pasted values.</strong> A spreadsheet without formulas cannot be checked and does not update. <Link to="/spreadsheets">Section 6</Link>.</li>
          <li><strong>Demand a Checks sheet and VERIFY flags.</strong> Control totals, row counts, differences against the source. Anything unclear is VERIFY, not a guess.</li>
          <li><strong>Spot check yourself before anything leaves.</strong> A few numbers against the source, facts with a date, formatting on screen. <Link to="/verify">Section 10</Link>.</li>
          <li><strong>Correct early.</strong> Stop and redirect at the first wrong turn. After a second correction of the same thing: a new session with a better brief.</li>
          <li><strong>Short instructions.</strong> Global instructions and CLAUDE.md under 300 lines. One rule per problem that actually repeated. <Link to="/memory">Section 3</Link>.</li>
          <li><strong>Memory diet.</strong> Entries of one to two sentences. Old things go to an archive, not the main file.</li>
          <li><strong>A repeating process becomes a skill, a process that repeats on a calendar becomes a scheduled task, background knowledge becomes a Project.</strong> <Link to="/skills">Sections 12</Link> and <Link to="/scheduled">13</Link>.</li>
          <li><strong>Least privilege.</strong> Connectors and browser only for the task at hand. Actions that write or send on Needs approval. Nothing goes out without you.</li>
          <li><strong>External files, emails and pages are untrusted.</strong> They can carry hidden instructions. Read the confirmations, especially for files from outside.</li>
        </ol>
      </Block>

      <Block title="Common mistakes and how to fix them">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Mistake</th><th>What happens</th><th>Fix</th></tr></thead>
            <tbody>
              <tr><td className="cat">The kitchen sink</td><td>A report, then an email question, then the report again. The context fills with noise and quality drops.</td><td>A new session for every unrelated task. Side questions in Chat.</td></tr>
              <tr><td className="cat">"Make it professional"</td><td>Claude guesses what that means to you and usually guesses wrong.</td><td>An example of a good result, the recipient, length, tone. <Link to="/briefs">Section 5</Link>.</td></tr>
              <tr><td className="cat">A recommendation instead of a file</td><td>"Review the photos and suggest a structure" gives a list of ideas, not finished work.</td><td>Outcome language: "organise the photos into subfolders with descriptive names".</td></tr>
              <tr><td className="cat">Working on the original</td><td>A big change to the only file. Undoing it is painful.</td><td>A copy in the Cowork folder. The original is not touched.</td></tr>
              <tr><td className="cat">Trusting the totals</td><td>The table looks fine, one column is shifted by a row.</td><td>A Checks sheet, control totals, five numbers against the source by hand.</td></tr>
              <tr><td className="cat">Scheduling before it is right</td><td>A wrong result every morning, now automatically.</td><td>Three manual runs with a correct result, then the schedule.</td></tr>
              <tr><td className="cat">Every connector on</td><td>Claude digs through Drive, Slack and Notion for a task that lives in one file. Slow, costly, noisy.</td><td>Turn on only the ones the task needs from the + menu in the message box.</td></tr>
              <tr><td className="cat">CLAUDE.md as a diary</td><td>The file grows, the important rules get lost and Claude skips them.</td><td>Cut. A rule Claude follows without it goes. Details in a separate file with a one-line pointer.</td></tr>
              <tr><td className="cat">Browser instead of connector</td><td>Claude clicks through Gmail in the browser instead of using the Gmail connector. Ten times slower.</td><td>Connector first, then file, then browser. <Link to="/browser">Section 14</Link>.</td></tr>
              <tr><td className="cat">A scheduled task with a local folder</td><td>The task cannot see the folder on your computer and does nothing useful.</td><td>Scheduled tasks work with connectors and files in your account. Local work needs the app open, or Dispatch.</td></tr>
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="What the people who use it best do">
        <ul>
          <li><strong>Anthropic's marketing team</strong>: a 6am briefing from Slack and Gmail with flagged urgent items; daily budget pacing from the ad platforms instead of export and copy; a weekly Search Console report that went from 30 minutes of work to 5 minutes of review. The common thread: connected sources, a clear format, a result you can check in 15 seconds.</li>
          <li><strong>Jeff Su</strong>: a dedicated folder just for Cowork; CLAUDE.md under 300 lines with six sections and pointers to separate files; a memory diet with a 150-line ceiling and an archive; the "skill or project" check: if your judgment is needed along the way, it is a project, if you know exactly what the output looks like, it is a skill.</li>
          <li><strong>Tina Huang</strong>: a full Cowork setup with templates and ready workflows that repeat, instead of a new brief from scratch every time.</li>
          <li><strong>Anthropic's official rule</strong>: Chat is for when the output is a thought in your head. Cowork is for when the output is something you will hand to someone else.</li>
        </ul>
      </Block>

      <Block title="When something goes wrong: a decision tree">
        <ul>
          <li><strong>Wrong direction mid-task</strong>: stop it and say what to do instead. What is done so far stays.</li>
          <li><strong>It wrote over a file</strong>: check the copy in the Cowork folder and version history in Drive or OneDrive. From now on: originals outside the working folder.</li>
          <li><strong>It ignores an instruction</strong>: the instructions file is long or ambiguous. Cut and rewrite the rule in one line. If it must always apply: Global instructions, not memory.</li>
          <li><strong>It asks things it should know</strong>: the instruction is unclear or the session is long. New session with a short context summary.</li>
          <li><strong>It keeps making the same error</strong>: new session and a brief with "do not do X, because Y". If it repeats across tasks: a line in CLAUDE.md.</li>
          <li><strong>It says done but it is not</strong>: the brief has no definition of done. Add one and ask for a Checks sheet or a list of what was verified.</li>
          <li><strong>Too many permission prompts</strong>: Always allow for the connector's safe tools; Auto mode for routine tasks. Never Skip for tasks with external files.</li>
          <li><strong>Slow and expensive</strong>: Settings → Usage. Turn off unneeded connectors and skills, lower effort for mechanical work, split the task.</li>
          <li><strong>A connector is not working</strong>: Customize → Connectors, Reconnect. Check it is turned on for this session in the + menu.</li>
          <li><strong>A scheduled task did not run</strong>: Scheduled → runs. If it touches local files, the app must be open. Run it manually and read the error.</li>
          <li><strong>Quality drops in a long session</strong>: the context is full. Ask for a handoff summary in a document, start a new session, load the summary.</li>
        </ul>
        <Callout kind="rule">
          Develop a feel for it. Sometimes it is right to let the session grow because you are deep in one analysis. Sometimes it is right to skip
          the questions because the task is routine and you know it. Notice what produced the good result and write it down: in <Feat>Memory</Feat>,
          in a skill, or in the brief you keep for next time.
        </Callout>
        <p>The process step by step: <Link to="/workflow">section 4</Link>. The brief: <Link to="/briefs">section 5</Link>. Checking: <Link to="/verify">section 10</Link>.</p>
      </Block>

      <Pager current="/practices" />
    </>
  )
}
