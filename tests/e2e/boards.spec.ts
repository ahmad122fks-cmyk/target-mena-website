import { expect, test } from '@playwright/test'

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

  test('unknown board code returns 404', async ({ page }) => {
    expect((await page.goto('/boards/NOT-A-BOARD/'))?.status()).toBe(404)
  })
})

test.describe('finder', () => {
  test('filters from the address show as chips; clear all removes them', async ({ page }) => {
    await page.goto('/en/boards/?city=najaf&format=bridges')
    const chips = page.getByRole('button', { name: /Remove filter/ })
    await expect(chips).toHaveCount(2)
    const count = Number(await page.locator('#results-title .ltr-run').innerText())
    expect(count).toBeGreaterThan(0)
    await page.getByRole('button', { name: 'Clear all' }).click()
    await expect(chips).toHaveCount(0)
    await expect(page.locator('#results-title .ltr-run')).toHaveText('660')
  })

  test('pages 24 at a time and keeps the page in the address', async ({ page }) => {
    await page.goto('/en/boards/')
    await expect(page.locator('main article, main [data-slot="card"]')).toHaveCount(24)
    await page.getByRole('button', { name: 'Page 2', exact: true }).click()
    await expect(page).toHaveURL(/page=2/)
  })

  test('a shared link shows exactly those boards', async ({ page }) => {
    await page.goto('/en/boards/?codes=BGW03A,BBH20A')
    await expect(page.locator('#results-title .ltr-run')).toHaveText('2')
    await page.getByRole('button', { name: 'Add all to my selection' }).click()
    await expect(page.getByRole('button', { name: /My list/ })).toContainText('2')
  })

  test('network, province and format pages load', async ({ page }) => {
    for (const url of ['/network/', '/en/network/najaf/', '/formats/bridges/']) {
      expect((await page.goto(url))?.status()).toBe(200)
      await expect(page.locator('h1')).toHaveCount(1)
    }
  })
})
