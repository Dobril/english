export type ResourceKind = 'video' | 'book' | 'course' | 'article' | 'docs'

export interface Resource {
  kind: ResourceKind
  title: string
  url?: string
  note?: string
}

export type ToolLevel = 'must' | 'good' | 'aware'

export interface ToolRef {
  name: string
  level: ToolLevel
}

export interface PhaseProject {
  title: string
  intro?: string
  steps?: string[]
  outro?: string
  projectIds?: string[]
}

export interface Phase {
  id: number
  slug: string
  title: string
  short: string
  weeks: string
  weight: number
  goal: string
  tags: string[]
  concepts: string[]
  resources: Resource[]
  tools: ToolRef[]
  mini: string[]
  project: PhaseProject
  checklist: string[]
}

export type ProjectLevel = 'начало' | 'средно' | 'напреднало'

export interface Project {
  id: string
  title: string
  phase: number
  level: ProjectLevel
  summary: string
  goal: string
  stack: string[]
  how: string[]
  result: string[]
  learn: string[]
  nodeRole?: string
}

export type Depth = 'perfect' | 'decent' | 'surface'

export interface Tool {
  name: string
  category: string
  what: string
  where: string
  depth: Depth
  url?: string
}

export interface Paper {
  title: string
  year: number
  url: string
  why: string
}
