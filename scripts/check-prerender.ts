/*
 * Acceptance checks 0 and 4 (BUILD-BRIEF 9) on EVERY built page: full text,
 * one H1, unique title (<= 60) and description (<= 155), canonical, hreflang
 * pair, valid JSON-LD, right lang/dir, contact block - all without JavaScript.
 */
import fs from 'node:fs'
import path from 'node:path'

const DIST = path.resolve('dist')
function pages(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory())
      return entry.name === 'assets' || entry.name === 'photos' ? [] : pages(full)
    return entry.name.endsWith('.html') ? [full] : []
  })
}

const errors: string[] = []
const titles = new Map<string, string>()
const files = pages(DIST)
for (const file of files) {
  const rel = path.relative(DIST, file)
  const html = fs.readFileSync(file, 'utf8')
  const fail = (msg: string) => errors.push(`${rel}: ${msg}`)
  const en = rel.startsWith(`en${path.sep}`)
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]
  if (!title) fail('missing <title>')
  else {
    if (title.length > 60) fail(`title over 60 characters (${title.length}): ${title}`)
    if (titles.has(title)) fail(`title also used by ${titles.get(title)}`)
    titles.set(title, rel)
  }
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1]
  if (!description) fail('missing meta description')
  else if (description.length > 155) fail(`description over 155 characters (${description.length})`)
  if (!html.includes(en ? '<html lang="en" dir="ltr">' : '<html lang="ar" dir="rtl">'))
    fail('wrong <html lang dir>')
  if (!html.includes('rel="canonical"')) fail('missing canonical')
  if (rel !== '404.html' && !/hreflang="x-default"/i.test(html)) fail('missing hreflang pair')
  const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
  if (!jsonLd) fail('missing JSON-LD')
  else JSON.parse(jsonLd)
  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0
  if (h1s !== 1) fail(`expected exactly one <h1>, found ${h1s}`)
  const body = (html.split('<div id="root">')[1] ?? '')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<[^>]+>/g, ' ')
  if (body.replace(/\s+/g, ' ').trim().length < 300)
    fail('page body is (almost) empty - not prerendered?')
  if (!html.includes('+964 771 977 7199') || !html.includes('info@target-mena.com'))
    fail('contact block missing')
}

if (errors.length) {
  console.error(`Prerender check failed (${errors.length}):\n- ${errors.slice(0, 40).join('\n- ')}`)
  process.exit(1)
}
console.log(`Prerender check passed for ${files.length} pages.`)
