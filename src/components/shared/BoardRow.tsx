import { useLang, useLink } from '@/features/i18n/LangContext'
import { boardPath, placeLine, typeLabel, type Board } from '@/lib/boards'
import { formatSize, formatSqm } from '@/lib/format'

/** One board as a light list row (long lists on province and format pages). */
export function BoardRow({ board }: { board: Board }) {
  const lang = useLang()
  const link = useLink()
  return (
    <li>
      <a
        href={link(boardPath(board))}
        className="grid min-h-14 grid-cols-[6.5rem_1fr] items-center gap-x-4 gap-y-0.5 rounded-lg px-3 py-2 hover:bg-brand-ghost sm:grid-cols-[7rem_8rem_1fr_auto]"
      >
        <span className="ltr-run font-semibold text-link">{board.code}</span>
        <span className="text-sm sm:text-base">{typeLabel(board.type, lang)}</span>
        <span className="col-span-2 truncate sm:col-span-1">{placeLine(board, lang)}</span>
        <span className="col-span-2 text-sm sm:col-span-1">
          <span className="ltr-run">{formatSize(board.height, board.width, lang)}</span> ·{' '}
          <span className="ltr-run">{formatSqm(board.sqm, lang)}</span>
        </span>
      </a>
    </li>
  )
}
