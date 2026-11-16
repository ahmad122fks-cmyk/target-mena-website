import content from '@/content/selection.json'
import { useLang, useLink, useT } from '@/features/i18n/LangContext'
import { boardPath, placeLine, typeLabel, type Board } from '@/lib/boards'
import { cn } from '@/lib/utils'
import { BoardFacts } from './BoardFacts'
import { BoardPhoto } from './BoardPhoto'
import { PillButton } from './PillButton'
import { SelectionToggle } from './SelectionToggle'

type Props = {
  board: Board
  layout?: 'grid' | 'list'
  priority?: boolean
  /** Called when the visitor adds this board (the finder opens its side panel). */
  onAdd?: () => void
}

/** A board: 5:3 photo frame, code, type pill, place, province, size, m², faces; add and details. Never prices. */
export function BoardCard({ board, layout = 'grid', priority = false, onAdd }: Props) {
  const t = useT()
  const lang = useLang()
  const link = useLink()
  const list = layout === 'list'
  return (
    <article
      className={cn(
        'flex w-full flex-col overflow-hidden rounded-[1.125rem] border border-line bg-surface',
        list && 'sm:flex-row',
      )}
    >
      <BoardPhoto
        board={board}
        priority={priority}
        alt={`${typeLabel(board.type, lang)} ${board.code}: ${placeLine(board, lang)}`}
        sizes={
          list
            ? '(min-width: 640px) 240px, calc(100vw - 32px)'
            : '(min-width: 1280px) 400px, (min-width: 640px) 45vw, calc(100vw - 32px)'
        }
        className={list ? 'aspect-[5/3] sm:w-60 sm:shrink-0' : 'aspect-[5/3]'}
      />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="ltr-run text-lg font-semibold text-link">{board.code}</span>
          <span className="rounded-full bg-brand-grey-10 px-2.5 py-1 text-xs font-medium">
            {typeLabel(board.type, lang)}
          </span>
        </div>
        <BoardFacts board={board} />
        <div className="mt-auto flex gap-2 pt-2">
          <SelectionToggle board={board} onAdd={onAdd} className="flex-1" />
          <PillButton tone="ghost" size="sm" href={link(boardPath(board))} className="px-4 text-sm">
            {t(content.details)}
            <span className="sr-only ltr-run"> {board.code}</span>
          </PillButton>
        </div>
      </div>
    </article>
  )
}
