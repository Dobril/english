import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { phases } from '../data/phases'

const KEY = 'ai-roadmap-progress-v1'

type State = Record<string, boolean>

interface ProgressApi {
  isDone: (key: string) => boolean
  toggle: (key: string) => void
  reset: () => void
  total: { done: number; all: number }
  perPhase: (phaseId: number) => { done: number; all: number }
}

const Ctx = createContext<ProgressApi | null>(null)

function load(): State {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}') || {}
  } catch {
    return {}
  }
}

function save(state: State) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* storage may be unavailable (private mode); progress is then session-only */
  }
}

export function checkKey(phaseId: number, index: number) {
  return `p${phaseId}-${index}`
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(load)

  const toggle = useCallback((key: string) => {
    setState((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      save(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setState({})
    save({})
  }, [])

  const api = useMemo<ProgressApi>(() => {
    const perPhase = (phaseId: number) => {
      const phase = phases.find((p) => p.id === phaseId)
      if (!phase) return { done: 0, all: 0 }
      const all = phase.checklist.length
      let done = 0
      for (let i = 0; i < all; i++) if (state[checkKey(phaseId, i)]) done++
      return { done, all }
    }
    const total = phases.reduce(
      (acc, p) => {
        const c = perPhase(p.id)
        return { done: acc.done + c.done, all: acc.all + c.all }
      },
      { done: 0, all: 0 },
    )
    return { isDone: (k) => !!state[k], toggle, reset, total, perPhase }
  }, [state, toggle, reset])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useProgress() {
  const api = useContext(Ctx)
  if (!api) throw new Error('useProgress must be used inside ProgressProvider')
  return api
}
