import { useCallback, useEffect, useRef, useState } from 'react'

export type HintKind = 'wheel' | 'touch'
export type Hint = { kind: HintKind; id: number } | null

/** Short hint in the middle of the map (2.2 s, at most once every 2.6 s). */
export function useHint(): [Hint, (kind: HintKind) => void] {
  const [hint, setHint] = useState<Hint>(null)
  const last = useRef(-Infinity)
  const timer = useRef(0)
  const show = useCallback((kind: HintKind) => {
    const now = performance.now()
    if (now - last.current < 2600) return
    last.current = now
    setHint({ kind, id: now })
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setHint(null), 2200)
  }, [])
  useEffect(() => () => window.clearTimeout(timer.current), [])
  return [hint, show]
}
