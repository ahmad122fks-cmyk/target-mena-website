/** Arabic is the main language (root `/`, RTL); English lives under `/en/`. */
export type Lang = 'ar' | 'en'
export type Localized<T = string> = Record<Lang, T>

export const LANGS: readonly Lang[] = ['ar', 'en']

export function dirOf(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr'
}

export function otherLang(lang: Lang): Lang {
  return lang === 'ar' ? 'en' : 'ar'
}

/** Language of a site path: anything under /en is English. */
export function langFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ar'
}

/** Strip the /en prefix: '/en/boards' -> '/boards', '/en/' -> '/'. */
export function basePath(pathname: string): string {
  if (langFromPath(pathname) === 'ar') return pathname || '/'
  const rest = pathname.slice(3)
  return rest === '' ? '/' : rest
}

/**
 * Site path for a language. Anchors (#contact) and full URLs pass through.
 * localePath('en', '/boards') -> '/en/boards'; localePath('ar', '/') -> '/'.
 */
export function localePath(lang: Lang, path: string): string {
  if (path.startsWith('#') || /^[a-z]+:/i.test(path)) return path
  if (lang === 'ar') return path
  return path === '/' ? '/en/' : `/en${path}`
}

/** Same page in the other language. */
export function alternatePath(pathname: string): string {
  const lang = langFromPath(pathname)
  return localePath(otherLang(lang), basePath(pathname))
}
