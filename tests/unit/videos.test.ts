import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import videos from '@/content/videos.json'

/*
 * Prompt 4b: a video is "ready" only when its web files and posters are in
 * public/video/: the 1280 px MP4, the 640 px phone MP4 (phone), the WebM
 * (webm), and the AVIF + WebP posters. Each video file stays near 3 MB.
 */
const KEYS = ['driveToHq', 'unipoleStreet'] as const
const MAX_BYTES = 3.5 * 1024 * 1024

describe('videos', () => {
  it.each(KEYS)('%s: ready only with its video files and posters in place', (key) => {
    const v = videos[key]
    if (!v.ready) return
    const media = ['.mp4', v.phone && '-640.mp4', v.webm && '.webm'].filter(Boolean)
    const files = [...media, '-poster.webp', '-poster.avif'].map(
      (ext) => `public/video/${v.file}${ext}`,
    )
    for (const file of files) expect(fs.existsSync(file), file).toBe(true)
    for (const file of files.slice(0, media.length))
      expect(fs.statSync(file).size, file).toBeLessThanOrEqual(MAX_BYTES)
  })

  it('keeps the true ratio as a CSS aspect ratio', () => {
    for (const key of KEYS) expect(videos[key].ratio).toMatch(/^\d+ \/ \d+$/)
  })
})
