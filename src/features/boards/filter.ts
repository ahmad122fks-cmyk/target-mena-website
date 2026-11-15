import type { Lang } from '@/features/i18n/lang'
import { areaLabel, cityLabel, formatOf, type Board } from '@/lib/boards'

export type Filters = { city: string; format: string; size: string; faces: string; query: string }

export const EMPTY_FILTERS: Filters = { city: '', format: '', size: '', faces: '', query: '' }

/** Size groups by area in m² (UI grouping only). */
export const SIZES = { small: [0, 20], medium: [20, 60], large: [60, Infinity] } as const

export function inSize(sqm: number, size: string): boolean {
  const range = SIZES[size as keyof typeof SIZES]
  return !range || (sqm >= range[0] && sqm < range[1])
}

/** Boards matching every filter; the query matches code, province, area (both languages) or description. */
export function filterBoards(boards: Board[], filters: Filters, lang: Lang): Board[] {
  const query = filters.query.trim().toLowerCase()
  return boards.filter(
    (board) =>
      (!filters.city || board.city === filters.city) &&
      (!filters.format || formatOf(board.type) === filters.format) &&
      inSize(board.sqm, filters.size) &&
      (!filters.faces || String(board.faces) === filters.faces) &&
      (!query ||
        [
          board.code,
          board.description,
          board.area ?? '',
          areaLabel(board, lang) ?? '',
          cityLabel(board.city, lang),
        ].some((text) => text.toLowerCase().includes(query))),
  )
}

/** Boards with a real photo first (stable order otherwise), so results look complete. */
export function photosFirst(boards: Board[]): Board[] {
  return [...boards.filter((board) => board.photo), ...boards.filter((board) => !board.photo)]
}
