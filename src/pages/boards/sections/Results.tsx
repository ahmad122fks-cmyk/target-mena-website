import { BoardCard } from '@/components/shared/BoardCard'
import { PillButton } from '@/components/shared/PillButton'
import { PAGE_SIZE, type View } from '@/features/boards/finderState'
import { useLang, useT } from '@/features/i18n/LangContext'
import type { Board } from '@/lib/boards'
import { formatCount } from '@/lib/format'
import { cn } from '@/lib/utils'
import content from '../boards.content.json'

type Props = {
  boards: Board[]
  total: number
  view: View
  /** Side panel open: one column fewer. */
  narrow: boolean
  onMore: () => void
  onAdd: () => void
}

/** The boards shown so far (24 at a time) in grid or list view, and "Show more". */
export function Results({ boards, total, view, narrow, onMore, onAdd }: Props) {
  const t = useT()
  const lang = useLang()
  if (!boards.length) return <p className="py-10 text-lg">{t(content.results.none)}</p>
  const next = Math.min(PAGE_SIZE, total - boards.length)
  const columns =
    view === 'list'
      ? 'grid-cols-1'
      : narrow
        ? 'sm:grid-cols-2 xl:grid-cols-3'
        : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  return (
    <div className="flex flex-col gap-8">
      <ul className={cn('grid grid-cols-1 gap-[1.125rem]', columns)}>
        {boards.map((board, i) => (
          <li key={board.code} className="flex min-w-0">
            <BoardCard board={board} layout={view} priority={i === 0} onAdd={onAdd} />
          </li>
        ))}
      </ul>
      {next > 0 && (
        <PillButton tone="outline" onClick={onMore} className="self-center px-7">
          {t(content.results.more)} · {formatCount(next, lang)}
        </PillButton>
      )}
    </div>
  )
}
