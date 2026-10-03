import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { projects } from '../data/projects'
import { PageHead } from '../components/Bits'

const order = ['начало', 'средно', 'напреднало'] as const

export function ProjectsPage() {
  const [params] = useSearchParams()
  const target = params.get('p')

  useEffect(() => {
    if (!target) return
    const el = document.getElementById(`project-${target}`)
    if (el) el.scrollIntoView({ block: 'start' })
  }, [target])

  return (
    <>
      <PageHead
        mark="⚒"
        title="Проекти, докато учиш"
        lede="Тринадесет проекта, подредени по фази. Всеки описва какви технологии да ползваш, как да го направиш на теория и какъв трябва да е резултатът. Правилото е едно: първата версия винаги без framework."
        chips={['нива: начало, средно, напреднало', 'всеки проект е в GitHub с README']}
      />

      <div className="panel accent">
        <h3>Нишката през всички проекти</h3>
        <p>
          Проектите не са отделни. Шаблонът от фаза 0 става основа на асистента от фаза 2. Той става RAG v1, после RAG v2.
          Агентът ползва същите документи. Слоят за измерване се слага върху RAG-а и агента. Capstone 1 ги сглобява в
          продукция. Накрая fine-tune-ваш модел за същата задача и го сравняваш с всичко дотук. В края имаш една система,
          минала през всички етапи, и история с числа за всяка стъпка.
        </p>
      </div>

      <div className="toc">
        {projects.map((p) => (
          <a key={p.id} href={`#/projects?p=${p.id}`}>
            <span className="n">{p.phase}</span>{p.title}
          </a>
        ))}
      </div>

      {projects.map((p) => (
        <article key={p.id} id={`project-${p.id}`} className="project-card">
          <div className="project-head">
            <div>
              <div className="eyebrow"><Link to={`/phase/${p.phase}`}>фаза {p.phase}</Link> · ниво: {p.level} ({order.indexOf(p.level) + 1}/3)</div>
              <h2>{p.title}</h2>
              <p className="summary">{p.summary}</p>
            </div>
          </div>

          <div className="project-grid">
            <div>
              <h4>Цел</h4>
              <p>{p.goal}</p>
            </div>
            <div>
              <h4>Технологии</h4>
              <div className="tools">{p.stack.map((s) => <span key={s} className="tool">{s}</span>)}</div>
            </div>
          </div>

          <h4>Как се прави</h4>
          <ol className="steps">{p.how.map((h, i) => <li key={i}>{h}</li>)}</ol>

          <div className="project-grid">
            <div>
              <h4>Какъв трябва да е резултатът</h4>
              <ul>{p.result.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </div>
            <div>
              <h4>Какво научаваш</h4>
              <div className="tools">{p.learn.map((l) => <span key={l} className="tool good">{l}</span>)}</div>
              {p.nodeRole && (
                <>
                  <h4 className="mt">Къде е Node.js тук</h4>
                  <p>{p.nodeRole}</p>
                </>
              )}
            </div>
          </div>
        </article>
      ))}
    </>
  )
}
