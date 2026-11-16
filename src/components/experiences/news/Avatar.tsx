import alrabiaaLogo from '@/assets/clients/alrabiaa.png'
import qiMark from '@/assets/feed/qi-mark.svg'
import type { NewsAvatar } from '@/features/news/build'
import { cn } from '@/lib/utils'

/**
 * Target's mark is the site icon (as in the reels): the full logo would be
 * unreadable at this size and the guideline keeps it out of shapes.
 */
const AVATARS: Record<NewsAvatar, { src: string; w: number; h: number; look: string }> = {
  target: { src: '/favicon.svg', w: 202, h: 202, look: 'border border-line bg-brand-white' },
  qi: { src: qiMark, w: 62, h: 61, look: 'border border-line bg-brand-white' },
  alrabiaa: { src: alrabiaaLogo, w: 70, h: 92, look: 'bg-alrabiaa' },
}

/** Round account picture next to the brand name (decorative: the name is written beside it). */
export function Avatar({ kind }: { kind: NewsAvatar }) {
  const avatar = AVATARS[kind]
  return (
    <span
      aria-hidden="true"
      className={cn('flex size-7 shrink-0 items-center justify-center rounded-full', avatar.look)}
    >
      <img src={avatar.src} alt="" width={avatar.w} height={avatar.h} className="h-[18px] w-auto" />
    </span>
  )
}
