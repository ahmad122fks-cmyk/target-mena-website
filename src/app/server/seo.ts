import about from '@/pages/about/about.content.json'
import alrabiaa from '@/pages/alrabiaa/alrabiaa.content.json'
import boardsContent from '@/pages/boards/boards.content.json'
import contact from '@/pages/contact/contact.content.json'
import digital from '@/pages/digital/digital.content.json'
import events from '@/pages/events/events.content.json'
import highways from '@/pages/highway-bridges/highways.content.json'
import insights from '@/pages/insights/insights.content.json'
import privacy from '@/pages/privacy/privacy.content.json'
import production from '@/pages/production/production.content.json'
import work from '@/pages/work/work.content.json'
import campaign from '@/pages/campaign/campaign.content.json'
import board from '@/pages/board/board.content.json'
import format from '@/pages/format/format.content.json'
import home from '@/pages/home/home.content.json'
import network from '@/pages/network/network.content.json'
import notFound from '@/pages/not-found/not-found.content.json'
import province from '@/pages/province/province.content.json'
import type { Lang } from '@/features/i18n/lang'
import { areaLabel, cityLabel, FORMATS, formatOf, type Board } from '@/lib/boards'
import { formatCount, formatFaces, formatSize, formatSqm } from '@/lib/format'
import { fill } from '@/lib/template'
import type { PageData } from '../PageData'
import type { StaticPage } from '../routes'

/** SEO text of each content page (its .content.json). */
const STATIC_SEO: Record<StaticPage, { seo: Seo }> = {
  campaign,
  production,
  events,
  alrabiaa,
  digital,
  work,
  about,
  contact,
  insights,
  privacy,
}

type Seo = { title: Record<Lang, string>; description: Record<Lang, string> }

/** Shorten to `max` characters at a word boundary. */
export function clip(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), max - 20)).trim()}…`
}

function boardSeo(b: Board, lang: Lang) {
  const type = board.typeTitle[b.type as keyof typeof board.typeTitle]?.[lang] ?? b.type
  const city = cityLabel(b.city, lang)
  const place = areaLabel(b, lang) ?? (lang === 'ar' ? b.description : city)
  const values = { type, place, city, code: b.code }
  let title = fill(board.seo.title[lang], values)
  if (title.length > 60 || place === city)
    title = fill(board.seo.title[lang].replace(/[،,] \{city\}/, ''), values)
  if (title.length > 60)
    title = fill(board.seo.title[lang].replace(/[،,] \{city\}/, ''), {
      ...values,
      place: clip(place, place.length - (title.length - 60)),
    })
  const facts = {
    size: formatSize(b.height, b.width, lang),
    sqm: formatSqm(b.sqm, lang),
    faces: formatFaces(b.faces, lang),
  }
  return {
    title,
    description: clip(fill(board.seo.description[lang], { ...values, ...facts }), 155),
  }
}

/** Title (<= 60) and description (<= 155) for any page, in its language. */
export function seoFor(data: PageData, lang: Lang): { title: string; description: string } {
  const pick = (seo: { title: Record<Lang, string>; description: Record<Lang, string> }) => ({
    title: seo.title[lang],
    description: seo.description[lang],
  })
  switch (data.kind) {
    case 'home':
      return pick(home.seo)
    case 'boards':
      return pick(boardsContent.seo)
    case 'network':
      return pick(network.seo)
    case 'static':
      return pick(STATIC_SEO[data.page].seo)
    case 'highways':
      return pick(highways.seo)
    case 'article':
      return {
        title: clip(`${data.article.title[lang]} | ${lang === 'ar' ? 'تارگت' : 'Target'}`, 60),
        description: clip(data.article.description[lang], 155),
      }
    case 'board':
      return boardSeo(data.board, lang)
    case 'province': {
      const kinds = FORMATS.filter((f) => data.boards.some((b) => formatOf(b.type) === f.key)).map(
        (f) => f.label[lang],
      )
      const values = {
        city: cityLabel(data.city, lang),
        count: formatCount(data.boards.length, lang),
        formats: kinds.join(lang === 'ar' ? '، ' : ', '),
      }
      return {
        title: clip(fill(province.seo.title[lang], values), 60),
        description: clip(fill(province.seo.description[lang], values), 155),
      }
    }
    case 'format': {
      const label = FORMATS.find((f) => f.key === data.format)?.label[lang] ?? data.format
      const cities = [...new Set(data.boards.map((b) => cityLabel(b.city, lang)))].join(
        lang === 'ar' ? '، ' : ', ',
      )
      const values = { format: label, count: formatCount(data.boards.length, lang), cities }
      return {
        title: clip(fill(format.seo.title[lang], values), 60),
        description: clip(fill(format.seo.description[lang], values), 155),
      }
    }
    default:
      return pick(notFound.seo)
  }
}
