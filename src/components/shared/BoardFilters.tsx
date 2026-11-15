import type { Filters } from '@/features/boards/filter'
import {
  cityOptions,
  facesOptions,
  formatOptions,
  sizeOptions,
  type Option,
} from '@/features/boards/options'
import { useLang, useT } from '@/features/i18n/LangContext'
import content from '@/pages/boards/boards.content.json'
import { FilterCombobox } from './FilterCombobox'

type Props = {
  filters: Filters
  onChange: (patch: Partial<Filters>) => void
  cityKeys: string[]
  /** "pill": the finder bar (type, size, faces); "fields": the phone sheet (all, with labels). */
  variant: 'pill' | 'fields'
}

/** The finder's dropdown filters (shadcn Combobox), as bar pills or as labelled fields. */
export function BoardFilters({ filters, onChange, cityKeys, variant }: Props) {
  const t = useT()
  const lang = useLang()
  const f = content.filters
  const labels = { all: t(f.all), find: t(f.find), none: t(f.none) }
  const pill = variant === 'pill'
  const items: { key: keyof Filters; label: string; options: Option[]; search?: boolean }[] = [
    ...(pill
      ? []
      : [
          {
            key: 'city' as const,
            label: t(f.city),
            options: cityOptions(cityKeys, lang),
            search: true,
          },
        ]),
    { key: 'format', label: t(f.type), options: formatOptions(lang) },
    { key: 'size', label: t(f.size), options: sizeOptions(lang) },
    { key: 'faces', label: t(f.faces), options: facesOptions(lang) },
  ]
  return (
    <>
      {items.map((item) => (
        <FilterCombobox
          key={item.key}
          id={`${pill ? 'f' : 'm'}-${item.key}`}
          label={item.label}
          labels={labels}
          value={filters[item.key]}
          options={item.options}
          searchable={item.search}
          pill={pill}
          onChange={(value) => onChange({ [item.key]: value })}
        />
      ))}
    </>
  )
}
