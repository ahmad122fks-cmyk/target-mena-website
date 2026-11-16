import { expect, test, type Page } from './fixtures'

test.describe('board page', () => {
  test('Arabic and English board pages show the facts and one H1', async ({ page }) => {
    for (const [url, lang] of [
      ['/boards/BGW03A/', 'ar'],
      ['/en/boards/BGW03A/', 'en'],
    ]) {
      const response = await page.goto(url)
      expect(response?.status()).toBe(200)
      await expect(page.locator('html')).toHaveAttribute('lang', lang)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('main')).toContainText('9.8 × 20')
    }
  })

  test('adds the board to the selection from its page', async ({ page }) => {
    await page.goto('/en/boards/BGW03A/')
    await page
      .locator('main')
      .getByRole('button', { name: /Add to my list/ })
      .first()
      .click()
    await expect(page.getByRole('button', { name: /My list/ })).toContainText('1')
  })

  test('"Ask on WhatsApp" opens WhatsApp with the board code', async ({ page }) => {
    for (const [url, name] of [
      ['/boards/BGW03A/', 'اسأل عن هذه اللوحة على واتساب'],
      ['/en/boards/BGW03A/', 'Ask about this board on WhatsApp'],
    ]) {
      await page.goto(url)
      const link = page.locator('main').getByRole('link', { name })
      const href = new URL((await link.getAttribute('href'))!)
      expect(href.origin + href.pathname).toBe('https://wa.me/9647719777199')
      expect(href.searchParams.get('text')).toContain('BGW03A')
      expect(href.searchParams.get('text')).toContain(`https://target-mena.com${url}`)
      await expect(link).toHaveAttribute('target', '_blank')
    }
  })

  test('unknown board code returns 404', async ({ page }) => {
    expect((await page.goto('/boards/NOT-A-BOARD/'))?.status()).toBe(404)
  })
})

test.describe('finder', () => {
  const count = async (page: Page) =>
    Number((await page.locator('#results-title').innerText()).match(/\d+/)?.[0])

  test('filters from the address show on the pills and chips', async ({ page }) => {
    await page.goto('/en/boards/?city=najaf&format=bridges')
    const najaf = page.getByRole('button', { name: /^Najaf/ })
    await expect(najaf).toHaveAttribute('aria-pressed', 'true')
    await expect(page.locator('#f-format')).toContainText('Type: Bridges')
    expect(await count(page)).toBeGreaterThan(0)
    await page.getByRole('button', { name: /^All provinces/ }).click()
    await expect(najaf).toHaveAttribute('aria-pressed', 'false')
    expect(await count(page)).toBeGreaterThan(0)
  })

  test('faces filter and province search', async ({ page }) => {
    await page.goto('/en/boards/?faces=2')
    await expect(page.locator('#f-faces')).toContainText('Faces: 2 faces')
    await expect.poll(() => count(page)).toBe(3)
    await page.goto('/boards/?q=النجف')
    await expect(page.locator('#f-q')).toHaveValue('النجف')
    await expect.poll(() => count(page)).toBeGreaterThanOrEqual(216)
    await expect.poll(() => count(page)).toBeLessThan(660)
  })

  test('shows 24 at a time; "Show more" adds 24 and keeps it in the address', async ({ page }) => {
    await page.goto('/en/boards/')
    const cards = page.locator('main article')
    await expect(cards).toHaveCount(24)
    await page.getByRole('button', { name: /Show more/ }).click()
    await expect(cards).toHaveCount(48)
    await expect(page).toHaveURL(/page=2/)
  })

  test('"My list" opens as a side panel on desktop', async ({ page }, info) => {
    test.skip(info.project.name === 'phone', 'phones get the sheet (smoke.spec.ts)')
    await page.goto('/en/boards/?sort=code')
    await expect(page.locator('#f-sort')).toHaveValue('code')
    await page
      .locator('main article')
      .first()
      .getByRole('button', { name: /Add to my list/ })
      .click()
    const panel = page.getByRole('complementary', { name: 'My list' })
    await expect(panel).toBeVisible()
    await expect(panel).toContainText('Total area')
    await panel.getByRole('button', { name: 'Close my list' }).click()
    await expect(panel).toHaveCount(0)
  })

  test('a shared link shows exactly those boards', async ({ page }) => {
    await page.goto('/en/boards/?codes=BGW03A,BBH20A')
    await expect(page.locator('main article')).toHaveCount(2)
    await expect.poll(() => count(page)).toBe(2)
    await page.getByRole('button', { name: 'Add all to my list' }).click()
    await expect(page.getByRole('button', { name: /My list/ })).toContainText('2')
  })

  test('network, province and format pages load', async ({ page }) => {
    for (const url of ['/network/', '/en/network/najaf/', '/formats/bridges/']) {
      expect((await page.goto(url))?.status()).toBe(200)
      await expect(page.locator('h1')).toHaveCount(1)
    }
  })
})
