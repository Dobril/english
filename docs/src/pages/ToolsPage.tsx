import { useMemo, useState } from 'react'
import { depthHint, depthLabel, toolCategories, tools } from '../data/tools'
import type { Depth } from '../data/types'
import { PageHead } from '../components/Bits'

export function ToolsPage() {
  const [cat, setCat] = useState<string>('all')
  const [depth, setDepth] = useState<'all' | Depth>('all')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return tools.filter(
      (t) =>
        (cat === 'all' || t.category === cat) &&
        (depth === 'all' || t.depth === depth) &&
        (!needle || t.name.toLowerCase().includes(needle) || t.what.toLowerCase().includes(needle) || t.where.toLowerCase().includes(needle)),
    )
  }, [cat, depth, q])

  const counts = useMemo(() => {
    const c = { perfect: 0, decent: 0, surface: 0 }
    tools.forEach((t) => c[t.depth]++)
    return c
  }, [])

  return (
    <>
      <PageHead
        mark="⌘"
        title="Технологии и инструменти"
        lede="Всеки инструмент с едно-две изречения: какво е, къде се ползва в една AI система и колко дълбоко да го знаеш. Имената в колоната 'отгоре-отгоре' ще се сменят на всеки шест месеца. Категориите няма."
        chips={[`${tools.length} инструмента`, `перфектно: ${counts.perfect}`, `прилично: ${counts.decent}`, `отгоре-отгоре: ${counts.surface}`]}
      />

      <div className="grid-3">
        {(['perfect', 'decent', 'surface'] as Depth[]).map((d) => (
          <div key={d} className="panel small-panel">
            <div className={`depth ${d}`}>{depthLabel[d]}</div>
            <p className="muted">{depthHint[d]}</p>
          </div>
        ))}
      </div>

      <div className="filters">
        <label>
          <span className="eyebrow">Категория</span>
          <select id="f-cat" value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="all">Всички</option>
            {toolCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>
          <span className="eyebrow">Дълбочина</span>
          <select id="f-depth" value={depth} onChange={(e) => setDepth(e.target.value as 'all' | Depth)}>
            <option value="all">Всички</option>
            <option value="perfect">перфектно</option>
            <option value="decent">прилично</option>
            <option value="surface">отгоре-отгоре</option>
          </select>
        </label>
        <label className="grow">
          <span className="eyebrow">Търси</span>
          <input id="f-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="например pgvector, стрийминг, Node" />
        </label>
      </div>

      {toolCategories
        .filter((c) => cat === 'all' || c === cat)
        .map((c) => {
          const rows = list.filter((t) => t.category === c)
          if (rows.length === 0) return null
          return (
            <section key={c} className="tool-section">
              <h2>{c}</h2>
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Инструмент</th>
                      <th>Какво е</th>
                      <th>Къде се ползва</th>
                      <th>Колко да се знае</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((t) => (
                      <tr key={t.name}>
                        <td className="cat">{t.url ? <a href={t.url} target="_blank" rel="noreferrer">{t.name}</a> : t.name}</td>
                        <td>{t.what}</td>
                        <td>{t.where}</td>
                        <td><span className={`depth ${t.depth}`}>{depthLabel[t.depth]}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        })}

      {list.length === 0 && <p className="muted">Нищо не отговаря на филтъра.</p>}
    </>
  )
}
