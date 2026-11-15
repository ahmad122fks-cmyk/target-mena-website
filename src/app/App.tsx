import { Suspense, type ComponentType } from 'react'
import { useLocation } from 'react-router'
import NotFoundPage from '@/pages/not-found'
import { SiteLayout } from './layouts/SiteLayout'
import { PageDataProvider, type PageData } from './PageData'
import { matchRoute, type PageKey } from './routes'

export type PageRegistry = Record<PageKey, ComponentType>

/**
 * One app for every page. The server passes the pages as plain components;
 * the browser passes lazy ones, so each page only downloads its own code.
 */
export function App({ pages, data }: { pages: PageRegistry; data: PageData }) {
  const { pathname } = useLocation()
  const match = matchRoute(pathname)
  const found = match !== null && data.kind !== 'notFound'
  const Page = found ? pages[match.page] : NotFoundPage
  return (
    <SiteLayout lang={found ? match.lang : 'ar'}>
      <PageDataProvider value={data}>
        <Suspense fallback={null}>
          <Page />
        </Suspense>
      </PageDataProvider>
    </SiteLayout>
  )
}
