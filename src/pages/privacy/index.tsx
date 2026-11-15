import { ContentPage } from '@/components/shared/ContentPage'
import { ToConfirm } from '@/components/shared/ToConfirm'
import content from './privacy.content.json'

/** Privacy: what the site really does with data (forms, browser storage, no tracking cookies). */
export default function PrivacyPage() {
  return (
    <ContentPage
      id="privacy"
      content={content}
      hero={<ToConfirm what={content.legalToConfirm} className="self-start text-xs" />}
    />
  )
}
