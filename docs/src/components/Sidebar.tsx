import { NavLink } from 'react-router-dom'
import { phases } from '../data/phases'
import { useProgress } from '../hooks/useProgress'

export function Sidebar({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const { perPhase } = useProgress()
  const cls = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : undefined)

  return (
    <nav className={open ? 'sidenav open' : 'sidenav'} aria-label="Навигация">
      <div className="eyebrow">Начало</div>
      <ol>
        <li><NavLink to="/" end className={cls} onClick={onNavigate}><span className="n">⌂</span>Как да четеш картата</NavLink></li>
      </ol>
      <div className="eyebrow">Фази</div>
      <ol>
        {phases.map((p) => {
          const c = perPhase(p.id)
          return (
            <li key={p.id}>
              <NavLink to={`/phase/${p.id}`} className={cls} onClick={onNavigate}>
                <span className="n">{p.id}</span>
                {p.short}
                <span className={c.done === c.all ? 'pc full' : 'pc'}>{c.done}/{c.all}</span>
              </NavLink>
            </li>
          )
        })}
      </ol>
      <div className="eyebrow">Практика</div>
      <ol>
        <li><NavLink to="/projects" className={cls} onClick={onNavigate}><span className="n">⚒</span>Проекти</NavLink></li>
      </ol>
      <div className="eyebrow">Справочник</div>
      <ol>
        <li><NavLink to="/tools" className={cls} onClick={onNavigate}><span className="n">⌘</span>Технологии и инструменти</NavLink></li>
        <li><NavLink to="/where" className={cls} onClick={onNavigate}><span className="n">⇄</span>Къде какво се ползва</NavLink></li>
        <li><NavLink to="/papers" className={cls} onClick={onNavigate}><span className="n">¶</span>Papers</NavLink></li>
        <li><NavLink to="/stay" className={cls} onClick={onNavigate}><span className="n">∞</span>Да останеш в крак</NavLink></li>
      </ol>
    </nav>
  )
}
