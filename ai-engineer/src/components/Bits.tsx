import { Link } from 'react-router-dom'
import type { Resource, ResourceKind, ToolRef } from '../data/types'
import { useProgress, checkKey } from '../hooks/useProgress'

const kindLabel: Record<ResourceKind, string> = {
  video: 'видео',
  book: 'книга',
  course: 'курс',
  article: 'статия',
  docs: 'докум.',
}

export function ResourceList({ items }: { items: Resource[] }) {
  return (
    <ul className="res">
      {items.map((r, i) => (
        <li key={i}>
          <span className={`t ${r.kind}`}>{kindLabel[r.kind]}</span>
          <div>
            {r.url ? <a href={r.url} target="_blank" rel="noreferrer">{r.title}</a> : r.title}
            {r.note && <div className="note">{r.note}</div>}
          </div>
        </li>
      ))}
    </ul>
  )
}

export function ToolChips({ items, legend = true }: { items: ToolRef[]; legend?: boolean }) {
  return (
    <>
      {legend && (
        <div className="legend">
          <span><i className="dot must" />научи до дъно</span>
          <span><i className="dot good" />познавай</span>
          <span><i className="dot aware" />знай, че съществува</span>
        </div>
      )}
      <div className="tools">
        {items.map((t) => (
          <span key={t.name} className={`tool ${t.level}`}>{t.name}</span>
        ))}
      </div>
    </>
  )
}

export function Checklist({ phaseId, items, title }: { phaseId: number; items: string[]; title: string }) {
  const { isDone, toggle } = useProgress()
  return (
    <div className="checklist">
      <div className="eyebrow">{title}</div>
      {items.map((text, i) => {
        const key = checkKey(phaseId, i)
        const done = isDone(key)
        return (
          <label key={key} className={done ? 'check done' : 'check'}>
            <input id={key} type="checkbox" checked={done} onChange={() => toggle(key)} />
            <span>{text}</span>
          </label>
        )
      })}
    </div>
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

export function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="block">
      <h3>{title}</h3>
      {children}
    </div>
  )
}

export function PhaseLink({ id, label }: { id: number; label?: string }) {
  return <Link to={`/phase/${id}`}>{label ?? `фаза ${id}`}</Link>
}
