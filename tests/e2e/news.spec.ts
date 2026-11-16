import { expect, test } from '@playwright/test'

/*
 * Prompt 5: the TargetNews phone in the home hero (passes once <TargetNews />
 * replaces PhoneShowcase in src/pages/home/sections/Hero.tsx).
 * Reduced motion: the phone stops floating (so it can be clicked) and the
 * posts stop advancing by themselves, so the test sees one state at a time.
 */
test.use({ reducedMotion: 'reduce' })

test('the home phone shows the 4 latest approved news and its stories jump', async ({ page }) => {
  await page.goto('/')
  const news = page.getByTestId('target-news')
  await expect(news.locator('[data-story]')).toHaveCount(4)
  // The prerendered page already shows the first post: Earthlink.
  await expect(news.locator('[data-post]')).toHaveAttribute('data-post', 'earthlink-alwatani')
  await expect(news).toContainText('حملة تطبيق الوطني على شبكة تارگت')
  const qi = news.locator('[data-story="qi-superqi"]')
  // Retry the tap until the page has hydrated.
  await expect(async () => {
    await qi.click()
    await expect(news.locator('[data-post]')).toHaveAttribute('data-post', 'qi-superqi', {
      timeout: 1_000,
    })
  }).toPass({ timeout: 10_000 })
  await expect(qi).toHaveAttribute('aria-current', 'true')
  await expect(news).toContainText('سوبر كي على جداريات بغداد')
})

test('English: same posts, English texts and links', async ({ page }) => {
  await page.goto('/en/')
  const news = page.getByTestId('target-news')
  await expect(news.locator('[data-story]')).toHaveCount(4)
  await expect(news).toContainText('The Alwatani app campaign on the Target network')
  await expect(news.locator('[data-post] a')).toHaveAttribute('href', '/en/#feed')
})

test('the news phone sits left in Arabic and right in English', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'side by side on desktop only')
  for (const [url, phoneLeft] of [
    ['/', true],
    ['/en/', false],
  ] as const) {
    await page.goto(url)
    const phone = (await page.getByTestId('target-news').boundingBox())!
    const title = (await page.locator('#hero-title').boundingBox())!
    expect(phone.x < title.x, url).toBe(phoneLeft)
  }
})
