# target-mena.com

The website of Target Advertising (Baghdad): Arabic at `/` (right-to-left),
English at `/en/`. Every page is prerendered to static HTML, so the server only
serves files (no Node, PHP or database needed in production).

## Stack

React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · shadcn/ui · React Router 7 ·
Readex Pro (self-hosted). Node 22 (`.nvmrc`).

## Commands

```bash
npm ci                 # install
npm run dev            # local dev server
npm run build          # checks + client build + SSR build + prerender + output checks -> dist/
npm test               # unit tests (Vitest)
npm run test:e2e       # smoke tests on dist/ (Playwright)
npm run size           # JavaScript budget (150 KB gzip per page)
npm run lhci           # Lighthouse CI budgets (mobile)
npm run feed           # inventory export -> src/data/boards.json (on Ahmad's Mac; whitelist only)
npm run photos         # photo folder -> public/photos (AVIF + WebP) and the feed
```

## Board data

`src/data/boards.json` is the **whitelisted** board feed (no prices, no
suppliers): Target-owned sites only (`scripts/data/target-owned-codes.json`,
from the catalog's all-sites list, stock = Target). It is built on Ahmad's Mac
from the inventory export, which is never committed. Photos held for review are
listed in a private file and never published. Every URL ends with a slash
(`/boards/BGW03A/`); the server should serve `index.html` from each folder.

## Folders

```
src/app/          routes, layout, head/JSON-LD
src/pages/<page>/ index.tsx + sections/ (one file per section) + <page>.content.json (ar + en)
src/components/ui/      shadcn/ui (generated)
src/components/shared/  Header, Footer, ContactBlock, Section, BoardCard, ...
src/features/i18n/      language helpers
src/lib/          formatting, images, site constants
src/styles/       theme.css (brand tokens), fonts.css
scripts/          prerender, content and length checks, local static server
tests/            unit/ (Vitest), e2e/ (Playwright)
```

Design rules: **DESIGN.md**. Performance results: **reports/performance.md**.

## Rules

- Never commit prices, supplier names, staff names, inventory exports or
  secrets. A pre-commit hook (`.githooks/pre-commit`) and the build both run
  `scripts/check-forbidden.ts`.
- Unconfirmed facts are shown as `[TO CONFIRM: …]` and must be gone at launch.
- GitHub Actions (`.github/workflows/ci.yml`) builds and tests every push and
  publishes the built site to the `deploy` branch and as a downloadable artifact.
