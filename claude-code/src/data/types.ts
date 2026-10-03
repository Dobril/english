import type React from 'react'

export type ResourceKind = 'video' | 'article' | 'docs' | 'tool' | 'book'

export interface Resource {
  kind: ResourceKind
  title: string
  url: string
  by?: string
  note?: string
  lang?: 'en' | 'bg'
  tags?: string[]
}

export type Frequency = 'daily' | 'often' | 'rare' | 'removed'

export interface Command {
  name: string
  category: string
  what: string
  when: string
  tip?: string
  frequency: Frequency
  url?: string
}

export interface Shortcut {
  keys: string
  what: string
  note?: string
  group: string
}

export interface Term {
  term: string
  en?: string
  def: string
  page?: string
}

export interface NavItem {
  to: string
  label: string
  mark: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export type Lang = 'bg' | 'en'

export interface UiStrings {
  brand: string
  title: string
  menu: string
  navAria: string
  pagerAria: string
  theme: { system: string; dark: string; light: string }
  switchTheme: string
  switchLang: string
  kinds: Record<ResourceKind, string>
  callout: { tip: string; warn: string; rule: string }
  beforeAfter: { strategy: string; before: string; after: string }
}

export interface Content {
  lang: Lang
  ui: UiStrings
  nav: NavGroup[]
  pages: Record<string, React.ComponentType>
}
