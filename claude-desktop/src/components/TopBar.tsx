import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link } from './Link'
import { useContent } from '../hooks/useContent'
import { useTheme } from '../hooks/useTheme'

export function TopBar({ onToggleNav }: { onToggleNav: () => void }) {
  const { lang, ui } = useContent()
  const { theme, cycle } = useTheme()
  const { pathname, search } = useLocation()
  const other = lang === 'bg' ? 'en' : 'bg'
  const otherPath = pathname.replace(/^\/(bg|en)/, `/${other}`) + search

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="btn nav-toggle" type="button" onClick={onToggleNav} aria-label={ui.menu}>
          ☰
        </button>
        <Link to="/" className="brand">{ui.brand}</Link>
        <div className="spacer" />
        <RouterLink to={otherPath} className="btn lang" title={ui.switchLang} aria-label={ui.switchLang}>
          <span className={lang === 'bg' ? 'on' : undefined}>BG</span>
          <span className="sep">/</span>
          <span className={lang === 'en' ? 'on' : undefined}>EN</span>
        </RouterLink>
        <button className="btn" type="button" onClick={cycle} title={ui.switchTheme}>{ui.theme[theme]}</button>
      </div>
    </header>
  )
}
