import cities from '@/data/cities.json'
import type { Filters } from '@/features/boards/filter'
import { useLang, useT } from '@/features/i18n/LangContext'
import content from '@/pages/boards/boards.content.json'
import { FORMATS } from '@/lib/boards'
import { FilterSelect } from './FilterSelect'
import { FormField } from './FormField'

type Props = { filters: Filters; onChange: (next: Filters) => void; cityKeys: string[] }

/** Province, type, size and text search for the board finder. */
export function BoardFilters({ filters, onChange, cityKeys }: Props) {
  const t = useT()
  const lang = useLang()
  const f = content.filters
  const set = (key: keyof Filters) => (value: string) => onChange({ ...filters, [key]: value })
  const cityOptions = cityKeys.map((key) => ({
    value: key,
    label: (cities as Record<string, { ar: string; en: string }>)[key][lang],
  }))
  return (
    <div
      role="search"
      aria-label={t(f.label)}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.3fr_auto] lg:items-end"
    >
      <FilterSelect
        id="f-city"
        label={t(f.city)}
        all={t(f.all)}
        value={filters.city}
        onChange={set('city')}
        options={cityOptions}
      />
      <FilterSelect
        id="f-format"
        label={t(f.format)}
        all={t(f.all)}
        value={filters.format}
        onChange={set('format')}
        options={FORMATS.map((format) => ({ value: format.key, label: format.label[lang] }))}
      />
      <FilterSelect
        id="f-size"
        label={t(f.size)}
        all={t(f.all)}
        value={filters.size}
        onChange={set('size')}
        options={(['small', 'medium', 'large'] as const).map((size) => ({
          value: size,
          label: t(f[size]),
        }))}
      />
      <FormField
        name="q"
        type="search"
        label={t(f.query)}
        value={filters.query}
        onChange={(e) => set('query')(e.target.value)}
      />
      <button
        type="button"
        onClick={() => onChange({ city: '', format: '', size: '', query: '' })}
        className="min-h-12 rounded-xl px-4 font-semibold text-brand-blue hover:bg-brand-blue-10"
      >
        {t(f.reset)}
      </button>
    </div>
  )
}
