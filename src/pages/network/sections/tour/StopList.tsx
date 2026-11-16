import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import content from '../../network.tour.content.json'
import { STOPS, stopCounts } from './stops'

type Props = { index: number; onPick: (index: number) => void }

/** The five stops; a vertical list on desktop, one scrolling row above the map on phones. */
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
                'flex min-h-14 w-full items-center gap-3.5 rounded-2xl border px-4 py-3 text-start',
                on
                  ? 'border-white bg-white text-brand-black'
                  : 'border-white/15 text-white hover:border-white/40',
              )}
            >
              <span
                className={cn(
                  'ltr-run flex size-[34px] shrink-0 items-center justify-center rounded-full text-sm font-bold',
                  on ? 'bg-brand-yellow text-brand-black' : 'bg-white/10',
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
                  on ? 'text-brand-blue' : 'text-brand-grey-40',
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
