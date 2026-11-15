import { describe, expect, it } from 'vitest'
import { formatFaces, formatSize, formatSqm } from '@/lib/format'

describe('board size formatting (BUILD-BRIEF 4.2)', () => {
  it('writes height × width, numbers exactly as in the source', () => {
    expect(formatSize(9.8, 20, 'en')).toBe('9.8 × 20 m')
    expect(formatSize(1.8, 40, 'ar')).toBe('1.8 × 40 م')
  })
  it('never rounds the area', () => {
    expect(formatSqm(196, 'en')).toBe('196 m²')
    expect(formatSqm(21.56, 'en')).toBe('21.56 m²')
    expect(formatSqm(72, 'ar')).toBe('72 م²')
  })
  it('names the faces in both languages', () => {
    expect(formatFaces(1, 'en')).toBe('1 face')
    expect(formatFaces(2, 'en')).toBe('2 faces')
    expect(formatFaces(1, 'ar')).toBe('وجه واحد')
    expect(formatFaces(2, 'ar')).toBe('وجهان')
    expect(formatFaces(4, 'ar')).toBe('4 أوجه')
  })
})
