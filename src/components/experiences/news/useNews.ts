import { useEffect, useState, useSyncExternalStore, type FocusEvent } from 'react'
import { useInView, usePrefersReducedMotion } from '@/lib/motion'

/** Next post every 4.2 s; a story the visitor picked stays 8 s first. */
export const ROTATE_MS = 4200
export const HOLD_MS = 8000

function subscribeVisibility(listener: () => void) {
  document.addEventListener('visibilitychange', listener)
  return () => document.removeEventListener('visibilitychange', listener)
}

/** False while the browser tab is hidden (true on the server and during hydration). */
function usePageVisible(): boolean {
  return useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState !== 'hidden',
    () => true,
  )
}

/** Keyboard focus (not a mouse click or tap) shows the focus ring. */
function byKeyboard(element: Element): boolean {
  try {
    return element.matches(':focus-visible')
  } catch {
    return false
  }
}

/**
 * State of the TargetNews phone. Starts on the first post (same on the server
 * and the client) and moves only while the phone is on screen, the tab is
 * visible, keyboard focus is outside it and the visitor allows motion.
 */
export function useNews(count: number) {
  const reduce = usePrefersReducedMotion()
  const visible = usePageVisible()
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 })
  const [state, setState] = useState({ index: 0, round: 0, held: false })
  const [keyboard, setKeyboard] = useState(false)
  const running = inView && visible && !reduce && !keyboard && count > 1

  useEffect(() => {
    if (!running) return
    const id = window.setTimeout(
      () => setState((s) => ({ index: (s.index + 1) % count, round: s.round + 1, held: false })),
      state.held ? HOLD_MS : ROTATE_MS,
    )
    return () => window.clearTimeout(id)
  }, [running, count, state.round, state.held])

  const pick = (index: number) => setState((s) => ({ index, round: s.round + 1, held: true }))

  const focus = {
    onFocus: (event: FocusEvent<HTMLElement>) => setKeyboard(byKeyboard(event.target)),
    onBlur: (event: FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setKeyboard(false)
    },
  }

  return {
    ref,
    index: state.index,
    /** Animate the post in: it changed since load (never on first paint or under reduced motion). */
    moved: state.round > 0 && !reduce,
    /** The visitor picked this post (announced); false after an automatic move. */
    picked: state.held,
    running,
    pick,
    focus,
  }
}
