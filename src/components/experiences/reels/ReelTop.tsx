import { Camera } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  count: number
  index: number
  /** Progress runs (autoplay on); false = static bars. */
  playing: boolean
  /** Hold the current bar (after an interaction). */
  holding: boolean
  onDone: () => void
  title: string
  topPad: number
}

const FILL = 'block h-full w-full origin-left bg-white rtl:origin-right'

/** Story-style progress bars (the current one fills, then the next reel shows) and the title row. */
export function ReelTop({ count, index, playing, holding, onDone, title, topPad }: Props) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 flex flex-col gap-2.5 px-3.5"
      style={{ paddingTop: topPad }}
    >
      <div aria-hidden="true" className="flex gap-[3px]">
        {Array.from({ length: count }, (_, j) => (
          <span key={j} className="block h-[2.5px] flex-1 overflow-hidden rounded-full bg-white/30">
            {j === index && playing ? (
              <span
                key={index}
                className={cn(FILL, 'animate-[reel-fill_4.2s_linear_both]')}
                style={holding ? { animationPlayState: 'paused' } : undefined}
                onAnimationEnd={onDone}
              />
            ) : (
              <span className={cn(FILL, j > index && 'scale-x-0')} />
            )}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <b className="text-[17px]">{title}</b>
        <Camera className="size-[22px]" strokeWidth={1.8} aria-hidden="true" />
      </div>
    </div>
  )
}
