import { settingsMap, shortcuts } from '../data/keys'
import { Block, Callout, PageHead, Pager } from '../../../components/Bits'

export function KeysPage() {
  const groups = Array.from(new Set(shortcuts.map((s) => s.group)))
  return (
    <>
      <PageHead
        mark="⌨"
        title="Keys and settings"
        lede="Keyboard shortcuts in the app, quick entry on Mac, the / commands in Cowork and the settings map: what lives where and when you touch it."
        chips={['Cmd+K', 'Option Option', '/schedule', 'Settings > Cowork', 'Customize']}
      />

      <Block title="Settings map">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Where</th><th>What is there</th><th>When</th></tr></thead>
            <tbody>
              {settingsMap.map((m) => (
                <tr key={m.where}><td className="cat">{m.where}</td><td>{m.what}</td><td className="muted">{m.when}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout kind="tip">
          A typical day one: Settings &gt; Capabilities (Memory and Code execution on), Settings &gt; Cowork (20 lines of Global
          instructions, Manual mode), Customize &gt; Connectors (Drive or Microsoft 365, your mail). Everything else when you need it.
        </Callout>
      </Block>

      {groups.map((g) => (
        <Block key={g} title={g}>
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Key</th><th>What it does</th><th>Note</th></tr></thead>
              <tbody>
                {shortcuts.filter((s) => s.group === g).map((s) => (
                  <tr key={s.keys}><td className="k">{s.keys}</td><td>{s.what}</td><td className="muted">{s.note ?? ''}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Block>
      ))}

      <Block title="Other useful habits">
        <ul>
          <li>Write the brief on several lines with Shift+Enter: outcome, inputs, format, criteria. One long paragraph reads worse, for Claude too.</li>
          <li>You can type while Claude works or Research runs. The message waits and is sent after the turn.</li>
          <li>Dictation is faster for long briefs. Read the text before sending: file names and numbers are recognised worst.</li>
          <li>Quick entry with a screenshot is the fastest way to ask "what does this Excel error mean" without switching apps.</li>
          <li>If a feature does nothing on Mac, check System Settings &gt; Privacy &amp; Security. The app does not always say a permission is missing.</li>
          <li>Keys and menus change with versions. Current state: <a href="https://claude.com/docs/cowork/changelog" target="_blank" rel="noreferrer">Claude Desktop changelog</a>.</li>
        </ul>
      </Block>

      <Pager current="/keys" />
    </>
  )
}
