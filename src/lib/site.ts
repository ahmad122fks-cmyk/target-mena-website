import site from '@/content/site.json'

/** Public address of the website (canonical URLs, JSON-LD, sitemap). */
export const SITE_URL = 'https://target-mena.com'

/** Stable public logo files (not hashed) - also used in JSON-LD. */
export const LOGO_BLUE = '/brand/target-logo-blue.svg'
export const LOGO_WHITE = '/brand/target-logo-white.svg'

export const CONTACT = site.contact

/** WhatsApp number (Ahmad, 15 Nov 2026). */
export const WHATSAPP = '+964 771 977 7199'

/**
 * Leads API (BUILD-BRIEF 5): set to 'https://admin.target-mena.cloud/api/public/leads'
 * once it exists. While empty, requests go out by WhatsApp or email instead.
 */
export const LEADS_ENDPOINT = ''

/** wa.me link to Target's WhatsApp, optionally with a prefilled message. */
export function whatsappHref(text?: string): string {
  const base = `https://wa.me/${WHATSAPP.replace(/\D/g, '')}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

/** '+964 771 977 7199' -> 'tel:+9647719777199' */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, '')}`
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`
}
