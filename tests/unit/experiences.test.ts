import { describe, expect, it } from 'vitest'
import {
  campaignStage,
  FINAL_STEP,
  nextStep,
  platformState,
  STEPS,
} from '@/components/experiences/campaign/stage'
import {
  autoDelay,
  isNear,
  isTap,
  keyStep,
  splitLtr,
  swipeStep,
  wheelStep,
  wrapIndex,
} from '@/components/experiences/deck/logic'
import experiences from '@/content/experiences.json'
import reels from '@/content/reels.json'
import { findForbidden } from '../../scripts/forbidden-rules'

describe('phone decks (BoardSwipe, TargetReels)', () => {
  it('wraps around both ways', () => {
    expect(wrapIndex(8, 1, 9)).toBe(0)
    expect(wrapIndex(0, -1, 9)).toBe(8)
    expect(wrapIndex(3, 1, 9)).toBe(4)
    expect(wrapIndex(0, 1, 0)).toBe(0)
  })
  it('loads photos for the card on screen and its neighbours, around the loop', () => {
    expect([0, 1, 8].every((j) => isNear(j, 0, 9))).toBe(true)
    expect(isNear(2, 0, 9)).toBe(false)
    expect(isNear(7, 0, 9)).toBe(false)
  })
  it('turns drags, taps, wheel and keys into one step', () => {
    expect(swipeStep(-80)).toBe(1)
    expect(swipeStep(80)).toBe(-1)
    expect(swipeStep(20)).toBe(0)
    expect(isTap(4)).toBe(true)
    expect(isTap(20)).toBe(false)
    expect(wheelStep(40, 1000)).toBe(1)
    expect(wheelStep(-40, 1000)).toBe(-1)
    expect(wheelStep(40, 300)).toBe(0) // trackpad momentum
    expect(wheelStep(5, 1000)).toBe(0)
    expect(keyStep('ArrowDown')).toBe(1)
    expect(keyStep('PageUp')).toBe(-1)
    expect(keyStep('Enter')).toBe(0)
  })
  it('autoplay waits 6 s after an interaction, then keeps its 3.6 s pace', () => {
    expect(autoDelay(Infinity, 3600, 6000)).toBe(3600)
    expect(autoDelay(0, 3600, 6000)).toBe(6000)
    expect(autoDelay(4000, 3600, 6000)).toBe(3600)
    expect(autoDelay(1000, 3600, 6000)).toBe(5000)
  })
  it('keeps sizes and codes left-to-right inside Arabic', () => {
    expect(splitLtr('اللقاء، أبو غريب · 2 × 50 م · BBL-01A')).toEqual([
      { text: 'اللقاء، أبو غريب · ', ltr: false },
      { text: '2 × 50', ltr: true },
      { text: ' م · ', ltr: false },
      { text: 'BBL-01A', ltr: true },
    ])
    expect(splitLtr('شبكة تارگت')).toEqual([{ text: 'شبكة تارگت', ltr: false }])
  })
})

describe('demo campaign timeline (SocialCampaign)', () => {
  const stages = Array.from({ length: STEPS }, (_, step) => campaignStage(step, 6))
  it('goes draft -> scheduled -> live now, then starts again', () => {
    expect(stages.map((s) => s.status).slice(0, 4)).toEqual(['draft', 'draft', 'scheduled', 'live'])
    expect(nextStep(STEPS - 1)).toBe(0)
  })
  it('publishes one platform per step, in order', () => {
    expect(stages.map((s) => s.published)).toEqual([0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 6, 6])
    expect(platformState(0, 1, 0)).toBe('queued')
    expect(platformState(0, 2, 0)).toBe('publishing')
    expect(platformState(0, 3, 1)).toBe('published')
    expect(platformState(2, 3, 1)).toBe('queued')
  })
  it('reach only grows, and the still frame is the finished campaign', () => {
    const growth = stages.map((s) => s.growth)
    expect(growth.every((g, i) => i === 0 || g >= growth[i - 1])).toBe(true)
    expect(campaignStage(FINAL_STEP, 6)).toMatchObject({ status: 'live', published: 6, growth: 1 })
  })
})

/** Every { ar, en } pair in a content file. */
function pairs(value: unknown): { ar: string; en: string }[] {
  if (!value || typeof value !== 'object') return []
  const record = value as Record<string, unknown>
  if ('ar' in record && 'en' in record) return [record as { ar: string; en: string }]
  return Object.values(record).flatMap(pairs)
}

describe('experience texts', () => {
  it('exist in Arabic and English, with no price words', () => {
    for (const file of [experiences, reels]) {
      const all = pairs(file)
      expect(all.length).toBeGreaterThan(10)
      for (const pair of all) {
        expect(pair.ar.trim()).not.toBe('')
        expect(pair.en.trim()).not.toBe('')
      }
      expect(findForbidden(JSON.stringify(file), { words: true })).toEqual([])
    }
  })
  it('the demo campaign shows no numbers and says it is demo data', () => {
    expect(JSON.stringify(experiences.social)).not.toMatch(/[0-9٠-٩]/)
    expect(experiences.social.demo).toEqual({ ar: 'بيانات تجريبية', en: 'Demo data' })
  })
  it('reels: known designs, no follower, like or view counts', () => {
    const designs = ['board', 'rec', 'art', 'tv', 'map']
    for (const post of reels.posts) {
      expect(designs).toContain(post.design)
      if (post.design === 'board') expect(post.image).toMatch(/^[A-Z]+[A-Z0-9-]*$/)
    }
    expect(JSON.stringify(reels)).not.toMatch(/\d+\s*(followers|likes|views|متابع|إعجاب|مشاهدة)/i)
  })
})
