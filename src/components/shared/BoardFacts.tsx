import { useLang } from '@/features/i18n/LangContext'
import { cityLabel, placeLine, type Board } from '@/lib/boards'
import { formatFaces, formatSize, formatSqm } from '@/lib/format'

/** Place, province, then "H × W m · m² · faces" - the facts every card shows. */
export function BoardFacts({ board }: { board: Board }) {
  const lang = useLang()
  return (
    <div className="flex flex-col gap-1 text-sm">
      <p className="truncate text-base font-medium text-ink" title={placeLine(board, lang)}>
        {placeLine(board, lang)}
      </p>
      <p>{cityLabel(board.city, lang)}</p>
      <p className="text-ink">
        <span className="ltr-run">{formatSize(board.height, board.width, lang)}</span> ·{' '}
        <span className="ltr-run">{formatSqm(board.sqm, lang)}</span> ·{' '}
        {formatFaces(board.faces, lang)}
      </p>
    </div>
  )
}
