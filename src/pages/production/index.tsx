import { Cta } from './sections/Cta'
import { Hero } from './sections/Hero'
import { HowWeWork } from './sections/HowWeWork'
import { Make } from './sections/Make'
import { Showreel } from './sections/Showreel'

/**
 * Production (v3, prompt 5 and Production3.dc.html): light hero with the
 * viewfinder as a framed device (ghost), what we make (white), the showreel
 * player (ghost), how we work with clients and recent work (white), and the
 * page's one blue CTA band. The light footer comes from SiteLayout.
 */
export default function ProductionPage() {
  return (
    <>
      <Hero />
      <Make />
      <Showreel />
      <HowWeWork />
      <Cta />
    </>
  )
}
