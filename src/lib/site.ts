import site from '@/content/site.json'

/** Public address of the website (canonical URLs, JSON-LD, sitemap). */
export const SITE_URL = 'https://target-mena.com'

/** Stable public logo files (not hashed) - also used in JSON-LD. */
export const LOGO_BLUE = '/brand/target-logo-blue.svg'
export const LOGO_WHITE = '/brand/target-logo-white.svg'

export const CONTACT = site.contact

/** '+964 771 977 7199' -> 'tel:+9647719777199' */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, '')}`
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`
}
