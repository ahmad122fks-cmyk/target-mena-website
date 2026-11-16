import { cn } from '@/lib/utils'
import { MOVE } from './ScreenShell'

/*
 * Generic geometry only (never Target's logo): four shapes in the guideline
 * colours drop into a 2 x 2 grid on a construction board, one per step.
 */
const SHAPES = [
  { at: 1, shape: 'rounded-full bg-[#0161A6]' },
  { at: 2, shape: 'rounded-[18px] bg-[#F7AF1C]' },
  { at: 3, shape: 'rounded-[18px] rounded-es-[64px] bg-[#2AB99D]' },
  { at: 4, shape: 'rounded-ss-full rounded-ee-full bg-[#EAF2F8]' },
]

const LINE = 'absolute bg-[#1F4A78]'

/** The construction board: dot grid and guides that fade once the mark is done. */
export function IdentityMark({ step, ready }: { step: number; ready: boolean }) {
  return (
    <div className="relative mx-auto grid size-[208px] flex-none place-items-center rounded-[22px] border border-[#1F4A78] bg-[#0B2340] bg-[image:radial-gradient(rgba(255,255,255,.09)_1px,transparent_1px)] bg-[size:12px_12px]">
      <span
        className={cn(
          'absolute inset-0 transition-opacity duration-700',
          ready ? 'opacity-0' : 'opacity-100',
        )}
      >
        <span className="absolute inset-5 rounded-full border border-dashed border-[#1F4A78]" />
        <span className={cn(LINE, 'inset-x-3 top-1/2 h-px')} />
        <span className={cn(LINE, 'inset-y-3 left-1/2 w-px')} />
      </span>
      <div className="relative grid grid-cols-2 gap-2.5">
        {SHAPES.map(({ at, shape }) => (
          <span
            key={at}
            className={cn(
              'block size-16',
              MOVE,
              shape,
              step >= at ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0',
            )}
          />
        ))}
      </div>
    </div>
  )
}
