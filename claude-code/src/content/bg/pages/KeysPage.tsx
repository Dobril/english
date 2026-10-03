import { permissionModes, shortcuts } from '../data/keys'
import { Block, Callout, PageHead, Pager } from '../../../components/Bits'

export function KeysPage() {
  const groups = Array.from(new Set(shortcuts.map((s) => s.group)))
  return (
    <>
      <PageHead
        mark="⌨"
        title="Клавиши и режими"
        lede="Клавишните комбинации, специалните префикси и петте режима на разрешения, с кога кой."
        chips={['Shift+Tab', 'Esc', '@', '!', 'plan / auto']}
      />

      <Block title="Режими на разрешения">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Режим</th><th>Как работи</th><th>Кога</th></tr></thead>
            <tbody>
              {permissionModes.map((m) => (
                <tr key={m.name}><td className="cat">{m.name}</td><td>{m.how}</td><td>{m.when}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout kind="tip">
          Типичен ден: стартираш в plan mode (или /plan), одобряваш плана, превключваш в auto или accept edits за изпълнението.
          Manual, когато пипаш нещо чувствително и искаш да виждаш всяка команда. Bypass никога на твоята машина.
        </Callout>
      </Block>

      {groups.map((g) => (
        <Block key={g} title={g}>
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Клавиш</th><th>Какво прави</th><th>Бележка</th></tr></thead>
              <tbody>
                {shortcuts.filter((s) => s.group === g).map((s) => (
                  <tr key={s.keys}><td className="k">{s.keys}</td><td>{s.what}</td><td className="muted">{s.note ?? ''}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Block>
      ))}

      <Block title="Други полезни навици във входа">
        <ul>
          <li>Можеш да пишеш, докато Claude работи. Съобщенията се нареждат и се пращат, когато ходът свърши. Ctrl+Enter ги праща веднага.</li>
          <li>Вграденият spell check подчертава грешки, докато пишеш (включва се от /config).</li>
          <li>Vim режим: /config → Editor mode. Всички обичайни движения и text objects работят.</li>
          <li>Пълният списък, включително Vim и transcript изгледа: <a href="https://code.claude.com/docs/en/interactive-mode" target="_blank" rel="noreferrer">Interactive mode</a>. Пренастройка: /keybindings.</li>
        </ul>
      </Block>

      <Pager current="/keys" />
    </>
  )
}
