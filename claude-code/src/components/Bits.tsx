import { Link } from './Link'
import type { Resource } from '../data/types'
import { useContent } from '../hooks/useContent'

export function ResourceList({ items }: { items: Resource[] }) {
  const { ui } = useContent()
  const kindLabel = ui.kinds
  return (
    <ul className="res">
      {items.map((r, i) => (
        <li key={i}>
          <span className={`t ${r.kind}`}>{kindLabel[r.kind]}</span>
          <div>
            <a href={r.url} target="_blank" rel="noreferrer">{r.title}</a>
            {r.by && <span className="muted"> · {r.by}</span>}
            {r.note && <div className="note">{r.note}</div>}
          </div>
        </li>
      ))}
    </ul>
  )
}

export function PageHead({ mark, title, lede, chips }: { mark: string; title: string; lede?: string; chips?: string[] }) {
  return (
    <div className="page-head">
      <div className="page-mark">{mark}</div>
      <div>
        <h1>{title}</h1>
        {lede && <p className="goal">{lede}</p>}
        {chips && chips.length > 0 && (
          <div className="meta">
            {chips.map((c) => <span key={c} className="chip">{c}</span>)}
          </div>
        )}
      </div>
    </div>
  )
}

export function Block({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <div className="block" id={id}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}

export function Code({ children, title }: { children: string; title?: string }) {
  return (
    <div className="code">
      {title && <div className="code-title">{title}</div>}
      <pre><code>{children}</code></pre>
    </div>
  )
}

export function Callout({ kind = 'tip', title, children }: { kind?: 'tip' | 'warn' | 'rule'; title?: string; children: React.ReactNode }) {
  const { ui } = useContent()
  const label = ui.callout[kind]
  return (
    <div className={`callout ${kind}`}>
      <div className="callout-label">{title ?? label}</div>
      <div>{children}</div>
    </div>
  )
}

export function BeforeAfter({ rows }: { rows: { label: string; before: string; after: string }[] }) {
  const { ui } = useContent()
  return (
    <div className="tbl-wrap">
      <table className="ba">
        <thead>
          <tr><th>{ui.beforeAfter.strategy}</th><th>{ui.beforeAfter.before}</th><th>{ui.beforeAfter.after}</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <td className="cat">{r.label}</td>
              <td className="bad">{r.before}</td>
              <td className="good">{r.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Steps({ items }: { items: { title: string; body: React.ReactNode }[] }) {
  return (
    <ol className="steps-list">
      {items.map((s, i) => (
        <li key={i}>
          <div className="step-title">{s.title}</div>
          <div className="step-body">{s.body}</div>
        </li>
      ))}
    </ol>
  )
}

export function Pager({ current }: { current: string }) {
  const { nav, ui } = useContent()
  const flatNav = nav.flatMap((g) => g.items)
  const idx = flatNav.findIndex((n) => n.to === current)
  const prev = idx > 0 ? flatNav[idx - 1] : undefined
  const next = idx >= 0 && idx < flatNav.length - 1 ? flatNav[idx + 1] : undefined
  return (
    <nav className="pager" aria-label={ui.pagerAria}>
      {prev ? <Link to={prev.to}>← {prev.label}</Link> : <span />}
      {next ? <Link to={next.to}>{next.label} →</Link> : <span />}
    </nav>
  )
}

export function Cmd({ children }: { children: string }) {
  return <Link className="cmd" to={`/commands?q=${encodeURIComponent(children)}`}>{children}</Link>
}
