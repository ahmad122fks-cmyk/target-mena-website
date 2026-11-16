import { Photo } from '@/components/shared/Photo'
import { Timecode } from '@/components/shared/Timecode'
import { ART } from '@/lib/images'
import { useInView } from '@/lib/motion'

/** Production: the real cinema camera multiplied onto the soft yellow panel, REC light and a running timecode. */
export function ProductionArt() {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className="absolute inset-0">
      <Photo
        picture={ART.production}
        alt=""
        sizes="260px"
        className="h-full w-full object-cover mix-blend-multiply"
      />
      <span className="absolute start-2.5 top-2.5 flex items-center gap-1.5 rounded-md bg-white/85 px-1.5 py-0.5 text-[0.6875rem] font-bold text-brand-black">
        <span className="size-[7px] animate-[blink_1s_steps(2)_infinite] rounded-full bg-brand-black" />
        REC
      </span>
      {/* The run itself is left-to-right; the wrapper keeps it at the end side. */}
      <span className="absolute end-2.5 top-2.5 rounded-md bg-white/85 px-1.5 py-0.5 text-[0.6875rem] font-semibold text-brand-black">
        <Timecode running={inView} />
      </span>
    </div>
  )
}
