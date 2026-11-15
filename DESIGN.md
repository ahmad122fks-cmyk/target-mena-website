# DESIGN.md — target-mena.com

Design system for the Target Advertising website, in the getdesign.md format
(theme, colours, type, components, layout, depth, do/don't, responsive, agent
guide). Every page and component follows it. Values come only from the
official **Target Brand Guidelines 2024** (the top source) and the approved
demo. Direction set by Ahmad on 15 Nov 2026: **professional, clean, not
crowded or busy**. The catalog's calligraphy and artwork are accents, not the
layout.

---

## 1. Visual theme and atmosphere

- Calm, confident, editorial. Mostly white space, one strong blue, real photos.
- shadcn/ui structure: clear grid, generous spacing, thin borders, no clutter.
- Target identity comes from the **blue**, **Readex Pro**, the **logo** and real
  board photos. Calligraphy is **rare** (see 10): not on every page, never in a
  shared component that appears on every page.
- One idea per section: a heading, a short paragraph, one main action.
- Arabic first (RTL at `/`), English mirrors it under `/en/`.

## 2. Colour palette and roles

Exact guideline values (pages 10–11). Tints are 80/60/40% mixed with white.
Nothing else is allowed. Tokens live in `src/styles/theme.css`.

| Token | Hex | Role |
| --- | --- | --- |
| `brand-blue` | `#0161A6` | Primary: buttons, links, numbers, the contact band, logo |
| `brand-blue-80 / 60 / 40` | `#3481B8` `#67A0CA` `#99C0DB` | Hover, tone-on-tone calligraphy on blue |
| `brand-blue-10` | `#E8F1F7` | Guideline page 40 light tint: icon tiles, outline-button hover |
| `brand-black` | `#000000` | Headings |
| `brand-text` | `#4D4D4F` | Body text (8.4:1 on white) |
| `brand-white` | `#FFFFFF` | Page background |
| `brand-ghost` | `#F5FAFA` | Alternate section background, chips |
| `brand-yellow` | `#F7AF1C` | Small accents only (eyebrow bar, stripe). Digital/social channel colour |
| `brand-green` | `#2AB99D` | Alrabiaa TV channel colour (Alrabiaa page accents, stripe) |
| `brand-grey` | `#709EB2` | Billboards/outdoor channel colour (stripe, outdoor accents) |
| `border` | `#C6D8E0` (grey 40%) | Card and section borders |

Rules:
- **Never** use `#0061A6`, `#6F9EB2`, `#2BBA9E` (old approximations) or any colour
  not listed. Red and orange appear **only inside** the catalog artwork image.
- Text on yellow, green or grey is **black**, never white (white fails contrast).
- On blue: white text; eyebrows white (yellow text on blue fails AA).
- Channel colours (guideline layouts): Blue = brand, Yellow = digital/social,
  Green = Alrabiaa TV, Grey = billboards. Use them as accents on their own
  pages, not as big blocks on the home page.

## 3. Typography

- **Readex Pro only**, Arabic and English, self-hosted variable WOFF2
  (`@fontsource-variable/readex-pro`, Arabic ~23 KB, Latin ~31 KB). The Arabic
  subset is preloaded on Arabic pages, the Latin one on English pages.
- Weights: 300 light (second headline line), 400 body, 500 nav and chips,
  600 buttons, codes and numbers, 700 headings.

| Use | Size (phone / desktop) | Weight | Line height |
| --- | --- | --- | --- |
| H1 (one per page) | 36 / 48 px | 700 + 300 second line | 1.3 |
| H2 section | 30 / 36 px | 700 | 1.3 |
| H3 card | 18–30 px | 700 | 1.3 |
| Lead paragraph | 18 px | 400 | 1.75 |
| Body | 17 px | 400 | 1.75 |
| Eyebrow, small | 14 px | 600 | 1.5 |

- Headline pattern from the brand: **bold first line, light second line**
  (`SectionHeading` `title` + `light`). Use it for the H1 and feature cards, not
  for every heading.
- Board codes, phone numbers, sizes and numbers sit in `.ltr-run` (LTR isolate,
  tabular numbers) inside Arabic text. Western digits everywhere.

## 4. Component styling

All from `src/components/ui` (shadcn) and `src/components/shared`. Reuse before
writing anything new; a second copy of the same markup is a bug.

- **Button / CtaLink** (shadcn Button): 48 px tall, radius 12 px, 24 px side
  padding, 16 px semibold. Tones: `blue` (main action, one per section),
  `outline` (blue border, secondary), `white` and `outlineLight` (on blue),
  `yellow` and `black` (rare).
- **Card** (shadcn Card): radius 12 px, 1 px border, **no shadow**, white.
  Image on top (`ImageCard`, `BoardCard`), 20–32 px padding.
- **Badge** (shadcn, `secondary`): ghost background, blue text, fully rounded.
  Board type, service lists.
- **Eyebrow**: 14 px semibold, blue (white on blue), after a 24 × 4 px yellow bar.
- **Facts row**: border top and bottom, four columns with thin dividers, number
  in blue semibold.
- **Header**: white, logo at start, menu (xl and up), language switch, one blue
  button; four-colour stripe (4 px) underneath. Phones: shadcn Sheet menu.
- **Contact block** (`ContactBlock`): identical on every page, plain blue band,
  exact contact details, no calligraphy.
- **Footer**: stripe, logo, rights line, Privacy, language switch.
- **Four-colour stripe** (`Stripe`): blue 55 · yellow 15 · green 15 · grey 15,
  4 px. Only under the header and above the footer.
- **ToConfirm**: dashed box `[TO CONFIRM: …]` for unconfirmed facts. Must be gone
  before launch.

