import type { CSSProperties } from 'react'
import type { NewsTone } from '@/features/news/build'

/**
 * The news app screen stays white in both themes, like a real screenshot.
 * The role tokens used inside keep their light values here (src/styles/theme.css),
 * whatever the page theme, so every pair below stays >= 4.5:1.
 */
export const SCREEN_STYLE = {
  '--heading': 'var(--color-brand-black)',
  '--color-brand-text': '#4d4d4f',
  '--color-brand-ghost': '#f5fafa',
  '--color-line': '#e6eef4',
  '--color-line-strong': '#dce7ef',
  '--color-link': '#0161a6',
  '--color-brand-blue-10': '#e8f1f7',
  '--color-panel-yellow': '#fff4dc',
  '--color-panel-green': '#e8f7f3',
} as CSSProperties

/**
 * Post tags: new campaign on the yellow panel, Alrabiaa on the green one (black
 * text on yellow and green, DESIGN.md 2), everything else Target blue on blue
 * 10%. Contrast: black on #FFF4DC 19.5:1, on #E8F7F3 19.6:1; #0161A6 on #E8F1F7 5.6:1.
 */
export const TONES: Record<NewsTone, string> = {
  yellow: 'bg-panel-yellow text-brand-black',
  blue: 'bg-brand-blue-10 text-brand-blue',
  green: 'bg-panel-green text-brand-black',
}

/** Rendered width of the post photo (inner screen 264 px minus 2 x 14 px padding). */
export const POST_SIZES = '240px'
