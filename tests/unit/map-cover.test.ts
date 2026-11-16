/*
 * Map cover mode (prompt 5, section 2), property-style: for many boxes (phone 420 px,
 * desktop 600-720 px, widths 320-1440 px) x every target, gesture and flight frame the
 * visible rectangle stays inside the 1400 x 1416 photo. Contain (dark) stays as before.
 */
import { describe, expect, it } from 'vitest'
import {
  baseScale,
  clampCam,
  interpolateCam,
  MAP_H,
  MAP_W,
  panCam,
  pinchCam,
  screenToMap,
  zoomAt,
  type Box,
  type Cam,
} from '@/components/map/camera'
import { HIGHWAYS, PRESETS, PROVINCES, VIEW_KEYS } from '@/components/map/data'
import { spotTarget, viewTarget } from '@/components/map/targets'

/** Seeded random numbers (mulberry32): the same cases on every run. */
function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const rnd = random(20261116)
const between = (lo: number, hi: number) => lo + (hi - lo) * rnd()

const WIDTHS = [...Array.from({ length: 29 }, (_, i) => 320 + i * 40), 333, 391, 767, 1023, 1439]
const HEIGHTS = [420, 600, 620, 655, 680, 720]
const SIZES = WIDTHS.flatMap((w) => HEIGHTS.map((h) => ({ w, h })))
const COVER: Box[] = SIZES.map((size) => ({ ...size, cover: true }))
const SPOTS = [...PROVINCES, ...HIGHWAYS]
const EPS = 1e-6

/** Where the visible rectangle leaves the photo (or the zoom leaves 1-7), else null. */
function outside(cam: Cam, box: Box): string | null {
  const a = screenToMap(cam, box, { x: 0, y: 0 })
  const b = screenToMap(cam, box, { x: box.w, y: box.h })
  const inside = a.x >= -EPS && a.y >= -EPS && b.x <= MAP_W + EPS && b.y <= MAP_H + EPS
  if (inside && cam.z >= 1 - EPS && cam.z <= 7 + EPS) return null
  return `${box.w}x${box.h} at ${cam.cx.toFixed(1)},${cam.cy.toFixed(1)} z${cam.z.toFixed(3)}`
}

/** Runs `make` for every cover box and lists the cameras that show past the photo. */
function failures(make: (box: Box) => Cam[]): string[] {
  return COVER.flatMap((box) => make(box).flatMap((cam) => outside(cam, box) ?? []))
}

const wide = () => between(-900, 2300)
const randomCam = (): Cam => ({ cx: wide(), cy: wide(), z: between(0.3, 12) })

describe('map cover mode never shows outside the photo', () => {
  it('fills the box at zoom 1: the larger ratio, one side exactly the photo', () => {
    for (const box of COVER) {
      expect(baseScale(box)).toBe(Math.max(box.w / MAP_W, box.h / MAP_H))
      const cam = clampCam({ cx: 0, cy: 0, z: 1 }, box)
      const a = screenToMap(cam, box, { x: 0, y: 0 })
      const b = screenToMap(cam, box, { x: box.w, y: box.h })
      expect(Math.max(b.x - a.x - MAP_W, b.y - a.y - MAP_H)).toBeCloseTo(0, 6)
    }
  })
  it('starts inside the photo: the static first frame needs no clamp (no jump)', () => {
    for (const box of COVER) {
      const start = clampCam(PRESETS.iraq, box)
      expect(start.cx).toBeCloseTo(PRESETS.iraq.cx, 9)
      expect(start.cy).toBeCloseTo(PRESETS.iraq.cy, 9)
      expect(outside(PRESETS.iraq, box)).toBeNull()
    }
  })
  it('keeps every view, tour stop and click target inside', () => {
    const keys = ['all', ...SPOTS.map((spot) => spot.k)]
    const bad = failures((box) => [
      ...VIEW_KEYS.flatMap((view) => keys.map((k) => clampCam(viewTarget(view, k, box), box))),
      ...SPOTS.flatMap((spot) =>
        [1, 1.15, 2.4, 5, 7].map((z) => clampCam(spotTarget(spot, { ...PRESETS.iraq, z }), box)),
      ),
      ...Object.values(PRESETS).map((preset) => clampCam(preset, box)),
    ])
    expect(bad.slice(0, 5)).toEqual([])
  })
  it('keeps any camera, drag, pinch and wheel zoom inside', () => {
    const bad = failures((box) =>
      Array.from({ length: 40 }, () => {
        const cam = clampCam(randomCam(), box)
        const at = { x: between(0, box.w), y: between(0, box.h) }
        const to = { x: between(-200, box.w + 200), y: between(-200, box.h + 200) }
        const wheel = zoomAt(cam, screenToMap(cam, box, at), Math.exp(between(-3, 3)))
        return [
          cam,
          panCam(cam, box, between(-3000, 3000), between(-3000, 3000)),
          pinchCam(cam, box, at, between(20, 300), to, between(5, 900)),
          clampCam(wheel, box),
        ]
      }).flat(),
    )
    expect(bad.slice(0, 5)).toEqual([])
  })
  it('keeps every frame of a flight between two clamped cameras inside', () => {
    const bad = failures((box) =>
      Array.from({ length: 12 }, () => {
        const [from, to] = [clampCam(randomCam(), box), clampCam(randomCam(), box)]
        return Array.from({ length: 21 }, (_, i) => interpolateCam(from, to, i / 20))
      }).flat(),
    )
    expect(bad.slice(0, 5)).toEqual([])
  })
})

/* The camera maths as they were before cover existed (commit 727785e). */
const legacyBase = (box: Box) => Math.min(box.w / MAP_W, box.h / MAP_H) || 1
function legacyClamp(cam: Cam, box: Box): Cam {
  const z = Math.min(7, Math.max(1, cam.z))
  const s = legacyBase(box) * z
  const fit = (lo: number, hi: number, span: number, v: number) =>
    span >= hi - lo ? (lo + hi) / 2 : Math.min(hi - span / 2, Math.max(lo + span / 2, v))
  const cx = fit(-120, MAP_W + 120, box.w / s, cam.cx)
  return { cx, cy: fit(-60, MAP_H + 60, box.h / s, cam.cy), z }
}

describe('map contain mode (dark theme) is unchanged', () => {
  // fitPoints («شبكتنا»), mapToScreen and the rest only read the box through baseScale.
  it('gives the same zoom base, clamp and drag as before', () => {
    const [now, before]: unknown[][] = [[], []]
    for (const size of SIZES) {
      for (const box of [size, { ...size, cover: false }]) {
        now.push(baseScale(box))
        before.push(legacyBase(box))
        for (let i = 0; i < 20; i++) {
          const cam = randomCam()
          const [dx, dy] = [between(-900, 900), between(-900, 900)]
          const s = legacyBase(box) * cam.z
          const moved = { cx: cam.cx - dx / s, cy: cam.cy - dy / s, z: cam.z }
          now.push(clampCam(cam, box), panCam(cam, box, dx, dy))
          before.push(legacyClamp(cam, box), legacyClamp(moved, box))
        }
      }
    }
    expect(now).toEqual(before)
  })
})
