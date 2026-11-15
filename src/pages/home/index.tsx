import { Feed } from './sections/Feed'
import { Formats } from './sections/Formats'
import { Hero } from './sections/Hero'
import { Numbers } from './sections/Numbers'
import { Planner } from './sections/Planner'
import { Platform } from './sections/Platform'
import { Portal } from './sections/Portal'
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
      <Feed />
      <Team />
      <TwoWays />
      <Formats />
      <Provinces />
      <Platform />
      <Portal />
      <Planner />
      <Services />
      <Numbers />
    </>
  )
}
