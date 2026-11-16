import { describe, expect, it } from 'vitest'
import {
  clampCam,
  easeInOutCubic,
  fitPoints,
  interpolateCam,
  mapToScreen,
  panCam,
  pinchCam,
  screenToMap,
  stageAt,
  viewBoxOf,
  zoomAt,
} from '@/components/map/camera'
import { FIT_POINTS, PRESETS } from '@/components/map/data'
import { mapLabels } from '@/components/map/labels'
import { initialState } from '@/components/map/state'
import { spotTarget, viewTarget } from '@/components/map/targets'

const DESKTOP = { w: 1240, h: 620 }
const PHONE = { w: 390, h: 420 }
const near = (a: number, b: number, digits = 6) => expect(a).toBeCloseTo(b, digits)

describe('map camera', () => {
  it('eases in and out', () => {
    expect(easeInOutCubic(0)).toBe(0)
    expect(easeInOutCubic(0.5)).toBe(0.5)
    expect(easeInOutCubic(1)).toBe(1)
    expect(easeInOutCubic(0.25)).toBeLessThan(0.25)
  })
  it('flies with the zoom interpolated in log space', () => {
    const from = { cx: 0, cy: 0, z: 1 }
    const to = { cx: 100, cy: 200, z: 4 }
    expect(interpolateCam(from, to, 0)).toEqual(from)
    near(interpolateCam(from, to, 1).z, 4)
    const mid = interpolateCam(from, to, 0.5)
    near(mid.z, 2)
    near(mid.cx, 50)
  })
  it('zooms at a point without moving it on screen', () => {
    const cam = PRESETS.iraq
    const at = { x: 300, y: 200 }
    const map = screenToMap(cam, DESKTOP, at)
    const after = mapToScreen(zoomAt(cam, map, 2), DESKTOP, map)
    near(after.x, at.x)
    near(after.y, at.y)
  })
  it('keeps the zoom in 1-7 and the view over the map', () => {
    expect(clampCam({ cx: 700, cy: 700, z: 20 }, DESKTOP).z).toBe(7)
    expect(clampCam({ cx: 700, cy: 700, z: 0.2 }, DESKTOP).z).toBe(1)
    const far = clampCam({ cx: -5000, cy: 5000, z: 3 }, DESKTOP)
    expect(far.cx).toBeGreaterThan(0)
    expect(far.cy).toBeLessThan(1416)
  })
  it('converts screen and map points both ways', () => {
    const cam = { cx: 800, cy: 900, z: 2.5 }
    const p = { x: 123, y: 456 }
    const back = mapToScreen(cam, PHONE, screenToMap(cam, PHONE, p))
    near(back.x, p.x)
    near(back.y, p.y)
  })
  it('fits every province and highway («شبكتنا») on desktop and phone', () => {
    for (const box of [DESKTOP, PHONE]) {
      const cam = clampCam(fitPoints(FIT_POINTS, box), box)
      for (const p of FIT_POINTS) {
        const s = mapToScreen(cam, box, p)
        expect(s.x).toBeGreaterThan(0)
        expect(s.x).toBeLessThan(box.w)
        expect(s.y).toBeGreaterThan(0)
        expect(s.y).toBeLessThan(box.h)
      }
    }
  })
  it('pans by the drag and pinches around the fingers', () => {
    const cam = { cx: 800, cy: 900, z: 3 }
    const panned = panCam(cam, DESKTOP, 100, 0)
    near(mapToScreen(panned, DESKTOP, { x: 800, y: 900 }).x, DESKTOP.w / 2 + 100)
    const mid = { x: 400, y: 300 }
    const anchor = screenToMap(cam, DESKTOP, mid)
    const pinched = pinchCam(cam, DESKTOP, mid, 100, mid, 200)
    near(pinched.z, 6)
    near(mapToScreen(pinched, DESKTOP, anchor).x, mid.x)
  })
  it('places SVG and HTML layers the same way at any width', () => {
    const cam = { cx: 791.5, cy: 711.2, z: 5 }
    expect(viewBoxOf(cam)).toBe('651.50 569.60 280.00 283.20')
    expect(stageAt(cam, { x: 791.5, y: 711.2 })).toEqual({ x: 0.5, y: 0.5 })
    const left = stageAt(cam, { x: 651.5, y: 711.2 })
    near(left.x, 0)
  })
})

describe('map targets', () => {
  it('flies the Network tour to the selected province at the view zoom', () => {
    expect(viewTarget('center', 'najaf')).toEqual({ cx: 785.9, cy: 926.2, z: 2.6 })
    expect(viewTarget('center', 'highway-south')).toEqual({ cx: 839.2, cy: 857.7, z: 2.6 })
    expect(viewTarget('iraq', 'najaf')).toEqual(PRESETS.iraq)
    expect(viewTarget('south')).toEqual(PRESETS.south)
  })
  it('zooms in on a clicked province, never out', () => {
    const najaf = { k: 'najaf', ar: 'النجف', t: 217, bt: {}, x: 785.9, y: 926.2, lx: 0, ly: 0 }
    expect(spotTarget(najaf, { cx: 0, cy: 0, z: 1.2 }).z).toBe(3.2)
    expect(spotTarget(najaf, { cx: 0, cy: 0, z: 6 }).z).toBe(6)
  })
  it('starts uncontrolled maps on all Iraq', () => {
    expect(initialState().cam).toEqual(PRESETS.iraq)
    expect(initialState().view).toBe('iraq')
  })
})

describe('map labels', () => {
  const base = initialState()
  const keys = (state: Parameters<typeof mapLabels>[0]) => mapLabels(state).map((l) => l.k)
  it('shows provinces with 30+ boards and both highways at the start', () => {
    expect(keys(base)).toEqual([
      'najaf',
      'baghdad',
      'diwaniyah',
      'babel',
      'highway-south',
      'highway-west',
    ])
  })
  it('keeps only the 100+ places on a phone-width map until zoom 2.2', () => {
    const phone = { ...base, box: { w: 358, h: 420 } }
    expect(keys(phone)).toEqual(['najaf', 'baghdad', 'highway-south'])
    expect(keys({ ...phone, sel: 'babel' })).toContain('babel')
    expect(keys({ ...phone, cam: { ...phone.cam, z: 2.2 } }).length).toBeGreaterThan(3)
  })
  it('shows every province from zoom 2.2', () => {
    expect(mapLabels({ ...base, cam: { ...base.cam, z: 2.2 } })).toHaveLength(14)
  })
  it('always shows the selected or hovered province', () => {
    expect(keys({ ...base, sel: 'kut' })).toContain('kut')
    expect(keys({ ...base, hover: 'anbar' })).toContain('anbar')
  })
  it('recounts by type and drops what has none', () => {
    const backlit = mapLabels({ ...base, type: 'backlit' })
    expect(backlit.map((l) => [l.k, l.n])).toEqual([['najaf', 195]])
  })
  it('hides provinces in the density layer, keeps highways', () => {
    expect(keys({ ...base, layer: 'density' })).toEqual(['highway-south', 'highway-west'])
  })
  it('hides labels that are off screen', () => {
    const baghdad = { ...base, cam: PRESETS.baghdad, box: DESKTOP }
    expect(keys(baghdad)).toContain('baghdad')
    expect(keys(baghdad)).not.toContain('najaf')
    expect(keys(baghdad)).not.toContain('basra')
  })
})
