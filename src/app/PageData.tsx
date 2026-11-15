import { createContext, useContext } from 'react'
import type { Board } from '@/lib/boards'

/**
 * Data each page needs, computed at build time and embedded in the page as
 * JSON (<script id="page-data">), so the browser never downloads the whole
 * board feed just to hydrate one page.
 */
export type PageData =
  | {
      kind: 'home'
      featured: Board[]
      /** Published boards per province or highway, most first (from boards.json). */
      provinces: { key: string; count: number }[]
      total: number
    }
  | {
      kind: 'boards'
      /** The first 24 (default order); the full list loads from `feed`. */
      boards: Board[]
      total: number
      provinces: { key: string; count: number }[]
      feed: string
    }
  | { kind: 'board'; board: Board; nearby: Board[] }
  | {
      kind: 'network'
      provinces: { key: string; count: number }[]
      formats: { key: string; count: number }[]
    }
  | { kind: 'province'; city: string; boards: Board[] }
  | { kind: 'format'; format: string; boards: Board[] }
  | { kind: 'static'; page: 'campaign' }
  | { kind: 'notFound' }

const PageDataContext = createContext<PageData>({ kind: 'notFound' })

export const PageDataProvider = PageDataContext

export function usePageData<K extends PageData['kind']>(kind: K): Extract<PageData, { kind: K }> {
  const data = useContext(PageDataContext)
  if (data.kind !== kind) throw new Error(`Page data is "${data.kind}", expected "${kind}"`)
  return data as Extract<PageData, { kind: K }>
}
