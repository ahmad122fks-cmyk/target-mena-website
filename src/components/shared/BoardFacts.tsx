import { useLang } from '@/features/i18n/LangContext'
import { areaLabel, cityLabel, type Board } from '@/lib/boards'
import { formatFaces, formatSize, formatSqm } from '@/lib/format'

/** Province · area, then H × W m · m² · faces - the facts every card shows. */
export function BoardFacts({ board }: { board: Board }) {
  const lang = useLang()
  const area = areaLabel(board, lang)
  return (
    <div className="flex flex-col gap-1 text-[0.95rem]">
      <p className="font-medium text-brand-black">
        {cityLabel(board.city, lang)}
        {area && ` · ${area}`}
      </p>
      <p className="truncate" lang="ar" dir="rtl" title={board.description}>
        {board.description}
      </p>
      <p>
        <span className="ltr-run">{formatSize(board.height, board.width, lang)}</span> ·{' '}
        <span className="ltr-run">{formatSqm(board.sqm, lang)}</span> ·{' '}
        {formatFaces(board.faces, lang)}
      </p>
    </div>
  )
}
