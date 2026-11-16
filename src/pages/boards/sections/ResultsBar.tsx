import { SORTS, type Sort, type View } from '@/features/boards/finderState'
import { useLang, useT } from '@/features/i18n/LangContext'
import { cityLabel } from '@/lib/boards'
import { formatCount } from '@/lib/format'
import { cn } from '@/lib/utils'
import content from '../boards.content.json'

type Props = {
  total: number
  city: string
  sort: Sort
  view: View
  onSort: (sort: Sort) => void
  onView: (view: View) => void
}

const VIEWS: View[] = ['grid', 'list']

/** "660 boards · Baghdad", a sort pill and the grid/list switch. */
export function ResultsBar({ total, city, sort, view, onSort, onView }: Props) {
  const t = useT()
  const lang = useLang()
  const r = content.results
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 id="results-title" className="text-base font-semibold" aria-live="polite">
        {formatCount(total, lang)}
        {city && <span className="font-normal text-brand-text"> · {cityLabel(city, lang)}</span>}
      </h2>
      <div className="flex flex-wrap items-center gap-2.5">
        <label className="flex h-11 items-center gap-1.5 rounded-full border border-input bg-field ps-4 pe-2 text-sm text-ink focus-within:border-link">
          {t(r.sort)}:
          <select
            id="f-sort"
            value={sort}
            onChange={(event) => onSort(event.target.value as Sort)}
            className="h-full cursor-pointer bg-transparent pe-1 outline-none"
          >
            {SORTS.map((value) => (
              <option key={value} value={value}>
                {t(r[value])}
              </option>
            ))}
          </select>
        </label>
        {/* Two plain pressed buttons: the same switch without the toggle-group library
            (keeps the finder inside its 150 KB budget). */}
        <div
          role="group"
          aria-label={t(r.view)}
          className="flex h-11 overflow-hidden rounded-full border border-input bg-field"
        >
          {VIEWS.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={view === value}
              onClick={() => onView(value)}
              className={cn(
                'h-full px-4 text-sm text-ink hover:bg-brand-ghost',
                view === value && 'bg-brand-blue-10 font-medium text-link hover:bg-brand-blue-10',
              )}
            >
              {t(r[value])}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
