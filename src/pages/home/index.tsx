import { Bridges } from './sections/Bridges'
import { Clients } from './sections/Clients'
import { Creative } from './sections/Creative'
import { Facts } from './sections/Facts'
import { FeaturedSites } from './sections/FeaturedSites'
import { Hero } from './sections/Hero'
import { Production } from './sections/Production'
import { Services } from './sections/Services'

/**
 * Home (Arabic at /, English at /en/). Order follows the approved demo and
 * the catalog: outdoor first, then production and creative, then clients.
 * The contact block and footer come from SiteLayout.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Facts />
      <FeaturedSites />
      <Bridges />
      <Services />
      <Production />
      <Creative />
      <Clients />
    </>
  )
}
