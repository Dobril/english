import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { useContent } from '../hooks/useContent'
import { saveLang } from '../hooks/useLang'

export function Layout() {
  const [navOpen, setNavOpen] = useState(false)
  const { pathname } = useLocation()
  const { lang, ui } = useContent()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = ui.title
    saveLang(lang)
  }, [lang, ui.title])

  return (
    <>
      <TopBar onToggleNav={() => setNavOpen((o) => !o)} />
      <div className="shell">
        <Sidebar open={navOpen} onNavigate={() => setNavOpen(false)} />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}
