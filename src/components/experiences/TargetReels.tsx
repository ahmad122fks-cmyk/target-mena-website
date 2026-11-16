import reels from '@/content/reels.json'
import { useT } from '@/features/i18n/LangContext'
import { useInView, usePrefersReducedMotion } from '@/lib/motion'
import { fill } from '@/lib/template'
import { cn } from '@/lib/utils'
import { DeckTrack } from './deck/DeckTrack'
import { isNear } from './deck/logic'
import { useSwipeDeck } from './deck/useSwipeDeck'
import { POSTS } from './reels/posts'
import { ReelSlide } from './reels/ReelSlide'
import { ReelTop } from './reels/ReelTop'
import { useReelLikes } from './reels/useReelLikes'
import { useTaps } from './reels/useTaps'
import './reels/reels.css'

type Props = { topPad?: number; active?: boolean }

/**
 * Instagram-style reels of Target posts (src/content/reels.json): each one
 * plays for 4.2 s with a progress bar; drag, wheel, arrow keys or a tap skip,
 * a double tap likes. Interactions hold the bar for 6 s. No counts anywhere.
 */
export function TargetReels({ topPad = 50, active = true }: Props) {
  const t = useT()
  const [rootRef, inView] = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const live = active && inView
  const likes = useReelLikes()
  const n = POSTS.length
  const deck = useSwipeDeck({ count: n, rootRef, running: live, autoMs: null, onTap: () => tap() })
  const tap = useTaps(
    () => deck.go(1),
    () => likes.like(POSTS[deck.index].id, true),
  )
  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={t(reels.label)}
      tabIndex={0}
      {...deck.handlers}
      className={cn(
        'absolute inset-0 touch-pan-y overflow-hidden bg-black text-white select-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand-yellow [&_img]:pointer-events-none',
        !live && '[&_*]:[animation-play-state:paused]',
      )}
    >
      <DeckTrack index={deck.index}>
        {POSTS.map((post, j) => (
          <ReelSlide
            key={post.id}
            post={post}
            label={`${fill(t(reels.slide), { n: `${j + 1}`, total: `${n}` })}: ${t(post.caption)}`}
            current={j === deck.index}
            near={isNear(j, deck.index, n)}
            topPad={topPad}
            liked={likes.isLiked(post.id)}
            burst={likes.burstOf(post.id)}
            following={likes.following}
            onLike={() => likes.like(post.id, false)}
            onFollow={likes.toggleFollow}
          />
        ))}
      </DeckTrack>
      <ReelTop
        count={n}
        index={deck.index}
        playing={!reduced}
        holding={deck.holding}
        onDone={() => deck.go(1)}
        title={t(reels.title)}
        topPad={topPad}
      />
    </div>
  )
}
