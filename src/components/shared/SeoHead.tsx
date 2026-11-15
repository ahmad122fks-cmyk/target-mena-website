import type { PageHead } from '@/app/server/head'

/**
 * Everything Google and WhatsApp read without running JavaScript. Rendered
 * only at build time (scripts/prerender.ts) into each page's <head>.
 */
export function SeoHead({ head }: { head: PageHead }) {
  const jsonLd = JSON.stringify(head.jsonLd).replace(/</g, '\\u003c')
  return (
    <>
      <title>{head.title}</title>
      <meta name="description" content={head.description} />
      {head.noindex && <meta name="robots" content="noindex" />}
      <link rel="canonical" href={head.canonical} />
      {head.alternates.map((alt) => (
        <link key={alt.hrefLang} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
      ))}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={head.siteName} />
      <meta property="og:title" content={head.title} />
      <meta property="og:description" content={head.description} />
      <meta property="og:url" content={head.canonical} />
      <meta property="og:locale" content={head.lang === 'ar' ? 'ar_IQ' : 'en_US'} />
      <meta property="og:image" content={head.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={head.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={head.image} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
    </>
  )
}
