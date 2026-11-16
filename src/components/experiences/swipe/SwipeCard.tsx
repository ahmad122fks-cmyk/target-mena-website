import content from '@/content/experiences.json'
import { useLang, useT } from '@/features/i18n/LangContext'
import { cityLabel, placeLine, typeLabel, type Board } from '@/lib/boards'
import { formatSize } from '@/lib/format'
import { BOARD_PHOTOS } from '@/lib/images'
import { fill } from '@/lib/template'
import { BlurredBackdrop, TrueRatioPhoto } from '../deck/DeckPhoto'
import { SwipeActions } from './SwipeActions'
import { typeTone } from './tones'

type Props = {
  board: Board
  position: { n: number; total: number }
  current: boolean
  /** Load the photos (this card or a neighbour is on screen). */
  near: boolean
  topPad: number
}

const TO_CONFIRM: Record<string, string> = content.swipe.photoToConfirm

/** One board: real photo whole, blurred copy behind, facts, add / location / share. */
export function SwipeCard({ board, position, current, near, topPad }: Props) {
  const t = useT()
  const lang = useLang()
  const picture = BOARD_PHOTOS[board.code]
  const type = typeLabel(board.type, lang)
  const place = placeLine(board, lang)
  const label = `${fill(t(content.swipe.slide), { n: `${position.n}`, total: `${position.total}` })}: ${type} ${board.code}`
  return (
    <article
      aria-roledescription="slide"
      aria-label={label}
      inert={!current}
      className="relative flex h-full flex-col overflow-hidden"
    >
      {near && picture && <BlurredBackdrop picture={picture} />}
      <div
        className="relative flex flex-1 flex-col justify-center gap-3.5"
        style={{ paddingTop: topPad + 30 }}
      >
        {near && picture && (
          <TrueRatioPhoto
            picture={picture}
            alt={`${type} ${board.code}: ${place}`}
            toConfirm={TO_CONFIRM[board.code]}
          >
            <span
              className={`absolute start-2 top-2 rounded-full px-2.5 py-1 text-[11px] leading-none font-semibold ${typeTone(board.type)}`}
            >
              {type}
            </span>
          </TrueRatioPhoto>
        )}
        <div className="flex flex-col gap-1.5 px-4">
          <b className="line-clamp-2 text-lg leading-snug">{place}</b>
          <span className="text-xs text-white/80">{cityLabel(board.city, lang)}</span>
          <div className="flex flex-wrap gap-2 text-[11px] leading-5">
            <span className="ltr-run rounded-lg border border-white/35 px-2">
              {formatSize(board.height, board.width, lang)}
            </span>
            <span className="ltr-run rounded-lg border border-white/35 px-2">{board.code}</span>
          </div>
        </div>
      </div>
      <SwipeActions board={board} />
    </article>
  )
}
