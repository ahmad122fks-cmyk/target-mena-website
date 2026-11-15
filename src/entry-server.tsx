import { StrictMode } from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './app/App'
import { getHead } from './app/head'
import { SeoHead } from './components/shared/SeoHead'

export { ROUTES, outputFile } from './app/routes'

/** Render one URL to static HTML (used by scripts/prerender.ts at build time). */
export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  const head = getHead(url)
  return { html, head, headHtml: renderToStaticMarkup(<SeoHead head={head} />) }
}
