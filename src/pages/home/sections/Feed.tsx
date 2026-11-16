import { Section } from '@/components/shared/Section'
import { FEED } from '@/features/feed/feed'
import { useT } from '@/features/i18n/LangContext'
import content from '../home.more.content.json'
import { FeedCard } from './FeedCard'

/** "Our latest campaigns": client-approved campaigns only, newest first, scrolled sideways. */
export function Feed() {
  const t = useT()
  const { feed } = content
  if (!FEED.length) return null
  return (
    <Section id="feed" labelledBy="feed-title" pad="md" className="border-b border-line">
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-2 text-[0.8125rem] font-semibold text-link ltr:tracking-[0.06em]">
          <span aria-hidden="true" className="size-2 rounded-full bg-brand-green" />
          {t(feed.eyebrow)}
        </p>
        <h2 id="feed-title" className="text-3xl lg:text-4xl">
          {t(feed.title)}
        </h2>
      </div>
      <ul className="-mx-4 mt-6 flex snap-x snap-mandatory gap-[1.125rem] overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
        {FEED.map((item) => (
          <li key={item.id} className="flex w-[18.75rem] shrink-0 snap-start">
            <FeedCard item={item} />
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[0.8125rem]">{t(feed.note)}</p>
    </Section>
  )
}
