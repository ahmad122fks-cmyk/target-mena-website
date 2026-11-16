import { useLang } from '@/features/i18n/LangContext'
import { formatCount } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { MapLabel } from './labels'

// Beside the point, on the label's screen side (the map never mirrors).
const OFFSET = {
  province: { left: 'translate(calc(-100% - 14px), -50%)', right: 'translate(14px, -50%)' },
  highway: {
    left: 'translate(calc(-100% - 16px), calc(-50% - 18px))',
    right: 'translate(16px, calc(-50% + 18px))',
  },
}
// Border when off / on (selected or hovered).
const BORDER = {
  province: ['border-white/14', 'border-brand-yellow/70'],
  highway: ['border-brand-yellow/45', 'border-brand-yellow/90'],
}

type Props = {
  label: MapLabel
  name: string
  /** Zoomed in: province pills a little larger. */
  big: boolean
  /** Highway pills become buttons; the rest is hidden from screen readers (markers speak). */
  interactive: boolean
  dim: boolean
  pressed: boolean
}

/** «النجف 217»: name and count, the count yellow on highways (white when selected). */
export function LabelPill({ label, name, big, interactive, dim, pressed }: Props) {
  const lang = useLang()
  const road = label.kind === 'highway'
  const large = big && !road
  const className = cn(
    'absolute top-0 left-0 flex items-center gap-[7px] rounded-full border bg-[#04111F]/75 py-1 ps-2.5 pe-[11px] whitespace-nowrap shadow-[0_4px_14px_rgb(0_0_0/0.35)] backdrop-blur-[6px] transition-opacity duration-300',
    BORDER[label.kind][Number(label.on)],
  )
  const style = { transform: OFFSET[label.kind][label.side], opacity: dim ? 0.55 : 1 }
  const body = (
    <>
      <span className={cn('font-medium text-[#EAF2F8]', large ? 'text-[13px]' : 'text-xs')}>
        {name}
      </span>
      <b
        className={cn(
          'ltr-run font-bold',
          large ? 'text-[15px]' : 'text-[13px]',
          road !== label.on ? 'text-brand-yellow' : 'text-white',
        )}
      >
        {label.n}
      </b>
    </>
  )
  if (!(interactive && road))
    return (
      <span aria-hidden={interactive || undefined} className={className} style={style}>
        {body}
      </span>
    )
  return (
    <button
      type="button"
      data-key={label.k}
      aria-label={`${name}: ${formatCount(label.n, lang)}`}
      aria-pressed={pressed}
      className={cn(
        className,
        'pointer-events-auto cursor-pointer outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand-yellow',
      )}
      style={style}
    >
      {body}
    </button>
  )
}
