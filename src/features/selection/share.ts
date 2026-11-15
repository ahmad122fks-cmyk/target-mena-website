import { localePath, type Lang } from '@/features/i18n/lang'
import { SITE_URL } from '@/lib/site'

/** Shareable link to the finder showing exactly these boards: /boards/?codes=A,B,C */
export function selectionLink(codes: string[], lang: Lang, origin = SITE_URL): string {
  return `${origin}${localePath(lang, '/boards/')}?codes=${codes.map(encodeURIComponent).join(',')}`
}
