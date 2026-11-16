import { test as base, expect, type Page } from '@playwright/test'

/**
 * The specs' `test`: `page.goto` and `page.reload` also wait until the page
 * has hydrated (<html data-hydrated>, set in App.tsx). Before that the
 * buttons are prerendered HTML with no handlers, and on GitHub's slower
 * runners a click could land there and do nothing (CI run of 16d5c93).
 */
export const test = base.extend({
  page: async ({ page }, provide) => {
    const ready = async <R extends { headers(): Record<string, string> } | null>(response: R) => {
      if (response?.headers()['content-type']?.includes('text/html')) {
        await page.locator('html[data-hydrated]').waitFor({ state: 'attached' })
      }
      return response
    }
    const goto = page.goto.bind(page)
    const reload = page.reload.bind(page)
    page.goto = async (...args: Parameters<Page['goto']>) => ready(await goto(...args))
    page.reload = async (...args: Parameters<Page['reload']>) => ready(await reload(...args))
    await provide(page)
  },
})

export { expect, type Page }
