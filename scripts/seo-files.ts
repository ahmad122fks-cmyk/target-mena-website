/*
 * Search files written into dist/ at prerender (BUILD-BRIEF 7):
 * sitemap-index.xml + sitemaps (pages and boards, both languages, with
 * hreflang pairs) and robots.txt. llms.txt and .htaccess live in public/.
 */
const SITE = 'https://target-mena.com'

/** Both language URLs of one page, each listing the ar / en / x-default alternates. */
function urlEntry(arPath: string): string {
  const enPath = arPath === '/' ? '/en/' : `/en${arPath}`
  const alternates =
    `<xhtml:link rel="alternate" hreflang="ar" href="${SITE}${arPath}"/>` +
    `<xhtml:link rel="alternate" hreflang="en" href="${SITE}${enPath}"/>` +
    `<xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${arPath}"/>`
  return [arPath, enPath]
    .map((path) => `<url><loc>${SITE}${path}</loc>${alternates}</url>`)
    .join('')
}

function urlset(arPaths: string[]): string {
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' +
    arPaths.map(urlEntry).join('') +
    '</urlset>\n'
  )
}

/** Files to write: name -> content. `paths` are all prerendered URLs (both languages). */
export function seoFiles(paths: string[], today: string): Record<string, string> {
  const arPaths = paths.filter((path) => !path.startsWith('/en/'))
  const boards = arPaths.filter((path) => path.startsWith('/boards/') && path !== '/boards/')
  const pages = arPaths.filter((path) => !boards.includes(path))
  const index =
    '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    ['sitemap-pages.xml', 'sitemap-boards.xml']
      .map((name) => `<sitemap><loc>${SITE}/${name}</loc><lastmod>${today}</lastmod></sitemap>`)
      .join('') +
    '</sitemapindex>\n'
  return {
    'sitemap-index.xml': index,
    'sitemap-pages.xml': urlset(pages),
    'sitemap-boards.xml': urlset(boards),
    'robots.txt': `User-agent: *\nAllow: /\nDisallow: /target-\n\nSitemap: ${SITE}/sitemap-index.xml\n`,
  }
}
