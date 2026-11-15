import { FeatureCard } from '@/components/shared/FeatureCard'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useLink, useT } from '@/features/i18n/LangContext'
import content from '../home.platform.content.json'
import { ListPreview, PlanPreview, SearchPreview } from './PlatformPreviews'

/** The platform: search, my list, plan your campaign - each with a small preview. */
export function Platform() {
  const t = useT()
  const link = useLink()
  const { platform } = content
  const cards = [
    { key: 'search', card: platform.search, preview: <SearchPreview /> },
    { key: 'list', card: platform.list, preview: <ListPreview /> },
    { key: 'plan', card: platform.plan, preview: <PlanPreview /> },
  ]
  return (
    <Section labelledBy="platform-title" deferred>
      <SectionHeading id="platform-title" eyebrow={t(platform.eyebrow)} title={t(platform.title)} />
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {cards.map(({ key, card, preview }) => (
          <FeatureCard
            key={key}
            eyebrow={t(card.eyebrow)}
            title={t(card.title)}
            text={t(card.text)}
            preview={preview}
            link={{ href: link(card.link.path), label: t(card.link.label) }}
          />
        ))}
      </div>
    </Section>
  )
}
