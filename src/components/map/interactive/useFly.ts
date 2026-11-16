import { useEffect, useMemo, useRef, type RefObject } from 'react'
import { clampCam, interpolateCam, type Cam } from '../camera'
import type { MapState, SetMapState } from '../state'

export type Fly = {
  /** Smooth flight (ease-in-out cubic, zoom in log space); a jump under reduced motion. */
  to: (target: Cam, ms?: number) => void
  /** Jump (drag, wheel, first frame). */
  set: (cam: Cam) => void
  stop: () => void
}

/**
 * Camera moves on requestAnimationFrame, one at a time; targets are kept over
 * the map. In cover every frame is also clamped to the box of that moment, so
 * the photo keeps filling the frame if the box changes mid-flight.
 */
export function useFly(latest: RefObject<MapState>, setState: SetMapState, reduced: boolean): Fly {
  const frame = useRef(0)
  useEffect(() => () => cancelAnimationFrame(frame.current), [])
  return useMemo(() => {
    const set = (cam: Cam) =>
      setState((s) => ({ ...s, cam: s.box?.cover ? clampCam(cam, s.box) : cam }))
    const stop = () => cancelAnimationFrame(frame.current)
    const to = (target: Cam, ms = 1100) => {
      stop()
      const { cam: from, box } = latest.current
      const end = box ? clampCam(target, box) : target
      if (reduced || ms <= 0) return set(end)
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / ms)
        set(interpolateCam(from, end, t))
        if (t < 1) frame.current = requestAnimationFrame(step)
      }
      frame.current = requestAnimationFrame(step)
    }
    return { to, set, stop }
  }, [latest, setState, reduced])
}
