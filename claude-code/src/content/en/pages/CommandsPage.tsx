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
        title="All commands"
        lede="What every command does, when to use it and why. Ordered by how often you need them in real work."
        chips={[`${commands.length} commands`, 'current as of October 2026']}
      />

      <div className="filters">
        <label className="grow">
          <span className="eyebrow">Search</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="/clear, context, review, Linear..." />
        </label>
        <label>
          <span className="eyebrow">Category</span>
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="">all</option>
            {commandCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>
          <span className="eyebrow">Frequency</span>
          <select value={freq} onChange={(e) => setFreq(e.target.value as Frequency | '')}>
            <option value="">all</option>
            <option value="daily">daily</option>
            <option value="often">often</option>
            <option value="rare">rarely</option>
            <option value="removed">removed</option>
          </select>
        </label>
      </div>

      <div className="legend">
        <span><i className="dot daily" />daily: should be in your fingers</span>
        <span><i className="dot often" />often: a few times a week</span>
        <span><i className="dot" />rarely: know they exist</span>
      </div>

      {byCat.length === 0 && <p className="muted">Nothing matches.</p>}

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
                  <div className="when"><strong>When:</strong> {c.when}</div>
                  {c.tip && <div className="tip">{c.tip}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <p className="muted small">
        The full official list with the versions in which each command was added or changed: <a href="https://code.claude.com/docs/en/commands" target="_blank" rel="noreferrer">code.claude.com/docs/en/commands</a>. Your own skills appear here as /name.
      </p>

      <Pager current="/commands" />
    </>
  )
}
