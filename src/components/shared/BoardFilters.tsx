import type { Filters } from '@/features/boards/filter'
import { cityOptions, formatOptions, sizeOptions } from '@/features/boards/options'
import { useLang, useT } from '@/features/i18n/LangContext'
import content from '@/pages/boards/boards.content.json'
import { cn } from '@/lib/utils'
import { FilterCombobox } from './FilterCombobox'
import { SearchField } from './SearchField'

type Props = {
  filters: Filters
  onChange: (patch: Partial<Filters>) => void
  cityKeys: string[]
  stacked?: boolean
}

/** Province, type and size (shadcn Combobox) plus code/area search. Used in the bar and the phone sheet. */
export function BoardFilters({ filters, onChange, cityKeys, stacked = false }: Props) {
  const t = useT()
  const lang = useLang()
  const f = content.filters
  const labels = { all: t(f.all), find: t(f.find), none: t(f.none) }
  return (
    <div
      className={cn(
        'grid gap-3',
        stacked ? 'grid-cols-1' : 'grid-cols-[1fr_1fr_1fr_1.4fr] items-end',
      )}
    >
      <FilterCombobox
        id={stacked ? 'm-city' : 'f-city'}
        label={t(f.city)}
        labels={labels}
        value={filters.city}
        searchable
        options={cityOptions(cityKeys, lang)}
        onChange={(city) => onChange({ city })}
      />
      <FilterCombobox
        id={stacked ? 'm-format' : 'f-format'}
        label={t(f.format)}
        labels={labels}
        value={filters.format}
        options={formatOptions(lang)}
        onChange={(format) => onChange({ format })}
      />
      <FilterCombobox
        id={stacked ? 'm-size' : 'f-size'}
        label={t(f.size)}
        labels={labels}
        value={filters.size}
        options={sizeOptions(lang)}
        onChange={(size) => onChange({ size })}
      />
      <SearchField
        id={stacked ? 'm-q' : 'f-q'}
        label={t(f.query)}
        value={filters.query}
        onChange={(query) => onChange({ query })}
      />
    </div>
  )
}
