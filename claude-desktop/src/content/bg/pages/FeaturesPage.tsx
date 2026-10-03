import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { featureCategories, features, frequencyLabel } from '../data/features'
import type { Frequency, Surface } from '../../../data/types'
import { PageHead, Pager } from '../../../components/Bits'
import { useContent } from '../../../hooks/useContent'

export function FeaturesPage() {
  const [params] = useSearchParams()
  const { ui } = useContent()
  const [q, setQ] = useState(params.get('q') ?? '')
  const [cat, setCat] = useState('')
  const [freq, setFreq] = useState<Frequency | ''>('')
  const [surface, setSurface] = useState<Surface | ''>('')

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return features.filter((f) => {
      if (cat && f.category !== cat) return false
      if (freq && f.frequency !== freq) return false
      if (surface && f.surface !== surface && f.surface !== 'both') return false
      if (!needle) return true
      return [f.name, f.what, f.when, f.tip ?? ''].join(' ').toLowerCase().includes(needle)
    })
  }, [q, cat, freq, surface])

  const byCat = featureCategories.map((c) => ({ cat: c, items: filtered.filter((x) => x.category === c) })).filter((g) => g.items.length)

  return (
    <>
      <PageHead
        mark="⌘"
        title="Всички функции"
        lede="Какво прави всяка функция на Claude Desktop, кога се ползва и защо. Подредени по това колко често ти трябват в реална офис работа."
        chips={[`${features.length} функции`, 'Chat, Cowork и Office add-ins', 'актуално към октомври 2026']}
      />

      <div className="filters">
        <label className="grow">
          <span className="eyebrow">Търси</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cowork, памет, Excel, насрочени, браузър..." />
        </label>
        <label>
          <span className="eyebrow">Категория</span>
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="">всички</option>
            {featureCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>
          <span className="eyebrow">Къде</span>
          <select value={surface} onChange={(e) => setSurface(e.target.value as Surface | '')}>
            <option value="">навсякъде</option>
            <option value="chat">Chat</option>
            <option value="cowork">Cowork</option>
            <option value="office">Office add-ins</option>
            <option value="system">приложението</option>
          </select>
        </label>
        <label>
          <span className="eyebrow">Честота</span>
          <select value={freq} onChange={(e) => setFreq(e.target.value as Frequency | '')}>
            <option value="">всички</option>
            <option value="daily">всеки ден</option>
            <option value="often">често</option>
            <option value="rare">рядко</option>
            <option value="beta">beta / rollout</option>
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
            {g.items.map((f) => (
              <div key={f.name} className="cmd-card">
                <div>
                  <div className="name">{f.name}</div>
                  <span className={`freq ${f.frequency}`}>{frequencyLabel[f.frequency]}</span>
                  <span className="surface">{ui.surfaces[f.surface]}</span>
                </div>
                <div>
                  <div className="what">{f.what}</div>
                  <div className="when"><strong>Кога:</strong> {f.when}</div>
                  {f.tip && <div className="tip">{f.tip}</div>}
                  {f.url && <div className="small mt"><a href={f.url} target="_blank" rel="noreferrer">документация</a></div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <p className="muted small">
        Приложението се обновява почти всяка седмица. Какво е ново: <a href="https://claude.com/docs/cowork/changelog" target="_blank" rel="noreferrer">Claude Desktop changelog</a>.
        Твоите собствени skills се появяват в полето за съобщение след "/".
      </p>

      <Pager current="/features" />
    </>
  )
}
