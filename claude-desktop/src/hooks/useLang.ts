import { useParams } from 'react-router-dom'
import type { Lang } from '../data/types'

export const LANGS: Lang[] = ['bg', 'en']
export const DEFAULT_LANG: Lang = 'en'
const KEY = 'cd-handbook-lang'

export function isLang(v: string | undefined): v is Lang {
  return v === 'bg' || v === 'en'
}

export function loadLang(): Lang {
  try {
    const v = localStorage.getItem(KEY)
    return isLang(v ?? undefined) ? (v as Lang) : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}

export function saveLang(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang)
  } catch {
    /* ignore */
  }
}

export function useLang(): Lang {
  const { lang } = useParams()
  return isLang(lang) ? lang : DEFAULT_LANG
}
