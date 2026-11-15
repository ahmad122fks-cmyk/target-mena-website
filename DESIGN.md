# DESIGN.md — target-mena.com

Design system for the Target Advertising website, in the getdesign.md format
(theme, colours, type, components, layout, depth, do/don't, responsive, agent
guide). Every page and component follows it.

Sources, in order: the official **Target Brand Guidelines 2024**, then Ahmad's
approved design reference of 15 Nov 2026 (folder `INTERNAL - design reference
(AdQuick style)`, not in Git): the clean layout language of a modern
outdoor-booking platform, dressed in Target's identity. Professional and calm,
with one "artistic show": the services block and the footer calligraphy.

---

## 1. Visual theme and atmosphere

- Product-like and calm: white and ghost-white bands, hairline borders, big
  centred headings, short grey text, real board photos.
- Rounded and friendly: pill buttons and chips, 20 px cards, soft shadows only
  on things that float (hero card, chips, selection panel, sticky bar).
- Target identity: the **blue**, **Readex Pro**, the **logo**, real photos, the
  channel colours in the services block, the blue calligraphy in the footer.
- One idea per section: a heading, a short paragraph, one main action.
- Arabic first (RTL at `/`), English mirrors it under `/en/`.

## 2. Colour palette and roles

Guideline values (pages 10–11). Tints are the colour mixed with white.
Tokens live in `src/styles/theme.css`.

| Token | Hex | Role |
| --- | --- | --- |
| `brand-blue` | `#0161A6` | Primary: pill buttons, links, codes, numbers, eyebrows |
| `brand-blue-80 / 60 / 40` | `#3481B8` `#67A0CA` `#99C0DB` | Hover, map illustration |
| `brand-blue-10` | `#E8F1F7` | Selected toggle, code pills, icon tiles |
| `brand-black` | `#000000` | Headings, footer background |
| `brand-text` | `#4D4D4F` | Body text (8.4:1 on white) |
| `brand-white` | `#FFFFFF` | Page background |
| `brand-ghost` | `#F5FAFA` | Alternate band, inset previews, panel footers |
| `line` | `#E6EEF4` | Hairline: section edges, card borders (Ahmad, 15 Nov 2026) |
| `input` | `#C6D8E0` (grey 40%) | Field and chip outlines |
| `brand-grey` | `#709EB2` | Outdoor channel card |
| `brand-yellow` | `#F7AF1C` | Production channel card |
| `brand-green` | `#2AB99D` | Alrabiaa TV channel card |
| `*-10` tints | `#E8F1F7` `#FEF7E8` `#F1F5F7` `#EAF8F5` | Fills behind text: selected, "in my list" (green), type pill (grey) |

Rules:
- No other colour. Red and orange appear **only inside** the catalog artwork.
- Text on yellow, green or grey is **black** (white fails WCAG AA there). The
  design reference shows white on grey and green; we keep black for contrast.
- On black (footer): white headings, grey-40 links, grey-60 small print.
- Channel colours: Grey = outdoor, Yellow = production, Green = Alrabiaa TV,
  Blue = brand. Only in the services block and on each channel's own page.

## 3. Typography

- **Readex Pro only**, self-hosted variable WOFF2 (Arabic ~23 KB, Latin ~31 KB),
  the page language's subset preloaded.
- Weights: 400 body, 500 nav, chips and links, 600 buttons, codes, numbers, card
  titles, 700 headings.

| Use | Phone / desktop | Weight |
| --- | --- | --- |
| H1 home hero | 36 / 58 px, line height 1.2 | 700 |
| H1 inner page | 32 / 40 px | 700 |
| H2 section (centred) | 30 / 44 px | 700 |
| H3 feature card | 22–28 px | 600 |
| Lead | 18–19 px, line height 1.8 | 400 |
| Body | 16–17 px | 400 |
| Eyebrow (`Eyebrow`) | 13 px, blue, letter-spaced in English only | 600 |
| Number card | 52 px blue | 600 |

- Never letter-space Arabic (it breaks the joined letters): tracking is `ltr:` only.
- Codes, phones, sizes and numbers sit in `.ltr-run` (LTR isolate, tabular
  numbers) inside Arabic text. Western digits everywhere.

## 4. Component styling

All from `src/components/ui` (shadcn) and `src/components/shared`. Reuse before
writing anything new; a second copy of the same markup is a bug.

- **PillButton** (shadcn Button): fully rounded, 48 px tall (44 px small), 15–16
  px medium. Tones: `blue` (main action), `outline` (1.5 px blue border, white),
  `ghost` (white with `input` border), `white` and `black` (on channel cards).
- **Eyebrow**: 13 px semibold blue label above a title. No bar, no icon.
- **FeatureCard**: white, `rounded-card` (20 px), 1 px `line` border, 28–36 px
  padding: Eyebrow, title, text, optional inset preview (`bg-brand-ghost`,
  14 px radius) and a "←" link at the bottom (arrow mirrors in English: "→").
- **StatCard**: same card, 52 px blue number, one line of text.
- **ProvinceChips**: white pills with `input` border, "Name · count", counts
  computed from boards.json. Selected chip: blue fill, white text.
- **BoardCard**: 18–20 px radius, 5:3 photo frame (true ratio inside), code
  in blue, type pill (grey-10), place, province, "H × W m · m² · faces", list
  toggle (blue "+ Add to my list" → green-10 "✓ In my list") and "Details".
- **SelectionPanel**: list body used by both the desktop side panel and the
  phone sheet: thumbnails, remove, total m², "Request these boards", copy
  link, clear. No prices.
