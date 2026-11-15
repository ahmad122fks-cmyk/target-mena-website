import { expect, test } from '@playwright/test'

test('add 3 boards, open the selection, send to the builder, review shows the 3 codes', async ({
  page,
}) => {
  await page.goto('/en/boards/?sort=code')
  // Filters from the address apply after the page is ready: wait for them.
  await expect(page.locator('#f-sort')).toHaveValue('code')
  const cards = page.locator('main article')
  const codes: string[] = []
  for (let i = 0; i < 3; i++) {
    const card = cards.nth(i)
    codes.push((await card.locator('.ltr-run').first().innerText()).trim())
    await card.getByRole('button', { name: /Add to my list/ }).click()
  }
  const open = page.getByRole('button', { name: /My list/ })
  await expect(open).toContainText('3')

  // The selection survives a reload (saved in the browser).
  await page.reload()
  await open.click()
  const panel = page.getByRole('complementary', { name: 'My list' })
  for (const code of codes) await expect(panel).toContainText(code)
  await panel.getByRole('link', { name: /Request these boards/ }).click()

  await expect(page).toHaveURL(/\/en\/campaign\/$/)
  await page.getByRole('button', { name: 'Next' }).click()
  await expect(page.getByText('This field is required.')).toBeVisible()
  await page.getByLabel('Name').fill('Test Client')
  await page.getByLabel('Phone number').fill('+964 770 000 0000')
  await page.getByRole('button', { name: 'Next' }).click()

  await page.getByLabel('Start date').fill('2027-03-01')
  await page.getByLabel('Number').fill('2')
  await page.getByRole('button', { name: 'Next' }).click()
  for (const code of codes) await expect(page.locator('main')).toContainText(code)
  await page.getByRole('button', { name: 'Next' }).click()

  const review = page.locator('[data-review="boards"]')
  await expect(review).toHaveText(codes.join(', '))
  await page.getByRole('button', { name: 'Send request' }).click()
  const whatsapp = page.getByRole('link', { name: 'Send on WhatsApp' })
  await expect(whatsapp).toHaveAttribute(
    'href',
    new RegExp(`^https://wa\\.me/9647719777199\\?text=.*${codes[0]}`),
  )
})
