/*
 * Pure rules shared by the vertical phone decks (BoardSwipe, TargetReels):
 * which card comes next, when a drag, wheel or key counts as a step, and
 * when autoplay may move again. Tested in tests/unit/experiences.test.ts.
 */

/** Next index with wrap-around: wrapIndex(8, 1, 9) -> 0, wrapIndex(0, -1, 9) -> 8. */
export function wrapIndex(index: number, delta: number, count: number): number {
  if (count <= 0) return 0
  return (((index + delta) % count) + count) % count
}

/** True when card `index` is within `reach` steps of `current` (around the loop). */
export function isNear(index: number, current: number, count: number, reach = 1): boolean {
  const gap = Math.abs(index - current)
  return Math.min(gap, count - gap) <= reach
}

/** A vertical drag: up (negative dy) = next, down = previous, small moves = none. */
export function swipeStep(dy: number, threshold = 36): -1 | 0 | 1 {
  if (Math.abs(dy) <= threshold) return 0
  return dy < 0 ? 1 : -1
}

/** A tap: the pointer barely moved between down and up. */
export function isTap(dy: number, slop = 10): boolean {
  return Math.abs(dy) <= slop
}

/**
 * Mouse wheel / trackpad: one step per gesture. Tiny deltas and events that
 * arrive within `gap` ms of the last step (trackpad momentum) are ignored.
 */
export function wheelStep(deltaY: number, sinceLast: number, minDelta = 12, gap = 650) {
  if (Math.abs(deltaY) < minDelta || sinceLast < gap) return 0
  return deltaY > 0 ? 1 : -1
}

/** Keyboard on the focused screen: arrows and page keys move one card. */
export function keyStep(key: string): -1 | 0 | 1 {
  if (key === 'ArrowDown' || key === 'PageDown') return 1
  if (key === 'ArrowUp' || key === 'PageUp') return -1
  return 0
}

/**
 * Wait before the next automatic step: the normal pace, or longer while the
 * visitor's last interaction is still inside the pause window.
 */
export function autoDelay(sinceTouch: number, autoMs: number, pauseMs: number): number {
  return Math.max(autoMs, pauseMs - sinceTouch)
}

/** Text split into runs; codes, sizes and numbers (ltr) stay left-to-right inside Arabic. */
export function splitLtr(text: string): { text: string; ltr: boolean }[] {
  const parts: { text: string; ltr: boolean }[] = []
  const pattern = /[0-9A-Z][0-9A-Z.×\- ]*[0-9A-Z]|[0-9]/g
  let last = 0
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) parts.push({ text: text.slice(last, match.index), ltr: false })
    parts.push({ text: match[0], ltr: true })
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push({ text: text.slice(last), ltr: false })
  return parts
}
