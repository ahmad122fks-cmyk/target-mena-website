/*
 * Prerender every page to real static HTML (BUILD-BRIEF 2): Google and
 * WhatsApp see the full text, title, description and JSON-LD without JS.
 * Each page also carries its own data (<script id="page-data">) and preloads
 * only its own JavaScript chunk.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { fontPreload, heroPreload, modulePreloads } from './prerender-head'

const DIST = path.resolve('dist')
type Rendered = {
  html: string
  headHtml: string
  head: { lang: 'ar' | 'en'; dir: string }
  data: unknown
  page: string | null
}
type ServerEntry = {
  render: (url: string) => Rendered
  allPaths: () => string[]
  outputFile: (path: string) => string
  PAGE_SOURCES: Record<string, string>
}

const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8')
const server = (await import(
  pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href
)) as ServerEntry
const manifest = JSON.parse(await fs.readFile(path.join(DIST, '.vite/manifest.json'), 'utf8'))
const assets = await fs.readdir(path.join(DIST, 'assets'))

function page(url: string): string {
  const { html, headHtml, head, data, page: key } = server.render(url)
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  const preloads = key ? modulePreloads(manifest, server.PAGE_SOURCES[key]) : ''
  return template
    .replace('<html lang="ar" dir="rtl">', `<html lang="${head.lang}" dir="${head.dir}">`)
    .replace(
      '<!--app-head-->',
      `${heroPreload(html)}${fontPreload(assets, head.lang)}${preloads}\n    ${headHtml}`,
    )
    .replace(
      '<div id="root"><!--app-html--></div>',
      `<div id="root">${html}</div>\n    <script id="page-data" type="application/json">${json}</script>`,
    )
}

const paths = server.allPaths()
for (const url of paths) {
  const file = path.join(DIST, server.outputFile(url))
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, page(url))
}
// One 404 page for every unknown URL (the server sends it with status 404).
await fs.writeFile(path.join(DIST, '404.html'), page('/404/'))

await fs.rm(path.resolve('dist-ssr'), { recursive: true, force: true })
console.log(`Prerendered ${paths.length + 1} pages (${paths.length / 2} per language + 404).`)
