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

## Phase 2 — 15 Nov 2026 (board pages)

Same method (Lighthouse CI mobile, 3 runs, median). Each page now loads only
its own JavaScript chunk; the phone menu loads on first tap.

| Page | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home AR `/` | 98 | 100 | 100 | 100 | 2.49 s | 0 ms | 0 |
| Home EN `/en/` | 97 | 100 | 100 | 100 | 2.52 s (best run 2.49 s) | 0 ms | 0 |
| Board page `/boards/BGW03A/` | 98 | 100 | 100 | 100 | 2.41 s | 0 ms | 0 |
| Board finder `/boards/` | 100 | 100 | 100 | 100 | 0.91 s | 0 ms | 0 |

JavaScript per page (gzip, budget 150 KB): home 105.7 · finder 104.0 · board
104.3 · network 99.9 · province 100.2 · format 100.3 KB.

Board photos: AVIF 480/720/960 px + WebP 720 px fallback (22 MB for 183
photos). Watch: LCP margin on the home pages is under 0.05 s; keep new images
and scripts off the home page, or shrink the hero photo further.

Checks: Vitest 34/34 · Playwright 34/34 (board page, request form error and
success, honeypot, unknown board = 404, finder filter from the address,
network/province/format pages, phone and desktop) · prerender check on all
1,367 pages · forbidden-content check on all built pages.
