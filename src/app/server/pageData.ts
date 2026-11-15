import cities from '@/data/cities.json'
import { shownOf, sortBoards } from '@/features/boards/finderState'
import home from '@/pages/home/home.content.json'
import type { PageData } from '../PageData'
import type { RouteMatch } from '../routes'
import {
  BOARDS,
  FINDER_FEED,
  boardsInCity,
  boardsInFormat,
  findBoard,
  formatCounts,
  nearby,
  provinceCounts,
} from './boardsData'

const NOT_FOUND: PageData = { kind: 'notFound' }

/** Everything a page needs, decided at build time (unknown codes -> 404). */
export function getPageData(match: RouteMatch | null): PageData {
  if (!match) return NOT_FOUND
  const { page, params } = match
  if (page === 'home') {
    const featured = home.featured.codes.map(findBoard).filter((board) => board !== undefined)
    const provinces = provinceCounts().sort((a, b) => b.count - a.count)
    return { kind: 'home', featured, provinces, total: BOARDS.length }
  }
  if (page === 'boards')
    return {
      kind: 'boards',
      boards: shownOf(sortBoards(BOARDS, 'recommended'), 1),
      total: BOARDS.length,
      provinces: provinceCounts().sort((a, b) => b.count - a.count),
      feed: FINDER_FEED.path,
    }
  if (page === 'campaign') return { kind: 'static', page: 'campaign' }
  if (page === 'board') {
    const board = findBoard(params.code)
    return board ? { kind: 'board', board, nearby: nearby(board) } : NOT_FOUND
  }
  if (page === 'network')
    return { kind: 'network', provinces: provinceCounts(), formats: formatCounts() }
  if (page === 'province') {
    const boards = params.province in cities ? boardsInCity(params.province) : []
    return boards.length ? { kind: 'province', city: params.province, boards } : NOT_FOUND
  }
  const boards = boardsInFormat(params.format)
  return boards.length ? { kind: 'format', format: params.format, boards } : NOT_FOUND
}
