import { HashRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { Layout } from './components/Layout'
import { content } from './content'
import { isLang, loadLang } from './hooks/useLang'

// HashRouter: GitHub Pages serves only static files, so routes live after '#'.
// Every page lives under a language prefix: #/bg/workflow, #/en/workflow.
function LangRoutes() {
  const { lang } = useParams()
  const { search } = useLocation()
  if (!isLang(lang)) return <Navigate to={`/${loadLang()}${search}`} replace />
  const pages = content[lang].pages
  return (
    <Routes>
      <Route element={<Layout />}>
        {Object.entries(pages).map(([path, Page]) => (
          <Route key={path} path={path === '/' ? '' : path.slice(1)} element={<Page />} />
        ))}
        <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/:lang/*" element={<LangRoutes />} />
        <Route path="*" element={<Navigate to={`/${loadLang()}`} replace />} />
      </Routes>
    </HashRouter>
  )
}
