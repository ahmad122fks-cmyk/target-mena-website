import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/lib/motion'

/** A number that runs up from 0 whenever it changes (1.2 s, ease-out). Final value on the server. */
export function Tween({ value, className }: { value: number; className?: string }) {
  const reduce = usePrefersReducedMotion()
  const [shown, setShown] = useState(value)
  useEffect(() => {
    if (reduce) return setShown(value)
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1200)
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, reduce])
  return (
    <span className={className}>
      <span aria-hidden="true">{shown.toLocaleString('en-US')}</span>
      <span className="sr-only">{value.toLocaleString('en-US')}</span>
    </span>
  )
}
