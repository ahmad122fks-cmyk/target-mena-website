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
      {ROUTES.flatMap(({ path, lang, page }) => {
        const Page = PAGES[page]
        // '/en/' and '/en/index.html' are the same page (static servers use both).
        return [path, `${path}index.html`].map((routePath) => (
          <Route
            key={routePath}
            path={routePath}
            element={
              <SiteLayout lang={lang}>
                <Page />
              </SiteLayout>
            }
          />
        ))
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
