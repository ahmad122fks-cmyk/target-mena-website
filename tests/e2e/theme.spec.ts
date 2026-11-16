import { expect, test } from './fixtures'

/* Prompt 4/5: light by default (v3), no flash on load, the moon toggle remembered. */

/** Records whether <html> already had the dark class when <body> was first parsed. */
const RECORD_FIRST_PAINT = () => {
  new MutationObserver((_, observer) => {
    if (!document.body) return
    ;(window as unknown as { darkAtBody: boolean }).darkAtBody =
      document.documentElement.classList.contains('dark')
    observer.disconnect()
  }).observe(document, { childList: true, subtree: true })
}

test('light by default, even on a dark device; a saved dark choice applies before the first paint', async ({
  page,
}) => {
  // v3 (prompt 5): light is the default look; dark only from the moon button.
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')
  await expect(page.locator('html')).not.toHaveClass(/dark/)
  await page.evaluate(() => localStorage.setItem('theme', 'dark'))
  await page.addInitScript(RECORD_FIRST_PAINT)
  await page.goto('/en/')
  expect(await page.evaluate(() => (window as unknown as { darkAtBody: boolean }).darkAtBody)).toBe(
    true,
  )
  await expect(page.locator('html')).toHaveClass(/dark/)
})

test('the toggle switches the theme and remembers it', async ({ page }, info) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/network/')
  if (info.project.name === 'phone') await page.getByRole('button', { name: 'فتح القائمة' }).click()
  const toggle = page.getByRole('button', { name: 'الوضع الداكن' }).filter({ visible: true })
  await toggle.click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await expect(toggle).toHaveAttribute('aria-pressed', 'true')
  // Dark blue page, white logo, never pure black.
  const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
  expect(background).toBe('rgb(7, 26, 46)')
  await page.addInitScript(RECORD_FIRST_PAINT)
  await page.goto('/en/production/')
  expect(await page.evaluate(() => (window as unknown as { darkAtBody: boolean }).darkAtBody)).toBe(
    true,
  )
  await expect(page.locator('header img[src$="target-logo-white.svg"]')).toBeVisible()
  expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark')
})

test('dark pages fit a phone too', async ({ page }, info) => {
  test.skip(info.project.name !== 'phone', 'phone width only')
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'))
  for (const url of ['/', '/network/', '/production/', '/digital/', '/en/', '/en/network/']) {
    await page.goto(url)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    )
    expect(overflow, url).toBeLessThanOrEqual(0)
  }
})
