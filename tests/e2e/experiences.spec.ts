import { expect, test } from '@playwright/test'

/* Prompt 4, section 6: map intro and fly-to, phone tabs, Digital tabs, AR/EN mirror. */

test('the home map flies from all Iraq to the network when it scrolls into view', async ({
  page,
}) => {
  await page.goto('/')
  const map = page.getByTestId('network-map')
  await map.scrollIntoViewIfNeeded()
  await expect(map).toHaveAttribute('data-ready', 'true', { timeout: 10_000 })
  await expect(map).toHaveAttribute('data-view', 'net', { timeout: 8_000 })
  // Counts only: no board codes or prices on the map.
  await expect(map).not.toContainText(/BGW03A|IQD|\$/)
  await expect(map).toContainText('217')
})

test('the network tour drives the map', async ({ page }) => {
  await page.goto('/network/')
  const map = page.getByTestId('network-map')
  await page.locator('[data-stop="baghdad"]').click()
  await expect(map).toHaveAttribute('data-view', 'baghdad', { timeout: 10_000 })
  await expect(page.locator('[data-stop="baghdad"]')).toHaveAttribute('aria-current', 'step')
  await page.locator('[data-stop="south"]').click()
  await expect(map).toHaveAttribute('data-view', 'south', { timeout: 10_000 })
})

test('the home phone switches screens from its tabs', async ({ page }) => {
  await page.goto('/')
  const tv = page.locator('[data-tab="tv"]')
  await tv.click()
  await expect(tv).toHaveAttribute('aria-selected', 'true')
  await expect(page.locator('#showcase-screen')).toContainText('على الهواء')
  await page.locator('[data-tab="boards"]').click()
  await expect(page.locator('#showcase-screen')).toContainText('BG46A', { timeout: 10_000 })
})

test('the Digital tabs change what plays in the phone', async ({ page }) => {
  await page.goto('/en/digital/')
  for (const id of ['social', 'identity', 'uiux', '3d', 'ai', 'campaign']) {
    const tab = page.locator(`[data-tab="${id}"]`)
    await tab.click()
    await expect(tab).toHaveAttribute('aria-selected', 'true')
    await expect(page.locator(`[data-screen="${id}"]`)).toBeVisible({ timeout: 10_000 })
  }
})

test('the phone sits left in Arabic and right in English', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'side by side on desktop only')
  for (const [url, phoneLeft] of [
    ['/', true],
    ['/en/', false],
  ] as const) {
    await page.goto(url)
    const phone = (await page.locator('#showcase-screen').boundingBox())!
    const title = (await page.locator('#hero-title').boundingBox())!
    expect(phone.x < title.x, url).toBe(phoneLeft)
  }
})
