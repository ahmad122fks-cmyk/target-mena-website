import { useLang } from '@/features/i18n/LangContext'
import { TYPE_COLORS, type Counts } from '../data'
import { typeLabels } from './layersData'

const NAMES: Record<string, Record<string, string | undefined>> = typeLabels

/** Top board types with bars relative to the largest (hover card: 3, panel: 5). */
export function TypeBars({ counts, max }: { counts: Counts; max: number }) {
  const lang = useLang()
  const rows = Object.entries(counts)
    .filter((row): row is [string, number] => Boolean(row[1]))
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
  const top = rows[0]?.[1] ?? 1
  return (
    <ul className="flex flex-col gap-2">
      {rows.map(([type, n]) => (
        <li
          key={type}
          className="grid grid-cols-[74px_minmax(0,1fr)_28px] items-center gap-2 text-[11px] text-[#EAF2F8]"
        >
          <span className="truncate">{NAMES[lang][type] ?? type}</span>
          <span aria-hidden="true" className="h-[5px] overflow-hidden rounded-full bg-white/10">
            <span
              className="block h-full origin-left rounded-full transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] rtl:origin-right"
              style={{ transform: `scaleX(${n / top})`, background: TYPE_COLORS[type] }}
            />
          </span>
          <span className="ltr-run text-end">{n}</span>
        </li>
      ))}
    </ul>
  )
}
