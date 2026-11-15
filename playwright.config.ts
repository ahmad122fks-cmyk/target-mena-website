import { defineConfig, devices } from '@playwright/test'

const PORT = 4173

/**
 * Smoke tests on the built site (run `npm run build` first). Locally they
 * use the installed Google Chrome; in GitHub Actions Playwright's Chromium.
 */
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel: process.env.CI ? undefined : 'chrome',
  },
  projects: [
    { name: 'phone', use: { ...devices['Pixel 7'], viewport: { width: 375, height: 812 } } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
  ],
  webServer: {
    command: `npx tsx scripts/serve-dist.ts ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
})
