/*
 * Typed access to the network map data (src/data/network-map.json: counts
 * only, no board details). Only the keys the first frame needs are imported
 * here; the lights, density hexes and type names load with the interactive
 * layer (interactive/layersData.ts).
 */
import cities from '@/data/cities.json'
import { highways, outline, provinces, views } from '@/data/network-map.json'
import type { Lang } from '@/features/i18n/lang'
import type { Cam, Point } from './camera'

export type Counts = Record<string, number | undefined>
type Spot = { k: string; ar: string; t: number; bt: Counts }
export type Province = Spot & { x: number; y: number; lx: number; ly: number }
export type Highway = Spot & { pts: string; mx: number; my: number }
export type ViewKey = 'net' | 'iraq' | 'center' | 'south' | 'baghdad'
export type PresetKey = Exclude<ViewKey, 'net'>

export const OUTLINE: string = outline
export const PROVINCES = provinces as Province[]
export const HIGHWAYS = highways as Highway[]
export const VIEW_KEYS: ViewKey[] = ['net', 'iraq', 'center', 'south', 'baghdad']
export const PRESETS: Record<PresetKey, Cam> = {
  iraq: views.iraq,
  center: views.center,
  south: views.south,
  baghdad: views.baghdad,
}

/** Types with a filter chip (2 megapoles and 2 mupis are too few for one). */
export const TYPE_KEYS = ['backlit', 'bridge', 'rooftop', 'wall', 'unipole', 'screen'] as const

/** Dot and bar colour per type: guideline colours and the dark-theme blues. */
export const TYPE_COLORS: Record<string, string> = {
  backlit: '#F7AF1C',
  bridge: '#2AB99D',
  rooftop: '#4DA8E8',
  wall: '#709EB2',
  unipole: '#EAF2F8',
  screen: '#99C0DB',
  megapole: '#FFFFFF',
  mupi: '#C6D8E0',
}

/** Boards of one type (or all of them) in a province or on a highway. */
export function countOf(spot: Spot, type: string): number {
  return type === 'all' ? spot.t : (spot.bt[type] ?? 0)
}

export function isProvince(spot: Province | Highway): spot is Province {
  return 'x' in spot
}

export function findSpot(key: string): Province | Highway | undefined {
  return PROVINCES.find((p) => p.k === key) ?? HIGHWAYS.find((h) => h.k === key)
}

/** Marker point of a province, label point of a highway. */
export function anchorOf(spot: Province | Highway): Point {
  return isProvince(spot) ? { x: spot.x, y: spot.y } : { x: spot.mx, y: spot.my }
}

const NAMES = cities as Record<string, { en: string } | undefined>

export function nameOf(spot: Spot, lang: Lang): string {
  return lang === 'ar' ? spot.ar : (NAMES[spot.k]?.en ?? spot.ar)
}

/** Every province marker and highway label: «شبكتنا» frames them all. */
export const FIT_POINTS: Point[] = [...PROVINCES, ...HIGHWAYS].map(anchorOf)
