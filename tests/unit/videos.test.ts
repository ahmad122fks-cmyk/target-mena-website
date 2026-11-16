import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import videos from '@/content/videos.json'

/* Prompt 4b: a video is "ready" only when its web files and poster are in public/video/. */
const KEYS = ['driveToHq', 'unipoleStreet'] as const
const MAX_BYTES = 3.5 * 1024 * 1024

describe('videos', () => {
  it.each(KEYS)('%s: ready only with WebM, MP4 and posters in place', (key) => {
    const v = videos[key]
    const files = ['.webm', '.mp4', '-poster.webp', '-poster.avif'].map(
      (ext) => `public/video/${v.file}${ext}`,
    )
    if (!v.ready) return
    for (const file of files) expect(fs.existsSync(file), file).toBe(true)
    for (const file of files.slice(0, 2))
      expect(fs.statSync(file).size, file).toBeLessThanOrEqual(MAX_BYTES)
  })

  it('keeps the true ratio as a CSS aspect ratio', () => {
    for (const key of KEYS) expect(videos[key].ratio).toMatch(/^\d+ \/ \d+$/)
  })
})
