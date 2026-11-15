import cities from '@/data/cities.json'
import { codesFromParam } from '@/features/selection/items'
import type { Board } from '@/lib/boards'
import { EMPTY_FILTERS, type Filters } from './filter'

export type Sort = 'recommended' | 'code' | 'province' | 'size'
export type View = 'grid' | 'list'
export type FinderState = Filters & {
  sort: Sort
  view: View
  page: number
  codes: string[]
  pick: boolean
}

export const PAGE_SIZE = 24
export const SORTS: Sort[] = ['recommended', 'code', 'province', 'size']
export const DEFAULT_STATE: FinderState = {
  ...EMPTY_FILTERS,
  sort: 'recommended',
  view: 'grid',
  page: 1,
  codes: [],
  pick: false,
}

const cityOrder = Object.keys(cities)
const byCode = (a: Board, b: Board) => a.code.localeCompare(b.code, 'en', { numeric: true })

/** Order results; "recommended" keeps boards with a real photo first. */
export function sortBoards(boards: Board[], sort: Sort): Board[] {
  const list = [...boards]
  if (sort === 'code') return list.sort(byCode)
  if (sort === 'province')
    return list.sort(
      (a, b) => cityOrder.indexOf(a.city) - cityOrder.indexOf(b.city) || byCode(a, b),
    )
  if (sort === 'size') return list.sort((a, b) => b.sqm - a.sqm || byCode(a, b))
  return [...list.filter((board) => board.photo), ...list.filter((board) => !board.photo)]
}

export function pageCount(total: number): number {
  return Math.max(1, Math.ceil(total / PAGE_SIZE))
}

/** "Show more": the first `page` batches of 24. */
export function shownOf<T>(items: T[], page: number): T[] {
  return items.slice(0, page * PAGE_SIZE)
}

/** Read the address bar: ?city=najaf&format=bridges&size=large&faces=2&q=..&sort=size&view=list&page=2&codes=A,B&pick=1 */
export function stateFromSearch(search: string): FinderState {
  const p = new URLSearchParams(search)
  const sort = p.get('sort') as Sort
  const page = Number(p.get('page'))
  return {
    city: p.get('city') ?? '',
    format: p.get('format') ?? '',
    size: p.get('size') ?? '',
    faces: p.get('faces') ?? '',
    query: p.get('q') ?? '',
    sort: SORTS.includes(sort) ? sort : 'recommended',
    view: p.get('view') === 'list' ? 'list' : 'grid',
    page: Number.isInteger(page) && page > 1 ? page : 1,
    codes: codesFromParam(p.get('codes')),
    pick: p.get('pick') === '1',
  }
}

/** Write the address bar back, leaving out defaults so links stay short. */
export function searchFromState(state: FinderState): string {
  const p = new URLSearchParams()
  if (state.codes.length) p.set('codes', state.codes.join(','))
  if (state.city) p.set('city', state.city)
  if (state.format) p.set('format', state.format)
  if (state.size) p.set('size', state.size)
  if (state.faces) p.set('faces', state.faces)
  if (state.query) p.set('q', state.query)
  if (state.sort !== 'recommended') p.set('sort', state.sort)
  if (state.view !== 'grid') p.set('view', state.view)
  if (state.page > 1) p.set('page', String(state.page))
  if (state.pick) p.set('pick', '1')
  const text = p.toString().replace(/%2C/g, ',')
  return text ? `?${text}` : ''
}