## 5. Layout principles

- Container: max 1240 px, 16 px side padding on phones, 24 px from 640 px.
- Section padding: 64 px phone, 96 px desktop. Grid gaps: 24 px between cards,
  48 px between text and image in split sections.
- **Section rhythm** (home): white hero → facts row → ghost (featured sites) →
  white (bridges) → ghost (services) → white (production & creative) → white
  (clients, top border) → **blue contact** → white footer. Alternate white and
  ghost; **one** blue band per page (the contact block). At most one channel-
  colour band on a channel page (e.g. green on Alrabiaa).
- Split sections: two columns from 1024 px, text first in reading order.
- Order of content on every page: outdoor first, then production and events,
  then TV.

## 6. Depth and elevation

- Flat. Borders, not shadows (`shadow-none` on cards). No gradients, no glass,
  no glow, no animation beyond colour transitions on hover.
- Radius: 12 px (buttons, cards, chips), 16 px for photos.

## 7. Do's and don'ts

Do:
- Keep each section to one message and one main action.
- Use real board photos and say so ("real site photo").
- Keep pages clean: most pages have no calligraphy at all.
- Write every text in `ar` and `en` side by side in the page's `.content.json`.

Don't:
- Don't fill sections with strong colour blocks or multicolour patterns.
- Don't add calligraphy to every page, section or shared component (Ahmad,
  15 Nov 2026: "not in every slide, in every page").
- Don't put text over calligraphy or photos where contrast drops below 4.5:1.
- Don't show prices, suppliers, client booking names, staff names or the parent
  company. Don't invent numbers, slogans or clients: use `ToConfirm`.
- Don't use the old guideline stationery phone number.
- Don't use any font other than Readex Pro, or any colour not in section 2.

## 8. Responsive behaviour

- Breakpoints: 640 (sm), 1024 (lg, two-column splits), 1280 (xl, full menu).
- 375 px wide must work with **no horizontal scroll** (tested by Playwright).
- Touch targets at least 44 × 44 px (buttons 48 px, links `min-h-11`).
- Images: AVIF/WebP with JPEG fallback, several widths, explicit width and
  height, lazy below the fold, hero photo high priority.

## 9. Agent prompt guide

- "Section": `<Section tone="white|ghost|blue" labelledBy="…">` + `SectionHeading`.
- "Main button": `<CtaLink href={link('/path')}>…</CtaLink>`; secondary
  `tone="outline"`.
- "Card with image": `ImageCard` (art) or `BoardCard` (boards, whitelisted data).
- "Calligraphy": only when a page really needs it (see 10):
  `<Calligraphy mark="a|b" tone="tint|blue80|white" className="-end-48 …" />`.
- Text: `useT()(content.key)`; links: `useLink()('/path')`.
- Check: `npm run build && npm test && npm run test:e2e && npm run lhci`.

---

## 10. Calligraphy rules

- Source: the guideline's own **vector** shapes, extracted point for point with
  `scripts/brand/extract_calligraphy.py`. `mark-a` = page 1 (ring with the ف/ق
  forms), `mark-b` = page 40. **Never redraw, invent, flip, rotate, stretch or
  skew** them (flipping would put the Arabic letters backwards).
- Used as a CSS mask (`Calligraphy`), so the shape stays exact and the colour
  comes from the palette, only in pairs the guideline itself shows:
  - light tint `#E8F1F7` on white (guideline page 40),
  - blue 80% on blue, white on blue (page 2),
  - the page 13 combinations (blue on yellow, black on yellow, blue on green,
    white on grey, black/blue on white, grey/blue/green on black).
- Large, cropped by the section edge on the **inline end** side (left in Arabic,
  right in English), so it never sits where the text starts.
- **Rare**: at most one calligraphy on a page, and most pages have none. Never in
  the header, footer, contact block or any shared component (they appear on every
  page). Today the site uses no `Calligraphy` component at all; the only
  calligraphy is inside the two catalog artwork images on the home page.
- Catalog artwork (Arabic catalog, 12 Nov 2026) appears **as images inside
  cards only**: spread 16 yellow duotone camera (production) and spread 22
  multicolour calligraphy (creative). Cropped from the spread, never stretched
  or recoloured. Its red and orange stay inside the image.

## 11. Logo rules (guideline pages 4–9)

- Files from the Brand Library, served from `public/brand/`
  (`target-logo-blue.svg`, `target-logo-white.svg`; fill corrected to `#0161A6`).
- Blue on white, or white on blue. Set the height only (28–32 px in the header).
- Clear space on every side at least the size of the logo's ring (about one
  third of the logo height): the `p-2` around the logo link.
- Never: the wordmark alone, other colours, stretched, rotated, effects, inside
  a shape or box, or over a busy photo.

## 12. Photo rules

- Real and unedited board photos only, from Target's photo folder.
- Never stretched. Card crops (5:3) may trim a little sky or road but the board
  stays fully in frame; meaning never changes.
- A photo with an election poster or a person's face on the board goes to
  PHOTO-REVIEW.md and is not used until Ahmad decides.
- Boards without a photo show "الصورة عند الطلب / Photo on request", never a
  stock photo.
- Alt text in the page language on every image.

## 13. RTL rules

- `<html lang dir>` per page (`ar`/`rtl`, `en`/`ltr`), written at prerender.
- Logical utilities only for layout (`ms-`, `me-`, `ps-`, `pe-`, `start-`,
  `end-`, `border-s`). Direction icons mirror in RTL.
- Codes, phones, sizes and Latin words keep LTR inside Arabic (`.ltr-run`).
