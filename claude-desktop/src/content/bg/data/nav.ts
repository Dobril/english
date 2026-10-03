import type { NavGroup } from '../../../data/types'

export const nav: NavGroup[] = [
  {
    title: 'Начало',
    items: [{ to: '/', label: 'Как да ползваш наръчника', mark: '⌂' }],
  },
  {
    title: 'Основи',
    items: [
      { to: '/how-it-works', label: 'Chat или Cowork: как мисли всеки', mark: '1' },
      { to: '/setup', label: 'Инсталация и настройка', mark: '2' },
      { to: '/memory', label: 'Инструкции, проекти и памет', mark: '3' },
    ],
  },
  {
    title: 'Ежедневна работа',
    items: [
      { to: '/workflow', label: 'Работен процес за една задача', mark: '4' },
      { to: '/briefs', label: 'Как се пише бриф', mark: '5' },
      { to: '/spreadsheets', label: 'Excel и таблици', mark: '6' },
      { to: '/presentations', label: 'Презентации и дизайн', mark: '7' },
      { to: '/documents', label: 'Документи, отчети и имейли', mark: '8' },
      { to: '/analysis', label: 'Комплексни анализи и проучвания', mark: '9' },
      { to: '/verify', label: 'Проверка на резултата', mark: '10' },
    ],
  },
  {
    title: 'Разширения',
    items: [
      { to: '/connectors', label: 'Connectors и MCP', mark: '11' },
      { to: '/skills', label: 'Skills и plugins', mark: '12' },
      { to: '/scheduled', label: 'Повтарящи се и фонови задачи', mark: '13' },
      { to: '/browser', label: 'Браузър и Office add-ins', mark: '14' },
    ],
  },
  {
    title: 'Справочник',
    items: [
      { to: '/features', label: 'Всички функции', mark: '⌘' },
      { to: '/keys', label: 'Клавиши и настройки', mark: '⌨' },
      { to: '/practices', label: 'Добри практики и грешки', mark: '✓' },
      { to: '/resources', label: 'Видеа, статии, документация', mark: '▶' },
      { to: '/glossary', label: 'Речник', mark: '¶' },
    ],
  },
]
