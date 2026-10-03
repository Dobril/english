import { Link } from '../../../components/Link'
import { Block, Brief, Callout, Feat, PageHead, Pager, Steps } from '../../../components/Bits'

export function ScheduledPage() {
  return (
    <>
      <PageHead
        mark="13"
        title="Recurring and background work"
        lede="Goal: the things you do the same way every week happen by themselves, and long tasks keep running while you do something else."
        chips={['/schedule', 'Scheduled', 'Dispatch', 'parallel tasks', 'paid plans']}
      />

      <Block title="Three different things people mix up">
        <div className="grid-3">
          <div className="panel">
            <h3>Scheduled task</h3>
            <p>A task with a full brief that Cowork runs on a cadence: hourly, daily, weekly, weekdays only, or manually when you need it. It has no conversation history; every run starts from the brief.</p>
          </div>
          <div className="panel">
            <h3>Dispatch</h3>
            <p>A long-running agent in the left sidebar. You describe the outcome once, it splits the work into child tasks and runs each as a separate Cowork session. You do not watch every step, you come back to finished work.</p>
          </div>
          <div className="panel">
            <h3>Parallel work in one session</h3>
            <p>"Process each of these 10 files and produce a separate one-page summary for each." Cowork uses sub-agents and finishes in minutes, not half an hour. Several Cowork tasks can also run side by side in the sidebar.</p>
          </div>
        </div>
      </Block>

      <Block title="How to create a recurring task">
        <Steps
          items={[
            {
              title: 'Run it by hand three times',
              body: (
                <p>
                  Run the task as a normal Cowork session. Fix the brief until the result comes out right three times in a row without your
                  help. Only then put it on a schedule. Schedule it on day one and you will get a wrong result every morning.
                </p>
              ),
            },
            {
              title: 'Schedule it',
              body: (
                <ul>
                  <li>Type <code>/schedule</code> in any Cowork task and describe what and how often.</li>
                  <li>Or from the sidebar: <strong>Scheduled</strong> → <strong>New task</strong> → <strong>Create with Claude</strong>. Claude asks multiple-choice questions and you confirm.</li>
                  <li>Or <strong>Set up manually</strong>: name, full brief, approval mode, frequency, and optionally a model and a folder.</li>
                </ul>
              ),
            },
            {
              title: 'Pick a frequency and an approval mode',
              body: (
                <p>
                  Frequencies: hourly, daily, weekly, weekdays only, manual. The approval mode decides whether the task may send email or change
                  records on its own. For anything that leaves the building, keep approval on: the task prepares, you send.
                </p>
              ),
            },
            {
              title: 'Review the runs',
              body: (
                <p>
                  From <strong>Scheduled</strong> you see every task and every run, edit the brief and cadence, pause, delete, or run manually. Spend
                  10 minutes on Friday going through the week's results.
                </p>
              ),
            },
          ]}
        />
      </Block>

      <Block title="What a scheduled task can and cannot do">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Can</th><th>Cannot</th></tr></thead>
            <tbody>
              <tr><td>Use the same connectors, skills and plugins as a normal task.</td><td>Be tied to a folder on your computer. It works with connectors and the files saved to your Claude account.</td></tr>
              <tr><td>Run in the cloud while your computer sleeps and the app is closed.</td><td>Touch local files unless the desktop app is open.</td></tr>
              <tr><td>Write the result to a Google Doc, a Notion page, a spreadsheet or an email draft.</td><td>Remember the previous conversation. Every run starts from the brief.</td></tr>
              <tr><td>Run on demand when you need an extra run.</td><td>Decide on its own to skip a run.</td></tr>
            </tbody>
          </table>
        </div>
        <p className="muted small">Available on all paid plans. Beta on web and mobile.</p>
      </Block>

      <Block title="Five rules for a scheduled task brief">
        <ol>
          <li><strong>The whole brief.</strong> The task has no conversation context. Sources, format, recipient, what "good" means, all of it goes in.</li>
          <li><strong>A dated file or document.</strong> "Save to Reports/2026-10-03 weekly report.docx" or to a named Google Doc. Not "make a report".</li>
          <li><strong>Flag anomalies.</strong> "If the total moves more than 20% from last week, put a WARNING section at the top." Otherwise you get quietly wrong numbers.</li>
          <li><strong>Nothing goes out without you.</strong> Emails as drafts, CRM records only after approval. That is what the approval mode is for.</li>
          <li><strong>Watch usage.</strong> Settings → Usage. Auto mode uses more because of its safety reviews. An hourly task with connectors adds up fast.</li>
        </ol>
        <Brief title="Example: morning briefing, every weekday at 7:00">{`Read the unread Gmail messages from the last 16 hours and the Slack messages in #sales and #support.
Sort them into three groups: Needs a reply today, For information, Can wait.
For every item in the first group: who, what they want, deadline, a one-sentence suggested reply.
If there is an incident or a customer complaint, put it at the very top marked WARNING.
Write the result into the Google Doc "Morning briefing" as a new section with today's date at the top.
Do not send anything and do not mark emails as read.`}</Brief>
      </Block>

      <Block title="Examples that work in real teams">
        <ul>
          <li><strong>6am briefing</strong> from Slack and Gmail: sorted into buckets, with flagged items and overnight incidents. Anthropic's marketing team runs it daily.</li>
          <li><strong>Budget pacing</strong>: pulls daily spend from the ad platforms, calculates pacing against the monthly budget, replaces the export-copy-paste cycle.</li>
          <li><strong>Weekly Search Console report</strong>: queries, countries and pages in one sheet, filtered to the period, meaningful changes flagged. From 30 minutes of work to 5 minutes of review.</li>
          <li><strong>Friday cleanup</strong>: the week's files sorted into folders with descriptive names and a list of what moved.</li>
          <li><strong>Weekly expense report</strong> from the receipts and invoices uploaded to Drive, with a VERIFY row for anything unclear.</li>
        </ul>
      </Block>

      <Block title="Dispatch: when the task is big and you do not want to watch">
        <p>
          <Feat>Dispatch</Feat> is for work you start and come back to later. It needs Pro or Max and the latest desktop app.
        </p>
        <ul>
          <li>Open <strong>Dispatch</strong> in the left sidebar and describe the outcome the way you would brief a colleague. Name the <Feat>Projects</Feat> project it should work in; if you do not, it offers a choice.</li>
          <li>The agent splits the work into child tasks. Each is a separate Cowork session with its own state: Running, Awaiting input, Awaiting answer, Completed, Error, Archived.</li>
          <li>When a child task needs permission, the prompt comes to you. No answer within 10 minutes means an automatic deny, and the task continues without that action.</li>
          <li>Child tasks do not spawn children of their own. One conversation with Dispatch, many tasks beneath it.</li>
          <li>From your phone: while the desktop is open, awake and online, you start a task in the mobile app and it runs on your computer. Results show on both devices.</li>
        </ul>
        <Brief title="Dispatch example">{`Prepare the materials for the quarterly board review. In the "Board Q3" project:
1) from the spreadsheets in Finance/ build a summary of revenue and costs by month,
2) from Meeting notes/ pull out the decisions and the open questions,
3) draft an 8-slide deck using the template Board-template.pptx.
Each result is a separate file in Output/. At the end tell me what is missing before it is ready.`}</Brief>
      </Block>

      <Callout kind="warn" title="What not to schedule">
        Tasks where every run is different and needs your judgment. Tasks that send something to a client without review. Tasks whose
        result you cannot check in 15 seconds. Those stay as manual Cowork sessions, or Dispatch with approval on.
      </Callout>

      <Callout kind="rule">
        The rule from <Link to="/skills">section 12</Link>: a repeating process becomes a skill, a process that repeats on a calendar becomes a
        scheduled task. The skill holds the "how", the schedule holds the "when". The strongest combination is a scheduled task that uses your skill.
      </Callout>

      <Pager current="/scheduled" />
    </>
  )
}
