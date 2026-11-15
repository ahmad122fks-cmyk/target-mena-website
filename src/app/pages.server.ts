import BoardPage from '@/pages/board'
import BoardsPage from '@/pages/boards'
import CampaignPage from '@/pages/campaign'
import FormatPage from '@/pages/format'
import HomePage from '@/pages/home'
import NetworkPage from '@/pages/network'
import ProvincePage from '@/pages/province'
import HighwaysPage from '@/pages/highway-bridges'
import ArticlePage from '@/pages/article'
import ProductionPage from '@/pages/production'
import EventsPage from '@/pages/events'
import AlrabiaaPage from '@/pages/alrabiaa'
import DigitalPage from '@/pages/digital'
import WorkPage from '@/pages/work'
import AboutPage from '@/pages/about'
import ContactPage from '@/pages/contact'
import InsightsPage from '@/pages/insights'
import PrivacyPage from '@/pages/privacy'
import type { PageRegistry } from './App'

/** Build time: every page as a plain component. */
export const PAGES: PageRegistry = {
  home: HomePage,
  boards: BoardsPage,
  board: BoardPage,
  network: NetworkPage,
  province: ProvincePage,
  format: FormatPage,
  campaign: CampaignPage,
  highways: HighwaysPage,
  article: ArticlePage,
  production: ProductionPage,
  events: EventsPage,
  alrabiaa: AlrabiaaPage,
  digital: DigitalPage,
  work: WorkPage,
  about: AboutPage,
  contact: ContactPage,
  insights: InsightsPage,
  privacy: PrivacyPage,
}
