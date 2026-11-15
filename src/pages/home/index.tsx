import { Formats } from './sections/Formats'
import { Hero } from './sections/Hero'
import { Numbers } from './sections/Numbers'
import { Platform } from './sections/Platform'
import { Provinces } from './sections/Provinces'
import { Services } from './sections/Services'
import { Team } from './sections/Team'
import { TwoWays } from './sections/TwoWays'

/**
 * Home (Arabic at /, English at /en/), rebuilt from the approved design
 * reference: bands alternate ghost and white. The contact block and the
 * black footer come from SiteLayout.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Team />
      <TwoWays />
      <Formats />
      <Provinces />
      <Platform />
      <Services />
      <Numbers />
    </>
  )
}
