/*
 * Which name + count pills the map shows (pure, unit-tested):
 * provinces with 30+ boards always, all of them from zoom 2.2, the selected
 * or hovered one always, highways always; anything off screen is hidden.
 * On a phone-width map (< 640 px) below zoom 2.2 only places with 100+
 * boards keep their pill, so the Babel / Najaf / highway cluster stays readable.
 */
import { mapToScreen, type Box, type Cam, type Point } from './camera'
import { countOf, HIGHWAYS, PROVINCES } from './data'
import type { MapState } from './state'

export const ALWAYS_FROM = 30
export const ALL_FROM_ZOOM = 2.2
export const COMPACT_WIDTH = 640
export const COMPACT_FROM = 100

export type MapLabel = {
  k: string
  kind: 'province' | 'highway'
  n: number
  at: Point
  /** Side of the point the pill sits on (screen side: the map never mirrors). */
  side: 'left' | 'right'
  on: boolean
}

type Input = Pick<MapState, 'cam' | 'box' | 'type' | 'sel' | 'hover' | 'layer'>

/** Point within the box, with a margin so a pill does not vanish while still partly visible. */
export function onScreen(cam: Cam, box: Box, p: Point): boolean {
  const s = mapToScreen(cam, box, p)
  return s.x > -40 && s.x < box.w + 40 && s.y > -20 && s.y < box.h + 20
}

export function mapLabels({ cam, box, type, sel, hover, layer }: Input): MapLabel[] {
  const on = (k: string) => k === sel || k === hover
  const compact = !!box && box.w < COMPACT_WIDTH && cam.z < ALL_FROM_ZOOM
  const least = compact ? COMPACT_FROM : ALWAYS_FROM
  const provinces: MapLabel[] =
    layer === 'density'
      ? []
      : PROVINCES.flatMap((p) => {
          const n = countOf(p, type)
          if (!n || !(on(p.k) || n >= least || cam.z >= ALL_FROM_ZOOM)) return []
          const side = p.lx < p.x ? 'left' : 'right'
          return [{ k: p.k, kind: 'province', n, at: { x: p.x, y: p.y }, side, on: on(p.k) }]
        })
  const highways: MapLabel[] = HIGHWAYS.flatMap((h, j) => {
    const n = countOf(h, type)
    if (!n || (compact && n < COMPACT_FROM && !on(h.k))) return []
    const side = j === 0 ? 'right' : 'left'
    return [{ k: h.k, kind: 'highway', n, at: { x: h.mx, y: h.my }, side, on: on(h.k) }]
  })
  const all = [...provinces, ...highways]
  return box ? all.filter((label) => onScreen(cam, box, label.at)) : all
}
