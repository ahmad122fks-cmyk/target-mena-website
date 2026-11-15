import { ContentPage } from '@/components/shared/ContentPage'
import content from './digital.content.json'

/** Digital (BUILD-BRIEF 3): catalog wording, confirmed facts only. */
export default function DigitalPage() {
  return <ContentPage id="digital" content={content} />
}
