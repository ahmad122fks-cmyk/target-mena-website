import site from '@/content/site.json'
import { dirOf, localePath, type Lang } from '@/features/i18n/lang'
import { boardSlug, cityLabel, placeLine, type Board } from '@/lib/boards'
import { trailFor } from '@/lib/breadcrumbs'
import { absoluteUrl, SITE_URL } from '@/lib/site'
import { ARTICLES } from '@/features/insights/articles'
import { organizationJsonLd } from '../jsonLd'
import type { PageData } from '../PageData'
import type { RouteMatch } from '../routes'
import { seoFor } from './seo'

export type PageHead = {
  lang: Lang
  dir: 'rtl' | 'ltr'
  title: string
  description: string
  canonical: string
  alternates: { hrefLang: string; href: string }[]
  siteName: string
  /** 1200 x 630 share image (scripts/build-share-images.ts). */
  image: string
  noindex: boolean
  status: number
  jsonLd: object
}

/** schema.org Place for a board with valid coordinates (BUILD-BRIEF 7). */
function placeJsonLd(board: Board, lang: Lang, url: string) {
  if (board.lat === undefined) return null
  return {
    '@type': 'Place',
    name: `${board.code} · ${placeLine(board, lang)}`,
    url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityLabel(board.city, lang),
      addressCountry: 'IQ',
    },
    geo: { '@type': 'GeoCoordinates', latitude: board.lat, longitude: board.lng },
    ...(board.photo ? { photo: `${SITE_URL}/photos/${board.photo.id}-960.webp` } : {}),
  }
}

/** Everything the page <head> needs; unknown URLs get the 404 head (noindex). */
export function getHead(match: RouteMatch | null, data: PageData): PageHead {
  const found = match !== null && data.kind !== 'notFound'
  const lang: Lang = found ? match.lang : 'ar'
  const base = found ? match.base : '/404/'
  const ar = absoluteUrl(localePath('ar', base))
  const en = absoluteUrl(localePath('en', base))
  const canonical = lang === 'ar' ? ar : en
  const crumbs = trailFor(data, lang).map((crumb, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: crumb.label,
    item: absoluteUrl(crumb.path),
  }))
  const place = data.kind === 'board' ? placeJsonLd(data.board, lang, canonical) : null
  return {
    lang,
    dir: dirOf(lang),
    ...seoFor(data, lang),
    canonical,
    alternates: found
      ? [
          { hrefLang: 'ar', href: ar },
          { hrefLang: 'en', href: en },
          { hrefLang: 'x-default', href: ar },
        ]
      : [],
    siteName: site.name[lang],
    image: absoluteUrl(
      data.kind === 'board' && data.board.photo
        ? `/share/boards/${boardSlug(data.board.code)}.jpg`
        : '/share/target.jpg',
    ),
    // Insights stays out of search engines until it has its first article.
    noindex: !found || (data.kind === 'static' && data.page === 'insights' && !ARTICLES.length),
    status: found ? 200 : 404,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        organizationJsonLd(lang),
        { '@type': 'BreadcrumbList', itemListElement: crumbs },
        ...(place ? [place] : []),
      ],
    },
  }
}
