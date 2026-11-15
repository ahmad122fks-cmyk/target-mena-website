import { BoardPhoto } from '@/components/shared/BoardPhoto'
import { useLang, useT } from '@/features/i18n/LangContext'
import { cityLabel, placeLine, typeLabel, type Board } from '@/lib/boards'
import content from '../board.content.json'

export function BoardMedia({ board }: { board: Board }) {
  const t = useT()
  const lang = useLang()
  const alt = `${typeLabel(board.type, lang)} ${board.code}: ${placeLine(board, lang)}${lang === 'ar' ? '، ' : ', '}${cityLabel(board.city, lang)}`
  return (
    <figure className="flex flex-col gap-3">
      <BoardPhoto
        board={board}
        alt={alt}
        priority
        sizes="(min-width: 1024px) 700px, calc(100vw - 32px)"
        className="aspect-[5/3] rounded-2xl border"
      />
      {board.photo && <figcaption className="text-sm">{t(content.realPhoto)}</figcaption>}
    </figure>
  )
}
