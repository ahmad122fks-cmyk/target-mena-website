import swipeList from '@/content/swipe.json'
import cities from '@/data/cities.json'
import { shownOf, sortBoards } from '@/features/boards/finderState'
import { ARTICLES } from '@/features/insights/articles'
import home from '@/pages/home/home.content.json'
import type { PageData } from '../PageData'
import { STATIC_PAGES, type RouteMatch, type StaticPage } from '../routes'
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

/** The swipe cards' boards, in the order of src/content/swipe.json. */
const swipeBoards = () => swipeList.codes.map(findBoard).filter((board) => board !== undefined)

const isStaticPage = (page: string): page is StaticPage =>
  (STATIC_PAGES as readonly string[]).includes(page)

/** Highway bridges: counts per highway and the boards that have a real photo. */
function highwaysData(): PageData {
  const roads = ['highway-south', 'highway-west'].map((key) => {
    const boards = boardsInCity(key)
    return {
      key,
      bridges: boards.filter((board) => board.type === 'bridge').length,
      unipoles: boards.filter((board) => board.type === 'unipole').length,
      faces: boards.reduce((sum, board) => sum + board.faces, 0),
    }
  })
  // One board per photo (the A and B faces of a bridge often share one).
  const seen = new Set<string>()
  const featured = roads
    .flatMap((road) => boardsInCity(road.key))
    .filter((board) => board.photo && !seen.has(board.photo.id) && seen.add(board.photo.id))
    .slice(0, 6)
  return { kind: 'highways', roads, featured }
}

/** Everything a page needs, decided at build time (unknown codes -> 404). */
export function getPageData(match: RouteMatch | null): PageData {
  if (!match) return NOT_FOUND
  const { page, params } = match
  if (page === 'home') {
    const featured = home.featured.codes.map(findBoard).filter((board) => board !== undefined)
    const provinces = provinceCounts().sort((a, b) => b.count - a.count)
    return { kind: 'home', featured, swipe: swipeBoards(), provinces, total: BOARDS.length }
  }
  if (page === 'boards')
    return {
      kind: 'boards',
      boards: shownOf(sortBoards(BOARDS, 'recommended'), 1),
      total: BOARDS.length,
      provinces: provinceCounts().sort((a, b) => b.count - a.count),
      feed: FINDER_FEED.path,
    }
  if (page === 'highways') return highwaysData()
  if (page === 'article') {
    const article = ARTICLES.find((item) => item.slug === params.slug)
    return article ? { kind: 'article', article } : NOT_FOUND
  }
  if (isStaticPage(page)) return { kind: 'static', page }
  if (page === 'board') {
    const board = findBoard(params.code)
    return board ? { kind: 'board', board, nearby: nearby(board) } : NOT_FOUND
  }
  if (page === 'network')
    return {
      kind: 'network',
      swipe: swipeBoards(),
      provinces: provinceCounts(),
      formats: formatCounts(),
    }
  if (page === 'province') {
    const boards = params.province in cities ? boardsInCity(params.province) : []
    return boards.length ? { kind: 'province', city: params.province, boards } : NOT_FOUND
  }
  const boards = boardsInFormat(params.format)
  return boards.length ? { kind: 'format', format: params.format, boards } : NOT_FOUND
}
