import { Link } from '../../../components/Link'
import { Block, Brief, Callout, Code, Feat, PageHead, Pager } from '../../../components/Bits'

export function MemoryPage() {
  return (
    <>
      <PageHead
        mark="3"
        title="Instructions, projects and memory"
        lede="Goal: Claude knows who you are, how you write and where things are, without you explaining it in every conversation."
        chips={['Instructions', 'Projects', 'Memory', 'CLAUDE.md', 'MEMORY.md']}
      />

      <Block title="The five layers, from the most general to the most specific">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Layer</th><th>Where</th><th>What it holds</th><th>Applies to</th></tr></thead>
            <tbody>
              <tr><td className="cat">Instructions for Claude</td><td>Settings, account</td><td>How to talk to you: language, tone, terminology, preferred approaches.</td><td>Every Chat conversation.</td></tr>
              <tr><td className="cat">Global instructions</td><td>Settings → Cowork</td><td>Rules for every Cowork session: formats, where to save, ask before starting.</td><td>Every Cowork session.</td></tr>
              <tr><td className="cat">Memory</td><td>Settings → Capabilities</td><td>What Claude has learned about you from conversations: role, preferences, current projects.</td><td>Chat (and Cowork projects with their own memory).</td></tr>
              <tr><td className="cat">Projects</td><td>Chat or Cowork</td><td>Knowledge and instructions for one area of work: files, links, rules.</td><td>Conversations inside the project.</td></tr>
              <tr><td className="cat">CLAUDE.md in the folder</td><td>The working folder</td><td>What is in the folder, what things are called, what the rules are here.</td><td>Cowork sessions in that folder.</td></tr>
            </tbody>
          </table>
        </div>
        <Callout kind="rule">
          The rule for every layer: only what Claude cannot work out on its own by looking at the files. Short. An instruction Claude follows anyway gets removed.
        </Callout>
      </Block>

      <Block title="Instructions for Claude and Memory in Chat">
        <ul>
          <li><strong>Instructions</strong> are a few sentences for the whole account. Example: "Answer in English, briefly, with concrete numbers. When you build tables, use European number formatting. Do not explain what you are about to do, do it."</li>
          <li><strong><Feat>Memory</Feat></strong> fills itself from conversations: role, team, style, what you are working on. You can view and edit it. If Claude has remembered something wrong or outdated, delete it, or it will keep repeating it.</li>
          <li>Memory is about you, not about a project. The context of one budget or one client goes into a Project.</li>
          <li>Styles change the tone of one conversation (formal, concise, explanatory) without touching the account instructions.</li>
        </ul>
      </Block>

      <Block title="Projects in Chat">
        <ul>
          <li>A separate workspace with files (knowledge), instructions and its own conversation history. Claude has read everything inside before it starts.</li>
          <li>One Project per area: "Budget 2027", "Client X", "Internal comms". That way assumptions from one area do not leak into another.</li>
          <li>Knowledge: templates, previous reports, a glossary of terms, company rules. On paid plans large volumes are indexed and Claude pulls only what the question needs.</li>
          <li>Project instructions are for that area: "Reports are for the board, two pages max, figures in thousands of euros."</li>
          <li>On Team and Enterprise a project is shared with colleagues with view or edit rights. On the free plan: up to 5 projects.</li>
        </ul>
        <Brief title="Example instructions for a &quot;Monthly report&quot; Project">{`This project is for the monthly board report. Audience: five directors without a finance background. Structure: always a one-page summary, then a plan/actual/variance table, then three risks. Figures in thousands of euros, no decimals. Use the terms from glossary.md. Previous reports are in the knowledge as examples of tone and length.`}</Brief>
      </Block>

      <Block title="Cowork: CLAUDE.md and MEMORY.md in the folder">
        <p>
          In Cowork, instructions and memory are plain markdown files in the working folder. Claude reads them at the start of a session and writes to
          MEMORY.md itself when it learns something. You can open and edit them like any text file (Obsidian shows them formatted).
        </p>
        <Code title="Documents/Cowork/CLAUDE.md">{`# How we work in this folder

## Who I am
Read ABOUT ME/role.md and ABOUT ME/writing-style.md at the start of every session.

## Where things are
- PROJECTS/<name>/ : one folder per project, with brief.md, inputs/, drafts/
- TEMPLATES/ : company templates. Decks from deck.pptx, documents from report.docx
- OUTPUTS/ : finished files only, named YYYY-MM-DD_project_what.xlsx

## Rules
- Never overwrite a file in inputs/. New versions go to drafts/ or OUTPUTS/.
- Excel: formulas, not values. A separate "Sources" sheet with where every number came from.
- Before a task longer than 10 minutes: repeat what you understood and ask, then start.
- Unsure number or fact: mark [VERIFY], do not guess.

## Memory
Write to MEMORY.md only things that will still be true in a month. One or two sentences per entry.`}</Code>
        <Code title="Documents/Cowork/MEMORY.md">{`# Memory

## Active projects
- Budget 2027: draft v3 in PROJECTS/budget-2027/drafts/, waiting for sales figures until 10 Oct.

## Recurring tasks
- Every Monday: summary of the week's email in OUTPUTS/weekly-inbox.docx.

## About me and the work
- I prefer tables over prose when there are more than 5 numbers.
- The director always wants risks as three bullets, never more.`}</Code>
        <ul>
          <li>CLAUDE.md: 200 to 300 lines at most. One question per line: "does Claude need this in every session, or only for a specific task?" The second kind goes in a separate file that CLAUDE.md points to in one line.</li>
          <li>MEMORY.md: one to two sentence entries, under 150 lines. Old entries move to ARCHIVE.md, which is not read every session.</li>
          <li>A folder can have its own CLAUDE.md. PROJECTS/budget-2027/CLAUDE.md applies when Claude works there and adds to the general one.</li>
          <li>Cowork does not read Claude Code's ~/.claude folder. Skills and connectors are managed from Customize in the app.</li>
        </ul>
      </Block>

      <Block title="Cowork Projects">
        <p>
          Cowork has its own projects (Projects in the left navigation). One Cowork project bundles: a description, one or more local folders, instructions,
          links to documents and dashboards, a linked Chat project and its own memory. When you select it, the session starts with all of that loaded.
        </p>
        <div className="grid-2">
          <div className="panel">
            <h3>How to create one</h3>
            <ol>
              <li>Projects → +.</li>
              <li>Start from scratch (new folder), Import a project (brings a Chat project into Cowork) or Use an existing folder.</li>
              <li>Name, description, folders, instructions. All of it can change later.</li>
            </ol>
          </div>
          <div className="panel">
            <h3>What to know</h3>
            <ul>
              <li>Lives only on your computer. Not synced and not shared.</li>
              <li>Files up to 50 MB are read. Dragging in a file copies it into the first folder, dragging in a folder mounts it as another one.</li>
              <li>Archive deletes the name, instructions and memory but does not touch the files on disk.</li>
              <li><Feat>Dispatch</Feat> reads the description to decide which project a background task goes into (<Link to="/scheduled">section 13</Link>).</li>
            </ul>
          </div>
        </div>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th></th><th>Cowork project</th><th>Chat project</th></tr></thead>
            <tbody>
              <tr><td className="cat">Lives</td><td>on your computer</td><td>in your account</td></tr>
              <tr><td className="cat">Local folders</td><td>yes</td><td>no</td></tr>
              <tr><td className="cat">Sharing with colleagues</td><td>no</td><td>yes, on Team and Enterprise</td></tr>
              <tr><td className="cat">Link between the two</td><td colSpan={2}>A Chat project can be attached to a Cowork project as a source of knowledge. They do not merge.</td></tr>
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="Where to put what: a quick test">
        <ul>
          <li><strong>Applies to every conversation, any kind of work</strong>: Instructions for Claude (Chat) or Global instructions (Cowork).</li>
          <li><strong>A fact about you</strong>: Memory. Let Claude write it or tell it "remember that...".</li>
          <li><strong>Knowledge about one area</strong>: Project. The files and instructions inside it.</li>
          <li><strong>How to work with specific folders and files</strong>: CLAUDE.md in the folder.</li>
          <li><strong>A repeating process with steps</strong>: not memory but <Feat>Skills</Feat> (<Link to="/skills">section 12</Link>).</li>
          <li><strong>Something for one task</strong>: in the brief. Do not write it down anywhere.</li>
        </ul>
        <Callout kind="tip" title="Maintenance once a month">
          Open MEMORY.md and the memory in Chat. Delete what is outdated. Look for a rule in CLAUDE.md that Claude follows even without it, and remove it.
          If you corrected Claude three times for the same thing during the month, that is a line in CLAUDE.md.
        </Callout>
      </Block>

      <Pager current="/memory" />
    </>
  )
}
