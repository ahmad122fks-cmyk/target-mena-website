import type { Lang } from '@/features/i18n/lang'

export type PageKey = 'home'

export type SiteRoute = { path: string; lang: Lang; page: PageKey }

/**
 * Every prerendered page. Arabic at the root, English under /en/.
 * Phase 2 adds boards, provinces and formats; phase 3 the remaining pages.
 */
export const ROUTES: SiteRoute[] = [
  { path: '/', lang: 'ar', page: 'home' },
  { path: '/en/', lang: 'en', page: 'home' },
]

/** Output file for a route: '/' -> 'index.html', '/en/' -> 'en/index.html'. */
export function outputFile(path: string): string {
  const clean = path.replace(/^\/|\/$/g, '')
  return clean === '' ? 'index.html' : `${clean}/index.html`
}

export function findRoute(pathname: string): SiteRoute | undefined {
  const normal = pathname.endsWith('/') ? pathname : `${pathname}/`
  return ROUTES.find((route) => route.path === normal || route.path === pathname)
}
