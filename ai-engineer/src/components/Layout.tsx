import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function Layout() {
  const [navOpen, setNavOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

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
