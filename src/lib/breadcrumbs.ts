import type { PageData } from '@/app/PageData'
import site from '@/content/site.json'
import { localePath, type Lang } from '@/features/i18n/lang'
import { boardPath, cityLabel, FORMATS, formatOf } from './boards'

export type Crumb = { label: string; path: string }

function formatLabel(key: string, lang: Lang): string {
  return FORMATS.find((format) => format.key === key)?.label[lang] ?? key
}

/** Home > ... > this page, in the page language (visible trail and JSON-LD). */
export function trailFor(data: PageData, lang: Lang): Crumb[] {
  const c = site.crumbs
  const at = (label: string, path: string): Crumb => ({ label, path: localePath(lang, path) })
  const home = at(c.home[lang], '/')
  const network = at(c.network[lang], '/network/')
  switch (data.kind) {
    case 'boards':
      return [home, at(c.boards[lang], '/boards/')]
    case 'board': {
      const { board } = data
      const format = formatOf(board.type)
      return [
        home,
        at(cityLabel(board.city, lang), `/network/${board.city}/`),
        at(formatLabel(format, lang), `/formats/${format}/`),
        at(board.code, boardPath(board)),
      ]
    }
    case 'network':
      return [home, network]
    case 'province':
      return [home, network, at(cityLabel(data.city, lang), `/network/${data.city}/`)]
    case 'format':
      return [home, network, at(formatLabel(data.format, lang), `/formats/${data.format}/`)]
    default:
      return [home]
  }
}
