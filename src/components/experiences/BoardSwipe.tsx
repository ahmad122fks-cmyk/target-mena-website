import { ChevronUp, MoveHorizontal } from 'lucide-react'
import content from '@/content/experiences.json'
import { useT } from '@/features/i18n/LangContext'
import type { Board } from '@/lib/boards'
import { BOARD_PHOTOS } from '@/lib/images'
import { useInView, usePrefersReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { DeckDots, DeckTrack } from './deck/DeckTrack'
import { isNear } from './deck/logic'
import { useSwipeDeck } from './deck/useSwipeDeck'
import { SwipeCard } from './swipe/SwipeCard'

type Props = { boards: Board[]; topPad?: number; active?: boolean }

/**
 * Board cards inside the phone, swiped up and down (drag, wheel, arrow keys);
 * autoplay every 3.6 s, quiet for 6 s after any interaction. Boards with an
 * approved street photo only. Never prices or availability.
 */
export function BoardSwipe({ boards, topPad = 50, active = true }: Props) {
  const t = useT()
  const c = content.swipe
  const cards = boards.filter((board) => BOARD_PHOTOS[board.code])
  const [rootRef, inView] = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const live = active && inView
  const deck = useSwipeDeck({
    count: cards.length,
    rootRef,
    running: live && !reduced,
    autoMs: 3600,
  })
  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={t(c.label)}
      tabIndex={0}
      {...deck.handlers}
      className={cn(
        'absolute inset-0 cursor-grab touch-pan-y overflow-hidden bg-black text-white select-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand-yellow [&_img]:pointer-events-none',
        !live && '[&_*]:[animation-play-state:paused]',
      )}
    >
      <DeckTrack index={deck.index}>
        {cards.map((board, j) => (
          <SwipeCard
            key={board.code}
            board={board}
            position={{ n: j + 1, total: cards.length }}
            current={j === deck.index}
            near={isNear(j, deck.index, cards.length)}
            topPad={topPad}
          />
        ))}
      </DeckTrack>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-4"
        style={{ paddingTop: topPad }}
      >
        <b className="text-sm">{t(c.title)}</b>
        <span className="flex items-center gap-1.5 rounded-full border border-brand-green bg-black/50 px-2.5 py-1 text-[11px] leading-none font-semibold">
          <span className="size-2 rounded-full bg-brand-green motion-safe:animate-[twinkle_1.2s_ease-in-out_infinite]" />
          {t(c.live)}
        </span>
      </div>
      <DeckDots count={cards.length} index={deck.index} />
      {deck.index === 0 && (
        <span className="pointer-events-none absolute inset-x-0 bottom-[76px] mx-auto flex w-28 flex-col items-center text-[11px] motion-safe:animate-[phone-float_1.6s_ease-in-out_infinite]">
          {/* Touch screens scroll the page vertically, so there cards move sideways. */}
          <ChevronUp
            className="size-[22px] pointer-coarse:hidden"
            strokeWidth={2}
            aria-hidden="true"
          />
          <MoveHorizontal
            className="hidden size-[22px] pointer-coarse:block"
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="pointer-coarse:hidden">{t(c.hint)}</span>
          <span className="hidden pointer-coarse:inline">{t(c.hintTouch)}</span>
        </span>
      )}
    </div>
  )
}
