import site from '@/content/site.json'
import type { Lang } from '@/features/i18n/lang'
import { CONTACT, LOGO_BLUE, SITE_URL } from '@/lib/site'

/**
 * Organization + LocalBusiness from the contact block only. Street address,
 * map pin and social accounts are [TO CONFIRM] and left out until confirmed.
 */
export function organizationJsonLd(lang: Lang) {
  return {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${SITE_URL}/#organization`,
    name: site.name.en,
    alternateName: site.name.ar,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}${LOGO_BLUE}`,
    image: `${SITE_URL}${LOGO_BLUE}`,
    email: CONTACT.email,
    telephone: CONTACT.phones[0],
    contactPoint: CONTACT.phones.map((telephone) => ({
      '@type': 'ContactPoint',
      telephone,
      contactType: 'sales',
      availableLanguage: ['ar', 'en'],
    })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: CONTACT.address[lang],
      addressCountry: 'IQ',
    },
  }
}
