import { NavLink } from './Link'
import { useContent } from '../hooks/useContent'

export function Sidebar({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const { nav, ui } = useContent()
  const cls = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : undefined)

  return (
    <nav className={open ? 'sidenav open' : 'sidenav'} aria-label={ui.navAria}>
      {nav.map((g) => (
        <div key={g.title}>
          <div className="eyebrow">{g.title}</div>
          <ol>
            {g.items.map((it) => (
              <li key={it.to}>
                <NavLink to={it.to} end={it.to === '/'} className={cls} onClick={onNavigate}>
                  <span className="n">{it.mark}</span>
                  {it.label}
                </NavLink>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </nav>
  )
}
