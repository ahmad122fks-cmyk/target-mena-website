import type { ComponentType } from 'react'
import { Route, Routes } from 'react-router'
import HomePage from '@/pages/home'
import NotFoundPage from '@/pages/not-found'
import { SiteLayout } from './layouts/SiteLayout'
import { ROUTES, type PageKey } from './routes'

const PAGES: Record<PageKey, ComponentType> = { home: HomePage }

export function App() {
  return (
    <Routes>
      {ROUTES.map(({ path, lang, page }) => {
        const Page = PAGES[page]
        return (
          <Route
            key={path}
            path={path}
            element={
              <SiteLayout lang={lang}>
                <Page />
              </SiteLayout>
            }
          />
        )
      })}
      <Route
        path="*"
        element={
          <SiteLayout lang="ar">
            <NotFoundPage />
          </SiteLayout>
        }
      />
    </Routes>
  )
}
