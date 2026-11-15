import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { SORTS, type Sort, type View } from '@/features/boards/finderState'
import { useLang, useT } from '@/features/i18n/LangContext'
import { cityLabel } from '@/lib/boards'
import { formatCount } from '@/lib/format'
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
        <label className="flex h-11 items-center gap-1.5 rounded-full border border-input bg-white ps-4 pe-2 text-sm text-brand-black focus-within:border-brand-blue">
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
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(value) => value && onView(value as View)}
          aria-label={t(r.view)}
          className="h-11 gap-0 overflow-hidden rounded-full border border-input bg-white"
        >
          {VIEWS.map((value) => (
            <ToggleGroupItem
              key={value}
              value={value}
              className="h-full rounded-none px-4 text-sm text-brand-black data-[state=on]:bg-brand-blue-10 data-[state=on]:font-medium data-[state=on]:text-brand-blue"
            >
              {t(r[value])}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  )
}
