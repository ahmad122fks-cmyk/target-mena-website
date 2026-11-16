/** Film timecode HH:MM:SS:FF at 25 frames per second (PAL, as on the set in Iraq). */
export const FPS = 25

export function timecode(frames: number): string {
  const pad = (n: number) => String(Math.floor(n)).padStart(2, '0')
  const seconds = frames / FPS
  return [seconds / 3600, (seconds / 60) % 60, seconds % 60, frames % FPS].map(pad).join(':')
}
