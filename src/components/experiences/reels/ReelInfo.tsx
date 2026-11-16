import { Music } from 'lucide-react'
import reels from '@/content/reels.json'
import { useT } from '@/features/i18n/LangContext'
import { LtrText } from '../deck/LtrText'
import type { ReelPost } from './posts'

type Props = { post: ReelPost; following: boolean; onFollow: () => void }

/**
 * Account row (Target's mark, the site icon, in the avatar) with the follow
 * button, then the caption, an optional code tag and the sound line.
 */
export function ReelInfo({ post, following, onFollow }: Props) {
  const t = useT()
  return (
    <div className="absolute start-0 end-[60px] bottom-0 flex flex-col gap-2 px-3.5 pb-5">
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-full border-2 border-brand-yellow bg-white">
          <img src="/favicon.svg" alt="" width={202} height={202} className="size-[22px]" />
        </span>
        <b className="text-[13px]">{t(reels.account)}</b>
        <button
          type="button"
          aria-pressed={following}
          onClick={onFollow}
          className={
            'rounded-lg border border-white/70 px-2.5 py-0.5 text-[11px] ' +
            (following ? 'bg-white/25' : 'bg-transparent')
          }
        >
          {t(following ? reels.following : reels.follow)}
        </button>
      </div>
      <p className="m-0 text-xs leading-relaxed text-white/90">
        <LtrText text={t(post.caption)} />
        {post.tag && (
          <span className="ltr-run ms-1.5 inline-block rounded-md bg-white/15 px-1.5 text-[10px] leading-4">
            {post.tag}
          </span>
        )}
      </p>
      <div className="flex items-center gap-1.5 overflow-hidden text-[11px]">
        <Music className="size-[13px] shrink-0" strokeWidth={2} aria-hidden="true" />
        <span className="flex-1 overflow-hidden whitespace-nowrap">
          <span className="inline-block motion-safe:animate-[reel-sound_7s_linear_infinite]">
            {t(reels.sound)}
          </span>
        </span>
      </div>
    </div>
  )
}
