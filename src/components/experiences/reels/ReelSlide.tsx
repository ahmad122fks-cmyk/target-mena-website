import content from '@/content/experiences.json'
import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import { TrueRatioPhoto } from '../deck/DeckPhoto'
import { LtrText } from '../deck/LtrText'
import { reelPicture, type ReelPost } from './posts'
import { ReelActions } from './ReelActions'
import { ReelInfo } from './ReelInfo'
import { ReelVisual } from './ReelVisual'

type Props = {
  post: ReelPost
  label: string
  current: boolean
  near: boolean
  topPad: number
  liked: boolean
  /** Changes on every double tap: replays the heart burst. 0 = none. */
  burst: number
  following: boolean
  onLike: () => void
  onFollow: () => void
}

const SHADE =
  'pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/.45)_0%,rgb(0_0_0/0)_20%,rgb(0_0_0/0)_50%,rgb(0_0_0/.85)_100%)]'
const TO_CONFIRM: Record<string, string> = content.swipe.photoToConfirm

/** One reel: background design, headline (board photos shown whole), account, caption, actions. */
export function ReelSlide({ post, label, current, near, topPad, liked, burst, ...rest }: Props) {
  const t = useT()
  const picture = post.design === 'board' ? reelPicture(post.image) : undefined
  return (
    <article
      aria-roledescription="slide"
      aria-label={label}
      inert={!current}
      className="relative h-full overflow-hidden"
    >
      {near && <ReelVisual post={post} current={current} />}
      <div className={SHADE} />
      <div
        className="absolute inset-x-0 flex flex-col gap-4"
        style={{ top: picture ? topPad + 50 : '38%' }}
      >
        {near && picture && (
          <TrueRatioPhoto
            picture={picture}
            alt=""
            toConfirm={post.image && TO_CONFIRM[post.image]}
          />
        )}
        {post.title && (
          <b
            className={cn(
              'px-[18px] text-[25px] leading-[1.4] [text-shadow:0_2px_16px_rgb(0_0_0/0.35)]',
              post.design === 'rec' ? 'text-black' : 'text-white',
            )}
          >
            <LtrText text={t(post.title)} />
          </b>
        )}
      </div>
      {burst > 0 && (
        <svg
          key={burst}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -mt-[55px] -ml-[55px] size-[110px] animate-[reel-burst_.9s_cubic-bezier(.2,.8,.2,1)_both] fill-brand-yellow"
        >
          <path d="M12 21C5 16 2 12 4 8c1.5-3 5-3 8 0 3-3 6.5-3 8 0 2 4-1 8-8 13z" />
        </svg>
      )}
      <ReelInfo post={post} following={rest.following} onFollow={rest.onFollow} />
      <ReelActions liked={liked} onLike={rest.onLike} />
    </article>
  )
}
