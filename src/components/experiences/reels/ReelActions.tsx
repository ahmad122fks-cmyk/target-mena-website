import { Heart, MessageCircle, Send } from 'lucide-react'
import reels from '@/content/reels.json'
import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'

const ITEM = 'flex flex-col items-center gap-0.5 text-[10px]'

/** Like (a real toggle), comment and share icons, the spinning sound disc. No counts. */
export function ReelActions({ liked, onLike }: { liked: boolean; onLike: () => void }) {
  const t = useT()
  return (
    <div className="absolute end-2.5 bottom-[22px] flex flex-col items-center gap-4">
      <button
        type="button"
        aria-pressed={liked}
        onClick={onLike}
        className={cn(ITEM, 'transition-transform active:scale-85')}
      >
        <Heart
          className={cn('size-7', liked ? 'fill-brand-yellow text-brand-yellow' : 'text-white')}
          strokeWidth={liked ? 0 : 1.8}
          aria-hidden="true"
        />
        {t(reels.like)}
      </button>
      <span aria-hidden="true" className={ITEM}>
        <MessageCircle className="size-[26px]" strokeWidth={1.8} />
        {t(reels.comment)}
      </span>
      <span aria-hidden="true" className={ITEM}>
        <Send className="size-[25px]" strokeWidth={1.8} />
        {t(reels.share)}
      </span>
      <span
        aria-hidden="true"
        className="block size-[30px] rounded-[9px] border-2 border-white bg-brand-blue motion-safe:animate-[reel-disc_4s_linear_infinite]"
      />
    </div>
  )
}
