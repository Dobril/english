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
        title="All features"
        lede="What every Claude Desktop feature does, when to use it and why. Ordered by how often you need it in real office work."
        chips={[`${features.length} features`, 'Chat, Cowork and Office add-ins', 'current as of October 2026']}
      />

      <div className="filters">
        <label className="grow">
          <span className="eyebrow">Search</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cowork, memory, Excel, scheduled, browser..." />
        </label>
        <label>
          <span className="eyebrow">Category</span>
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="">all</option>
            {featureCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>
          <span className="eyebrow">Where</span>
          <select value={surface} onChange={(e) => setSurface(e.target.value as Surface | '')}>
            <option value="">everywhere</option>
            <option value="chat">Chat</option>
            <option value="cowork">Cowork</option>
            <option value="office">Office add-ins</option>
            <option value="system">the app</option>
          </select>
        </label>
        <label>
          <span className="eyebrow">Frequency</span>
          <select value={freq} onChange={(e) => setFreq(e.target.value as Frequency | '')}>
            <option value="">all</option>
            <option value="daily">every day</option>
            <option value="often">often</option>
            <option value="rare">rarely</option>
            <option value="beta">beta / rollout</option>
          </select>
        </label>
      </div>

      <div className="legend">
        <span><i className="dot daily" />every day: should be in your fingers</span>
        <span><i className="dot often" />often: a few times a week</span>
        <span><i className="dot" />rarely: know that they exist</span>
      </div>

      {byCat.length === 0 && <p className="muted">Nothing matches.</p>}

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
                  <div className="when"><strong>When:</strong> {f.when}</div>
                  {f.tip && <div className="tip">{f.tip}</div>}
                  {f.url && <div className="small mt"><a href={f.url} target="_blank" rel="noreferrer">documentation</a></div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <p className="muted small">
        The app updates almost every week. What is new: <a href="https://claude.com/docs/cowork/changelog" target="_blank" rel="noreferrer">Claude Desktop changelog</a>.
        Your own skills show up in the message box after "/".
      </p>

      <Pager current="/features" />
    </>
  )
}
