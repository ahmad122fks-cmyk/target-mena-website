import { FeatureCard } from '@/components/shared/FeatureCard'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useT } from '@/features/i18n/LangContext'
import content from '../digital.content.json'

/**
 * Digital media and marketing (the catalog's service list): white v3 cards
 * that lift on hover, 3 columns, then 2, then 1.
 */
export function Services() {
  const t = useT()
  const { services } = content
  return (
    <Section labelledBy="digital-services" deferred>
      <div className="flex flex-col gap-8">
        <SectionHeading id="digital-services" title={t(services.title)} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item) => (
            <FeatureCard
              key={item.title.en}
              title={t(item.title)}
              text={t(item.text)}
              className="card-lift"
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
