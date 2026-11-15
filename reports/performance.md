# Performance report

## Phase 1 — 15 Nov 2026

Lighthouse CI 0.16, **mobile** preset (simulated slow 4G, 4× CPU), 3 runs per
page, median shown. Measured locally on the production build (`npm run build`),
served as static files. The same budgets run in GitHub Actions on every push.

| Page | Performance | Accessibility | Best practices | SEO | LCP | FCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home AR `/` | 98 | 100 | 100 | 100 | 2.33 s | 0.76 s | 0 ms | 0 |
| Home EN `/en/` | 98 | 100 | 100 | 100 | 2.39 s | 0.76 s | 20 ms | 0 |

Budgets (BUILD-BRIEF 2.4): every score ≥ 90 ✅ · LCP < 2.5 s ✅ · CLS < 0.1 ✅ · TBT < 200 ms ✅

Bundle budget (size-limit): JavaScript **115.6 KB gzip** of 150 KB ✅
(one file for the whole site: React, React Router, shadcn Sheet). CSS 7.5 KB gzip.
Fonts: Readex Pro variable, Arabic 22.6 KB + Latin 31.0 KB.

Other checks: Vitest 18/18 · Playwright 22/22 (phone 375 px and desktop 1440 px,
no horizontal scroll, RTL, contact block, 404 status, phone menu) · prerender
check (title, description, canonical, hreflang, JSON-LD, one H1, full text in
the HTML) · forbidden-content check on source and on the built pages · no file
over 200 lines.

Notes:
- The LCP element is the hero board photo (preloaded, AVIF 720 px on phones).
  Margin to the 2.5 s budget is about 0.1 s: keep the hero photo small and
  don't add scripts to the home page.
- Phases 2–3 add a board page, the board finder and contact to the Lighthouse run.
