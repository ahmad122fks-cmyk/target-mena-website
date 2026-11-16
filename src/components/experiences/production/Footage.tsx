import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import content from './viewfinder.content.json'

type Source = { mp4: string; webm?: string; poster: string }

/**
 * Real footage for the viewfinder, set in viewfinder.content.json ("video").
 * null today: the stills of the camera photo play instead. Adding the clip
 * Ahmad sends later (3 MB or less) = the files in public/media/ + that line.
 */
export const FOOTAGE = content.video as Source | null

/**
 * Muted, looping, inline video. Nothing downloads (preload="none") until the
 * viewfinder first rolls on screen; it pauses when it stops rolling, and a
 * reduced-motion visitor only sees the poster frame.
 */
export function Footage({
  source,
  running,
  className,
}: {
  source: Source
  running: boolean
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)
  // First time it rolls: attach the sources (kept after, so it never reloads).
  if (running && !load) setLoad(true)
  useEffect(() => {
    const video = ref.current
    if (!video || !load) return
    video.muted = true
    if (running) video.play().catch(() => undefined)
    else video.pause()
  }, [running, load])
  return (
    <video
      ref={ref}
      aria-hidden="true"
      tabIndex={-1}
      muted
      loop
      playsInline
      preload="none"
      poster={source.poster}
      className={cn('absolute inset-0 h-full w-full object-cover', className)}
    >
      {load && source.webm && <source src={source.webm} type="video/webm" />}
      {load && <source src={source.mp4} type="video/mp4" />}
    </video>
  )
}
