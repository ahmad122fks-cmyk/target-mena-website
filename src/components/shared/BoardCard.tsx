import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import site from '@/content/site.json'
import { useLang, useLink, useT } from '@/features/i18n/LangContext'
import type { Localized } from '@/features/i18n/lang'
import { formatFaces, formatSize, formatSqm } from '@/lib/format'
import { BOARD_PHOTOS } from '@/lib/images'
import { CtaLink } from './CtaLink'
import { Photo } from './Photo'

/** Whitelisted board fields only (BUILD-BRIEF 4.2) - never prices. */
export type BoardSummary = {
  code: string
  type: Localized
  place: Localized
  city: Localized
  height: number
  width: number
  sqm: number
  faces: number
}

export function BoardCard({ board, requestLabel }: { board: BoardSummary; requestLabel: string }) {
  const t = useT()
  const lang = useLang()
  const link = useLink()
  const photo = BOARD_PHOTOS[board.code]
  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-none">
      {photo ? (
        <Photo
          picture={photo}
          alt={`${t(board.type)}: ${t(board.place)}`}
          sizes="(min-width: 1024px) 390px, (min-width: 640px) 45vw, calc(100vw - 32px)"
          className="aspect-[5/3] object-cover"
        />
      ) : (
        <div className="flex aspect-[5/3] items-center justify-center bg-brand-ghost">
          {t(site.photoOnRequest)}
        </div>
      )}
      <CardContent className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="ltr-run text-lg font-semibold text-brand-blue">{board.code}</span>
          <Badge variant="secondary" className="text-sm">
            {t(board.type)}
          </Badge>
        </div>
        <h3 className="text-lg">{t(board.place)}</h3>
        <p className="text-[0.95rem]">
          {t(board.city)} ·{' '}
          <span className="ltr-run">{formatSize(board.height, board.width, lang)}</span> ·{' '}
          <span className="ltr-run">{formatSqm(board.sqm, lang)}</span> ·{' '}
          {formatFaces(board.faces, lang)}
        </p>
        <CtaLink tone="outline" href={link(`/boards/${board.code}`)} className="mt-4 w-full">
          <span>{requestLabel}</span> <span className="sr-only ltr-run">{board.code}</span>
        </CtaLink>
      </CardContent>
    </Card>
  )
}
