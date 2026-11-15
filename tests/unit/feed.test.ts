import { describe, expect, it } from 'vitest'
import boards from '@/data/boards.json'
import {
  assertWhitelisted,
  boardSlug,
  cleanCoords,
  normaliseCity,
  normaliseCode,
  normaliseType,
  WHITELIST,
} from '../../scripts/feed/normalise'

describe('feed whitelist (BUILD-BRIEF 4.2)', () => {
  it('no forbidden key can pass', () => {
    for (const key of [
      'ppm',
      'mp',
      'sp',
      'price',
      'monthlyPrice',
      'pricePerMeter',
      'supplier',
      'campaignName',
      'company',
      'tr',
      'i',
    ]) {
      expect(() => assertWhitelisted([{ code: 'BG01A', [key]: 1 }]), key).toThrow(/Feed blocked/)
    }
  })
  it('whitelisted fields pass', () => {
    expect(() =>
      assertWhitelisted([
        {
          code: 'BG01A',
          type: 'wall',
          city: 'baghdad',
          description: 'x',
          height: 1,
          width: 2,
          faces: 1,
          sqm: 2,
        },
      ]),
    ).not.toThrow()
  })
  it('the committed boards.json holds only whitelisted fields', () => {
    for (const board of boards) {
      for (const key of Object.keys(board)) expect(WHITELIST as readonly string[]).toContain(key)
    }
    expect(() => assertWhitelisted(boards)).not.toThrow()
  })
})

describe('city normalisation', () => {
  it('maps every spelling in the inventory', () => {
    expect(normaliseCity('Diwanieh')).toBe('diwaniyah')
    expect(normaliseCity('Diwaniyah')).toBe('diwaniyah')
    expect(normaliseCity('Nasrieh')).toBe('nasiriyah')
    expect(normaliseCity('Highwagh West')).toBe('highway-west')
    expect(normaliseCity('Karbalaa')).toBe('karbala')
    expect(normaliseCity('Kout')).toBe('kut')
    expect(normaliseCity('musel')).toBe('mosul')
    expect(normaliseCity('  baghdad ')).toBe('baghdad')
    expect(normaliseCity('')).toBeNull()
    expect(normaliseCity('Lebanon')).toBeNull()
  })
})

describe('codes, types, coordinates', () => {
  it('normalises codes and slugs', () => {
    expect(normaliseCode('bbh20a')).toBe('BBH20A')
    expect(normaliseCode('BGK 22B')).toBe('BGK22B')
    expect(boardSlug('NHA01(B)-1')).toBe('NHA01B-1')
  })
  it('maps types', () => {
    expect(normaliseType('MEGAPOLE')).toBe('megapole')
    expect(normaliseType('Mupi / Backlit')).toBe('mupi')
    expect(normaliseType('Spaceship')).toBeNull()
  })
  it('hides wrong coordinates', () => {
    expect(cleanCoords('BGW03A', 33.31, 44.29)).toEqual({ lat: 33.31, lng: 44.29 })
    expect(cleanCoords('NB23A', 32.0, 44.3)).toBeNull()
    expect(cleanCoords('X1', 33.1, 33.1)).toBeNull()
    expect(cleanCoords('X1', 0, 0)).toBeNull()
    expect(cleanCoords('X1', null, 44)).toBeNull()
  })
  it('every board has a known city, type and size', () => {
    for (const board of boards) {
      expect(board.height).toBeGreaterThan(0)
      expect(board.width).toBeGreaterThan(0)
      expect(boardSlug(board.code)).toMatch(/^[A-Z0-9-]+$/)
    }
  })
})
