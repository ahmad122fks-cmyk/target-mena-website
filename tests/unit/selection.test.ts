import { beforeEach, describe, expect, it, vi } from 'vitest'
import raw from '@/data/boards.json'
import {
  addItems,
  codesFromParam,
  MAX_SELECTED,
  parseStored,
  toggleItem,
  toSelected,
} from '@/features/selection/items'
import { selectionLink } from '@/features/selection/share'
import type { Board } from '@/lib/boards'

const boards = raw as Board[]
const [a, b, c] = boards

describe('selection list', () => {
  it('toggles boards in and out, keeping only whitelisted fields', () => {
    const one = toggleItem([], a)
    expect(one.map((item) => item.code)).toEqual([a.code])
    expect(Object.keys(one[0]).sort()).toEqual(Object.keys(toSelected(a)).sort())
    expect(one[0]).not.toHaveProperty('lat')
    expect(toggleItem(one, a)).toEqual([])
  })
  it('adds many without duplicates and caps the size', () => {
    expect(addItems(toggleItem([], a), [a, b, c]).map((item) => item.code)).toEqual([
      a.code,
      b.code,
      c.code,
    ])
    expect(addItems([], boards).length).toBe(Math.min(boards.length, MAX_SELECTED))
  })
  it('reads saved data safely (broken or foreign data is dropped)', () => {
    expect(parseStored(null)).toEqual([])
    expect(parseStored('not json')).toEqual([])
    expect(parseStored('{"a":1}')).toEqual([])
    expect(parseStored(JSON.stringify([toSelected(a), { code: 1 }, toSelected(a)]))).toEqual([
      toSelected(a),
    ])
  })
  it('builds and reads shareable links', () => {
    expect(selectionLink(['BGW03A', 'BBH20A'], 'en', 'https://x.test')).toBe(
      'https://x.test/en/boards/?codes=BGW03A,BBH20A',
    )
    expect(selectionLink(['BGW03A'], 'ar', 'https://x.test')).toBe(
      'https://x.test/boards/?codes=BGW03A',
    )
    expect(codesFromParam('bgw03a, BBH20A,BGW03A,<bad>')).toEqual(['BGW03A', 'BBH20A'])
  })
})

describe('selection store in the browser', () => {
  beforeEach(() => {
    vi.resetModules()
    const data = new Map<string, string>()
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (k: string) => data.get(k) ?? null,
        setItem: (k: string, v: string) => data.set(k, v),
      },
      addEventListener: () => {},
      removeEventListener: () => {},
    })
  })
  it('saves to localStorage and survives a reload', async () => {
    const first = await import('@/features/selection/store')
    first.selection.add([a, b])
    vi.resetModules()
    const again = await import('@/features/selection/store')
    again.selection.toggle(c)
    const saved = JSON.parse(window.localStorage.getItem('target-selection-v1') as string)
    expect(saved.map((item: { code: string }) => item.code)).toEqual([a.code, b.code, c.code])
  })
  it('keeps working when storage is blocked', async () => {
    vi.stubGlobal('window', {
      localStorage: {
        getItem: () => {
          throw new Error('blocked')
        },
        setItem: () => {
          throw new Error('blocked')
        },
      },
      addEventListener: () => {},
      removeEventListener: () => {},
    })
    const { selection } = await import('@/features/selection/store')
    expect(() => selection.add([a])).not.toThrow()
  })
})
