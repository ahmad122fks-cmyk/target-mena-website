/*
 * Pure timing for the Creative & Digital phone screens (no React, tested in
 * tests/unit/digital.test.ts). Each screen is a loop of numbered steps; an
 * element that appears at step `at` stays until the loop starts again.
 */

/** The step after `step` in a loop of `count` steps (back to 0 after the last). */
export function nextStep(step: number, count: number): number {
  return count > 0 ? (step + 1) % count : 0
}

/** First `count` characters of a text, by code point (a letter is never cut in half). */
export function typedText(text: string, count: number): string {
  return Array.from(text).slice(0, Math.max(0, count)).join('')
}

/** AI screen, in ticks of ~70 ms: type the prompt, pause, generate, show the tiles, hold. */
export const AI_TIMING = { pause: 8, generate: 16, tileGap: 4, pick: 6, hold: 28 } as const
export const AI_TILES = 4

export type AiFrame = {
  /** Characters of the prompt typed so far. */
  typed: number
  generating: boolean
  /** Generation bar, 0 to 1. */
  progress: number
  /** Result tiles shown (0 to AI_TILES). */
  tiles: number
  /** The first tile is marked as the chosen design. */
  picked: boolean
}

/** Ticks in one AI loop for a prompt of `length` characters. */
export function aiCycle(length: number): number {
  const { pause, generate, tileGap, pick, hold } = AI_TIMING
  return length + pause + generate + AI_TILES * tileGap + pick + hold
}

/** What the AI screen shows at `tick` (loops forever). */
export function aiFrame(tick: number, length: number): AiFrame {
  const { pause, generate, tileGap, pick } = AI_TIMING
  const cycle = aiCycle(length)
  const t = ((tick % cycle) + cycle) % cycle
  const start = length + pause
  const end = start + generate
  return {
    typed: Math.min(t, length),
    generating: t >= start && t < end,
    progress: Math.min(1, Math.max(0, (t - start) / generate)),
    tiles: t < end ? 0 : Math.min(AI_TILES, Math.floor((t - end) / tileGap) + 1),
    picked: t >= end + AI_TILES * tileGap + pick,
  }
}
