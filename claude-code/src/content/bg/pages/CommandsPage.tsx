import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { commandCategories, commands, frequencyLabel } from '../data/commands'
import type { Frequency } from '../../../data/types'
import { PageHead, Pager } from '../../../components/Bits'

export function CommandsPage() {
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const [cat, setCat] = useState('')
  const [freq, setFreq] = useState<Frequency | ''>('')

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return commands.filter((c) => {
      if (cat && c.category !== cat) return false
      if (freq && c.frequency !== freq) return false
      if (!needle) return true
      return [c.name, c.what, c.when, c.tip ?? ''].join(' ').toLowerCase().includes(needle)
    })
  }, [q, cat, freq])

  const byCat = commandCategories.map((c) => ({ cat: c, items: filtered.filter((x) => x.category === c) })).filter((g) => g.items.length)

  return (
    <>
      <PageHead
        mark="⌘"
        title="Всички команди"
        lede="Какво прави всяка команда, кога се ползва и защо. Подредени по това колко често ти трябват в реална работа."
        chips={[`${commands.length} команди`, 'актуално към октомври 2026']}
      />

      <div className="filters">
        <label className="grow">
          <span className="eyebrow">Търси</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="/clear, контекст, преглед, Linear..." />
        </label>
        <label>
          <span className="eyebrow">Категория</span>
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="">всички</option>
            {commandCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>
          <span className="eyebrow">Честота</span>
          <select value={freq} onChange={(e) => setFreq(e.target.value as Frequency | '')}>
            <option value="">всички</option>
            <option value="daily">всеки ден</option>
            <option value="often">често</option>
            <option value="rare">рядко</option>
            <option value="removed">премахнати</option>
          </select>
        </label>
      </div>

      <div className="legend">
        <span><i className="dot daily" />всеки ден: трябва да са ти в пръстите</span>
        <span><i className="dot often" />често: няколко пъти седмично</span>
        <span><i className="dot" />рядко: знай, че съществуват</span>
      </div>

      {byCat.length === 0 && <p className="muted">Нищо не съвпада.</p>}

      {byCat.map((g) => (
        <section key={g.cat} className="cmd-section">
          <h2>{g.cat}</h2>
          <div className="cmd-list">
            {g.items.map((c) => (
              <div key={c.name} className="cmd-card">
                <div>
                  <div className="name">{c.name}</div>
                  <span className={`freq ${c.frequency}`}>{frequencyLabel[c.frequency]}</span>
                </div>
                <div>
                  <div className="what">{c.what}</div>
                  <div className="when"><strong>Кога:</strong> {c.when}</div>
                  {c.tip && <div className="tip">{c.tip}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <p className="muted small">
        Пълният официален списък с версиите, в които всяка команда е добавена или сменена: <a href="https://code.claude.com/docs/en/commands" target="_blank" rel="noreferrer">code.claude.com/docs/en/commands</a>. Собствените ти skills се появяват тук като /име.
      </p>

      <Pager current="/commands" />
    </>
  )
}
