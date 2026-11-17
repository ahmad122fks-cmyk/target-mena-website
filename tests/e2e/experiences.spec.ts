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
  // The stop card is the tour's panel (panel={false} in the Network canvases).
  await expect(map.getByRole('region', { name: 'ملخص الشبكة' })).toHaveCount(0)
})

for (const [path, summary, zoomIn] of [
  ['/', 'ملخص الشبكة', 'تكبير'],
  ['/en/', 'Network summary', 'Zoom in'],
]) {
  test(`the map never mirrors: panel left, zoom right (${path})`, async ({ page }) => {
    // Item 61: in English the panel moved right, over Babel and the southern highway.
    await page.goto(path)
    const map = page.getByTestId('network-map')
    await map.scrollIntoViewIfNeeded()
    await expect(map).toHaveAttribute('data-ready', 'true', { timeout: 10_000 })
    const frame = await map.boundingBox()
    const panel = await map.getByRole('region', { name: summary }).boundingBox()
    const zoom = await map.getByRole('button', { name: zoomIn }).boundingBox()
    if (!frame || !panel || !zoom) throw new Error('map, panel or zoom button not drawn')
    // Pinned by edge (12-16 px in), at every width: on phones the sheet spans most of the map.
    expect(panel.x - frame.x).toBeLessThan(24)
    expect(frame.x + frame.width - (zoom.x + zoom.width)).toBeLessThan(24)
  })
}

test('the Digital tabs change what plays in the phone', async ({ page }) => {
  await page.goto('/en/digital/')
  for (const id of ['social', 'identity', 'uiux', '3d', 'ai', 'campaign']) {
    const tab = page.locator(`[data-tab="${id}"]`)
    await tab.click()
    await expect(tab).toHaveAttribute('aria-selected', 'true')
    await expect(page.locator(`[data-screen="${id}"]`)).toBeVisible({ timeout: 10_000 })
  }
})
