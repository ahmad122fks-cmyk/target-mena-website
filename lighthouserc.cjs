/*
 * Lighthouse CI budgets (BUILD-BRIEF 2.4): mobile preset, every score >= 90,
 * LCP < 2.5 s, CLS < 0.1, TBT < 200 ms. The GitHub Action fails otherwise.
 * Pages: home AR and EN, one board page, the board finder; phase 3 adds contact;
 * prompt 4 adds network, production and digital, and the dark theme. Reports stay on disk (nothing is uploaded anywhere).
 */
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        'http://localhost/index.html',
        'http://localhost/en/index.html',
        'http://localhost/boards/BGW03A/index.html',
        'http://localhost/boards/index.html',
        'http://localhost/campaign/index.html',
        'http://localhost/contact/index.html',
        'http://localhost/highway-bridges/index.html',
        // Prompt 4: the redesigned pages, light and dark (?theme=dark, not saved).
        'http://localhost/network/index.html',
        'http://localhost/production/index.html',
        'http://localhost/digital/index.html',
        'http://localhost/index.html?theme=dark',
        'http://localhost/en/index.html?theme=dark',
        'http://localhost/network/index.html?theme=dark',
        'http://localhost/production/index.html?theme=dark',
        'http://localhost/digital/index.html?theme=dark',
      ],
      numberOfRuns: 3,
      settings: { chromeFlags: '--no-sandbox --headless=new' },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
      },
    },
    upload: { target: 'filesystem', outputDir: './reports/lighthouse' },
  },
}
