/*
 * The demo campaign's timeline: 12 steps of 0.9 s, then it starts again.
 * Draft (0-1) -> Scheduled (2) -> Live now (3+); one platform goes live per
 * step from step 3; the reach bars grow with it. Demo only, no numbers shown.
 */
export const STEPS = 12
export const STEP_MS = 900
/** The still frame for reduced motion and the static render of a finished campaign. */
export const FINAL_STEP = STEPS - 1

export type Status = 'draft' | 'scheduled' | 'live'
export type PlatformState = 'queued' | 'publishing' | 'published'

export function nextStep(step: number): number {
  return (step + 1) % STEPS
}

export function campaignStage(step: number, platforms: number) {
  const status: Status = step < 2 ? 'draft' : step < 3 ? 'scheduled' : 'live'
  return {
    status,
    /** How many platforms are already live. */
    published: Math.max(0, Math.min(platforms, step - 2)),
    /** The highlighted format chip (post, story, reel), turning each step. */
    format: step % 3,
    liked: step >= 5,
    /** 0..1: how far the reach bars have grown. */
    growth: Math.max(0, step - 2) / (STEPS - 3),
    /** Like / comment / share / follow bubbles float up once it is live. */
    bubbles: step >= 3,
  }
}

export function platformState(j: number, step: number, published: number): PlatformState {
  if (j < published) return 'published'
  return j === published && step >= 2 ? 'publishing' : 'queued'
}

/** Bar heights (share of the chart) for the demo reach chart, rising to the end. */
export const BARS = [18, 26, 22, 34, 40, 38, 52, 60, 72, 86]

export function barScale(growth: number): number {
  return 0.15 + 0.85 * growth
}
