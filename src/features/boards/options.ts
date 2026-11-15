import cities from '@/data/cities.json'
import type { Lang, Localized } from '@/features/i18n/lang'
import content from '@/pages/boards/boards.content.json'
import { FORMATS } from '@/lib/boards'

export type Option = { value: string; label: string }

export function cityOptions(keys: string[], lang: Lang): Option[] {
  const names = cities as Record<string, Localized>
  return keys.map((key) => ({ value: key, label: names[key]?.[lang] ?? key }))
}

export function formatOptions(lang: Lang): Option[] {
  return FORMATS.map((format) => ({ value: format.key, label: format.label[lang] }))
}

export function sizeOptions(lang: Lang): Option[] {
  return (['small', 'medium', 'large'] as const).map((size) => ({
    value: size,
    label: content.filters[size][lang],
  }))
}

export function facesOptions(lang: Lang): Option[] {
  return [
    { value: '1', label: content.filters.one[lang] },
    { value: '2', label: content.filters.two[lang] },
  ]
}
