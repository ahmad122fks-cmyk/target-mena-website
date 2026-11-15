import BoardPage from '@/pages/board'
import BoardsPage from '@/pages/boards'
import FormatPage from '@/pages/format'
import HomePage from '@/pages/home'
import NetworkPage from '@/pages/network'
import ProvincePage from '@/pages/province'
import type { PageRegistry } from './App'

/** Build time: every page as a plain component. */
export const PAGES: PageRegistry = {
  home: HomePage,
  boards: BoardsPage,
  board: BoardPage,
  network: NetworkPage,
  province: ProvincePage,
  format: FormatPage,
}
