/*
 * Motion helpers (DESIGN.md 12): everything moves with CSS transforms,
 * opacity or requestAnimationFrame, stops when off screen and stays still
 * for visitors who ask for reduced motion.
 */
import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react'

const REDUCE = '(prefers-reduced-motion: reduce)'

function subscribeReduce(listener: () => void) {
  const query = window.matchMedia(REDUCE)
  query.addEventListener('change', listener)
  return () => query.removeEventListener('change', listener)
}

/** True when the visitor asked for reduced motion (false on the server). */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(REDUCE).matches,
    () => false,
  )
}

type InViewOptions = { threshold?: number; rootMargin?: string; once?: boolean }

/**
 * Whether the element is on screen now (or, with `once`, has been). Used to
 * start an intro when a section arrives and to pause loops that scrolled away.
 */
export function useInView<T extends Element>(
  options: InViewOptions = {},
): [RefObject<T | null>, boolean] {
  const { threshold = 0, rootMargin = '0px', once = false } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (!('IntersectionObserver' in window)) return setInView(true)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting && once) observer.disconnect()
      },
      { threshold, rootMargin },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])
  return [ref, inView]
}

/** setInterval that follows the latest callback; `ms = null` pauses it. */
export function useInterval(callback: () => void, ms: number | null) {
  const saved = useRef(callback)
  useEffect(() => {
    saved.current = callback
  })
  useEffect(() => {
    if (ms === null) return
    const id = window.setInterval(() => saved.current(), ms)
    return () => window.clearInterval(id)
  }, [ms])
}

/** Milliseconds since `running` became true, updated every animation frame. */
export function useElapsed(running: boolean): number {
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    if (!running) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      setElapsed(now - start)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [running])
  return elapsed
}

const noop = () => () => {}

/**
 * False on the server and during hydration, true after. Lazy screens wait for
 * it: renderToString cannot wait for a lazy chunk, so the prerendered page
 * and the first client render both show the still frame.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  )
}
