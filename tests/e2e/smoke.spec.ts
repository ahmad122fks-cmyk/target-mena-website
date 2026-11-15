import { expect, test } from '@playwright/test'

const PAGES = [
  { url: '/', lang: 'ar', dir: 'rtl' },
  { url: '/en/', lang: 'en', dir: 'ltr' },
]

for (const page of PAGES) {
  test.describe(`home ${page.lang}`, () => {
    test('loads with the right language, one H1 and the contact block', async ({ page: p }) => {
      const response = await p.goto(page.url)
      expect(response?.status()).toBe(200)
      await expect(p.locator('html')).toHaveAttribute('lang', page.lang)
      await expect(p.locator('html')).toHaveAttribute('dir', page.dir)
      await expect(p.locator('h1')).toHaveCount(1)
      const contact = p.locator('#contact')
      for (const text of [
        '+964 771 977 7199',
        '+964 784 466 6000',
        '+964 774 466 6000',
        'info@target-mena.com',
      ]) {
        await expect(contact).toContainText(text)
      }
    })

    test('no horizontal scroll at phone width', async ({ page: p }) => {
      await p.setViewportSize({ width: 375, height: 812 })
      await p.goto(page.url)
      const overflow = await p.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      )
      expect(overflow).toBeLessThanOrEqual(0)
    })

    test('hydrates without console errors', async ({ page: p }) => {
      const errors: string[] = []
      p.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()))
      p.on('pageerror', (err) => errors.push(err.message))
      await p.goto(page.url, { waitUntil: 'networkidle' })
      expect(errors).toEqual([])
    })

    test('language switch links to the other home', async ({ page: p }) => {
      await p.goto(page.url)
      const other = page.lang === 'ar' ? '/en/' : '/'
      await expect(
        p.locator(`header a[hreflang="${page.lang === 'ar' ? 'en' : 'ar'}"]`),
      ).toHaveAttribute('href', other)
    })
  })
}

test('phone menu opens and shows every main link', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await page.getByRole('button', { name: 'فتح القائمة' }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('link')).toHaveCount(7)
})

test('unknown URL returns a real 404 page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist')
  expect(response?.status()).toBe(404)
  await expect(page.locator('h1')).toHaveText('الصفحة غير موجودة')
})
