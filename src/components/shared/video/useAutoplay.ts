import { useEffect, useRef, useState, type RefObject } from 'react'
import { usePrefersReducedMotion } from '@/lib/motion'

type Connection = { saveData?: boolean }

/** Data saver on (Save-Data): never start a video by itself. */
function savesData(): boolean {
  return Boolean((navigator as Navigator & { connection?: Connection }).connection?.saveData)
}

/**
 * Plays the muted loop only while at least half of it is on screen and
 * pauses it when it leaves (prompt 4b). With reduced motion or Save-Data it
 * never starts by itself: the poster stays and the play button is shown.
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
    observer.observe(video)
    return () => observer.disconnect()
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
