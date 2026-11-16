import { describe, expect, it } from 'vitest'
import viewfinder from '@/components/experiences/production/viewfinder.content.json'
import {
  FPS,
  formatTimecode,
  framesIn,
  isLastStage,
  nextStage,
  SHOT_MS,
  SHOTS,
  shotAt,
  stageState,
  takeAt,
} from '@/components/experiences/production/viewfinder'
import production from '@/pages/production/production.content.json'

describe('production viewfinder: timecode at 25 fps', () => {
  it('counts frames from milliseconds', () => {
    expect(FPS).toBe(25)
    expect(framesIn(0)).toBe(0)
    expect(framesIn(39)).toBe(0)
    expect(framesIn(40)).toBe(1)
    expect(framesIn(1000)).toBe(25)
    expect(framesIn(-500)).toBe(0)
  })
  it('formats HH:MM:SS:FF', () => {
    expect(formatTimecode(0)).toBe('00:00:00:00')
    expect(formatTimecode(24)).toBe('00:00:00:24')
    expect(formatTimecode(25)).toBe('00:00:01:00')
    expect(formatTimecode(25 * 60)).toBe('00:01:00:00')
    expect(formatTimecode(25 * 3600 + 25 * 61 + 7)).toBe('01:01:01:07')
  })
  it('never shows frame 25 and wraps after 24 hours', () => {
    expect(formatTimecode(49)).toBe('00:00:01:24')
    expect(formatTimecode(25 * 86400)).toBe('00:00:00:00')
    expect(formatTimecode(-3)).toBe('00:00:00:00')
  })
})

describe('production viewfinder: shots and stages', () => {
  it('cuts every 2.6 s through wide, lens and rig, then round again', () => {
    expect(SHOT_MS).toBe(2600)
    expect(SHOTS).toHaveLength(3)
    expect([0, 1, 2, 3, 4, 5, 6].map(shotAt)).toEqual([0, 1, 2, 0, 1, 2, 0])
    expect(viewfinder.osd.shots).toHaveLength(SHOTS.length)
  })
  it('takes run 3 to 9', () => {
    expect([0, 1, 6, 7].map(takeAt)).toEqual([3, 4, 9, 3])
  })
  it('steps through the five stages and starts again after delivery', () => {
    const count = viewfinder.stages.length
    expect(count).toBe(5)
    expect(nextStage(0, count)).toBe(1)
    expect(nextStage(3, count)).toBe(4)
    expect(nextStage(4, count)).toBe(0)
    expect(isLastStage(4, count)).toBe(true)
    expect(isLastStage(2, count)).toBe(false)
  })
  it('marks stages as done, current or next', () => {
    expect([0, 1, 2, 3, 4].map((i) => stageState(i, 2))).toEqual([
      'done',
      'done',
      'current',
      'next',
      'next',
    ])
  })
  it('ships with the stills until the video arrives', () => {
    expect(viewfinder.video).toBeNull()
  })
})

describe('production page content', () => {
  it('keeps the catalog facts exactly and the +35 claim', () => {
    expect(production.make.facts.map((fact) => fact.value.en)).toEqual([
      'ALEXA 35',
      '18 / 3',
      '50',
      '1 → many',
    ])
    expect(production.howWeWork.stat.value).toEqual({ ar: '+35', en: '35+' })
    expect(production.make.services).toHaveLength(6)
  })
  it('shows no prices or availability', () => {
    const text = JSON.stringify([production, viewfinder])
    expect(text).not.toMatch(/price|سعر|USD|\$|availab|booked|متاح/i)
  })
})
