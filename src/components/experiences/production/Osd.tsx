import { cn } from '@/lib/utils'
import { useFrames } from './useFilm'
import { formatTimecode } from './viewfinder'
import content from './viewfinder.content.json'

/** Recording light: a yellow dot that blinks while the camera rolls. */
export function Rec({ running, className }: { running: boolean; className?: string }) {
  return (
    <span className={cn('flex items-center gap-2 font-bold text-brand-yellow', className)}>
      <span
        className={cn(
          'inline-block size-[0.6875rem] rounded-full bg-brand-yellow',
          running && 'animate-[blink_1s_steps(2)_infinite]',
        )}
      />
      <span className="ltr-run">{content.osd.rec}</span>
    </span>
  )
}

/** Running timecode HH:MM:SS:FF at 25 fps (00:00:00:00 on the server). */
export function Timecode({ running, className }: { running: boolean; className?: string }) {
  const frames = useFrames(running)
  return <span className={cn('ltr-run', className)}>{formatTimecode(frames)}</span>
}
