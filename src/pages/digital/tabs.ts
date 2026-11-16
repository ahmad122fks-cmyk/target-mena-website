/*
 * The six service tabs of the Creative & Digital page (same order as
 * digital.hero.content.json) and their keyboard logic (WAI-ARIA tabs),
 * kept pure so tests/unit/digital.test.ts can check it.
 */
export const TAB_IDS = ['campaign', 'social', 'identity', 'uiux', '3d', 'ai'] as const
export type TabId = (typeof TAB_IDS)[number]

export const DEFAULT_TAB: TabId = 'campaign'

export function isTabId(value: string): value is TabId {
  return (TAB_IDS as readonly string[]).includes(value)
}

/**
 * Index of the tab a key moves to, or null for other keys. Arrows follow the
 * screen, so in Arabic (right to left) ArrowLeft goes to the next tab. Down
 * and Up also step through; Home and End jump to the ends; it wraps around.
 */
export function tabFromKey(
  key: string,
  index: number,
  count: number,
  dir: 'rtl' | 'ltr',
): number | null {
  const next = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
  const previous = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
  if (key === next || key === 'ArrowDown') return (index + 1) % count
  if (key === previous || key === 'ArrowUp') return (index - 1 + count) % count
  if (key === 'Home') return 0
  if (key === 'End') return count - 1
  return null
}
