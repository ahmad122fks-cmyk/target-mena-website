import { localePath } from '@/features/i18n/lang'
import { boardPath } from '@/lib/boards'
import { BOARDS, formatCounts, provinceCounts } from './boardsData'

/** Every URL to prerender, Arabic and English. */
export function allPaths(): string[] {
  const bases = [
    '/',
    '/boards/',
    '/campaign/',
    ...BOARDS.map(boardPath),
    '/network/',
    ...provinceCounts().map((city) => `/network/${city.key}/`),
    ...formatCounts().map((format) => `/formats/${format.key}/`),
  ]
  return bases.flatMap((base) => [base, localePath('en', base)])
}
