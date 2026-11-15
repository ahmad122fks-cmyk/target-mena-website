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

test('finder and campaign: no horizontal scroll at phone width; list opens as a sheet', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 })
  for (const url of [
    '/boards/',
    '/en/campaign/',
    '/boards/BGW03A/',
    '/contact/',
    '/en/highway-bridges/',
    '/alrabiaa/',
    '/digital/',
    '/work/',
    '/about/',
  ]) {
    await page.goto(url)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    )
    expect(overflow, url).toBeLessThanOrEqual(0)
  }
  await page.goto('/en/boards/')
  await page.getByRole('button', { name: /My list/ }).click()
  await expect(page.getByRole('dialog')).toContainText('Your list is empty')
})

test('home: announcement bar, campaign feed and client login', async ({ page }) => {
  await page.goto('/en/')
  const bar = page.getByRole('link', { name: /Alwatani app.*campaign is now on our boards/ })
  await expect(bar).toHaveAttribute('href', '#feed')
  const feed = page.locator('#feed')
  await expect(feed.locator('article')).toHaveCount(2)
  await expect(feed).toContainText('Earthlink · Alwatani app')
  await expect(feed).toContainText('Qi Card · SuperQi')
  await expect(feed.getByRole('img', { name: 'Qi Card logo' })).toBeVisible()
  const login = page.getByRole('link', { name: /Client login/ }).first()
  await expect(login).toHaveAttribute('href', 'https://admin.target-mena.cloud')
  await expect(login).toHaveAttribute('target', '_blank')
  await page.goto('/en/boards/')
  await expect(page.getByRole('link', { name: /campaign is now on our boards/ })).toHaveCount(0)
})

test('phase 3 pages: 200, one H1, right language, breadcrumb, contact block', async ({ page }) => {
  const pages = [
    'highway-bridges',
    'production',
    'events',
    'alrabiaa',
    'digital',
    'work',
    'about',
    'contact',
    'insights',
    'privacy',
  ]
  for (const name of pages)
    for (const [prefix, lang] of [
      ['', 'ar'],
      ['/en', 'en'],
    ]) {
      const response = await page.goto(`${prefix}/${name}/`)
      expect(response?.status(), name).toBe(200)
      await expect(page.locator('html')).toHaveAttribute('lang', lang)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('nav[aria-label] ol')).toBeVisible()
      await expect(page.locator('#contact')).toContainText('+964 771 977 7199')
    }
})

test('insights stays out of search engines until it has articles', async ({ page }) => {
  await page.goto('/insights/')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
  const sitemap = await (await page.request.get('/sitemap-pages.xml')).text()
  expect(sitemap).not.toContain('/insights/')
  expect(sitemap).toContain('/highway-bridges/')
})

test('contact form: browser checks, then WhatsApp or email with the message', async ({ page }) => {
  await page.goto('/en/contact/')
  const main = page.locator('main')
  await main.getByRole('button', { name: 'Send' }).click()
  await expect(main.getByRole('status')).toHaveCount(0)
  await main.getByLabel('Name').fill('Test Client')
  await main.getByLabel('Phone number').fill('+964 770 000 0000')
  await main.getByLabel('Your message').fill('Rooftops in Najaf')
  await main.getByRole('button', { name: 'Send' }).click()
  const whatsapp = main.getByRole('link', { name: 'Send on WhatsApp' })
  await expect(whatsapp).toHaveAttribute(
    'href',
    /^https:\/\/wa\.me\/9647719777199\?text=.*Rooftops/,
  )
})

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

test('index.html addresses show the home page, not the 404 page', async ({ page }) => {
  for (const url of ['/index.html', '/en/index.html']) {
    await page.goto(url, { waitUntil: 'networkidle' })
    await expect(page.locator('#hero-title')).toBeVisible()
    await expect(page.locator('#nf-title')).toHaveCount(0)
  }
})

test('unknown URL returns a real 404 page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist')
  expect(response?.status()).toBe(404)
  await expect(page.locator('h1')).toHaveText('الصفحة غير موجودة')
})
