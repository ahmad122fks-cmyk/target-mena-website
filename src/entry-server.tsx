import { StrictMode } from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './app/App'
import { PAGES } from './app/pages.server'
import { matchRoute } from './app/routes'
import { getHead } from './app/server/head'
import { getPageData } from './app/server/pageData'
import { SeoHead } from './components/shared/SeoHead'

export { outputFile } from './app/routes'
export { PAGE_SOURCES } from './app/pageSources'
export { allPaths } from './app/server/paths'
export { FINDER_FEED } from './app/server/boardsData'

/** Render one URL to static HTML + head + the page's data (scripts/prerender.ts). */
export function render(url: string) {
  const match = matchRoute(url)
  const data = getPageData(match)
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App pages={PAGES} data={data} />
      </StaticRouter>
    </StrictMode>,
  )
  const head = getHead(match, data)
  const page = data.kind === 'notFound' ? null : (match?.page ?? null)
  return { html, head, headHtml: renderToStaticMarkup(<SeoHead head={head} />), data, page }
}
