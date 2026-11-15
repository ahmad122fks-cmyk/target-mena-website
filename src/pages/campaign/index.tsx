import { usePageData } from '@/app/PageData'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { Container } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CampaignWizard } from '@/features/campaign/CampaignWizard'
import { useLang, useT } from '@/features/i18n/LangContext'
import { trailFor } from '@/lib/breadcrumbs'
import content from './campaign.content.json'

/** "Plan your campaign" (BUILD-BRIEF 5.1): details, campaign, boards, review and send. Never prices. */
export default function CampaignPage() {
  const data = usePageData('static')
  const t = useT()
  const lang = useLang()
  return (
    <div className="bg-brand-ghost">
      <Container className="flex flex-col gap-7 pt-8 pb-16 lg:pt-10 lg:pb-24">
        <div className="flex flex-col gap-2">
          <Breadcrumbs items={trailFor(data, lang)} />
          <SectionHeading
            id="page-title"
            level={1}
            eyebrow={t(content.eyebrow)}
            title={t(content.heading)}
            lead={t(content.intro)}
            className="gap-2.5"
          />
        </div>
        <CampaignWizard />
      </Container>
    </div>
  )
}
