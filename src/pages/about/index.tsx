import { ContentPage } from '@/components/shared/ContentPage'
import content from './about.content.json'

/** About (BUILD-BRIEF 3): catalog wording, confirmed facts only. */
export default function AboutPage() {
  return <ContentPage id="about" content={content} />
}
