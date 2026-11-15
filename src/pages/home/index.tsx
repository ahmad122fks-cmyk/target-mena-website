import { Bridges } from './sections/Bridges'
import { Clients } from './sections/Clients'
import { Facts } from './sections/Facts'
import { FeaturedSites } from './sections/FeaturedSites'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Studio } from './sections/Studio'

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
      <Studio />
      <Clients />
    </>
  )
}
