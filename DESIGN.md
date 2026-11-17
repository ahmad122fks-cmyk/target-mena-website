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

| Token                     | Hex                                     | Role                                                                |
| ------------------------- | --------------------------------------- | ------------------------------------------------------------------- |
| `brand-blue`              | `#0161A6`                               | Primary: pill buttons, links, codes, numbers, eyebrows              |
| `brand-blue-80 / 60 / 40` | `#3481B8` `#67A0CA` `#99C0DB`           | Hover, map illustration                                             |
| `brand-blue-10`           | `#E8F1F7`                               | Selected toggle, code pills, icon tiles                             |
| `brand-black`             | `#000000`                               | Headings, footer background                                         |
| `brand-text`              | `#4D4D4F`                               | Body text (8.4:1 on white)                                          |
| `brand-white`             | `#FFFFFF`                               | Page background                                                     |
| `brand-ghost`             | `#F5FAFA`                               | Alternate band, inset previews, panel footers                       |
| `line`                    | `#E6EEF4`                               | Hairline: section edges, card borders (Ahmad, 15 Nov 2026)          |
| `input`                   | `#C6D8E0` (grey 40%)                    | Field and chip outlines                                             |
| `brand-grey`              | `#709EB2`                               | Outdoor channel card                                                |
| `brand-yellow`            | `#F7AF1C`                               | Production channel card                                             |
| `brand-green`             | `#2AB99D`                               | Alrabiaa TV channel card                                            |
| `*-10` tints              | `#E8F1F7` `#FEF7E8` `#F1F5F7` `#EAF8F5` | Fills behind text: selected, "in my list" (green), type pill (grey) |

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

| Use                  | Phone / desktop                            | Weight |
| -------------------- | ------------------------------------------ | ------ |
| H1 home hero         | 36 / 58 px, line height 1.2                | 700    |
| H1 inner page        | 32 / 40 px                                 | 700    |
| H2 section (centred) | 30 / 44 px                                 | 700    |
| H3 feature card      | 22–28 px                                   | 600    |
| Lead                 | 18–19 px, line height 1.8                  | 400    |
| Body                 | 16–17 px                                   | 400    |
| Eyebrow (`Eyebrow`)  | 13 px, blue, letter-spaced in English only | 600    |
| Number card          | 52 px blue                                 | 600    |

- Never letter-space Arabic (it breaks the joined letters): tracking is `ltr:` only.
- Codes, phones, sizes and numbers sit in `.ltr-run` (LTR isolate, tabular
  numbers) inside Arabic text. Western digits everywhere.

## 4. Component styling

All from `src/components/ui` (shadcn) and `src/components/shared`. Reuse before
writing anything new; a second copy of the same markup is a bug.

- **PillButton** (shadcn Button; the name stays, the shape changed in v3):
  10 px corners (`rounded-btn`), 48 px tall (44 px small), 15–16 px semibold.
  Tones: `blue` (primary), `outline` (v3 secondary: white, 1 px `line-strong`),
  `yellow` (a main action other than the campaign one, e.g. Network's
  "Find a board"), `green` (Alrabiaa only), `outlineWhite` (secondary on
  blue). Pills stay only for filters and small tags. See section 14.
- **CampaignButton**: "Plan your campaign", the site's main action (header,
  phone menu, CTA band). A yellow key with a black arrow chip that asks to be
  pressed (Ahmad, 17 Nov 2026): it rests on a 3 px dark edge, rises 2 px on
  hover and sinks when pressed; every 8 s two Target rings leave it and the
  arrow nudges forward (transform/opacity only, still under reduced motion
  and on the campaign page). Phones: in the menu, the header has no room.
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
- **Header**: page colour (white / dark blue), sticky, hairline bottom; logo
  (blue on light, white on dark), plain menu (xl and up), client login,
  language link, sun/moon theme toggle, the yellow CampaignButton. Phones:
  shadcn Sheet menu (with the theme toggle and the CampaignButton).
- **ContactBlock**: centred, ghost band, "Let's work together", phone field +
  "Request a proposal", and the exact contact line. Same on every page.
- **Footer**: black, white logo, contact details, three link columns, blue
  calligraphy (mark-b) cropped at the inline-end top corner.
- **AnnouncementBar** (home only): blue strip above the header, yellow "New"
  pill, the newest campaign's one line, links to `#feed`.
