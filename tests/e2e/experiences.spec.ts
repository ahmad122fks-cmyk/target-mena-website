import { expect, test } from './fixtures'

/* Prompt 4, section 6: map intro and fly-to, Digital tabs. The home news phone (prompt 5) is in news.spec.ts. */

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

test('the Digital tabs change what plays in the phone', async ({ page }) => {
  await page.goto('/en/digital/')
  for (const id of ['social', 'identity', 'uiux', '3d', 'ai', 'campaign']) {
    const tab = page.locator(`[data-tab="${id}"]`)
    await tab.click()
    await expect(tab).toHaveAttribute('aria-selected', 'true')
    await expect(page.locator(`[data-screen="${id}"]`)).toBeVisible({ timeout: 10_000 })
  }
})
