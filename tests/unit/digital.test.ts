import { describe, expect, it } from 'vitest'
import screens from '@/components/experiences/digital/digital-screens.content.json'
import {
  AI_TILES,
  aiCycle,
  aiFrame,
  nextStep,
  typedText,
} from '@/components/experiences/digital/sequence'
import digital from '@/pages/digital/digital.content.json'
import hero from '@/pages/digital/digital.hero.content.json'
import process from '@/pages/digital/digital.process.content.json'
import { DEFAULT_TAB, isTabId, TAB_IDS, tabFromKey } from '@/pages/digital/tabs'
import { findForbidden } from '../../scripts/forbidden-rules'

/** Every { ar, en } pair in a content file. */
function pairs(value: unknown, path = ''): { path: string; ar: unknown; en: unknown }[] {
  if (!value || typeof value !== 'object') return []
  const record = value as Record<string, unknown>
  if ('ar' in record && 'en' in record) return [{ path, ar: record.ar, en: record.en }]
  return Object.entries(record).flatMap(([key, child]) => pairs(child, `${path}.${key}`))
}

describe('digital page: service tabs', () => {
  it('six tabs in the content, same ids and order as TAB_IDS', () => {
    expect(hero.tabs.map((tab) => tab.id)).toEqual([...TAB_IDS])
    expect(isTabId(DEFAULT_TAB)).toBe(true)
    expect(isTabId('nope')).toBe(false)
  })
  it('arrows follow the screen: ArrowLeft is next in Arabic, ArrowRight in English', () => {
    expect(tabFromKey('ArrowLeft', 0, 6, 'rtl')).toBe(1)
    expect(tabFromKey('ArrowRight', 0, 6, 'ltr')).toBe(1)
    expect(tabFromKey('ArrowRight', 0, 6, 'rtl')).toBe(5)
    expect(tabFromKey('ArrowLeft', 0, 6, 'ltr')).toBe(5)
  })
  it('wraps around, Home/End jump, other keys do nothing', () => {
    expect(tabFromKey('ArrowDown', 5, 6, 'ltr')).toBe(0)
    expect(tabFromKey('ArrowUp', 0, 6, 'rtl')).toBe(5)
    expect(tabFromKey('Home', 3, 6, 'rtl')).toBe(0)
    expect(tabFromKey('End', 1, 6, 'ltr')).toBe(5)
    expect(tabFromKey('Enter', 2, 6, 'ltr')).toBeNull()
  })
})

describe('digital phone screens: timing', () => {
  it('loops step by step back to 0', () => {
    expect(nextStep(0, 12)).toBe(1)
    expect(nextStep(11, 12)).toBe(0)
    expect(nextStep(3, 0)).toBe(0)
  })
  it('types by whole characters, Arabic marks included', () => {
    const prompt = screens.ai.prompt.ar
    expect(typedText(prompt, 0)).toBe('')
    expect(typedText(prompt, 3)).toBe('صمّ')
    expect(typedText(prompt, 999)).toBe(prompt)
    expect(typedText('abc', -2)).toBe('')
  })
  it('AI loop: type, then generate, then tiles one by one, then pick', () => {
    const length = 10
    expect(aiFrame(0, length)).toMatchObject({ typed: 0, generating: false, tiles: 0 })
    expect(aiFrame(length, length)).toMatchObject({ typed: length, generating: false, tiles: 0 })
    const start = length + 8
    expect(aiFrame(start, length)).toMatchObject({ generating: true, progress: 0, tiles: 0 })
    expect(aiFrame(start + 8, length).progress).toBeCloseTo(0.5)
    const end = start + 16
    expect(aiFrame(end, length)).toMatchObject({ generating: false, progress: 1, tiles: 1 })
    expect(aiFrame(end + 4, length).tiles).toBe(2)
    expect(aiFrame(end + 100, length).tiles).toBeLessThanOrEqual(AI_TILES)
    expect(aiFrame(aiCycle(length) - 1, length)).toEqual({
      typed: length,
      generating: false,
      progress: 1,
      tiles: AI_TILES,
      picked: true,
    })
    expect(aiFrame(aiCycle(length), length)).toEqual(aiFrame(0, length))
  })
})

describe('digital page: content', () => {
  const files = { digital, hero, process, screens }
  it('every text exists in Arabic and English', () => {
    for (const [name, file] of Object.entries(files))
      for (const pair of pairs(file)) {
        expect(String(pair.ar).trim(), `${name}${pair.path}.ar`).not.toBe('')
        expect(String(pair.en).trim(), `${name}${pair.path}.en`).not.toBe('')
      }
  })
  it('no prices, currency or availability words', () => {
    const text = JSON.stringify(files)
    expect(findForbidden(text, { words: true })).toEqual([])
    expect(text).not.toMatch(/available|availability|booked|متاح|محجوز/i)
  })
})
