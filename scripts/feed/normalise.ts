/*
 * Pure helpers for the board feed (BUILD-BRIEF 4.2). Unit-tested in
 * tests/unit/feed.test.ts. Nothing here ever reads a price field.
 */
import cities from '../../src/data/cities.json'

export const WHITELIST = [
  'code',
  'type',
  'city',
  'area',
  'description',
  'height',
  'width',
  'faces',
  'sqm',
  'lat',
  'lng',
  'photo',
] as const

export type FeedBoard = {
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

/** Coordinates known to be wrong (BUILD-BRIEF 4.2): never shown. */
export const FLAGGED_COORDS = new Set(['ZH01B-1', 'NB23A', 'NB27B', 'BGW45A', 'A29'])

const TYPES: Record<string, string> = {
  backlit: 'backlit',
  bridge: 'bridge',
  rooftop: 'rooftop',
  wall: 'wall',
  unipole: 'unipole',
  screen: 'screen',
  megapole: 'megapole',
  wallsign: 'wallsign',
  mupie: 'mupi',
  'mupi / backlit': 'mupi',
  mupi: 'mupi',
}

/** 'BGW03A' / 'bbh20a' / 'NHA01(B)-1' -> 'BGW03A' / 'BBH20A' / 'NHA01(B)-1' (spaces removed, upper case). */
export function normaliseCode(code: string): string {
  return code.replace(/\s+/g, '').toUpperCase()
}

/** URL-safe board slug: 'NHA01(B)-1' -> 'NHA01B-1'. */
export function boardSlug(code: string): string {
  return normaliseCode(code).replace(/[^A-Z0-9-]/g, '')
}

/** Raw city from the inventory -> key in cities.json ('Kout' -> 'kut'), or null. */
export function normaliseCity(raw: string): string | null {
  const clean = raw.trim().toLowerCase().replace(/\s+/g, ' ')
  if (!clean) return null
  for (const [key, city] of Object.entries(cities)) {
    if (city.aliases.some((alias) => alias.toLowerCase() === clean)) return key
  }
  return null
}

export function normaliseType(raw: string): string | null {
  return TYPES[raw.trim().toLowerCase()] ?? null
}

/** Valid Iraq coordinates only; flagged boards and lat == lng are dropped. */
export function cleanCoords(
  code: string,
  lat: unknown,
  lng: unknown,
): { lat: number; lng: number } | null {
  if (typeof lat !== 'number' || typeof lng !== 'number' || FLAGGED_COORDS.has(code)) return null
  if (lat === lng || lat < 29 || lat > 38 || lng < 38 || lng > 49) return null
  return { lat, lng }
}

/** Fails if anything outside the whitelist (prices, suppliers ...) is in the output. */
export function assertWhitelisted(boards: object[]): void {
  for (const board of boards) {
    const extra = Object.keys(board).filter(
      (key) => !(WHITELIST as readonly string[]).includes(key),
    )
    if (extra.length) throw new Error(`Feed blocked: non-whitelisted field(s) ${extra.join(', ')}`)
  }
  const text = JSON.stringify(boards)
  if (
    /"(price\w*|monthlyPrice|pricePerMeter|ppm|mp|sp|supplier\w*|campaign\w*|company\w*)"\s*:/i.test(
      text,
    )
  ) {
    throw new Error('Feed blocked: a forbidden key reached the output')
  }
}
