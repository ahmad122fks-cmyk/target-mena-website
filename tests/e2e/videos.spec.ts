import fs from 'node:fs'
import { expect, test } from './fixtures'

type Video = { file: string; ready: boolean }
const videos = JSON.parse(fs.readFileSync('src/content/videos.json', 'utf8')) as Record<
  'driveToHq' | 'unipoleStreet',
  Video
>

/*
 * Prompt 4b: the drive-to-HQ loop on Home and Contact and the unipole street
 * scene on Network: muted, inline, lazy (preload none, poster first). Until
 * the files exist the sections are left out of the production build.
 */
const PAGES = [
  ['/', 'driveToHq'],
  ['/contact/', 'driveToHq'],
  ['/network/', 'unipoleStreet'],
] as const

for (const [url, key] of PAGES) {
  test(`${url}: ${key} video`, async ({ page }) => {
    await page.goto(url)
    const video = page.locator(`video source[src*="${videos[key].file}"]`).locator('..')
    if (!videos[key].ready) {
      await expect(video).toHaveCount(0)
      return
    }
    await expect(video.first()).toHaveJSProperty('muted', true)
    await expect(video.first()).toHaveAttribute('preload', 'none')
    await expect(video.first()).toHaveAttribute('playsinline', '')
    await expect(video.first()).toHaveAttribute('poster', /-poster\.webp$/)
    // Phones get the 640 px file first; everyone else falls through to the 1280 px one.
    const sources = video.first().locator('source')
    await expect(sources.first()).toHaveAttribute('src', `/video/${videos[key].file}-640.mp4`)
    await expect(sources.first()).toHaveAttribute('media', '(max-width: 767px)')
    await expect(sources.last()).toHaveAttribute('src', `/video/${videos[key].file}.mp4`)
  })
}
