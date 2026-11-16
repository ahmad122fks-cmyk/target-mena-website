import { CtaBand } from '@/components/shared/CtaBand'
import content from './home.content.json'
import { AlrabiaaSales } from './sections/AlrabiaaSales'
import { Feed } from './sections/Feed'
import { Hero } from './sections/Hero'
import { NetworkBand } from './sections/NetworkBand'
import { Portal } from './sections/Portal'
import { ServiceTiles } from './sections/ServiceTiles'
import { Street } from './sections/Street'
import { VisitUs } from './sections/VisitUs'

/**
 * Home v3 (Arabic at /, English at /en/), prompt 5: the brand-pattern hero
 * with the news phone, the network map and type counts, the services, the
 * latest campaigns, the client portal, the Alrabiaa card, street photos and
 * the one blue call to action (with the phone field). The light footer
 * comes from SiteLayout.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <NetworkBand />
      <ServiceTiles />
      <Feed />
      <Portal />
      <AlrabiaaSales />
      <Street />
      <CtaBand id="home-cta" phone {...content.cta} />
      <VisitUs />
    </>
  )
}
