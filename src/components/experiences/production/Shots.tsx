import { Photo } from '@/components/shared/Photo'
import { ART } from '@/lib/images'
import { cn } from '@/lib/utils'
import { Footage, FOOTAGE } from './Footage'
import { shotAt, SHOTS } from './viewfinder'

/**
 * The picture inside the frame: the real cinema camera photo in three
 * framings (wide, lens, rig) with a whip pan on every cut, or the video
 * when one is set. All three layers stay mounted, so a cut never reloads
 * the image; the camera move restarts when its class comes back.
 */
export function Shots({ cut, running }: { cut: number; running: boolean }) {
  if (FOOTAGE) return <Footage source={FOOTAGE} running={running} />
  const current = shotAt(cut)
  return SHOTS.map((shot, i) => {
    const on = i === current
    return (
      <div
        key={shot.move}
        aria-hidden="true"
        className={cn(
          'absolute inset-0 overflow-hidden',
          on ? 'opacity-100' : 'opacity-0',
          on && running && 'pv-whip',
        )}
      >
        <Photo
          picture={ART.production}
          alt=""
          sizes="(min-width: 1240px) 1192px, calc(100vw - 32px)"
          priority={i === 0}
          className={cn(
            'absolute inset-0 h-full object-cover',
            shot.frame,
            on && running && shot.move,
          )}
        />
      </div>
    )
  })
}
