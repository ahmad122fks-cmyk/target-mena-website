import { LayoutGrid, List } from 'lucide-react'
import { FilterSelect } from '@/components/shared/FilterSelect'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { SORTS, type Sort, type View } from '@/features/boards/finderState'
import { useT } from '@/features/i18n/LangContext'
import content from '../boards.content.json'

type Props = {
  total: number
  sort: Sort
  view: View
  onSort: (sort: Sort) => void
  onView: (view: View) => void
}

/** Result count, sort and grid/list toggle. */
export function ResultsBar({ total, sort, view, onSort, onView }: Props) {
  const t = useT()
  const r = content.results
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <h2 id="results-title" className="text-xl" aria-live="polite">
        {t(r.count)} <span className="ltr-run">{total}</span>
      </h2>
      <div className="flex items-end gap-3">
        <div className="w-48">
          <FilterSelect
            id="f-sort"
            label={t(r.sort)}
            value={sort}
            onChange={(value) => onSort(value as Sort)}
            options={SORTS.map((value) => ({ value, label: t(r[value]) }))}
          />
        </div>
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(value) => value && onView(value as View)}
          aria-label={t(r.view)}
          variant="outline"
        >
          <ToggleGroupItem value="grid" aria-label={t(r.grid)} className="size-12">
            <LayoutGrid className="size-5" aria-hidden="true" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label={t(r.list)} className="size-12">
            <List className="size-5" aria-hidden="true" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}
