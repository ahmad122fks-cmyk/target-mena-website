import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import type { FocusEvent, KeyboardEvent, PointerEvent } from 'react'
import { autoDelay, isTap, keyStep, swipeStep, wheelStep, wrapIndex } from './logic'

type Options = {
  count: number
  /** The deck's root element (wheel listener; usually the useInView ref). */
  rootRef: RefObject<HTMLElement | null>
  /** Timers may run: active, on screen and no reduced motion. */
  running: boolean
  /** Automatic step every `autoMs`; null = no timer (e.g. progress-driven reels). */
  autoMs: number | null
  /** Quiet time after any interaction (ms). */
  pauseMs?: number
  /** A tap that is not on a button or link. */
  onTap?: () => void
}

/**
 * One vertical deck of full-screen cards: drag up/down, wheel, arrow keys,
 * autoplay that waits `pauseMs` after any interaction and stops while
 * keyboard focus is inside (WCAG 2.2.2). `holding` is true during those
 * times (the reels pause their progress bar with it).
 */
export function useSwipeDeck({ count, rootRef, running, autoMs, pauseMs = 6000, onTap }: Options) {
  const [index, setIndex] = useState(0)
  const [touches, setTouches] = useState(0)
  const [holding, setHolding] = useState(false)
  const [focused, setFocused] = useState(false)
  const touchedAt = useRef(-Infinity)
  const start = useRef<{ x: number; y: number } | null>(null)
  const lastWheel = useRef(-Infinity)

  const go = useCallback((delta: number) => setIndex((i) => wrapIndex(i, delta, count)), [count])
  const touch = useCallback(() => {
    touchedAt.current = Date.now()
    setHolding(true)
    setTouches((n) => n + 1)
  }, [])

  // The quiet time ends `pauseMs` after the last interaction.
  useEffect(() => {
    if (!touches) return
    const id = window.setTimeout(() => setHolding(false), pauseMs)
    return () => window.clearTimeout(id)
  }, [touches, pauseMs])

  // Autoplay: the normal pace, never sooner than `pauseMs` after an interaction.
  useEffect(() => {
    if (!running || focused || autoMs === null || count < 2) return
    const delay = autoDelay(Date.now() - touchedAt.current, autoMs, pauseMs)
    const id = window.setTimeout(() => go(1), delay)
    return () => window.clearTimeout(id)
  }, [running, focused, autoMs, pauseMs, count, index, touches, go])

  // Wheel: one card per gesture; the page does not scroll under the phone.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return
      event.preventDefault()
      const now = Date.now()
      const step = wheelStep(event.deltaY, now - lastWheel.current)
      if (!step) return
      lastWheel.current = now
      touch()
      go(step)
    }
    root.addEventListener('wheel', onWheel, { passive: false })
    return () => root.removeEventListener('wheel', onWheel)
  }, [rootRef, go, touch])

  const handlers = {
    onPointerDown: (event: PointerEvent) => {
      start.current = { x: event.clientX, y: event.clientY }
      touch()
    },
    onPointerUp: (event: PointerEvent) => {
      if (start.current === null) return
      const dx = event.clientX - start.current.x
      const dy = event.clientY - start.current.y
      start.current = null
      // Touch screens scroll the page vertically through the phone (touch-action:
      // pan-y), so there a sideways swipe changes the card; a mouse drags up/down.
      const step = swipeStep(Math.abs(dx) > Math.abs(dy) ? dx : dy)
      if (step) go(step)
      else if (onTap && isTap(dy) && isTap(dx) && !(event.target as Element).closest('button, a'))
        onTap()
    },
    onPointerCancel: () => {
      start.current = null
    },
    onKeyDown: (event: KeyboardEvent) => {
      const step = keyStep(event.key)
      if (!step) return
      event.preventDefault()
      // Focus stays on the screen (the card it was on becomes inert).
      rootRef.current?.focus({ preventScroll: true })
      touch()
      go(step)
    },
    onFocus: (event: FocusEvent) => setFocused(focusVisible(event.target)),
    onBlur: (event: FocusEvent) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
    },
    onDragStart: (event: { preventDefault: () => void }) => event.preventDefault(),
  }

  return { index, go, touch, holding: holding || focused, handlers }
}

/** Keyboard focus (not a click) pauses autoplay. */
function focusVisible(element: Element): boolean {
  try {
    return element.matches(':focus-visible')
  } catch {
    return true
  }
}
