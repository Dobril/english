import { settingsMap, shortcuts } from '../data/keys'
import { Block, Callout, PageHead, Pager } from '../../../components/Bits'

export function KeysPage() {
  const groups = Array.from(new Set(shortcuts.map((s) => s.group)))
  return (
    <>
      <PageHead
        mark="⌨"
        title="Клавиши и настройки"
        lede="Клавишните комбинации в приложението, quick entry на Mac, командите с / в Cowork и картата на настройките: кое къде е и кога го пипаш."
        chips={['Cmd+K', 'Option Option', '/schedule', 'Settings > Cowork', 'Customize']}
      />

      <Block title="Карта на настройките">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Къде</th><th>Какво има</th><th>Кога</th></tr></thead>
            <tbody>
              {settingsMap.map((m) => (
                <tr key={m.where}><td className="cat">{m.where}</td><td>{m.what}</td><td className="muted">{m.when}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout kind="tip">
          Типичен първи ден: Settings &gt; Capabilities (Memory и Code execution включени), Settings &gt; Cowork (20 реда Global
          instructions, режим Manual), Customize &gt; Connectors (Drive или Microsoft 365, пощата). Всичко друго, когато ти потрябва.
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

      <Block title="Други полезни навици">
        <ul>
          <li>Пиши брифа на няколко реда с Shift+Enter: резултат, входове, формат, критерии. Един дълъг абзац се чете по-зле и от Claude.</li>
          <li>Можеш да пишеш, докато Claude работи или Research върви. Съобщението чака и се праща след хода.</li>
          <li>Диктовката е по-бърза за дълги брифове. Прочети текста преди да пратиш: имената на файлове и числата се разпознават най-зле.</li>
          <li>Quick entry със скрийншот е най-бързият начин да питаш "какво значи тази грешка в Excel" без да сменяш приложението.</li>
          <li>Ако функция не прави нищо на Mac, провери System Settings &gt; Privacy &amp; Security. Приложението не винаги казва, че му липсва право.</li>
          <li>Клавишите и менютата се сменят с версиите. Актуалното: <a href="https://claude.com/docs/cowork/changelog" target="_blank" rel="noreferrer">Claude Desktop changelog</a>.</li>
        </ul>
      </Block>

      <Pager current="/keys" />
    </>
  )
}
