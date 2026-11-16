import { expect, test } from './fixtures'

/* BUILD-BRIEF 9: phone width and right-to-left on every page type. */
test('every page type fits a phone and reads right-to-left in Arabic', async ({ page }, info) => {
  test.skip(info.project.name !== 'phone', 'phone width only')
  const types = [
    '/',
    '/boards/',
    '/boards/BGW03A/',
    '/network/',
    '/network/najaf/',
    '/formats/bridges/',
    '/campaign/',
    '/highway-bridges/',
    '/production/',
    '/events/',
    '/alrabiaa/',
    '/digital/',
    '/work/',
    '/about/',
    '/contact/',
    '/insights/',
    '/privacy/',
    '/no-such-page/',
  ]
  for (const base of types)
    for (const prefix of ['', '/en']) {
      const url = base === '/no-such-page/' && prefix ? '/en/no-such-page/' : `${prefix}${base}`
      await page.goto(url)
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      )
      expect(overflow, url).toBeLessThanOrEqual(0)
    }
  // Codes stay left-to-right inside Arabic text.
  await page.goto('/boards/BGW03A/')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  const code = page.locator('main .ltr-run', { hasText: 'BGW03A' }).first()
  expect(await code.evaluate((el) => getComputedStyle(el).direction)).toBe('ltr')
})

test('Arabic sheets put the close button at the left, clear of the title', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/boards/?sort=code')
  await page.locator('main article').first().getByRole('button', { name: 'أضف إلى قائمتي' }).click()
  await page
    .getByRole('button', { name: /^قائمتي/ })
    .first()
    .click()
  const sheet = page.getByRole('dialog')
  const close = (await sheet.getByRole('button', { name: 'إغلاق القائمة' }).boundingBox())!
  const title = (await sheet.locator('h2').first().boundingBox())!
  expect(close.x + close.width).toBeLessThanOrEqual(title.x)
})
