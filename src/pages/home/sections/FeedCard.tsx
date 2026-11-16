import qiMark from '@/assets/feed/qi-mark.svg'
import { Photo } from '@/components/shared/Photo'
import feed from '@/content/campaigns.json'
import { useT } from '@/features/i18n/LangContext'
import { FEED_PHOTOS } from '@/lib/images'
import type { FeedCardData } from './Feed'

/**
 * One approved campaign photo (v3): real photo at its true ratio (or the
 * client's logo), when · where, brand and one line. A campaign's further
 * cards use the photo's own description as their line.
 */
export function FeedCard({ item, photo, first }: FeedCardData) {
  const t = useT()
  return (
    <article className="card-lift flex w-full flex-col overflow-hidden rounded-card border border-line bg-surface">
      <div className="relative bg-brand-ghost">
        {photo ? (
          <Photo
            picture={FEED_PHOTOS[photo.file]}
            alt={t(photo.alt)}
            sizes="(min-width: 1240px) 388px, (min-width: 640px) 45vw, calc(100vw - 32px)"
          />
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center">
            <img
              src={qiMark}
              width={62}
              height={61}
              alt={item.logoAlt ? t(item.logoAlt) : ''}
              loading="lazy"
              className="h-20 w-auto"
            />
          </div>
        )}
        {item.isNew && first && (
          <span className="absolute start-3 top-3 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-brand-black shadow-[0_4px_12px_rgb(0_0_0/0.12)]">
            {t(feed.newLabel)}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1.5 p-5">
        <p className="text-[0.8125rem]">
          <span className="ltr-run">{t(item.when)}</span> · {t(item.where)}
        </p>
        <h3 className="text-[1.1875rem] font-bold">{t(item.brand)}</h3>
        <p className="text-sm leading-[1.7]">{t(first || !photo ? item.line : photo.alt)}</p>
      </div>
    </article>
  )
}
