import { useEffect, useRef, useState } from 'react'
import { useInView, usePrefersReducedMotion } from '@/lib/motion'
import { CLAP_MS, framesIn, nextStage } from './viewfinder'

/**
 * The viewfinder rolls only while it is wanted (`active`), on screen and
 * motion is allowed. Otherwise it holds a still frame (the server render).
 */
export function useFilmRunning<T extends Element>(active: boolean) {
  const [ref, inView] = useInView<T>({ threshold: 0.1 })
  const reduce = usePrefersReducedMotion()
  return { ref, running: active && inView && !reduce }
}

/**
 * Frames rolled so far at 25 fps, from requestAnimationFrame. Re-renders
 * only when the frame number changes; pausing keeps the count, so the
 * timecode carries on where it stopped.
 */
export function useFrames(running: boolean): number {
  const [frames, setFrames] = useState(0)
  const rolled = useRef(0)
  useEffect(() => {
    if (!running) return
    let id = 0
    const from = rolled.current
    const start = performance.now()
    const tick = (now: number) => {
      const frame = from + framesIn(now - start)
      if (frame !== rolled.current) {
        rolled.current = frame
        setFrames(frame)
      }
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [running])
  return frames
}

/**
 * The clapperboard: «أكشن» closes the clapstick, then the next stage comes
 * in with a soft flash. `flash` counts the claps (a key that restarts it).
 */
export function useClapper(count: number) {
  const [stage, setStage] = useState(0)
  const [clapping, setClapping] = useState(false)
  const [flash, setFlash] = useState(0)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const go = (next: number) => {
    setClapping(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setClapping(false)
      setStage(next)
      setFlash((n) => n + 1)
    }, CLAP_MS)
  }
  return { stage, clapping, flash, go, action: () => go(nextStage(stage, count)) }
}

/** The clapperboard state, shared when «أكشن» sits outside the viewfinder. */
export type Clapper = ReturnType<typeof useClapper>
