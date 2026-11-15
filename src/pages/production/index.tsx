import { ContentPage } from '@/components/shared/ContentPage'
import content from './production.content.json'

/** Production (BUILD-BRIEF 3): catalog wording, confirmed facts only. */
export default function ProductionPage() {
  return <ContentPage id="production" content={content} />
}
