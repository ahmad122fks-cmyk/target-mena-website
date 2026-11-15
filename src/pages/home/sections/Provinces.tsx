import { usePageData } from '@/app/PageData'
import { ProvinceChips } from '@/components/shared/ProvinceChips'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useLink, useT } from '@/features/i18n/LangContext'
import content from '../home.platform.content.json'

/** Province and highway chips with real counts from boards.json, each linking to its page. */
export function Provinces() {
  const t = useT()
  const link = useLink()
  const { provinces } = usePageData('home')
  return (
    <Section id="network" tone="ghost" pad="md" labelledBy="provinces-title" deferred>
      <SectionHeading id="provinces-title" size="band" title={t(content.provinces.title)} />
      <ProvinceChips
        items={provinces}
        hrefFor={(key) => link(`/network/${key}/`)}
        className="mt-6"
      />
    </Section>
  )
}
