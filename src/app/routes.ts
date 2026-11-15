import { matchPath } from 'react-router'
import type { Lang } from '@/features/i18n/lang'

/** Content pages without board data (one folder each in src/pages). */
export const STATIC_PAGES = [
  'campaign',
  'production',
  'events',
  'alrabiaa',
  'digital',
  'work',
  'about',
  'contact',
  'insights',
  'privacy',
] as const
export type StaticPage = (typeof STATIC_PAGES)[number]

export type PageKey =
  | 'home'
  | 'boards'
  | 'board'
  | 'network'
  | 'province'
  | 'format'
  | 'highways'
  | 'article'
  | StaticPage

/** URL patterns (Arabic; English adds /en). Every URL ends with a slash. */
const PATTERNS: { pattern: string; page: PageKey }[] = [
  { pattern: '/', page: 'home' },
  { pattern: '/boards/', page: 'boards' },
  { pattern: '/boards/:code/', page: 'board' },
  { pattern: '/network/', page: 'network' },
  { pattern: '/network/:province/', page: 'province' },
  { pattern: '/formats/:format/', page: 'format' },
  { pattern: '/highway-bridges/', page: 'highways' },
  { pattern: '/insights/:slug/', page: 'article' },
  ...STATIC_PAGES.map((page) => ({ pattern: `/${page}/`, page })),
]

export type RouteMatch = { page: PageKey; lang: Lang; params: Record<string, string>; base: string }

/** '/en/boards/BGW03A/' -> { page: 'board', lang: 'en', params: { code: 'BGW03A' }, base: '/boards/BGW03A/' }. */
export function matchRoute(pathname: string): RouteMatch | null {
  let path = pathname.replace(/index\.html$/, '')
  if (!path.endsWith('/')) path += '/'
  const lang: Lang = path.startsWith('/en/') ? 'en' : 'ar'
  const base = lang === 'en' ? path.slice(3) : path
  for (const { pattern, page } of PATTERNS) {
    const match = matchPath({ path: pattern, end: true }, base)
    if (match) return { page, lang, params: match.params as Record<string, string>, base }
  }
  return null
}

/** Output file for a URL: '/' -> 'index.html', '/en/boards/' -> 'en/boards/index.html'. */
export function outputFile(path: string): string {
  const clean = path.replace(/^\/|\/$/g, '')
  return clean === '' ? 'index.html' : `${clean}/index.html`
}
