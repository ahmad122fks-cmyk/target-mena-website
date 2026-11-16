import { X } from 'lucide-react'
import { usePageData } from '@/app/PageData'
import { useLang, useT } from '@/features/i18n/LangContext'
import { areaLabel } from '@/lib/boards'
import { formatSqm } from '@/lib/format'
import content from '../home.platform.content.json'

const { search, list, plan } = content.platform

/** Mini finder: the filter chips a visitor would set. */
export function SearchPreview() {
  const t = useT()
  return (
    <ul className="flex flex-wrap gap-2" aria-hidden="true">
      {search.chips.map((chip) => (
        <li
          key={chip.en}
          className="flex items-center gap-1 rounded-full border border-input bg-field px-3 py-1 text-[0.8125rem] text-ink"
        >
          {t(chip)} <X className="size-3" strokeWidth={2} />
        </li>
      ))}
    </ul>
  )
}

/** Mini "my list": two real boards with their place and area (from boards.json). */
export function ListPreview() {
  const lang = useLang()
  const boards = usePageData('home').featured.filter((board) => list.codes.includes(board.code))
  return (
    <ul className="flex flex-col gap-2" aria-hidden="true">
      {boards.map((board) => (
        <li
          key={board.code}
          className="flex justify-between gap-3 rounded-[10px] bg-surface px-3 py-2 text-[0.8125rem]"
        >
          <b className="ltr-run font-semibold text-link">{board.code}</b>
          <span className="truncate">
            {areaLabel(board, lang) ?? board.description} ·{' '}
            <span className="ltr-run">{formatSqm(board.sqm, lang)}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Mini campaign builder: the four steps, half done. */
export function PlanPreview() {
  const t = useT()
  return (
    <div className="flex flex-col gap-2 text-[0.8125rem]" aria-hidden="true">
      <span className="flex justify-between gap-3">
        <span>{t(plan.steps)}</span>
        <span className="ltr-run">2/4</span>
      </span>
      <span className="block h-1.5 overflow-hidden rounded-full bg-line">
        <span className="block h-full w-1/2 rounded-full bg-brand-blue" />
      </span>
    </div>
  )
}
