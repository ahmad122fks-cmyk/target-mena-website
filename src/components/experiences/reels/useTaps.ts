import { useEffect, useRef } from 'react'

/**
 * One tap or two: a single tap runs `onTap` after `delay` ms unless a second
 * tap arrives first, which runs `onDoubleTap` instead (like Instagram).
 */
export function useTaps(onTap: () => void, onDoubleTap: () => void, delay = 260) {
  const timer = useRef(0)
  const handlers = useRef({ onTap, onDoubleTap })
  useEffect(() => {
    handlers.current = { onTap, onDoubleTap }
  })
  useEffect(() => () => window.clearTimeout(timer.current), [])
  return () => {
    if (timer.current) {
      window.clearTimeout(timer.current)
      timer.current = 0
      handlers.current.onDoubleTap()
      return
    }
    timer.current = window.setTimeout(() => {
      timer.current = 0
      handlers.current.onTap()
    }, delay)
  }
}
