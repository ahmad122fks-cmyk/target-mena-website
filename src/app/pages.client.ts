import { lazy } from 'react'
import type { PageRegistry } from './App'

/** Browser: each page is its own chunk (JavaScript budget is per page). */
export const PAGES: PageRegistry = {
  home: lazy(() => import('@/pages/home')),
  boards: lazy(() => import('@/pages/boards')),
  board: lazy(() => import('@/pages/board')),
  network: lazy(() => import('@/pages/network')),
  province: lazy(() => import('@/pages/province')),
  format: lazy(() => import('@/pages/format')),
}
