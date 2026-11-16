import { cn } from '@/lib/utils'
import { FOOTAGE } from './Footage'

type Props = { cut: number; running: boolean; flash: number }

/**
 * What makes the still read as footage: light leak, anamorphic flare,
 * film grain, vignette, 2.39:1 letterbox bars, a soft flash on each cut and
 * a brighter one on the clap. Decorative only, never in the way of a click.
 */
export function FilmLook({ cut, running, flash }: Props) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span
        className={cn('pv-leak absolute -inset-[20%] mix-blend-screen', running && 'pv-leak-move')}
      />
      {running && (
        <span
          key={`flare-${cut}`}
          className="pv-flare absolute top-[46%] -left-[40%] h-[3px] w-4/5 mix-blend-screen"
        />
      )}
      <span
        className={cn(
          'pv-grain absolute -inset-[10%] opacity-[0.22] mix-blend-overlay',
          running && 'pv-grain-move',
        )}
      />
      <span className="absolute inset-0 shadow-[inset_0_0_80px_20px_rgb(0_0_0/0.7)] lg:shadow-[inset_0_0_160px_40px_rgb(0_0_0/0.75)]" />
      <span className="absolute inset-x-0 top-0 h-[11%] bg-black" />
      <span className="absolute inset-x-0 bottom-0 h-[11%] bg-black" />
      {cut > 0 && !FOOTAGE && (
        <span key={`cut-${cut}`} className="pv-cut absolute inset-0 bg-white opacity-0" />
      )}
      {flash > 0 && (
        <span key={`flash-${flash}`} className="pv-flash absolute inset-0 bg-white opacity-0" />
      )}
    </div>
  )
}
