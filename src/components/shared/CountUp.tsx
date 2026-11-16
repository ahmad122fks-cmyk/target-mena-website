import { useEffect, useState } from 'react'
import { useInView, usePrefersReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Props = { value: number; duration?: number; className?: string }

const format = (n: number) => n.toLocaleString('en-US')

/**
 * A number that counts up when it scrolls into view (ease-out cubic). The
 * prerendered page shows the final value, so crawlers, no-JS visitors and
 * reduced-motion visitors always read the real figure.
 */
export function CountUp({ value, duration = 1600, className }: Props) {
  const reduce = usePrefersReducedMotion()
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.4, once: true })
  const [shown, setShown] = useState(value)
  const [armed, setArmed] = useState(false)

  // Below the fold at load: drop to 0 (off screen, unseen) and wait for the visitor.
  useEffect(() => {
    if (reduce || !ref.current) return
    if (ref.current.getBoundingClientRect().top > window.innerHeight) {
      setShown(0)
      setArmed(true)
    }
  }, [reduce, ref])

  useEffect(() => {
    if (!armed || !inView) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [armed, inView, value, duration])

  return (
    <span ref={ref} className={cn('ltr-run', className)}>
      {/* Screen readers get the real figure once, not every frame of the count. */}
      <span aria-hidden="true">{format(shown)}</span>
      <span className="sr-only">{format(value)}</span>
    </span>
  )
}
