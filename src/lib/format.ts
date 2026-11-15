import type { Lang } from '@/features/i18n/lang'

/**
 * Board size, always height x width, numbers exactly as in the source
 * (never rounded): formatSize(9.8, 20, 'en') -> '9.8 × 20 m'.
 */
export function formatSize(height: number, width: number, lang: Lang): string {
  return `${height} × ${width} ${lang === 'ar' ? 'م' : 'm'}`
}

/** Area in m², as in the source (up to 2 decimals there, never rounded here). */
export function formatSqm(sqm: number, lang: Lang): string {
  return `${sqm} ${lang === 'ar' ? 'م²' : 'm²'}`
}

export function formatFaces(faces: number, lang: Lang): string {
  if (lang === 'en') return faces === 1 ? '1 face' : `${faces} faces`
  if (faces === 1) return 'وجه واحد'
  if (faces === 2) return 'وجهان'
  return `${faces} أوجه`
}

/** "216 لوحة" / "3 لوحات" / "216 boards" - Arabic number agreement. */
export function formatCount(n: number, lang: Lang): string {
  if (lang === 'en') return n === 1 ? '1 board' : `${n} boards`
  if (n === 1) return 'لوحة واحدة'
  if (n === 2) return 'لوحتان'
  if (n >= 3 && n <= 10) return `${n} لوحات`
  return `${n} لوحة`
}
