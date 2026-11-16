import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import content from '../../network.tour.content.json'
import { STOPS, stopCounts } from './stops'

type Props = { index: number; onPick: (index: number) => void }

/**
 * The five stops as white cards, the current one blue (v3); a vertical list
 * on desktop, one scrolling row above the map on phones.
 */
export function StopList({ index, onPick }: Props) {
  const t = useT()
  return (
    <ol className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
      {STOPS.map((stop, j) => {
        const on = j === index
        return (
          <li key={stop.key} className="shrink-0 snap-start lg:shrink">
            <button
              type="button"
              aria-current={on ? 'step' : undefined}
              data-stop={stop.key}
              onClick={() => onPick(j)}
              className={cn(
                'flex min-h-14 w-full items-center gap-3.5 rounded-2xl border px-4 py-3 text-start transition-colors',
                on
                  ? 'border-brand-blue bg-brand-blue text-white'
                  : 'border-line bg-surface text-ink hover:border-link',
              )}
            >
              <span
                className={cn(
                  'ltr-run flex size-[34px] shrink-0 items-center justify-center rounded-full text-sm font-bold',
                  on ? 'bg-white text-brand-blue' : 'bg-brand-grey-10 text-ink',
                )}
              >
                {j + 1}
              </span>
              <span className="flex-1 font-semibold whitespace-nowrap lg:whitespace-normal">
                {t(content.tour.stops[stop.key as keyof typeof content.tour.stops].title)}
              </span>
              <span
                className={cn(
                  'ltr-run text-[0.9375rem] font-semibold',
                  on ? 'text-white' : 'text-brand-text',
                )}
              >
                {stopCounts(stop).total.toLocaleString('en-US')}
              </span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
