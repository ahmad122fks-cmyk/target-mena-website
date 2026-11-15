/*
 * Acceptance check 0 (BUILD-BRIEF 9): every built page has its full text,
 * title, description, canonical, hreflang, JSON-LD and exactly one H1 in
 * the HTML itself - no JavaScript needed. Fails the build otherwise.
 */
import fs from 'node:fs/promises'
import path from 'node:path'

const DIST = path.resolve('dist')
const PAGES = [
  { file: 'index.html', lang: 'ar', dir: 'rtl', hreflang: true },
  { file: 'en/index.html', lang: 'en', dir: 'ltr', hreflang: true },
  { file: '404.html', lang: 'ar', dir: 'rtl', hreflang: false },
]

function visibleText(html: string): string {
  const body = html.split('<div id="root">')[1] ?? ''
  return body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

const errors: string[] = []
const titles = new Set<string>()
for (const page of PAGES) {
  const html = await fs.readFile(path.join(DIST, page.file), 'utf8')
  const fail = (msg: string) => errors.push(`${page.file}: ${msg}`)
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]
  if (!title) fail('missing <title>')
  else if (titles.has(title)) fail(`duplicate title "${title}"`)
  else titles.add(title)
  if (title && title.length > 60) fail(`title longer than 60 characters (${title.length})`)
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1]
  if (!description) fail('missing meta description')
  else if (description.length > 155) fail(`description longer than 155 characters (${description.length})`)
  if (!html.includes(`<html lang="${page.lang}" dir="${page.dir}">`)) fail(`<html> must be lang="${page.lang}" dir="${page.dir}"`)
  if (!html.includes('rel="canonical"')) fail('missing canonical')
  if (page.hreflang && !/hrefLang="x-default"|hreflang="x-default"/i.test(html)) fail('missing hreflang pair + x-default')
  const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
  if (!jsonLd) fail('missing JSON-LD')
  else JSON.parse(jsonLd)
  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0
  if (h1s !== 1) fail(`expected exactly one <h1>, found ${h1s}`)
  if (visibleText(html).length < 400) fail('page body is (almost) empty - not prerendered?')
  if (!html.includes('+964 771 977 7199') || !html.includes('info@target-mena.com')) fail('contact block missing')
}

if (errors.length) {
  console.error(`Prerender check failed:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}
console.log(`Prerender check passed for ${PAGES.length} pages.`)
