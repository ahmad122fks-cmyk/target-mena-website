import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { THEME_BOOT } from '@/features/theme/theme'

/*
 * Both themes keep every text pair at WCAG AA (4.5:1) or better
 * (prompt 4, section 4). Colours are read from src/styles/theme.css, so a
 * token change that breaks contrast fails here.
 */
const css = fs.readFileSync('src/styles/theme.css', 'utf8')

function tokens(block: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [, name, value] of block.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi))
    out[name.replace(/^color-/, '')] = value.toLowerCase()
  return out
}

const light = tokens(css.split('.dark {')[0])
const dark = { ...light, ...tokens(css.split('.dark {')[1].split('}')[0]) }

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/** [text token, background token] pairs used on the site. */
const PAIRS: [string, string][] = [
  ['ink', 'page'],
  ['ink', 'surface'],
  ['ink', 'brand-ghost'],
  ['ink', 'brand-blue-10'],
  ['ink', 'brand-green-10'],
  ['ink', 'brand-yellow-10'],
  ['ink', 'brand-grey-10'],
  ['brand-text', 'page'],
  ['brand-text', 'surface'],
  ['brand-text', 'brand-ghost'],
  ['brand-text', 'field'],
  ['link', 'page'],
  ['link', 'surface'],
  ['link', 'brand-ghost'],
  ['link', 'brand-blue-10'],
  ['brand-white', 'brand-blue'],
  ['brand-white', 'deep'],
  ['brand-grey-40', 'deep'],
  ['brand-yellow', 'deep'],
  ['brand-green', 'deep'],
  ['brand-black', 'brand-yellow'],
  ['brand-black', 'brand-green'],
  ['brand-black', 'brand-grey'],
]

describe('theme contrast', () => {
  for (const [name, theme] of [
    ['light', light],
    ['dark', dark],
  ] as const)
    it.each(PAIRS)(`${name}: %s on %s is at least 4.5:1`, (text, background) => {
      expect(theme[text], `${text} missing`).toBeDefined()
      expect(theme[background], `${background} missing`).toBeDefined()
      expect(contrast(theme[text], theme[background])).toBeGreaterThanOrEqual(4.5)
    })

  it('uses the dark-blue values Ahmad set (never pure black)', () => {
    expect(dark.page).toBe('#071a2e')
    expect(dark['brand-ghost']).toBe('#0b2340')
    expect(dark.deep).toBe('#04111f')
    expect(dark.surface).toBe('#0f2b4d')
    expect(dark.line).toBe('#1f4a78')
    expect(dark.ink).toBe('#eaf2f8')
    expect(dark['brand-text']).toBe('#a9c1d4')
    expect(dark.link).toBe('#4da8e8')
  })
})

describe('theme before first paint', () => {
  it('index.html runs the same boot script as src/features/theme', () => {
    expect(fs.readFileSync('index.html', 'utf8')).toContain(`<script>${THEME_BOOT}</script>`)
  })
})
