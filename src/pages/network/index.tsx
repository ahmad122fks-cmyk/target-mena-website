import { usePageData } from '@/app/PageData'
import { CtaBand } from '@/components/shared/CtaBand'
import { StreetPhotos } from '@/components/shared/StreetPhotos'
import content from './network.content.json'
import { Browse } from './sections/Browse'
import { NumbersBand } from './sections/NumbersBand'
import { OnTheGround } from './sections/OnTheGround'
import { TourBand } from './sections/TourBand'

/**
 * Network v2 (prompt 4): the five-stop tour driving the map, the swipe cards
 * and the tracking demo, the network in numbers and charts, street photos,
 * links to every province / highway / type page, and a call to action.
 */
export default function NetworkPage() {
  const { swipe } = usePageData('network')
  return (
    <>
      <TourBand />
      <OnTheGround />
      <NumbersBand />
      <StreetPhotos id="strip-title" boards={swipe} {...content.strip} />
      <Browse />
      <CtaBand id="network-cta" {...content.cta} />
    </>
  )
}
