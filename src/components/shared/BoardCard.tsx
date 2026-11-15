import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useLang, useLink } from '@/features/i18n/LangContext'
import { boardPath, cityLabel, placeLine, typeLabel, type Board } from '@/lib/boards'
import { formatFaces, formatSize, formatSqm } from '@/lib/format'
import { BoardPhoto } from './BoardPhoto'
import { CtaLink } from './CtaLink'

/** A board as a card: real photo, code, type, place, size (whitelisted fields only, never prices). */
export function BoardCard({ board, requestLabel }: { board: Board; requestLabel: string }) {
  const lang = useLang()
  const link = useLink()
  const place = placeLine(board, lang)
  return (
    <Card className="w-full gap-0 overflow-hidden py-0 shadow-none">
      <BoardPhoto
        board={board}
        alt={`${typeLabel(board.type, lang)}: ${place}`}
        sizes="(min-width: 1024px) 390px, (min-width: 640px) 45vw, calc(100vw - 32px)"
        className="aspect-[5/3]"
      />
      <CardContent className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="ltr-run text-lg font-semibold text-brand-blue">{board.code}</span>
          <Badge variant="secondary" className="text-sm">
            {typeLabel(board.type, lang)}
          </Badge>
        </div>
        <h3 className="text-lg" lang={board.area ? undefined : 'ar'}>
          {place}
        </h3>
        <p className="text-[0.95rem]">
          {cityLabel(board.city, lang)} ·{' '}
          <span className="ltr-run">{formatSize(board.height, board.width, lang)}</span> ·{' '}
          <span className="ltr-run">{formatSqm(board.sqm, lang)}</span> ·{' '}
          {formatFaces(board.faces, lang)}
        </p>
        <CtaLink tone="outline" href={link(boardPath(board))} className="mt-4 w-full">
          <span>{requestLabel}</span> <span className="sr-only ltr-run">{board.code}</span>
        </CtaLink>
      </CardContent>
    </Card>
  )
}
