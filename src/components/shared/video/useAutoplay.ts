import { useEffect, useRef, useState, type RefObject } from 'react'
import { usePrefersReducedMotion } from '@/lib/motion'

type Connection = { saveData?: boolean }

/** Data saver on (Save-Data): never start a video by itself. */
function savesData(): boolean {
  return Boolean((navigator as Navigator & { connection?: Connection }).connection?.saveData)
}

/**
 * Calls `start` once the page has finished loading and the browser is idle,
 * so a video (1–3 MB) never shares the connection with the page's first view
 * (Contact opens on one: its LCP went 0.9 → 2.6 s). Returns a cancel.
 */
function whenPageIdle(start: () => void): () => void {
  let idle = 0
  let timer = 0
  const go = () => {
    if (typeof window.requestIdleCallback === 'function')
      idle = window.requestIdleCallback(start, { timeout: 2000 })
    else timer = window.setTimeout(start, 300)
  }
  if (document.readyState === 'complete') go()
  else window.addEventListener('load', go, { once: true })
  return () => {
    window.removeEventListener('load', go)
    if (idle) cancelIdleCallback(idle)
    clearTimeout(timer)
  }
}

/**
 * Plays the muted loop only while at least half of it is on screen and
 * pauses it when it leaves (prompt 4b), starting once the page is idle. With
 * reduced motion or Save-Data it never starts by itself: the poster stays
 * and the play button is shown.
 */
export function useAutoplay(): {
  ref: RefObject<HTMLVideoElement | null>
  manual: boolean
  playing: boolean
  toggle: () => void
} {
  const ref = useRef<HTMLVideoElement>(null)
  const reduced = usePrefersReducedMotion()
  const [saveData, setSaveData] = useState(false)
  const [playing, setPlaying] = useState(false)
  const manual = reduced || saveData
  useEffect(() => setSaveData(savesData()), [])
  useEffect(() => {
    const video = ref.current
    if (!video || manual || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => undefined)
        else video.pause()
      },
      { threshold: 0.5 },
    )
    const cancel = whenPageIdle(() => observer.observe(video))
    return () => {
      cancel()
      observer.disconnect()
    }
  }, [manual])
  useEffect(() => {
    const video = ref.current
    if (!video) return
    const on = () => setPlaying(true)
    const off = () => setPlaying(false)
    video.addEventListener('play', on)
    video.addEventListener('pause', off)
    return () => {
      video.removeEventListener('play', on)
      video.removeEventListener('pause', off)
    }
  }, [])
  const toggle = () => {
    const video = ref.current
    if (!video) return
    if (video.paused) void video.play().catch(() => undefined)
    else video.pause()
  }
  return { ref, manual, playing, toggle }
}
