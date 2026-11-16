import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ToConfirm } from '@/components/shared/ToConfirm'
import { useT } from '@/features/i18n/LangContext'
import content from '../production.content.json'
import { Facts } from './Facts'
import { Services } from './Services'

/** What we make: the catalog intro, the four facts and the six services. */
export function Make() {
  const t = useT()
  const { make } = content
  return (
    <Section labelledBy="production-make">
      <div className="flex flex-col gap-8 lg:gap-10">
        <SectionHeading
          id="production-make"
          eyebrow={t(make.eyebrow)}
          title={t(make.title)}
          lead={t(content.intro)}
        />
        <Facts />
        <Services />
        <p>
          <ToConfirm what={make.toConfirm} />
        </p>
      </div>
    </Section>
  )
}
