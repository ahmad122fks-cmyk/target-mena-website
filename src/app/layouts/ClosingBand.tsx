import { useLocation } from 'react-router'
import { CtaBand } from '@/components/shared/CtaBand'
import closing from '@/content/closing.json'
import { basePath } from '@/features/i18n/lang'

/**
 * Pages that end with their own band: their own blue CTA band (home,
 * network, production, digital), the contact block (contact) or the
 * campaign form itself (campaign).
 */
const OWN_CLOSING = new Set([
  '/',
  '/network/',
  '/production/',
  '/digital/',
  '/contact/',
  '/campaign/',
])

/** The one blue CTA band per page (v3): the standard one where a page has none. */
export function ClosingBand() {
  const path = basePath(useLocation().pathname)
  if (OWN_CLOSING.has(path)) return null
  return <CtaBand id="closing-cta" {...closing} />
}
