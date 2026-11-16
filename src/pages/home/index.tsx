import { CtaBand } from '@/components/shared/CtaBand'
import content from './home.content.json'
import { AlrabiaaSales } from './sections/AlrabiaaSales'
import { Feed } from './sections/Feed'
import { Hero } from './sections/Hero'
import { Platform } from './sections/Platform'
import { Portal } from './sections/Portal'
import { ServiceTiles } from './sections/ServiceTiles'
import { Street } from './sections/Street'

/**
 * Home v2 (Arabic at /, English at /en/), prompt 4: dark hero with the
 * services phone, the network map and counters; then the campaign feed,
 * the service tiles, the finder/list/planner platform, street photos, the
 * client portal, the Alrabiaa planner and a closing call to action. The
 * contact block and the footer come from SiteLayout.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Feed />
      <ServiceTiles />
      <Platform />
      <Street />
      <Portal />
      <AlrabiaaSales />
      <CtaBand id="home-cta" {...content.cta} />
    </>
  )
}
