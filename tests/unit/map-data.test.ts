import { describe, expect, it } from 'vitest'
import { HIGHWAYS, PROVINCES } from '@/components/map/data'
import { densityHexes, lights, totals as lazyTotals } from '@/components/map/interactive/layersData'
import { highways, provinces, totals, unassigned } from '@/data/network-map.json'

const sum = (values: (number | undefined)[]) => values.reduce<number>((a, n) => a + (n ?? 0), 0)

describe('network map data (Ahmad, 16 Nov 2026: 674 boards)', () => {
  it('has 12 provinces and 2 highways', () => {
    expect(provinces).toHaveLength(12)
    expect(highways).toHaveLength(2)
    expect(totals.provinces).toBe(12)
    expect(totals.highways).toBe(2)
  })
  it('provinces + highways + the unassigned mupis = 674 boards', () => {
    const spots = [...PROVINCES, ...HIGHWAYS]
    expect(sum(spots.map((s) => s.t)) + unassigned.t).toBe(674)
    expect(totals.boards).toBe(674)
  })
  it('every province and highway total equals the sum of its types', () => {
    for (const spot of [...PROVINCES, ...HIGHWAYS]) {
      expect(sum(Object.values(spot.bt)), spot.k).toBe(spot.t)
    }
  })
  it('per-type sums equal totals.byType', () => {
    const spots = [...PROVINCES, ...HIGHWAYS, unassigned]
    for (const [type, n] of Object.entries(totals.byType)) {
      const bt = spots.map((s) => (s.bt as Record<string, number | undefined>)[type])
      expect(sum(bt), type).toBe(n)
    }
    expect(sum(Object.values(totals.byType))).toBe(674)
  })
  it('loads the lazy layers through their own module id', () => {
    expect(lights).toHaveLength(353)
    expect(densityHexes).toHaveLength(40)
    expect(lazyTotals.boards).toBe(674)
  })
  it('carries counts only (no board details, prices or availability)', () => {
    const keys = new Set([...PROVINCES, ...HIGHWAYS].flatMap((s) => Object.keys(s)))
    expect([...keys].sort()).toEqual([
      'ar',
      'bt',
      'k',
      'lx',
      'ly',
      'mx',
      'my',
      'pts',
      't',
      'x',
      'y',
    ])
  })
})
