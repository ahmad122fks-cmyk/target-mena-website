import { useLang } from '@/features/i18n/LangContext'
import { cityLabel } from '@/lib/boards'
import { cn } from '@/lib/utils'

export type ProvinceCount = { key: string; count: number }

type Props = {
  /** Counts computed from boards.json, never typed by hand. */
  items: ProvinceCount[]
  /** Links (home, network): the page for each province. */
  hrefFor?: (key: string) => string
  /** Filter buttons (finder): selected key ('' = all), handler and the "all" chip. */
  selected?: string
  onPick?: (key: string) => void
  all?: { label: string; count: number }
  className?: string
}

const chip =
  'inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 text-[0.9375rem] lg:min-h-10'

/** Pill chips "Province · count", as links or as filter buttons. */
export function ProvinceChips({ items, hrefFor, selected, onPick, all, className }: Props) {
  const lang = useLang()
  const label = (text: string, count: number) => (
    <>
      {text} <span aria-hidden="true">·</span> <span className="ltr-run">{count}</span>
    </>
  )
  const button = (key: string, text: string, count: number) => (
    <button
      key={key || 'all'}
      type="button"
      aria-pressed={selected === key}
      onClick={() => onPick?.(key)}
      className={cn(
        chip,
        selected === key
          ? 'border-brand-blue bg-brand-blue text-white'
          : 'border-input bg-white text-brand-black hover:border-brand-blue',
      )}
    >
      {label(text, count)}
    </button>
  )
  return (
    <div className={cn('flex flex-wrap gap-2.5', className)}>
      {all && onPick && button('', all.label, all.count)}
      {items.map(({ key, count }) =>
        hrefFor ? (
          <a
            key={key}
            href={hrefFor(key)}
            className={cn(chip, 'border-input bg-white text-brand-blue hover:border-brand-blue')}
          >
            {label(cityLabel(key, lang), count)}
          </a>
        ) : (
          button(key, cityLabel(key, lang), count)
        ),
      )}
    </div>
  )
}
