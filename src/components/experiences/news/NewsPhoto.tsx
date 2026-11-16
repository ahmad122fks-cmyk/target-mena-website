import { Photo } from '@/components/shared/Photo'
import { ToConfirm } from '@/components/shared/ToConfirm'
import { useT } from '@/features/i18n/LangContext'
import type { NewsItem } from '@/features/news/build'
import { newsPicture, PHOTO_TO_CONFIRM } from '@/features/news/news'
import { POST_SIZES } from './screen'

type Props = { item: NewsItem; priority: boolean }

/**
 * The post's real photo at its true ratio across the post width: never cropped,
 * never stretched (a very tall photo is fitted inside, not cut). Photos still
 * waiting for a yes carry the same [TO CONFIRM] chip as the swipe deck.
 */
export function NewsPhoto({ item, priority }: Props) {
  const t = useT()
  const picture = newsPicture(item.photo)
  if (!picture) return null
  const toConfirm = PHOTO_TO_CONFIRM[item.photo]
  return (
    <div
      className="relative max-h-[180px] shrink-0 overflow-hidden rounded-[14px] bg-brand-ghost"
      style={{ aspectRatio: `${picture.img.w} / ${picture.img.h}` }}
    >
      <Photo
        picture={picture}
        alt={t(item.alt)}
        sizes={POST_SIZES}
        priority={priority}
        className="h-full w-full object-contain"
      />
      {toConfirm && (
        <ToConfirm
          what={toConfirm}
          className="absolute start-2 bottom-2 bg-black/70 px-1.5 text-[10px] leading-4 text-white"
        />
      )}
    </div>
  )
}
