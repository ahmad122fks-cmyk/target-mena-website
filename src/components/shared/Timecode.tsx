import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/lib/motion'
import { FPS, timecode } from '@/lib/timecode'
import { cn } from '@/lib/utils'

/** A running camera timecode (00:00:00:00 on the server and under reduced motion). */
export function Timecode({ running = true, className }: { running?: boolean; className?: string }) {
  const reduce = usePrefersReducedMotion()
  const [frames, setFrames] = useState(0)
  useEffect(() => {
    if (!running || reduce) return
    const start = performance.now() - (frames * 1000) / FPS
    let frame = 0
    const tick = (now: number) => {
      setFrames(Math.floor(((now - start) / 1000) * FPS))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // Resume from the frame shown when paused, not from zero.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, reduce])
  return <span className={cn('ltr-run tabular-nums', className)}>{timecode(frames)}</span>
}
