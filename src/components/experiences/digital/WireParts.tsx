import { cn } from '@/lib/utils'
import { fade, Wire } from './Wire'

type Props = { step: number; final: boolean }

export const BAR = 'block h-1 rounded-full bg-[#4DA8E8]'

/** Top bar of the drawn app: logo circle and three menu lines. */
export function WireNav(p: Props) {
  return (
    <Wire at={1} {...p} fill="bg-[#0F2B4D]" className="flex h-9 items-center gap-2 rounded-xl px-3">
      <span className="relative size-4 rounded-full border border-[#4DA8E8]" />
      <span className="relative ms-auto flex gap-1.5">
        <span className={cn(BAR, 'w-5')} />
        <span className={cn(BAR, 'w-5')} />
        <span className={cn(BAR, 'w-5')} />
      </span>
    </Wire>
  )
}

/** Image placeholder (the classic crossed box), then a flat blue banner. */
export function WireHero({ step, final }: Props) {
  return (
    <Wire
      at={2}
      step={step}
      final={final}
      fill="bg-[#0161A6]"
      className="h-[124px] overflow-hidden rounded-2xl"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={cn('absolute inset-0 size-full', fade(step >= 3 && !final))}
      >
        <path d="M0 0L100 100M100 0L0 100" stroke="#4DA8E8" vectorEffect="non-scaling-stroke" />
      </svg>
      <span
        className={cn('absolute start-4 top-4 size-10 rounded-full bg-[#F7AF1C]', fade(final))}
      />
      <span
        className={cn('absolute start-4 bottom-4 h-2.5 w-24 rounded-full bg-white', fade(final))}
      />
    </Wire>
  )
}
