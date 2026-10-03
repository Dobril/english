import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProgressProvider } from './hooks/useProgress'
import { HomePage } from './pages/HomePage'
import { PhasePage } from './pages/PhasePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ToolsPage } from './pages/ToolsPage'
import { WherePage } from './pages/WherePage'
import { PapersPage } from './pages/PapersPage'
import { StayPage } from './pages/StayPage'

// HashRouter: GitHub Pages serves only static files, so routes live after '#'.
export default function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/phase/:id" element={<PhasePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/where" element={<WherePage />} />
            <Route path="/papers" element={<PapersPage />} />
            <Route path="/stay" element={<StayPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ProgressProvider>
  )
}
