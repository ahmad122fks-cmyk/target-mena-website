import './styles/index.css'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { App } from './app/App'
import type { PageData } from './app/PageData'
import { PAGES } from './app/pages.client'

const root = document.getElementById('root')!
const embedded = document.getElementById('page-data')?.textContent

/**
 * Pages led by a photo (finder, board pages): the prerendered page is already
 * on screen, so let that first photo (the LCP) download before the page's
 * own scripts compete for the connection. Never waits more than 2.5 s.
 */
function firstPhotoLoaded(): Promise<void> {
  const img = document.querySelector<HTMLImageElement>('img[fetchpriority="high"]')
  if (!img || img.complete) return Promise.resolve()
  return new Promise((resolve) => {
    img.addEventListener('load', () => resolve(), { once: true })
    img.addEventListener('error', () => resolve(), { once: true })
    setTimeout(resolve, 2500)
  })
}

async function start() {
  await firstPhotoLoaded()
  // Built pages carry their data; `vite dev` computes it from the feed.
  let data: PageData = embedded ? JSON.parse(embedded) : { kind: 'notFound' }
  if (import.meta.env.DEV && !embedded) {
    const [{ getPageData }, { matchRoute }] = await Promise.all([
      import('./app/server/pageData'),
      import('./app/routes'),
    ])
    data = getPageData(matchRoute(window.location.pathname))
  }
  const app = (
    <StrictMode>
      <BrowserRouter>
        <App pages={PAGES} data={data} />
      </BrowserRouter>
    </StrictMode>
  )
  if (root.firstElementChild) hydrateRoot(root, app)
  else createRoot(root).render(app)
}

void start()
