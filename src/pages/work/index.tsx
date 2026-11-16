import { ClientLogos } from '@/components/shared/ClientLogos'
import { ContentPage } from '@/components/shared/ContentPage'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { FEED } from '@/features/feed/feed'
import { useT } from '@/features/i18n/LangContext'
import { feedCards } from '@/pages/home/sections/Feed'
import { FeedCard } from '@/pages/home/sections/FeedCard'
import content from './work.content.json'

/** Clients & work: client-approved campaigns only, production clients, approved logos. */
export default function WorkPage() {
  const t = useT()
  return (
    <ContentPage
      id="work"
      content={content}
      startGhost
      before={
        <Section labelledBy="work-campaigns">
          <SectionHeading id="work-campaigns" size="band" title={t(content.campaignsTitle)} />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {feedCards(
              FEED.map((item) => ({ ...item, cards: 1 })),
              FEED.length,
            ).map((card) => (
              <li key={card.item.id} className="flex">
                <FeedCard {...card} />
              </li>
            ))}
          </ul>
        </Section>
      }
    >
      <Section labelledBy="work-logos" deferred>
        <SectionHeading id="work-logos" size="band" title={t(content.logosTitle)} />
        <div className="mt-8">
          <ClientLogos logos={content.logos} toConfirm={content.logosToConfirm} />
        </div>
      </Section>
    </ContentPage>
  )
}
