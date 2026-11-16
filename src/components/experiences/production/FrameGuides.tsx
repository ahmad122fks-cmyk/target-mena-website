import { cn } from '@/lib/utils'
import { shotAt, takeAt } from './viewfinder'
import content from './viewfinder.content.json'

const CORNERS = [
  'top-0 start-0 border-t-2 border-s-2',
  'top-0 end-0 border-t-2 border-e-2',
  'bottom-0 start-0 border-b-2 border-s-2',
  'bottom-0 end-0 border-b-2 border-e-2',
]

const label =
  'ltr-run absolute top-1.5 text-[0.5625rem] tracking-[1px] whitespace-nowrap sm:top-2.5 sm:text-[0.8125rem]'

/**
 * Monitor guides: corner marks, the shot label and the take number. The
 * labels are left-to-right text, so their sides are set per page direction
 * (rtl:/ltr:) rather than start/end, which would follow their own direction.
 */
export function FrameGuides({ cut }: { cut: number }) {
  const { osd } = content
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-4 inset-y-3 sm:inset-x-10 sm:inset-y-6"
    >
      {CORNERS.map((corner) => (
        <span
          key={corner}
          className={cn('absolute size-4 border-white/80 sm:size-[1.625rem]', corner)}
        />
      ))}
      <span
        className={cn(label, 'text-white rtl:left-5 ltr:right-5 sm:rtl:left-10 sm:ltr:right-10')}
      >
        {osd.shots[shotAt(cut)]}
      </span>
      <span
        className={cn(
          label,
          'text-brand-yellow rtl:right-5 ltr:left-5 sm:rtl:right-10 sm:ltr:left-10',
        )}
      >
        {`${osd.take} ${takeAt(cut)}`}
      </span>
    </div>
  )
}
