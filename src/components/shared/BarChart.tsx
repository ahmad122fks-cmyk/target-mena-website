import { useEffect, useState } from 'react'
import { useInView, usePrefersReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'

export type BarRow = { key: string; label: string; value: number; colour: string }

type Props = { caption: string; rows: BarRow[]; className?: string }

/**
 * Light SVG-free bar chart (no chart library): one row per item, bars scaled
 * to the largest, growing in when the chart scrolls into view. The numbers
 * are text, so the chart reads the same without colour or motion.
 */
export function BarChart({ caption, rows, className }: Props) {
  const reduce = usePrefersReducedMotion()
  const [ref, shown] = useInView<HTMLElement>({ threshold: 0.2, once: true })
  // Bars start empty only when the chart is still below the fold (unseen), so
  // the prerendered page and screenshots always show the full chart.
  const [armed, setArmed] = useState(false)
  useEffect(() => {
    if (!reduce && ref.current && ref.current.getBoundingClientRect().top > window.innerHeight)
      setArmed(true)
  }, [reduce, ref])
  const max = Math.max(1, ...rows.map((row) => row.value))
  return (
    <figure
      ref={ref}
      className={cn(
        'm-0 flex flex-col gap-3.5 rounded-[22px] border border-line bg-surface p-6 lg:p-[26px]',
        className,
      )}
    >
      <figcaption className="text-lg font-semibold text-ink">{caption}</figcaption>
      <ul className="flex flex-col gap-3">
        {rows.map((row) => (
          <li
            key={row.key}
            className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)_2.75rem] items-center gap-3 text-sm"
          >
            <span className="truncate">{row.label}</span>
            <span className="block h-3.5 overflow-hidden rounded-full bg-brand-grey-10">
              <span
                className={cn(
                  'block h-full origin-left rounded-full rtl:origin-right',
                  armed &&
                    (shown ? 'animate-[grow-x_0.9s_cubic-bezier(.2,.8,.2,1)_both]' : 'scale-x-0'),
                  row.colour,
                )}
                style={{ width: `${Math.max(2, Math.round((row.value / max) * 100))}%` }}
              />
            </span>
            <span className="ltr-run text-end font-semibold text-ink">{row.value}</span>
          </li>
        ))}
      </ul>
    </figure>
  )
}
