/*
 * Pure logic of the production viewfinder (Production.dc.html): timecode at
 * 25 fps, the three framings of the camera photo and the five stages.
 * No React here, so it is unit-tested (tests/unit/production.test.ts).
 */

export const FPS = 25
/** One shot lasts 2.6 s (65 frames), then a whip-pan cut to the next framing. */
export const SHOT_MS = 2600
/** The clapstick closes, then the scene changes. */
export const CLAP_MS = 160
/** Phone screen: each stage bar fills in 1.6 s. */
export const PHONE_STAGE_MS = 1600

/**
 * Three framings of the same still (camera moves, never a stretch). `frame`
 * picks the part of the square photo and the zoom centre; `move` is the
 * keyframed camera move in camera.css.
 */
export const SHOTS = [
  { frame: 'object-[50%_55%] origin-center', move: 'pv-cam-wide' }, // wide push-in, rack focus
  { frame: 'object-center origin-[22%_30%]', move: 'pv-cam-lens' }, // lens and matte box
  { frame: 'object-top origin-[38%_15%]', move: 'pv-cam-rig' }, // monitor and rig, slow pan
] as const

const pad = (n: number) => String(n).padStart(2, '0')

/** Whole frames in `ms` milliseconds of footage. */
export function framesIn(ms: number): number {
  return Math.floor((Math.max(0, ms) * FPS) / 1000)
}

/** HH:MM:SS:FF at 25 fps; wraps after 24 hours like a camera. */
export function formatTimecode(frames: number): string {
  const total = Math.max(0, Math.floor(frames))
  const seconds = Math.floor(total / FPS)
  return [Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60, total % FPS]
    .map(pad)
    .join(':')
}

/** Which framing a cut shows: 0 wide, 1 lens, 2 rig, then round again. */
export function shotAt(cut: number): number {
  return ((cut % SHOTS.length) + SHOTS.length) % SHOTS.length
}

/** Take number in the corner of the frame: 3 to 9, then back to 3. */
export function takeAt(cut: number): number {
  return 3 + (Math.max(0, cut) % 7)
}

/** The stage after `stage`; after the last one, back to the first. */
export function nextStage(stage: number, count: number): number {
  return (stage + 1) % count
}

export function isLastStage(stage: number, count: number): boolean {
  return stage === count - 1
}

/** A stage seen from the current one: already done, running now, or still to come. */
export function stageState(stage: number, current: number): 'done' | 'current' | 'next' {
  if (stage < current) return 'done'
  return stage === current ? 'current' : 'next'
}
