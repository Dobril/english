import type { NavGroup } from '../../../data/types'

export const nav: NavGroup[] = [
  {
    title: 'Start',
    items: [{ to: '/', label: 'How to use this handbook', mark: '⌂' }],
  },
  {
    title: 'Foundations',
    items: [
      { to: '/how-it-works', label: 'Chat or Cowork: how each one thinks', mark: '1' },
      { to: '/setup', label: 'Install and configure', mark: '2' },
      { to: '/memory', label: 'Instructions, projects and memory', mark: '3' },
    ],
  },
  {
    title: 'Daily work',
    items: [
      { to: '/workflow', label: 'Workflow for one task', mark: '4' },
      { to: '/briefs', label: 'How to write a brief', mark: '5' },
      { to: '/spreadsheets', label: 'Excel and spreadsheets', mark: '6' },
      { to: '/presentations', label: 'Presentations and design', mark: '7' },
      { to: '/documents', label: 'Documents, reports and email', mark: '8' },
      { to: '/analysis', label: 'Complex analysis and research', mark: '9' },
      { to: '/verify', label: 'Checking the result', mark: '10' },
    ],
  },
  {
    title: 'Extensions',
    items: [
      { to: '/connectors', label: 'Connectors and MCP', mark: '11' },
      { to: '/skills', label: 'Skills and plugins', mark: '12' },
      { to: '/scheduled', label: 'Recurring and background work', mark: '13' },
      { to: '/browser', label: 'Browser and Office add-ins', mark: '14' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { to: '/features', label: 'All features', mark: '⌘' },
      { to: '/keys', label: 'Keys and settings', mark: '⌨' },
      { to: '/practices', label: 'Best practices and mistakes', mark: '✓' },
      { to: '/resources', label: 'Videos, articles, docs', mark: '▶' },
      { to: '/glossary', label: 'Glossary', mark: '¶' },
    ],
  },
]
