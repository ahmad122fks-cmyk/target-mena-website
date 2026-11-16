import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { FEED, type FeedItem } from '@/features/feed/feed'
import { useLink, useT } from '@/features/i18n/LangContext'
import content from '../home.more.content.json'
import { FeedCard } from './FeedCard'

export type FeedPhoto = NonNullable<FeedItem['photos']>[number]
export type FeedCardData = { item: FeedItem; photo?: FeedPhoto; first: boolean }

/**
 * The home cards: each approved campaign gives its first `cards` photos
 * (default 1), newest campaign first; a campaign without a photo gives one
 * logo card. Three cards at most.
 */
export function feedCards(items: FeedItem[], max = 3): FeedCardData[] {
  return items
    .flatMap((item) => {
      const photos = (item.photos ?? []).slice(0, item.cards ?? 1)
      if (!photos.length) return [{ item, first: true }]
      return photos.map((photo, i) => ({ item, photo, first: i === 0 }))
    })
    .slice(0, max)
}

/** "Our latest campaigns" (v3): three white cards with real photos at their true ratio. */
export function Feed() {
  const t = useT()
  const link = useLink()
  const { feed } = content
  const cards = feedCards(FEED)
  if (!cards.length) return null
  return (
    <Section id="feed" labelledBy="feed-title" deferred>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <SectionHeading id="feed-title" eyebrow={t(feed.eyebrow)} title={t(feed.title)} />
        <a
          href={link(feed.all.path)}
          className="text-[0.9375rem] font-semibold text-link hover:underline"
        >
          {t(feed.all.label)}
        </a>
      </div>
      <ul className="mt-8 grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <li key={card.photo?.file ?? card.item.id} className="flex">
            <FeedCard {...card} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
