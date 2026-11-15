/*
 * Build-time access to the board feed (src/data/boards.json). Imported only
 * by the server/prerender side, never by browser code.
 */
import raw from '@/data/boards.json'
import cities from '@/data/cities.json'
import { boardSlug, FORMATS, formatOf, type Board } from '@/lib/boards'

export const BOARDS = raw as Board[]
const BY_SLUG = new Map(BOARDS.map((board) => [boardSlug(board.code), board]))

export function findBoard(slug: string): Board | undefined {
  return BY_SLUG.get(slug.toUpperCase())
}

export function boardsInCity(city: string): Board[] {
  return BOARDS.filter((board) => board.city === city)
}

export function boardsInFormat(format: string): Board[] {
  return BOARDS.filter((board) => formatOf(board.type) === format)
}

/** Provinces and highways with at least one published board, in cities.json order. */
export function provinceCounts(): { key: string; count: number }[] {
  return Object.keys(cities)
    .map((key) => ({ key, count: boardsInCity(key).length }))
    .filter((city) => city.count > 0)
}

export function formatCounts(): { key: string; count: number }[] {
  return FORMATS.map((format) => ({
    key: format.key,
    count: boardsInFormat(format.key).length,
  })).filter((format) => format.count > 0)
}

/** Up to `n` other boards near this one: same area first, then same city and type. */
export function nearby(board: Board, n = 3): Board[] {
  const others = boardsInCity(board.city).filter((other) => other.code !== board.code)
  const score = (other: Board) =>
    (board.area && other.area === board.area ? 2 : 0) +
    (other.type === board.type ? 1 : 0) +
    (other.photo ? 0.5 : 0)
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, n)
}
