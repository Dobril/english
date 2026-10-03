import { permissionModes, shortcuts } from '../data/keys'
import { Block, Callout, PageHead, Pager } from '../../../components/Bits'

export function KeysPage() {
  const groups = Array.from(new Set(shortcuts.map((s) => s.group)))
  return (
    <>
      <PageHead
        mark="⌨"
        title="Keys and modes"
        lede="The keyboard shortcuts, the special prefixes and the five permission modes, with when to use which."
        chips={['Shift+Tab', 'Esc', '@', '!', 'plan / auto']}
      />

      <Block title="Permission modes">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Mode</th><th>How it works</th><th>When</th></tr></thead>
            <tbody>
              {permissionModes.map((m) => (
                <tr key={m.name}><td className="cat">{m.name}</td><td>{m.how}</td><td>{m.when}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout kind="tip">
          A typical day: start in plan mode (or /plan), approve the plan, switch to auto or accept edits for execution.
          Manual when touching something sensitive and you want to see every command. Bypass never on your machine.
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

      <Block title="Other useful input habits">
        <ul>
          <li>You can type while Claude works. Messages queue up and are sent when the turn ends. Ctrl+Enter sends them right away.</li>
          <li>The built-in spell check underlines mistakes as you type (enabled from /config).</li>
          <li>Vim mode: /config → Editor mode. All the usual motions and text objects work.</li>
          <li>The full list, including Vim and the transcript view: <a href="https://code.claude.com/docs/en/interactive-mode" target="_blank" rel="noreferrer">Interactive mode</a>. Rebinding: /keybindings.</li>
        </ul>
      </Block>

      <Pager current="/keys" />
    </>
  )
}
