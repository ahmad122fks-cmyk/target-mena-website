import { usePageData } from '@/app/PageData'
import { PageHero } from '@/components/shared/PageHero'
import { Container } from '@/components/shared/Section'
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
    <>
      <PageHero crumbs={trailFor(data, lang)} title={t(content.title)} intro={t(content.intro)} />
      <Container className="max-w-4xl py-10 lg:py-14">
        <CampaignWizard />
      </Container>
    </>
  )
}
