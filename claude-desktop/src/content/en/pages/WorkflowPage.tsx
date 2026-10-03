import { Link } from '../../../components/Link'
import { Block, Brief, Callout, Feat, PageHead, Pager, Steps } from '../../../components/Bits'

export function WorkflowPage() {
  return (
    <>
      <PageHead
        mark="4"
        title="Workflow for one task"
        lede="Goal: from idea to a finished file you can send, without doing it twice."
        chips={['brief', 'questions', 'execution', 'checking', 'saving what you learned']}
      />

      <Block title="The rhythm of one task">
        <div className="flow">
          <div className="flow-step"><div className="n">1</div><div className="t">Choose</div><div className="d">Chat or Cowork</div></div>
          <div className="flow-step"><div className="n">2</div><div className="t">Inputs</div><div className="d">files in the folder</div></div>
          <div className="flow-step"><div className="n">3</div><div className="t">Brief</div><div className="d">outcome and criteria</div></div>
          <div className="flow-step"><div className="n">4</div><div className="t">Questions</div><div className="d">you answer, you approve</div></div>
          <div className="flow-step"><div className="n">5</div><div className="t">Execution</div><div className="d">watch, correct early</div></div>
          <div className="flow-step"><div className="n">6</div><div className="t">Check</div><div className="d">open the file, the numbers</div></div>
          <div className="flow-step"><div className="n">7</div><div className="t">Refine</div><div className="d">same session or a new one</div></div>
          <div className="flow-step"><div className="n">8</div><div className="t">Save</div><div className="d">CLAUDE.md, skill, schedule</div></div>
        </div>
        <p className="muted small">Steps 3 and 6 are your thinking. Everything in between is Claude's work. That is where the time is won.</p>
      </Block>

      <Block title="Step by step">
        <Steps
          items={[
            {
              title: 'Decide Chat or Cowork',
              body: (
                <p>Will you hand a file to someone? Does it touch more than one file or app? Does it repeat? Yes to any of the three: <Feat>Cowork</Feat>. Otherwise Chat.
                  The five-ingredient test is in <Link to="/how-it-works">section 1</Link>.</p>
              ),
            },
            {
              title: 'Prepare the inputs',
              body: (
                <ul>
                  <li>Copy the files into <code>PROJECTS/&lt;name&gt;/inputs/</code>. Cowork sees nothing outside the granted folders.</li>
                  <li>The original is never the only copy. Cloud folders sync immediately, so work on a copy.</li>
                  <li>If a connector will be used (mail, Drive, calendar), check in the conversation's + menu that it is turned on.</li>
                  <li>If the task is large, write a <code>brief.md</code> in the project folder. You will use it again.</li>
                </ul>
              ),
            },
            {
              title: 'Write the brief',
              body: (
                <>
                  <p>Five things: what the outcome is, what the inputs are, in which format, how you will know it is good, what the constraints are.
                    End with the sentence that saves the most time:</p>
                  <Brief>{`Before we begin, repeat my ask back to me so we are aligned, then ask me as many clarifying questions as you have.`}</Brief>
                  <p>Five answers up front cost 30 seconds. The same gaps found afterwards cost time, usage and nerves. In detail: <Link to="/briefs">section 5</Link>.</p>
                </>
              ),
            },
            {
              title: 'Answer and approve',
              body: (
                <ul>
                  <li>Claude repeats the task and asks. Answer briefly and concretely. "I don't know, you decide" is also an answer, but say it on purpose.</li>
                  <li>For a bigger task Claude shows a plan of steps. Read it. This is where changing direction is cheap.</li>
                  <li>In Manual mode it asks permission for every action. Read what it is about to do, then Allow.</li>
                </ul>
              ),
            },
            {
              title: 'Let it work, but watch',
              body: (
                <ul>
                  <li>You see every step: which file it reads, what it builds, what it checks. You do not need to watch the whole time, but the first minutes matter most.</li>
                  <li>If it goes off course, stop it immediately and say what to do instead. Redirecting in minute two is cheap; after minute twenty it is a new task.</li>
                  <li>When the task is long, work on something else in parallel. Claude will call you if it has a question or needs permission.</li>
                </ul>
              ),
            },
            {
              title: 'Check the result',
              body: (
                <ul>
                  <li>Open the file. Do not read only Claude's summary of the file.</li>
                  <li>Excel: formulas are formulas, not values; totals add up; there is a sources sheet. Deck: the template is respected, numbers match the spreadsheet. Document: names, dates, amounts are right.</li>
                  <li>Every <code>[VERIFY]</code> in the text is yours. You check it or ask where it came from.</li>
                  <li>The full checklist per file type: <Link to="/verify">section 10</Link>.</li>
                </ul>
              ),
            },
            {
              title: 'Refine',
              body: (
                <ul>
                  <li>Small fixes ("change the title on slide 4", "add a percentage column") in the same session. Claude already knows the files.</li>
                  <li>A new deliverable or another topic: a new session. The full context of the old task only gets in the way.</li>
                  <li>A third correction of the same thing: stop. The problem is in the brief or the instructions, not in the fix. Write a better brief and start over.</li>
                </ul>
              ),
            },
            {
              title: 'Save what you learned',
              body: (
                <ul>
                  <li>You corrected Claude on a rule that always applies: one line in CLAUDE.md (<Link to="/memory">section 3</Link>).</li>
                  <li>The process will repeat with other inputs: ask Claude to save it as a skill (<Link to="/skills">section 12</Link>).</li>
                  <li>It will run every week or month: <Feat>Scheduled tasks</Feat> (<Link to="/scheduled">section 13</Link>).</li>
                  <li>None of the above: write nothing down. Memory grows only with useful things.</li>
                </ul>
              ),
            },
          ]}
        />
      </Block>

      <Block title="An example from start to finish">
        <Brief title="Brief in Cowork (folder PROJECTS/expenses-q3)">{`I need a Q3 expense report from the receipts in inputs/ (about 60 photos and PDFs).

Outcome: OUTPUTS/2026-10-03_expenses-q3.xlsx with a sheet "Expenses" (date, vendor, category, net amount, VAT, gross amount, source file), a sheet "By category" summarising by category and month with formulas, and a sheet "To verify" with everything you are not sure you read correctly.

Categories are in TEMPLATES/categories.md. Numbers in European format. If a receipt is unreadable, put it in "To verify" with the photo, do not guess the amount.

Before we begin, repeat my ask back to me and ask me your questions.`}</Brief>
        <p>What usually follows: Claude asks about the currency of two foreign receipts and whether to include tips. You answer. It works for about ten minutes with a few
          sub-agents. You open the file: you check five random rows against the photos and the totals by category. The "To verify" sheet has four rows, which you fix by hand.
          Finally: "Save this process as a skill called expenses-report so I can run it every quarter."</p>
      </Block>

      <Block title="The Chat version of the same rhythm">
        <p>In Chat the steps are the same but lighter: you upload the files, write the question or task, refine over a few turns, download the result from Artifacts.
          The checking stays yours. The difference: in Chat you carry the files back and forth, in Cowork Claude works in place.</p>
        <ul>
          <li>One conversation per topic. A side question: a new conversation or a Project.</li>
          <li>A long conversation with falling quality: ask for a summary of what was decided so far, start a new conversation with it.</li>
          <li>Email drafts and short texts: Chat is faster than Cowork. Not everything is a deliverable.</li>
        </ul>
      </Block>

      <Callout kind="rule" title="Who is responsible for what">
        Claude: reads the inputs, asks, plans, builds the file, formats, checks its own numbers and tells you where it is unsure. You: choose the task,
        provide the inputs, approve the plan, verify the numbers and facts, send or present. Nothing leaves your computer and nothing is sent
        to anyone without you.
      </Callout>

      <Pager current="/workflow" />
    </>
  )
}
