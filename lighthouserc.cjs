/*
 * Lighthouse CI budgets (BUILD-BRIEF 2.4): mobile preset, every score >= 90,
 * LCP < 2.5 s, CLS < 0.1, TBT < 200 ms. The GitHub Action fails otherwise.
 * Pages: home AR and EN, one board page, the board finder; phase 3 adds contact. Reports stay on disk (nothing is uploaded anywhere).
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
