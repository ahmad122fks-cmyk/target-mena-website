import site from '@/content/site.json'
import { dirOf, localePath, type Lang } from '@/features/i18n/lang'
import notFound from '@/pages/not-found/not-found.content.json'
import { absoluteUrl } from '@/lib/site'
import { organizationJsonLd } from './jsonLd'
import { findRoute, type PageKey } from './routes'
import home from '@/pages/home/home.content.json'

const SEO: Record<PageKey, typeof home.seo> = { home: home.seo }

export type PageHead = {
  lang: Lang
  dir: 'rtl' | 'ltr'
  title: string
  description: string
  canonical: string
  alternates: { hrefLang: string; href: string }[]
  siteName: string
  noindex: boolean
  status: number
  jsonLd: object
}

/** Head data for any URL; unknown URLs get the 404 page head. */
export function getHead(pathname: string): PageHead {
  const route = findRoute(pathname)
  const lang: Lang = route?.lang ?? 'ar'
  const base = route ? (route.lang === 'en' ? route.path.slice(3) || '/' : route.path) : '/404'
  const seo = route ? SEO[route.page] : notFound.seo
  const ar = absoluteUrl(localePath('ar', base))
  const en = absoluteUrl(localePath('en', base))
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: seo.breadcrumb[lang], item: lang === 'ar' ? ar : en }],
  }
  return {
    lang,
    dir: dirOf(lang),
    title: seo.title[lang],
    description: seo.description[lang],
    canonical: lang === 'ar' ? ar : en,
    alternates: route
      ? [{ hrefLang: 'ar', href: ar }, { hrefLang: 'en', href: en }, { hrefLang: 'x-default', href: ar }]
      : [],
    siteName: site.name[lang],
    noindex: !route,
    status: route ? 200 : 404,
    jsonLd: { '@context': 'https://schema.org', '@graph': [organizationJsonLd(lang), breadcrumb] },
  }
}
