/*
 * Prerender every route to real static HTML (BUILD-BRIEF 2): Google and
 * WhatsApp see the full text, title, description and JSON-LD without JS.
 * Runs after `vite build` (client) and `vite build --ssr` (dist-ssr).
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const DIST = path.resolve('dist')
const SSR_ENTRY = path.resolve('dist-ssr/entry-server.js')

type Rendered = { html: string; headHtml: string; head: { lang: string; dir: string } }
type ServerEntry = {
  render: (url: string) => Rendered
  ROUTES: { path: string; lang: 'ar' | 'en' }[]
  outputFile: (path: string) => string
}

const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8')
const server = (await import(pathToFileURL(SSR_ENTRY).href)) as ServerEntry
const assets = await fs.readdir(path.join(DIST, 'assets'))

/** Preload the Readex Pro subset each language needs first (faster text paint). */
function fontPreload(lang: 'ar' | 'en'): string {
  const subset = lang === 'ar' ? 'readex-pro-arabic-wght' : 'readex-pro-latin-wght'
  const file = assets.find((name) => name.startsWith(subset) && name.endsWith('.woff2'))
  if (!file) throw new Error(`Font file for ${lang} not found in dist/assets`)
  return `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>`
}

/**
 * Preload the above-the-fold photo (the <img fetchpriority="high">) so the
 * browser fetches it before scripts: it is the page's LCP element.
 */
function heroPreload(html: string): string {
  const picture = html.match(
    /<picture>(?:(?!<\/picture>)[\s\S])*?fetchpriority="high"[\s\S]*?<\/picture>/i,
  )?.[0]
  const avif = picture?.match(/<source type="image\/avif" srcset="([^"]+)" sizes="([^"]+)"/i)
  if (!avif) return ''
  return `<link rel="preload" as="image" type="image/avif" imagesrcset="${avif[1]}" imagesizes="${avif[2]}" fetchpriority="high">`
}

function page(url: string, lang: 'ar' | 'en'): string {
  const { html, headHtml, head } = server.render(url)
  return template
    .replace('<html lang="ar" dir="rtl">', `<html lang="${head.lang}" dir="${head.dir}">`)
    .replace('<!--app-head-->', `${heroPreload(html)}${fontPreload(lang)}\n    ${headHtml}`)
    .replace('<!--app-html-->', html)
}

const written: string[] = []
for (const route of server.ROUTES) {
  const file = path.join(DIST, server.outputFile(route.path))
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, page(route.path, route.lang))
  written.push(path.relative(DIST, file))
}
// One 404 page for every unknown URL (the server sends it with status 404).
await fs.writeFile(path.join(DIST, '404.html'), page('/404', 'ar'))
written.push('404.html')

await fs.rm(path.resolve('dist-ssr'), { recursive: true, force: true })
console.log(`Prerendered ${written.length} pages: ${written.join(', ')}`)
