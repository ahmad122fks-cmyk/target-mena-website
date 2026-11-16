import { usePageData } from '@/app/PageData'
import { CtaBand } from '@/components/shared/CtaBand'
import { StreetPhotos } from '@/components/shared/StreetPhotos'
import content from './network.content.json'
import { Browse } from './sections/Browse'
import { NumbersBand } from './sections/NumbersBand'
import { OnTheGround } from './sections/OnTheGround'
import { TourBand } from './sections/TourBand'
import { UnipoleStreet } from './sections/UnipoleStreet'

/**
 * Network v3 (prompt 5): light page, bands alternating white and ghost.
 * Tour + map (white) → on the ground: phone + tracking (ghost) → numbers and
 * charts (white) → links to every province / highway / type (ghost) → street
 * photos (white) → the one blue call to action.
 */
export default function NetworkPage() {
  const { swipe } = usePageData('network')
  return (
    <>
      <TourBand />
      <UnipoleStreet />
      <OnTheGround />
      <NumbersBand />
      <Browse />
      <StreetPhotos id="strip-title" boards={swipe} {...content.strip} />
      <CtaBand id="network-cta" {...content.cta} />
    </>
  )
}