- **CampaignSteps**: four bars with numbered dots; done and current are blue.
- **Fields**: 12 px radius, `input` border, 48 px tall. Segmented toggles
  (weeks/months, IQD/USD) inside one 12 px outline; selected = blue fill.
- **Header**: white, sticky, hairline bottom; logo, plain menu (lg and up),
  language link, outlined pill "Plan your campaign". Phones: shadcn Sheet menu.
- **ContactBlock**: centred, ghost band, "Let's work together", phone field +
  "Request a proposal", and the exact contact line. Same on every page.
- **Footer**: black, white logo, contact details, three link columns, blue
  calligraphy (mark-b) cropped at the inline-end top corner.
- **ToConfirm**: dashed box `[TO CONFIRM: …]` for unconfirmed facts. Must be gone
  before launch.

## 5. Layout principles

- Container: 1240 px (finder 1320 px), 16 px side padding on phones, 24 px from 640 px.
- Section padding: 64 px phone, 96 px desktop (72 px for short bands like the
  province chips). Gaps: 20–24 px between cards.
- Bands alternate **white** and **ghost**, each ghost band with a 1 px `line`
  border top and bottom. Headings centred on the home page.
- Home order: hero (ghost) → "a full team" (white) → two ways (ghost) → formats
  (white) → provinces (ghost) → platform (white) → services (ghost) → numbers and
  clients (white) → contact (ghost) → black footer.
- Finder: ghost title band → sticky filter bar → results with optional side panel.
- Campaign: ghost page, step bar, form card + sticky summary card.

## 6. Depth and elevation

- Mostly flat: borders, not shadows. `shadow-soft` (blue 6%) on the first
  feature card, sticky bar and chips; `shadow-float` (blue 10%) on the hero
  product card and the selection panel. No gradients, glass or glow.
- Radius: pills (buttons, chips), 20 px cards (`rounded-card`), 12 px fields
  and inner tiles (`rounded-field`), 18 px photos.

## 7. Do's and don'ts

Do:
- Keep each section to one message and one main action.
- Compute every number from boards.json (counts, m² totals) or take it from
  the brief. Real board photos only.
- Write every text in `ar` and `en` side by side in the page's `.content.json`.

Don't:
- Don't show prices, totals other than m², suppliers, client booking names,
  staff names or the parent company. Don't invent numbers, slogans or clients:
  use `ToConfirm`.
- Don't crop a board photo to a shape that cuts the board (no 3:4 portrait crops
  of landscape photos); frames keep the photo's true ratio.
- Don't add calligraphy beyond section 10.
- Don't use any font other than Readex Pro, or any colour not in section 2.

## 8. Responsive behaviour

- Breakpoints: 640 (sm), 1024 (lg: full menu, two columns, side panels), 1280 (xl).
- 375 px wide must work with **no horizontal scroll** (tested by Playwright).
- Touch targets at least 44 × 44 px.
- Phones: hero card below the text, floating chips tuck inside the card, filter
  bar scrolls its pills, selection opens as a bottom sheet, campaign summary
  goes under the form.
- Images: AVIF/WebP, several widths, explicit width and height, lazy below the
  fold.

## 9. Agent prompt guide

- "Band": `<Section tone="white|ghost" labelledBy="…">` + `SectionTitle`
  (centred H2 + optional lead).
- "Main button": `<PillButton href={link('/path')}>…</PillButton>`;
  secondary `tone="outline"`.
- "Card": `FeatureCard` (eyebrow, title, text, preview, link), `StatCard`.
- Text: `useT()(content.key)`; links: `useLink()('/path')`.
- Check: `npm run build && npm test && npm run test:e2e && npm run lhci`.

---

## 10. Calligraphy rules

- Source: the guideline's own **vector** shapes (`scripts/brand/extract_calligraphy.py`):
  `mark-a` = page 1, `mark-b` = page 40. **Never redraw, flip, rotate, stretch
  or skew** them.
- Inlined (`Calligraphy`), colour from the palette, only in guideline pairs:
  blue on black (footer, mark-b), white on grey (outdoor card, mark-a, 22%).
- Exactly two places: the footer (every page) and the outdoor services card
  (home). Nowhere else, never behind text where contrast drops below 4.5:1.
- Catalog artwork appears **as images inside the services cards only**: spread
  16 yellow duotone (production) and spread 22 multicolour (creative). Never
  stretched or recoloured; its red and orange stay inside the image.

## 11. Logo rules (guideline pages 4–9)

- `public/brand/target-logo-blue.svg` on white, `target-logo-white.svg` on black.
  Height only (28–32 px). Clear space at least one third of the logo height.
- Never: the wordmark alone, other colours, stretched, rotated, effects, inside
  a shape or box, or over a busy photo.

## 12. Photo rules

- Real and unedited board photos only, from Target's photo folder.
- Never stretched or cropped so the board is cut; meaning never changes.
- A photo with an election poster or a person's face on the board goes to
  PHOTO-REVIEW.md and is not used until Ahmad decides.
- Boards without a photo show "الصورة عند الطلب / Photo on request".
- The hero map is a decorative illustration: no board codes, no real positions.
- Alt text in the page language on every image.

## 13. RTL rules

- `<html lang dir>` per page (`ar`/`rtl`, `en`/`ltr`), written at prerender.
- Logical utilities only (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`).
  Arrows: "←" in Arabic, "→" in English (they live in the content files).
- Codes, phones, sizes and Latin words keep LTR inside Arabic (`.ltr-run`).
