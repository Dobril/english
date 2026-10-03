import { Link } from '../../../components/Link'
import { Block, Callout, Code, Feat, PageHead, Pager, Steps } from '../../../components/Bits'

export function SetupPage() {
  return (
    <>
      <PageHead
        mark="2"
        title="Install and configure"
        lede="Goal: within an hour, have a working app, a working folder, the right permissions and your tools connected. Done once."
        chips={['macOS / Windows', 'Settings', 'Customize', 'working folder', 'Microsoft 365 add-in']}
      />

      <Block title="First-day steps">
        <Steps
          items={[
            {
              title: 'Install and sign in',
              body: (
                <ul>
                  <li>Download the app from <a href="https://claude.com/download" target="_blank" rel="noreferrer">claude.com/download</a> for macOS or Windows and sign in. Cowork requires a paid plan (Pro, Max, Team or Enterprise).</li>
                  <li>If your company is on Team or Enterprise, sign in with the work account. Connectors and plugins are often added by an admin and you only connect your own account.</li>
                </ul>
              ),
            },
            {
              title: 'Settings → General: quick access and dictation',
              body: (
                <ul>
                  <li><Feat>Quick entry</Feat> (Mac): double-tap Option opens Claude over any app. You can change it to Option+Space or your own combination.</li>
                  <li>Dictation: off by default because it takes over Caps Lock. Turn it on if you prefer to speak your briefs.</li>
                  <li>macOS will ask for Screen recording (screenshots), Accessibility and Speech recognition permissions (System Settings → Privacy &amp; Security).</li>
                </ul>
              ),
            },
            {
              title: 'Settings → Capabilities',
              body: (
                <ul>
                  <li>Turn on <Feat>Memory</Feat> so Claude remembers who you are and how you work.</li>
                  <li>Turn on "Code execution and file creation". Without it Claude cannot create Excel, Word and PowerPoint files, and skills do not run.</li>
                  <li>Tools: "Load tools when needed", so the context is not filled with every connector at once.</li>
                </ul>
              ),
            },
            {
              title: 'Settings → Cowork',
              body: (
                <ul>
                  <li><Feat>Global instructions</Feat>: a few lines that apply to every Cowork session (language, tone, format, where to save). Template below.</li>
                  <li>Permission mode: start with Manual (asks before every action). Move to Auto once you trust the behaviour. Do not use Skip on folders that matter.</li>
                  <li>Preferred browser: the built-in browser or Claude in Chrome (<Link to="/browser">section 14</Link>).</li>
                </ul>
              ),
            },
            {
              title: 'Create a working folder',
              body: (
                <ul>
                  <li>For example <code>Documents/Cowork</code>. Inside: <code>ABOUT ME</code>, <code>PROJECTS</code>, <code>TEMPLATES</code>, <code>OUTPUTS</code>. Structure below.</li>
                  <li>Cowork sees only the folders you grant. A file in Downloads does not exist for it until you copy it into the working folder or grant access to Downloads.</li>
                  <li>Work on copies. Originals of important documents stay outside the folder or in a read-only subfolder.</li>
                </ul>
              ),
            },
            {
              title: 'Customize → Connectors, Skills, Plugins',
              body: (
                <ul>
                  <li>Connect the tools where your work lives: Google Drive, Gmail, Calendar, Microsoft 365, Slack, Notion. Each asks you to sign in with your own account. <Link to="/connectors">Section 11</Link>.</li>
                  <li>Turn on Anthropic's built-in skills for Excel, Word, PowerPoint and PDF. They load on their own when a task needs them. <Link to="/skills">Section 12</Link>.</li>
                  <li>Browse plugins for your role (finance, marketing, HR, legal). Installing does not connect connectors automatically: open the plugin and connect each one.</li>
                </ul>
              ),
            },
            {
              title: 'If you work in Excel, PowerPoint or Word',
              body: (
                <ul>
                  <li>Install "Claude for Microsoft 365" from Microsoft AppSource ("Get it now"). Open Excel, activate the add-in (Windows: Home → Add-ins; Mac: Tools → Add-ins) and sign in with your Claude account.</li>
                  <li>One add-in covers Excel, PowerPoint, Word and Outlook. It needs a Microsoft 365 subscription; it does not run on Office 2016/2019 or on iPad.</li>
                  <li>The difference from Cowork: the add-in works on the open file inside the app, Cowork works on folders from the outside. <Link to="/browser">Section 14</Link>.</li>
                </ul>
              ),
            },
            {
              title: 'Optional: Claude in Chrome',
              body: (
                <p>A Chrome or Edge extension that lets Claude work in your browser with the sign-ins you already have. Useful for portals, systems behind a login and
                  web apps without a connector. Install it when you need it, not before.</p>
              ),
            },
          ]}
        />
      </Block>

      <Block title="Working folder structure">
        <Code title="Documents/Cowork">{`Cowork/
├── CLAUDE.md            instructions for every session in this folder (200-300 lines max)
├── MEMORY.md            what Claude has learned about you and the work (short entries)
├── ABOUT ME/
│   ├── role.md          role, team, priorities for the quarter
│   └── writing-style.md how you write: tone, banned words, examples
├── PROJECTS/
│   ├── budget-2027/     brief, input files, drafts
│   └── q3-report/
├── TEMPLATES/
│   ├── report.docx      company templates for Word, PowerPoint, Excel
│   ├── deck.pptx
│   └── brand.md         colours, fonts, logo, rules
└── OUTPUTS/             where Claude saves finished files`}</Code>
        <p>
          Why this shape: Claude reads <code>CLAUDE.md</code> at the start of every session and knows where things are. Templates in one place mean every
          deck starts from the company design. A separate <code>OUTPUTS</code> means you never confuse a draft with an original. What goes inside the
          files: <Link to="/memory">section 3</Link>.
        </p>
      </Block>

      <Block title="Global instructions template">
        <Code title="Settings → Cowork → Edit Global Instructions">{`Write to me in English unless the document is for a specific audience that needs another language.
Working folder: Documents/Cowork. Save finished files in OUTPUTS/, never over the original.
Before a large task: repeat what you understood and ask your questions, then start.
Numbers: thousands separator, two decimals for money, currency code after the number (1,250.00 EUR).
Dates: DD.MM.YYYY. Excel: formulas, not pasted values. Decks: the template in TEMPLATES/deck.pptx.
When unsure about a number or a fact, mark it [VERIFY] instead of guessing.`}</Code>
        <p className="muted small">Keep it short. Anything that applies to only one folder or one project goes in that folder's CLAUDE.md, not here.</p>
      </Block>

      <Block title="Permissions and safety">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Mode</th><th>How it works</th><th>When</th></tr></thead>
            <tbody>
              <tr><td className="cat">Manual</td><td>Stops and asks before every action.</td><td>The first weeks. Folders with important documents.</td></tr>
              <tr><td className="cat">Auto</td><td>A classifier reviews each action and blocks the risky ones. Uses more of your limit because of the reviews.</td><td>Daily work, once you know the behaviour.</td></tr>
              <tr><td className="cat">Skip</td><td>No pauses and no checks.</td><td>One-off tasks on copies you would not mind losing.</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>Deleting a file always asks for an explicit "Allow", whatever the mode.</li>
          <li>Connectors have their own permission per tool: Always allow, Needs approval, Blocked (Customize → Connectors → the connector).</li>
          <li>Files from outside sources (downloaded templates, documents from counterparties) can carry hidden instructions. Read every confirmation Claude asks for on such a file carefully.</li>
        </ul>
        <Callout kind="warn">
          Cowork writes real files on your disk. Before the first task on a folder with important content: make a copy. Cloud folders (Drive, OneDrive) sync
          changes immediately, so work on a copy there too.
        </Callout>
      </Block>

      <Block title="Check that everything works">
        <ul>
          <li>New Cowork session with the working folder. Brief: "Read CLAUDE.md and tell me in one sentence what you will do differently because of it." If the answer is right, the instructions are being read.</li>
          <li>A small task: "Create in OUTPUTS/ an Excel file with a table of the months of 2026 and a column with the number of working days, with a formula for the total." Open the file, check the formula.</li>
          <li>Connector: "What do I have in my calendar tomorrow?" If it asks for permission, answer Allow once and look at the result.</li>
          <li>Settings → Usage shows how much of your limit you have spent. Look at it after the first tasks so you know what one deliverable costs.</li>
        </ul>
        <p>Next: how to give Claude standing memory and instructions so you stop repeating yourself, in <Link to="/memory">section 3</Link>.</p>
      </Block>

      <Pager current="/setup" />
    </>
  )
}
