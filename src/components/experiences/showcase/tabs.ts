/**
 * The home phone's screens, in Ahmad's order: Target's own services first,
 * Alrabiaa TV last (prompt 4, 2.5). Dot colours are the channel colours.
 */
export const SHOWCASE_TABS = [
  { key: 'boards', dot: 'bg-brand-grey' },
  { key: 'prod', dot: 'bg-brand-yellow' },
  { key: 'camp', dot: 'bg-brand-blue-60' },
  { key: 'reels', dot: 'bg-brand-yellow' },
  { key: 'tv', dot: 'bg-brand-green' },
] as const

export type ShowcaseKey = (typeof SHOWCASE_TABS)[number]['key']

/** Seconds on each screen, and the pause after the visitor picks one. */
export const ROTATE_SECONDS = 7
export const HOLD_SECONDS = 12

/** Next screen in the loop. */
export const nextTab = (index: number) => (index + 1) % SHOWCASE_TABS.length
