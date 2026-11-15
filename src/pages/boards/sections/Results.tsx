import { BoardCard } from '@/components/shared/BoardCard'
import { Pagination } from '@/components/shared/Pagination'
import type { View } from '@/features/boards/finderState'
import { useT } from '@/features/i18n/LangContext'
import type { Board } from '@/lib/boards'
import { cn } from '@/lib/utils'
import content from '../boards.content.json'

type Props = {
  boards: Board[]
  view: View
  page: number
  pages: number
  onPage: (page: number) => void
}

/** One page of results (24) in grid or list view, with page numbers. */
export function Results({ boards, view, page, pages, onPage }: Props) {
  const t = useT()
  const r = content.results
  if (!boards.length) return <p className="py-10 text-lg">{t(r.none)}</p>
  const labels = { pages: t(r.pages), prev: t(r.prev), next: t(r.next), page: t(r.page) }
  const go = (next: number) => {
    onPage(next)
    document.getElementById('results-title')?.scrollIntoView({ block: 'start' })
  }
  return (
    <div className="flex flex-col gap-8">
      <ul
        className={cn(
          'grid gap-5',
          view === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1',
        )}
      >
        {boards.map((board, i) => (
          <li key={board.code} className="flex">
            <BoardCard board={board} layout={view} priority={i === 0} />
          </li>
        ))}
      </ul>
      <Pagination page={page} pages={pages} onPage={go} labels={labels} />
    </div>
  )
}
