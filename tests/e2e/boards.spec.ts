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
      await expect(page.locator('main')).toContainText('BGW03A')
      await expect(page.locator('main')).toContainText('9.8 × 20')
    }
  })

  test('request form shows an error, then success', async ({ page }) => {
    await page.goto('/en/boards/BGW03A/')
    const form = page.locator('form#request')
    await form.getByRole('button', { name: 'Send request' }).click()
    await expect(form.getByRole('alert')).toBeVisible()
    await form.getByLabel('Name').fill('Test')
    await form.getByLabel('Phone number').fill('+964 700 000 0000')
    await form.getByRole('button', { name: 'Send request' }).click()
    await expect(form.getByRole('status')).toBeVisible()
  })

  test('honeypot: a filled hidden field never opens email', async ({ page }) => {
    await page.goto('/en/boards/BGW03A/')
    await page
      .locator('input[name="website"]')
      .evaluate((el: HTMLInputElement) => (el.value = 'bot'))
    await page.locator('form#request').getByRole('button', { name: 'Send request' }).click()
    await expect(page.locator('form#request').getByRole('status')).toBeVisible()
    await expect(page).toHaveURL(/boards\/BGW03A/)
  })

  test('unknown board code returns 404', async ({ page }) => {
    const response = await page.goto('/boards/NOT-A-BOARD/')
    expect(response?.status()).toBe(404)
  })
})

test.describe('finder and network', () => {
  test('filters by province from the address', async ({ page }) => {
    await page.goto('/en/boards/?city=najaf')
    await expect(page.locator('#f-city')).toHaveValue('najaf')
    const count = Number(await page.locator('#results-title .ltr-run').innerText())
    expect(count).toBeGreaterThan(0)
    expect(count).toBeLessThan(660)
  })

  test('network, province and format pages load', async ({ page }) => {
    for (const url of ['/network/', '/en/network/najaf/', '/formats/bridges/']) {
      const response = await page.goto(url)
      expect(response?.status()).toBe(200)
      await expect(page.locator('h1')).toHaveCount(1)
    }
  })
})
