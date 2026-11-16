import { Pause, Play } from 'lucide-react'
import videos from '@/content/videos.json'
import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import { ToConfirm } from '../ToConfirm'
import { useAutoplay } from './useAutoplay'

export type VideoKey = 'driveToHq' | 'unipoleStreet'

/** Ready in videos.json: the files and the poster are in public/video/. */
export function videoReady(key: VideoKey): boolean {
  return videos[key].ready
}

type Props = {
  video: VideoKey
  /** Size from the className (e.g. a slim strip) instead of the video's ratio. */
  fill?: boolean
  className?: string
}

/**
 * A muted, looping video at its true ratio (object-fit contain, never
 * cropped): WebM then MP4, nothing loads until it plays (preload none,
 * poster first). Until the files exist it is a placeholder of the same size.
 */
export function LazyVideo({ video, fill, className }: Props) {
  const t = useT()
  const v = videos[video]
  const { ref, manual, playing, toggle } = useAutoplay()
  const box = cn('relative w-full overflow-hidden', className)
  const ratio = fill ? undefined : { aspectRatio: v.ratio }
  if (!v.ready)
    return (
      <div className={cn(box, 'flex items-center justify-center')} style={ratio}>
        <ToConfirm what={`${videos.missing} ${v.file}.mp4`} className="text-xs text-white" />
      </div>
    )
  const base = `/video/${v.file}`
  return (
    <div className={box} style={ratio}>
      <video
        ref={ref}
        muted
        playsInline
        loop
        preload="none"
        poster={`${base}-poster.webp`}
        aria-label={t(v.label)}
        className="size-full object-contain"
      >
        <source src={`${base}.webm`} type="video/webm" />
        <source src={`${base}.mp4`} type="video/mp4" />
      </video>
      {manual && (
        <button
          type="button"
          onClick={toggle}
          aria-label={t(playing ? videos.pause : videos.play)}
          className="absolute end-3 bottom-3 flex size-11 items-center justify-center rounded-full bg-white/90 text-brand-black shadow-soft"
        >
          {playing ? (
            <Pause className="size-5" aria-hidden="true" />
          ) : (
            <Play className="size-5" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  )
}
