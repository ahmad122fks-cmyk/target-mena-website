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
  campaign: lazy(() => import('@/pages/campaign')),
  highways: lazy(() => import('@/pages/highway-bridges')),
  article: lazy(() => import('@/pages/article')),
  production: lazy(() => import('@/pages/production')),
  events: lazy(() => import('@/pages/events')),
  alrabiaa: lazy(() => import('@/pages/alrabiaa')),
  digital: lazy(() => import('@/pages/digital')),
  work: lazy(() => import('@/pages/work')),
  about: lazy(() => import('@/pages/about')),
  contact: lazy(() => import('@/pages/contact')),
  insights: lazy(() => import('@/pages/insights')),
  privacy: lazy(() => import('@/pages/privacy')),
}
