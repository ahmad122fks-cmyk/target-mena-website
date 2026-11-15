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

/** FNV-1a hash, so the finder feed gets a new file name whenever the boards change. */
function hash(text: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 0x01000193)
  return (h >>> 0).toString(16).padStart(8, '0')
}

/**
 * The whole finder list as its own file (written by scripts/prerender.ts into
 * /assets/, cached for a year). The finder page embeds only its first 24
 * boards and loads this after it appears, so the page stays light.
 */
export const FINDER_FEED = (() => {
  // Map positions are only needed on board pages.
  const json = JSON.stringify(BOARDS, (key, value) =>
    key === 'lat' || key === 'lng' ? undefined : value,
  )
  return { path: `/assets/boards-${hash(json)}.json`, json }
})()
