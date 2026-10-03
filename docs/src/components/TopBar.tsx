import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { useTheme } from '../hooks/useTheme'

const themeLabel = { system: 'Тема: системна', dark: 'Тема: тъмна', light: 'Тема: светла' }

export function TopBar({ onToggleNav }: { onToggleNav: () => void }) {
  const { total, reset } = useProgress()
  const { theme, cycle } = useTheme()
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    if (!armed) return
    const t = setTimeout(() => setArmed(false), 4000)
    return () => clearTimeout(t)
  }, [armed])

  const pct = total.all ? Math.round((total.done / total.all) * 100) : 0

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="btn nav-toggle" type="button" onClick={onToggleNav} aria-label="Меню">
          ☰
        </button>
        <Link to="/" className="brand">Пътна карта AI Engineer</Link>
        <div className="progress" aria-label="Общ напредък">
          <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
            <span style={{ width: `${pct}%` }} />
          </div>
          <div className="progress-label">{total.done} / {total.all} отметки</div>
        </div>
        <button className="btn" type="button" onClick={cycle} title="Смени темата">{themeLabel[theme]}</button>
        <button
          className={armed ? 'btn danger' : 'btn'}
          type="button"
          onClick={() => {
            if (!armed) {
              setArmed(true)
              return
            }
            reset()
            setArmed(false)
          }}
        >
          {armed ? 'Сигурен ли си? Натисни пак' : 'Нулирай напредъка'}
        </button>
      </div>
    </header>
  )
}