- **Feed card** ("Our latest campaigns"): 300 px, 18 px radius, 4:3 real photo
  (or the client's logo on a clean card when no photo is approved), "New" pill,
  month + year · places, brand, one line, grey tag pills, up to 3 small extra
  photos. Entries live in `src/content/campaigns.json`, client-approved only.
- **ClientLogin**: plain text link next to the language link (and in the phone
  menu) to the client portal, new tab.
- **ToConfirm**: dashed box `[TO CONFIRM: …]` for unconfirmed facts. Must be gone
  before launch.

## 5. Layout principles

- Container: 1240 px (finder 1320 px), 16 px side padding on phones, 24 px from 640 px.
- Section padding: 64 px phone, 96 px desktop (72 px for short bands like the
  province chips). Gaps: 20–24 px between cards.
- Bands alternate **white** and **ghost**, each ghost band with a 1 px `line`
  border top and bottom. Headings centred on the home page.
- Home order (v2, prompt 4): blue announcement bar → header → **dark hero**
  (text, search and service chips at the start; the services phone at the end;
  the network map; the four network counters) → latest campaigns → animated
  service tiles → platform (finder, list, planner) → street photos (dark) →
  client portal → Alrabiaa planner (dark, green accents) → blue call to action
  → contact → footer.
- Network order: dark tour band (5 stops + map) → dark "on the ground" (swipe
  phone + tracking demo) → numbers and charts → street photos → links to every
  province, highway and type page → blue call to action.
- Finder: ghost title band → sticky filter bar → results with optional side panel.
- Campaign: ghost page, step bar, form card + sticky summary card.

## 6. Depth and elevation

- Mostly flat: borders, not shadows. `shadow-soft` (blue 6%) on the first
  feature card, sticky bar and chips; `shadow-float` (blue 10%) on the hero
  product card and the selection panel. No gradients, glass or glow on
  content; the experiences (section 13) may use them inside their own frame
  (map halos and vignette, stage-light beams, lens flare, LED glow).
- Radius: pills (buttons, chips), 20 px cards (`rounded-card`), 12 px fields
  and inner tiles (`rounded-field`), 18 px photos.

## 7. Do's and don'ts

Do:

- Keep each section to one message and one main action.
- Compute every number from boards.json (counts, m² totals) or take it from
  the brief. Real board photos only.
- Write every text in `ar` and `en` side by side in the page's `.content.json`.

Don't:

- Don't show prices, totals other than m², availability or booking dates,
  suppliers, client booking names (except approved feed entries), staff names
  or the parent company. Don't invent numbers, slogans or clients:
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
- Exactly two places: the footer (every page) and the Creative & Digital page,
  where the marks float slowly (translate/opacity only, never rotated; prompt 4,
  Ahmad 16 Nov 2026). Nowhere else, never behind text where contrast drops
  below 4.5:1.
- Catalog artwork appears **as images inside the services cards only**: spread
  16 yellow duotone (production) and spread 22 multicolour (creative). Never
  stretched or recoloured; its red and orange stay inside the image.

## 11. Logo rules (guideline pages 4–9)

- `public/brand/target-logo-blue.svg` on white, `target-logo-white.svg` on black
  and on the dark-blue theme (both files are in the header; CSS shows the right one).
  Height only (28–32 px). Clear space at least one third of the logo height.
- Never: the wordmark alone, other colours, stretched, rotated, effects, inside
  a shape or box, or over a busy photo.

## 12. Photo rules

- Real and unedited board photos only, from Target's photo folder.
- Never stretched or cropped so the board is cut; meaning never changes.
- A photo with an election or party poster, a politician or any person's face
  on a board, or passers-by's faces close to the camera goes to PHOTO-REVIEW.md
  and is not used until Ahmad decides. When unsure, hold it.
- Campaign feed photos: real installed photos only, no other brand in view.
- Boards without a photo show "الصورة عند الطلب / Photo on request".
- The hero map is a decorative illustration: no board codes, no real positions.
- Alt text in the page language on every image.

## 13. RTL rules

- `<html lang dir>` per page (`ar`/`rtl`, `en`/`ltr`), written at prerender.
- Logical utilities only (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`).
  Arrows: "←" in Arabic, "→" in English (they live in the content files).
- Codes, phones, sizes and Latin words keep LTR inside Arabic (`.ltr-run`).

---

## 12. Dark theme (prompt 4, Ahmad 16 Nov 2026)

Dark blue derived from Target blue, never pure black. The visitor chooses with
the sun/moon toggle (header, phone menu); the choice is kept in localStorage;
without one the device setting decides. A tiny inline script in `index.html`
sets the `dark` class on `<html>` before the first paint (same logic as
`src/features/theme/theme.ts`, checked by `tests/unit/theme.test.ts`), so a
prerendered page never flashes the wrong theme.

| Role token    | Light        | Dark                               | Use                                                                            |
| ------------- | ------------ | ---------------------------------- | ------------------------------------------------------------------------------ |
| `page`        | `#FFFFFF`    | `#071A2E`                          | Band and header background                                                     |
| `brand-ghost` | `#F5FAFA`    | `#0B2340`                          | Alternate band                                                                 |
| `deep`        | `#000000`    | `#04111F`                          | Today's black sections: hero, map, production, footer, Alrabiaa, street photos |
| `surface`     | `#FFFFFF`    | `#0F2B4D`                          | Cards, sheets, panels                                                          |
| `field`       | `#FFFFFF`    | `#0B2340`                          | Inputs, chips                                                                  |
| `line`        | `#E6EEF4`    | `#1F4A78`                          | Hairlines                                                                      |
| `ink`         | `#000000`    | `#EAF2F8`                          | Headings, strong text                                                          |
| `brand-text`  | `#4D4D4F`    | `#A9C1D4`                          | Body text                                                                      |
| `link`        | `#0161A6`    | `#4DA8E8`                          | Links, outlines, eyebrows                                                      |
| `*-10` tints  | as section 2 | colour mixed into the dark surface | Fills behind text                                                              |

- Unchanged in both: yellow `#F7AF1C` (main buttons), green `#2AB99D`
  (Alrabiaa), grey, blue `#0161A6` for filled buttons, board photos as they are.
- Text on yellow, green or grey stays black (`text-brand-black`), in both themes.
- Every text pair is at least 4.5:1 in both themes (tested).
- Seasonal themes later: one data file (dates + accent + optional overlay)
  that sets the same role tokens. Not built yet.

## 13. Experiences and motion (prompt 4)

Each service has its own motif; the guideline colours stay fixed. The visitor
knows where they are before reading.

| Section            | Motif                                                              | Colour                                                       | Motion                                                   | Where                                 |
| ------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------- |
| Outdoor            | The map is the hero: a pulse on every province, roads that move    | Target blue over a dark satellite image, yellow for highways | Pulse every 2.4 s, smooth fly between Iraq and provinces | Home, Network, province pages, finder |
| Production         | Everything inside a film frame: running timecode, REC, progress    | Target yellow, duotone photos, black bars                    | Progress bar runs, the five stages light up in turn      | Production page, home phone           |
| Creative & digital | A phone whose posts change, catalog calligraphy floating around it | Catalog multicolour calligraphy over clean white             | Posts scroll by themselves, shapes float slowly          | Creative & Digital page, home phone   |
| Alrabiaa TV        | An on-air screen: sound bars and a schedule                        | Black with Alrabiaa green                                    | Bars move to a beat, on-air dot                          | Alrabiaa page, home phone and tile    |
| Events             | Stage and lights: two beams over the stage                         | Black with a yellow and a blue beam                          | Lights swing slowly behind the title                     | Events, home tile                     |

Site-wide motion rules:

- Durations: small 200 ms, medium 400 ms, large 800 ms. Curve
  `cubic-bezier(.2,.8,.2,1)`.
- Reveal on scroll: rise 16 px and fade in, once only.
- Only `transform` and `opacity` (CSS) or `requestAnimationFrame`; loops pause
  off screen (`useInView`) and when their tab or phone is hidden.
- `prefers-reduced-motion`: every loop stops on a still frame
  (`src/styles/motion.css`), counters show their final value, the map jumps
  instead of flying, autoplay stops.
- The prerendered HTML is a meaningful still: the map's outline, markers and
  counts; the counters' final numbers; the phones' first frame.
- Components: `src/components/map` (NetworkMap), `src/components/experiences`
  (PhoneFrame, PhoneShowcase, BoardSwipe, TargetReels, SocialCampaign,
  production/ProductionViewfinder, digital/*). Heavy screens load with a
  dynamic `import()`, so each page stays inside its 150 KB JS budget.
- Demo content is always labelled («بيانات تجريبية» / «صورة توضيحية ببيانات
  تجريبية»). The map shows counts only: never a board's details, price or
  availability.
- Map frame (prompt 5): light theme = a clean frame (20 px radius, 1 px
  `line-strong`, `shadow-frame`, navy under the photo while it loads) and the
  satellite photo edge to edge (`cover`: zoom 1 uses the larger of the
  width/height ratios, the pan never leaves the photo, no edge fade, no
  vignette). Dark theme: as in prompt 4 (photo fits inside, dark frame,
  vignette). NetworkMap props `cover` and `vignette` override the theme; the
  defaults are CSS (`map-auto`, `dark:`), so the prerendered page is right in
  both themes before any script runs. Tested in `tests/unit/map-cover.test.ts`.

## 14. v3: light and professional (prompt 5, Ahmad 16 Nov 2026)

Same behaviour, cleaner look. Source: the "v3 FINAL" row of Ahmad's canvas
(`INTERNAL - design reference v2 …/project/Style3, Main3, Network3,
Production3, Digital3, TargetNews`). Where this section and an older one
disagree, this one wins.

- **Light theme is the default look.** No section darker than ghost `#F5FAFA`;
  bands alternate white and ghost with 1 px `line` (`#E6EEF4`) hairlines.
  Colour share ≈ white 58 %, ghost 24 %, blue 10 %, text 5 %, yellow 3 %.
- **Dark things are framed objects, never full-width bands:** the satellite
  map, the production viewfinder, the showreel player, the Alrabiaa card
  (`alrabiaa` `#0B1A16`) and phone/device frames (`navy` `#0B2340`).
- **Type:** H1 56/66 700, H2 40/50 700, H3 20 600, body 17/30. Content 1240 px,
  sections 88 px apart (`Section`, `SectionHeading`). No letter-spacing on
  Arabic (`ltr:tracking-*` only).
- **Buttons:** primary blue with white text, 10 px; secondary white with 1 px
  `line-strong` (`#DCE7EF`). Yellow only for the main call to action; green
  only for Alrabiaa (its links use `#127A66` on white for contrast).
- **Cards:** white, 1 px `line`, 20 px, `card-lift` (4 px lift + `shadow-card`
  `0 18px 40px rgb(1 97 166 / .12)`). Service art sits on soft panels:
  `panel-blue #EAF3FA`, `panel-yellow #FFF4DC`, `panel-green #E8F7F3`,
  `panel-grey #EEF2F5` (Alrabiaa keeps its dark green).
- **Header:** white with the yellow "Plan your campaign" key (CampaignButton,
  17 Nov 2026; was blue) on every page; on the home page it sits on the blue
  hero (white logo and links) and turns solid blue once the page scrolls
  (`header-on-hero`, `useScrolled`).
- **Home hero:** the Target brand pattern in CSS/SVG (no image): blue gradient
  `#0161A6 → #01508C → #0B3B66` (`hero-1/2/3`; navy in dark), the big ring
  turning slowly, the dot grid fading out, the four diagonal stripes (white,
  yellow, green, grey) and the two calligraphy marks in white at 7–8 %. The ring
  and stripes sit on the phone side (mirrored in Arabic) so they never cross the
  headline or the numbers. Phones keep ring and stripes only. Text on the hero:
  white, `on-blue` `#D6E7F3` for secondary lines.
- **One CTA band per page** (blue, `CtaBand`): pages without their own get the
  standard one from the layout (`ClosingBand`). Home's band carries the phone
  field; Contact keeps "Let's work together" with the phone field
  (`ContactBlock`). The contact line wraps between items only (`dot-list`).
- **Footer:** light ghost, the theme's logo, the exact contact block.
- **TargetNews** (home hero phone): a white news-app screen in the navy frame,
  fed from approved items in `src/content/campaigns.json`, then articles, then
  the house items in `src/content/news.json`; newest 4.
- **Videos (prompt 4b):** muted loops at their true ratio inside navy frames
  (`LazyVideo`): play at 50 % in view, pause out of view, poster only with a
  play button under reduced motion or Save-Data. A section shows only when its
  files are in `public/video/` (`ready` in `src/content/videos.json`).
- **Dark theme:** the navy tokens from section 12, same layout and order.
