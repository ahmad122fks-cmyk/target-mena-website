/** <head> additions written at prerender: preloads for the font, hero photo and page chunk. */

type Manifest = Record<string, { file: string; imports?: string[]; isEntry?: boolean }>

/** The Readex Pro subset each language needs first. */
export function fontPreload(assets: string[], lang: 'ar' | 'en'): string {
  const subset = lang === 'ar' ? 'readex-pro-arabic-wght' : 'readex-pro-latin-wght'
  const file = assets.find((name) => name.startsWith(subset) && name.endsWith('.woff2'))
  if (!file) throw new Error(`Font file for ${lang} not found in dist/assets`)
  return `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>`
}

/** The above-the-fold photo (<img fetchpriority="high">), the page's LCP element. */
export function heroPreload(html: string): string {
  const picture = html.match(
    /<picture>(?:(?!<\/picture>)[\s\S])*?fetchpriority="high"[\s\S]*?<\/picture>/i,
  )?.[0]
  const avif = picture?.match(/<source type="image\/avif" srcset="([^"]+)" sizes="([^"]+)"/i)
  if (avif)
    return `<link rel="preload" as="image" type="image/avif" imagesrcset="${avif[1]}" imagesizes="${avif[2]}" fetchpriority="high">`
  const img = html.match(/<img[^>]*fetchpriority="high"[^>]*>/i)?.[0]
  const srcset = img?.match(/srcset="([^"]+)"/i)?.[1]
  const sizes = img?.match(/sizes="([^"]+)"/i)?.[1]
  return srcset && sizes
    ? `<link rel="preload" as="image" imagesrcset="${srcset}" imagesizes="${sizes}" fetchpriority="high">`
    : ''
}

/** modulepreload for a page's own chunk and the chunks it imports (not the entry). */
export function modulePreloads(manifest: Manifest, source: string): string {
  const files = new Set<string>()
  const visit = (key: string) => {
    const chunk = manifest[key]
    if (!chunk || chunk.isEntry || files.has(chunk.file)) return
    files.add(chunk.file)
    chunk.imports?.forEach(visit)
  }
  visit(source)
  return [...files].map((file) => `<link rel="modulepreload" href="/${file}">`).join('')
}
