import { Link } from '../../../components/Link'
import { Block, Brief, Callout, Feat, PageHead, Pager, Steps } from '../../../components/Bits'

export function BrowserPage() {
  return (
    <>
      <PageHead
        mark="14"
        title="Browser and Office add-ins"
        lede="Goal: know when Claude should work in the browser, when inside Excel, PowerPoint and Word, and when you are better off handing it the files."
        chips={['Built-in browser', 'Claude in Chrome', 'Computer use', 'Claude for Microsoft 365', 'Quick entry']}
      />

      <Block title="Which one when">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Situation</th><th>Use</th><th>Why</th></tr></thead>
            <tbody>
              <tr><td className="cat">The work is on a page in front of you and you are signed in</td><td><Feat>Claude in Chrome</Feat></td><td>Works in your own browser with your tabs and sessions. Nothing to set up.</td></tr>
              <tr><td className="cat">You are handing off a task and do not want to watch</td><td><Feat>Built-in browser</Feat> in Cowork</td><td>A separate pane inside the app, Claude opens and reads on its own. It does not get in the way of your own browser.</td></tr>
              <tr><td className="cat">The file is open and you want in-place changes</td><td><Feat>Claude for Excel</Feat>, <Feat>Claude for PowerPoint</Feat>, <Feat>Claude for Word</Feat></td><td>Preserves formulas, template and styles. Word edits as tracked changes.</td></tr>
              <tr><td className="cat">The work spans many files and apps and the output is a new file</td><td><Feat>Cowork</Feat></td><td>Reads the folder, writes files, uses connectors. <Link to="/workflow">Section 4</Link>.</td></tr>
              <tr><td className="cat">The output is a thought or a draft</td><td>Chat</td><td>Fast, no tools. <Link to="/how-it-works">Section 1</Link>.</td></tr>
              <tr><td className="cat">A question about what is on your screen</td><td>Quick entry</td><td>Double-tap Option (or Option+Space) on Mac, a screenshot and a question, without leaving the app you are in.</td></tr>
              <tr><td className="cat">No connector, no file, only an app on the screen</td><td><Feat>Computer use</Feat></td><td>Last resort. Slow and costly, but it reaches where nothing else does.</td></tr>
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="The built-in browser in Cowork">
        <p>
          A <strong>Browser</strong> pane inside the desktop app. Claude opens pages, reads them, clicks, types, fills forms and takes screenshots
          while you watch from the side. Same capabilities as Claude in Chrome, but it does not depend on your own browser. Pro, Max and Team;
          Enterprise when an owner turns it on.
        </p>
        <Steps
          items={[
            { title: 'First action on a site', body: <p>Before acting on a site, Claude asks: <strong>Allow once</strong> for this page or <strong>Always allow</strong> for the site. Revoke in Settings.</p> },
            { title: 'Logins', body: <p>On first use you can import saved logins from Chrome, Edge or Firefox, site by site. Banking, email and SSO sites are unchecked by default and stay out unless you pick them. Logins are kept across sessions on the same computer.</p> },
            { title: 'Cleaning up', body: <p><strong>Clear browsing data</strong> from the pane menu. Logins live in the app's own storage, not in your browser.</p> },
            { title: 'Requirement', body: <p>The desktop app must be open and online, even when you start the task from web or mobile.</p> },
          ]}
        />
        <p className="muted small">Preferred browser: Settings → Cowork → Preferred browser. Claude uses your choice unless it is unavailable or you ask otherwise.</p>
      </Block>

      <Block title="Claude in Chrome">
        <ul>
          <li>An extension for Chrome and Edge from the Chrome Web Store. Sign in with the same Claude account.</li>
          <li>Works in your browser: it sees your tabs and gets in wherever you are already signed in. That makes it the natural choice for portals, internal systems and anything behind a login.</li>
          <li>Cowork can use it for work behind a login instead of the built-in browser. Chrome side panel for Cowork: Max and Team, Pro rolling out.</li>
          <li>Best for: "fill in this form from the spreadsheet", "pull the table on this page into Excel", "go through these 20 listings and summarise the terms".</li>
        </ul>
        <Brief title="Example">{`Open the supplier portal (I am already signed in in this tab). For every invoice in Invoices-September.xlsx enter number, date, amount and supplier in the "New invoice" form. Do not press "Submit", leave each one on screen for review and tell me when it is ready. If a field does not match the columns, stop and ask.`}</Brief>
      </Block>

      <Block title="Computer use">
        <p>
          In beta, needs macOS 14 or later. Claude controls the apps on your screen, with permission granted per application. Useful for desktop
          programs with no connector and no file export: an old accounting package, an internal client, anything that exists only as a window.
          It is slow and costs a lot of tokens. Before you reach for it, check for a connector (<Link to="/connectors">section 11</Link>) or a file
          export that Cowork can read.
        </p>
      </Block>

      <Callout kind="warn" title="The browser is the riskiest surface">
        A web page can carry hidden instructions (prompt injection). Safeguards reduce the risk but cannot eliminate it. Do not use the browser for
        banking, medical or sensitive personal data. On unfamiliar sites, review every action before approving it. Browser tasks are slower and use
        more of your limit; if a connector exists for the same system, it is faster and more reliable.
      </Callout>

      <Block title="Claude for Microsoft 365: Excel, PowerPoint, Word, Outlook">
        <p>
          An add-in that puts Claude inside Office. Excel, PowerPoint and Word are generally available, Outlook is in beta. The conversation sees
          the open file and works on it: with formulas and dependencies in Excel, with the template and slide master in PowerPoint, with tracked
          changes and comments in Word.
        </p>
        <Steps
          items={[
            { title: 'Install', body: <p>Microsoft AppSource, listing <strong>Claude for Microsoft 365</strong>, button <strong>Get it now</strong>. One listing covers all four apps.</p> },
            { title: 'Activate', body: <p>Open the app. Windows: Home → Add-ins. Mac: Tools → Add-ins. Sign in with your Claude account.</p> },
            { title: 'Check the version', body: <p>Excel and PowerPoint: web, Windows with Microsoft 365 build 16.0.13127.20296 or later, Mac 16.46 or later. Word: Windows version 2205 or later, Mac 16.61 or later. Not on Excel 2016 and 2019 perpetual licences, iPad or Android.</p> },
            { title: 'Set instructions', body: <p>Settings in the add-in sidebar → Instructions. Separate per app: "thousand separators on all numbers" in Excel, "one-line bullets" in PowerPoint, "formal tone" in Word.</p> },
          ]}
        />
        <div className="grid-2">
          <div className="panel">
            <h3>What you get</h3>
            <ul>
              <li>Shared context across Excel, PowerPoint, Word and Outlook: "take the summary table from the workbook and put it on slide 3", no copying.</li>
              <li>Dictation instead of typing the prompt.</li>
              <li>Connectors and skills work here too.</li>
              <li>Long conversations compact automatically, history is stored locally in the add-in.</li>
              <li>Usage counts against your Claude plan.</li>
            </ul>
          </div>
          <div className="panel">
            <h3>What to watch</h3>
            <ul>
              <li>External files (templates from the internet, files from counterparties) can carry hidden instructions. Confirm risky operations carefully.</li>
              <li>Not for final client deliverables without human review. Not for audit-critical calculations without verification.</li>
              <li>The Excel add-in does not touch data tables, macros or VBA.</li>
              <li>Always on a copy when the change is large. Per-app detail in <Link to="/spreadsheets">section 6</Link>, <Link to="/presentations">7</Link> and <Link to="/documents">8</Link>.</li>
            </ul>
          </div>
        </div>
      </Block>

      <Block title="Quick entry: Claude on top of any app">
        <ul>
          <li>Mac: double-tap Option opens a Claude box over the current app. Alternatives: Option+Space or your own combination, in Settings → General.</li>
          <li>A screenshot or a window pick in one click, then the question: "what is wrong with this formula", "translate this email", "summarise the contract on my screen".</li>
          <li>Caps Lock for dictation (off by default, macOS 14+). Needs screen recording, accessibility and speech recognition permissions in System Settings → Privacy &amp; Security.</li>
          <li>Available on every plan, the free one included.</li>
        </ul>
      </Block>

      <Callout kind="rule">
        Order of preference: file or connector, then add-in, then browser, then computer use. Each step is slower, costlier and has more ways to go
        wrong. Checking the result is the same everywhere: <Link to="/verify">section 10</Link>.
      </Callout>

      <Pager current="/browser" />
    </>
  )
}
