import { Link, Navigate, useParams } from 'react-router-dom'
import { phaseById, phases } from '../data/phases'
import { projectById } from '../data/projects'
import { Block, Checklist, PageHead, ResourceList, ToolChips } from '../components/Bits'

export function PhasePage() {
  const { id } = useParams()
  const phaseId = Number(id)
  const phase = Number.isInteger(phaseId) ? phaseById(phaseId) : undefined
  if (!phase) return <Navigate to="/" replace />

  const prev = phases.find((p) => p.id === phase.id - 1)
  const next = phases.find((p) => p.id === phase.id + 1)
  const linked = (phase.project.projectIds ?? []).map(projectById).filter((p) => p !== undefined)

  return (
    <>
      <PageHead mark={String(phase.id)} title={phase.title} lede={`Цел: ${phase.goal}`} chips={[phase.weeks, ...phase.tags]} />

      <Block title="Какво ще разбереш">
        <ul>{phase.concepts.map((c, i) => <li key={i}>{c}</li>)}</ul>
      </Block>

      <Block title="Ресурси по ред">
        <ResourceList items={phase.resources} />
      </Block>

      <Block title="Инструменти">
        <ToolChips items={phase.tools} />
      </Block>

      <Block title="Мини упражнения (по една вечер всяко)">
        <ul className="mini">{phase.mini.map((m, i) => <li key={i}>{m}</li>)}</ul>
      </Block>

      <div className="project">
        <div className="eyebrow">Проект на фазата</div>
        <p><strong>{phase.project.title}.</strong>{phase.project.intro ? ` ${phase.project.intro}` : ''}</p>
        {phase.project.steps && <ol>{phase.project.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>}
        {phase.project.outro && <p className="mt">{phase.project.outro}</p>}
        {linked.length > 0 && (
          <p className="mt">
            Подробно описание (технологии, стъпки, очакван резултат):{' '}
            {linked.map((p, i) => (
              <span key={p.id}>
                {i > 0 && ', '}
                <Link to={`/projects?p=${p.id}`}>{p.title}</Link>
              </span>
            ))}
          </p>
        )}
      </div>

      <Checklist phaseId={phase.id} items={phase.checklist} title={phase.id === 8 ? 'Знаеш, че си стигнал, когато' : 'Готов си да продължиш, когато'} />

      <nav className="pager" aria-label="Съседни фази">
        {prev ? <Link to={`/phase/${prev.id}`}>← {prev.id}. {prev.short}</Link> : <span />}
        {next ? <Link to={`/phase/${next.id}`}>{next.id}. {next.short} →</Link> : <Link to="/projects">Проекти →</Link>}
      </nav>
    </>
  )
}
