import { expect, test } from './fixtures'

/* "Plan your campaign" (CampaignButton, 17 Nov 2026): the yellow key in the
   header (phones: in the menu) and the CTA band; quiet on its own page. */

for (const [path, name] of [
  ['/network/', 'خطط حملتك'],
  ['/en/network/', 'Plan your campaign'],
]) {
  test(`the campaign key leads to the planner (${path})`, async ({ page }, info) => {
    await page.goto(path)
    const key = info.project.name === 'phone' ? await openMenu(page) : page.locator('header')
    const link = key.getByRole('link', { name })
    await expect(link).toBeVisible()
    await expect(link).toHaveClass(/cta-press/)
    await expect(link).toHaveAttribute(
      'href',
      path.startsWith('/en') ? '/en/campaign/' : '/campaign/',
    )
    await expect(link).not.toHaveAttribute('data-still')
  })
}

test('on the planner the key marks the current page and stays still', async ({ page }, info) => {
  await page.goto('/campaign/')
  const area = info.project.name === 'phone' ? await openMenu(page) : page.locator('header')
  const key = area.locator('a.cta-press:visible')
  await expect(key).toHaveAttribute('aria-current', 'page')
  await expect(key).toHaveAttribute('data-still', 'true')
})

async function openMenu(page: import('./fixtures').Page) {
  await page
    .getByRole('button', { name: 'فتح القائمة' })
    .or(page.getByRole('button', { name: 'Open menu' }))
    .click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  return dialog
}
