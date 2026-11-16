import qiMark from '@/assets/feed/qi-mark.svg'
import { Photo } from '@/components/shared/Photo'
import feed from '@/content/feed.json'
import type { FeedItem } from '@/features/feed/feed'
import { useT } from '@/features/i18n/LangContext'
import { FEED_PHOTOS } from '@/lib/images'
import content from '../home.more.content.json'

/** One approved campaign: real photo (or the client's logo), when · where, brand, one line, tags. */
export function FeedCard({ item }: { item: FeedItem }) {
  const t = useT()
  const [main, ...more] = item.photos ?? []
  return (
    <article className="flex w-full flex-col overflow-hidden rounded-[1.125rem] border border-line bg-surface">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-brand-ghost">
        {main ? (
          <Photo
            picture={FEED_PHOTOS[main.file]}
            alt={t(main.alt)}
            sizes="300px"
            className="h-full object-cover"
          />
        ) : (
          item.logoAlt && (
            <img
              src={qiMark}
              width={62}
              height={61}
              alt={t(item.logoAlt)}
              loading="lazy"
              className="h-20 w-auto"
            />
          )
        )}
        {item.isNew && (
          <span className="absolute start-3 top-3 rounded-full bg-brand-yellow px-2.5 py-0.5 text-xs font-semibold text-brand-black">
            {t(feed.newLabel)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-xs">
          <span className="ltr-run">{t(item.when)}</span> · {t(item.where)}
        </p>
        <h3 className="text-[1.0625rem] font-semibold">{t(item.brand)}</h3>
        <p className="text-sm leading-[1.7]">{t(item.line)}</p>
        <ul className="mt-1 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <li key={tag.en} className="rounded-full bg-brand-grey-10 px-2.5 py-0.5 text-xs">
              {t(tag)}
            </li>
          ))}
        </ul>
        {more.length > 0 && (
          <ul aria-label={t(content.feed.more)} className="mt-auto flex gap-2 pt-3">
            {more.map((photo) => (
              <li key={photo.file}>
                <Photo
                  picture={FEED_PHOTOS[photo.file]}
                  alt={t(photo.alt)}
                  sizes="64px"
                  className="h-12 w-16 rounded-lg object-cover"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
