import type { Content } from '../../data/types'
import { ui } from './ui'
import { nav } from './data/nav'
import { HomePage } from './pages/HomePage'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { SetupPage } from './pages/SetupPage'
import { ClaudeMdPage } from './pages/ClaudeMdPage'
import { WorkflowPage } from './pages/WorkflowPage'
import { LinearPage } from './pages/LinearPage'
import { PromptsPage } from './pages/PromptsPage'
import { VerifyPage } from './pages/VerifyPage'
import { GitPage } from './pages/GitPage'
import { HooksPage } from './pages/HooksPage'
import { SubagentsPage } from './pages/SubagentsPage'
import { SkillsPage } from './pages/SkillsPage'
import { McpPage } from './pages/McpPage'
import { ParallelPage } from './pages/ParallelPage'
import { CommandsPage } from './pages/CommandsPage'
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
    '/claude-md': ClaudeMdPage,
    '/workflow': WorkflowPage,
    '/linear': LinearPage,
    '/prompts': PromptsPage,
    '/verify': VerifyPage,
    '/git': GitPage,
    '/hooks': HooksPage,
    '/subagents': SubagentsPage,
    '/skills': SkillsPage,
    '/mcp': McpPage,
    '/parallel': ParallelPage,
    '/commands': CommandsPage,
    '/keys': KeysPage,
    '/practices': PracticesPage,
    '/resources': ResourcesPage,
    '/glossary': GlossaryPage,
  },
}
