import type { Content } from '../../data/types'
import { ui } from './ui'
import { nav } from './data/nav'
import { HomePage } from './pages/HomePage'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { SetupPage } from './pages/SetupPage'
import { MemoryPage } from './pages/MemoryPage'
import { WorkflowPage } from './pages/WorkflowPage'
import { BriefsPage } from './pages/BriefsPage'
import { SpreadsheetsPage } from './pages/SpreadsheetsPage'
import { PresentationsPage } from './pages/PresentationsPage'
import { DocumentsPage } from './pages/DocumentsPage'
import { AnalysisPage } from './pages/AnalysisPage'
import { VerifyPage } from './pages/VerifyPage'
import { ConnectorsPage } from './pages/ConnectorsPage'
import { SkillsPage } from './pages/SkillsPage'
import { ScheduledPage } from './pages/ScheduledPage'
import { BrowserPage } from './pages/BrowserPage'
import { FeaturesPage } from './pages/FeaturesPage'
import { KeysPage } from './pages/KeysPage'
import { PracticesPage } from './pages/PracticesPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { GlossaryPage } from './pages/GlossaryPage'

export const en: Content = {
  lang: 'en',
  ui,
  nav,
  pages: {
    '/': HomePage,
    '/how-it-works': HowItWorksPage,
    '/setup': SetupPage,
    '/memory': MemoryPage,
    '/workflow': WorkflowPage,
    '/briefs': BriefsPage,
    '/spreadsheets': SpreadsheetsPage,
    '/presentations': PresentationsPage,
    '/documents': DocumentsPage,
    '/analysis': AnalysisPage,
    '/verify': VerifyPage,
    '/connectors': ConnectorsPage,
    '/skills': SkillsPage,
    '/scheduled': ScheduledPage,
    '/browser': BrowserPage,
    '/features': FeaturesPage,
    '/keys': KeysPage,
    '/practices': PracticesPage,
    '/resources': ResourcesPage,
    '/glossary': GlossaryPage,
  },
}
