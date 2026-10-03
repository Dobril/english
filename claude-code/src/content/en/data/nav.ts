import type { NavGroup } from '../../../data/types'

export const nav: NavGroup[] = [
  {
    title: 'Start',
    items: [{ to: '/', label: 'How to use this handbook', mark: '⌂' }],
  },
  {
    title: 'Foundations',
    items: [
      { to: '/how-it-works', label: 'How Claude Code thinks', mark: '1' },
      { to: '/setup', label: 'Install and configure', mark: '2' },
      { to: '/claude-md', label: 'CLAUDE.md and memory', mark: '3' },
    ],
  },
  {
    title: 'Daily work',
    items: [
      { to: '/workflow', label: 'Workflow for a task', mark: '4' },
      { to: '/linear', label: 'Issues in Linear', mark: '5' },
      { to: '/prompts', label: 'How to write prompts', mark: '6' },
      { to: '/verify', label: 'Verifying after a task', mark: '7' },
      { to: '/git', label: 'Git, PRs and merging', mark: '8' },
    ],
  },
  {
    title: 'Extensions',
    items: [
      { to: '/hooks', label: 'Hooks', mark: '9' },
      { to: '/subagents', label: 'Subagents', mark: '10' },
      { to: '/skills', label: 'Skills and commands', mark: '11' },
      { to: '/mcp', label: 'MCP servers', mark: '12' },
      { to: '/parallel', label: 'Parallel and background work', mark: '13' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { to: '/commands', label: 'All commands', mark: '⌘' },
      { to: '/keys', label: 'Keys and modes', mark: '⌨' },
      { to: '/practices', label: 'Best practices and mistakes', mark: '✓' },
      { to: '/resources', label: 'Videos, articles, docs', mark: '▶' },
      { to: '/glossary', label: 'Glossary', mark: '¶' },
    ],
  },
]
