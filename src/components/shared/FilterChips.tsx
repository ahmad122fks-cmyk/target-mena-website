import { X } from 'lucide-react'
import type { Filters } from '@/features/boards/filter'
import { cityOptions, facesOptions, formatOptions, sizeOptions } from '@/features/boards/options'
import { useLang, useT } from '@/features/i18n/LangContext'
import content from '@/pages/boards/boards.content.json'

type Props = { filters: Filters; onChange: (patch: Partial<Filters>) => void; cityKeys: string[] }

/** Active filters as removable chips, with "clear all" beside them. */
export function FilterChips({ filters, onChange, cityKeys }: Props) {
  const t = useT()
  const lang = useLang()
  const find = (options: { value: string; label: string }[], value: string) =>
    options.find((o) => o.value === value)?.label ?? value
  const chips = [
    filters.city && { key: 'city', label: find(cityOptions(cityKeys, lang), filters.city) },
    filters.format && { key: 'format', label: find(formatOptions(lang), filters.format) },
    filters.size && { key: 'size', label: find(sizeOptions(lang), filters.size) },
    filters.faces && { key: 'faces', label: find(facesOptions(lang), filters.faces) },
    filters.query && { key: 'query', label: `“${filters.query}”` },
  ].filter((chip): chip is { key: keyof Filters; label: string } => Boolean(chip))
  if (!chips.length) return null
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <li key={chip.key}>
          <button
            type="button"
            onClick={() => onChange({ [chip.key]: '' })}
            className="inline-flex min-h-9 items-center gap-1 rounded-full border border-input bg-field px-3 text-sm text-ink hover:border-link"
          >
            {chip.label}
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">{t(content.filters.remove)}</span>
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={() => onChange({ city: '', format: '', size: '', faces: '', query: '' })}
          className="min-h-9 px-2 text-sm font-semibold text-link underline-offset-4 hover:underline"
        >
          {t(content.filters.clearAll)}
        </button>
      </li>
    </ul>
  )
}
