import areas from '@/data/areas.json'
import cities from '@/data/cities.json'
import type { Lang, Localized } from '@/features/i18n/lang'

/** A board as published (whitelisted fields only, BUILD-BRIEF 4.2). */
export type Board = {
  code: string
  type: string
  city: string
  area?: string
  description: string
  height: number
  width: number
  faces: number
  sqm: number
  lat?: number
  lng?: number
  photo?: { id: string; w: number; h: number }
}

export const TYPE_LABELS: Record<string, Localized> = {
  bridge: { ar: 'جسر', en: 'Bridge' },
  rooftop: { ar: 'سطح', en: 'Rooftop' },
  wall: { ar: 'جدارية', en: 'Wall' },
  wallsign: { ar: 'جدارية', en: 'Wall sign' },
  backlit: { ar: 'لوحة مضاءة', en: 'Backlit' },
  mupi: { ar: 'موبي مضاء', en: 'Mupi' },
  unipole: { ar: 'يونيبول', en: 'Unipole' },
  megapole: { ar: 'ميغابول', en: 'Megapole' },
  screen: { ar: 'شاشة LED', en: 'LED screen' },
}

/** Format pages (BUILD-BRIEF 3): each groups one or more board types. */
export const FORMATS: { key: string; types: string[]; label: Localized }[] = [
  { key: 'bridges', types: ['bridge'], label: { ar: 'الجسور', en: 'Bridges' } },
  { key: 'rooftops', types: ['rooftop'], label: { ar: 'الأسطح', en: 'Rooftops' } },
  { key: 'walls', types: ['wall', 'wallsign'], label: { ar: 'الجداريات', en: 'Walls' } },
  { key: 'backlits', types: ['backlit', 'mupi'], label: { ar: 'اللوحات المضاءة', en: 'Backlits' } },
  { key: 'unipoles', types: ['unipole', 'megapole'], label: { ar: 'اليونيبول', en: 'Unipoles' } },
  { key: 'screens', types: ['screen'], label: { ar: 'الشاشات', en: 'Screens' } },
]

export function formatOf(type: string): string {
  return FORMATS.find((format) => format.types.includes(type))?.key ?? 'backlits'
}

export function typeLabel(type: string, lang: Lang): string {
  return (TYPE_LABELS[type] ?? TYPE_LABELS.backlit)[lang]
}

export function cityLabel(city: string, lang: Lang): string {
  return (cities as Record<string, Localized>)[city]?.[lang] ?? city
}

export function isHighway(city: string): boolean {
  return (cities as Record<string, { kind: string }>)[city]?.kind === 'highway'
}

/** Area in the page language ('الكرادة' -> 'Karrada'); undefined if none. */
export function areaLabel(board: Board, lang: Lang): string | undefined {
  return board.area ? (areas as Record<string, Localized>)[board.area]?.[lang] : undefined
}

/** Short place line: "Karrada · شارع النضال" (descriptions exist in Arabic only). */
export function placeLine(board: Board, lang: Lang): string {
  const area = areaLabel(board, lang)
  return area && area !== board.description ? `${area} · ${board.description}` : board.description
}

/** URL-safe code: 'NHA01(B)-1' -> 'NHA01B-1'. */
export function boardSlug(code: string): string {
  return code.toUpperCase().replace(/[^A-Z0-9-]/g, '')
}

export function boardPath(board: Pick<Board, 'code'>): string {
  return `/boards/${boardSlug(board.code)}/`
}

export function mapUrl(board: Board): string | undefined {
  return board.lat === undefined
    ? undefined
    : `https://www.google.com/maps?q=${board.lat},${board.lng}`
}
