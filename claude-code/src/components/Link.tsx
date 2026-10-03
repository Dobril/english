import { Link as RouterLink, NavLink as RouterNavLink, type LinkProps, type NavLinkProps } from 'react-router-dom'
import { useLang } from '../hooks/useLang'

// Content pages link to '/workflow'; the router actually lives at '/bg/workflow' or '/en/workflow'.
export function withLang(lang: string, to: string) {
  return `/${lang}${to === '/' ? '' : to}` || `/${lang}`
}

export function Link({ to, ...rest }: LinkProps & { to: string }) {
  const lang = useLang()
  return <RouterLink to={withLang(lang, to)} {...rest} />
}

export function NavLink({ to, ...rest }: NavLinkProps & { to: string }) {
  const lang = useLang()
  return <RouterNavLink to={withLang(lang, to)} {...rest} />
}
