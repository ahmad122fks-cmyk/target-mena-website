import { useEffect, useState } from 'react'
import { useInView, usePrefersReducedMotion } from '@/lib/motion'
import { nextStop, STOP_SECONDS, STOPS } from './stops'

/**
 * Tour state: the current stop, and the self-playing timer. It plays on its
 * own once the tour is on screen (not under reduced motion); any pick by the
 * visitor stops it, and the play button starts it again.
 */
export function useTour() {
  const reduce = usePrefersReducedMotion()
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 })
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [rounds, setRounds] = useState(0)
  const running = playing && inView && !reduce

  useEffect(() => {
    if (!running) return
    const id = window.setTimeout(() => {
      const next = nextStop(index, STOPS.length, rounds)
      if (next === null) return setPlaying(false)
      if (next === 0) setRounds((n) => n + 1)
      setIndex(next)
    }, STOP_SECONDS * 1000)
    return () => window.clearTimeout(id)
  }, [running, index, rounds])

  const go = (to: number) => {
    setPlaying(false)
    setIndex((to + STOPS.length) % STOPS.length)
  }
  return {
    ref,
    index,
    stop: STOPS[index],
    playing: running,
    go,
    toggle: () => setPlaying(!running),
  }
}
