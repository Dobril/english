import type { NavGroup } from '../../../data/types'

export const nav: NavGroup[] = [
  {
    title: 'Начало',
    items: [{ to: '/', label: 'Как да ползваш наръчника', mark: '⌂' }],
  },
  {
    title: 'Основи',
    items: [
      { to: '/how-it-works', label: 'Как мисли Claude Code', mark: '1' },
      { to: '/setup', label: 'Инсталация и настройка', mark: '2' },
      { to: '/claude-md', label: 'CLAUDE.md и памет', mark: '3' },
    ],
  },
  {
    title: 'Ежедневна работа',
    items: [
      { to: '/workflow', label: 'Работен процес по задача', mark: '4' },
      { to: '/linear', label: 'Задачи в Linear', mark: '5' },
      { to: '/prompts', label: 'Как се пишат промптове', mark: '6' },
      { to: '/verify', label: 'Проверка след задачата', mark: '7' },
      { to: '/git', label: 'Git, PR и мърджване', mark: '8' },
    ],
  },
  {
    title: 'Разширения',
    items: [
      { to: '/hooks', label: 'Hooks', mark: '9' },
      { to: '/subagents', label: 'Subagents', mark: '10' },
      { to: '/skills', label: 'Skills и команди', mark: '11' },
      { to: '/mcp', label: 'MCP сървъри', mark: '12' },
      { to: '/parallel', label: 'Паралелна и фонова работа', mark: '13' },
    ],
  },
  {
    title: 'Справочник',
    items: [
      { to: '/commands', label: 'Всички команди', mark: '⌘' },
      { to: '/keys', label: 'Клавиши и режими', mark: '⌨' },
      { to: '/practices', label: 'Добри практики и грешки', mark: '✓' },
      { to: '/resources', label: 'Видеа, статии, документация', mark: '▶' },
      { to: '/glossary', label: 'Речник', mark: '¶' },
    ],
  },
]
