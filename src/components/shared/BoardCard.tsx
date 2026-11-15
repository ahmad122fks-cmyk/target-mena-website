import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import content from '@/content/selection.json'
import { useLang, useLink, useT } from '@/features/i18n/LangContext'
import { boardPath, placeLine, typeLabel, type Board } from '@/lib/boards'
import { cn } from '@/lib/utils'
import { BoardFacts } from './BoardFacts'
import { BoardPhoto } from './BoardPhoto'
import { SelectionToggle } from './SelectionToggle'

type Props = { board: Board; layout?: 'grid' | 'list'; priority?: boolean }

/** A board: true-ratio photo, code, type, place, size, faces; "add to selection" and "details". Never prices. */
export function BoardCard({ board, layout = 'grid', priority = false }: Props) {
  const t = useT()
  const lang = useLang()
  const link = useLink()
  const list = layout === 'list'
  return (
    <Card className={cn('w-full gap-0 overflow-hidden py-0 shadow-none', list && 'sm:flex-row')}>
      <BoardPhoto
        board={board}
        priority={priority}
        alt={`${typeLabel(board.type, lang)} ${board.code}: ${placeLine(board, lang)}`}
        sizes={
          list
            ? '(min-width: 640px) 240px, calc(100vw - 32px)'
            : '(min-width: 1024px) 390px, (min-width: 640px) 45vw, calc(100vw - 32px)'
        }
        className={list ? 'aspect-[16/10] sm:aspect-auto sm:w-60 sm:shrink-0' : 'aspect-[16/10]'}
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="ltr-run text-lg font-semibold text-brand-blue">{board.code}</span>
          <Badge variant="secondary" className="text-sm">
            {typeLabel(board.type, lang)}
          </Badge>
        </div>
        <BoardFacts board={board} />
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          <SelectionToggle board={board} className="flex-1" />
          <Button
            asChild
            variant="ghost"
            className="h-11 rounded-xl px-4 font-semibold text-brand-blue"
          >
            <a href={link(boardPath(board))}>
              {t(content.details)}
              <span className="sr-only ltr-run"> {board.code}</span>
            </a>
          </Button>
        </div>
      </div>
    </Card>
  )
}
