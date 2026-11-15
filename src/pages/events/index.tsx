import { ContentPage } from '@/components/shared/ContentPage'
import content from './events.content.json'

/** Events (BUILD-BRIEF 3): catalog wording, confirmed facts only. */
export default function EventsPage() {
  return <ContentPage id="events" content={content} />
}
