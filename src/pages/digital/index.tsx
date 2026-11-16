import { Cta } from './sections/Cta'
import { Hero } from './sections/Hero'
import { Process } from './sections/Process'
import { Services } from './sections/Services'

/**
 * Creative & Digital (v3, prompt 5 and Digital3.dc.html): ghost hero with
 * six service tabs (active = blue) that change the navy phone, the digital
 * media services (white), the four-step process (ghost) and the page's one
 * blue CTA band. The light footer comes from SiteLayout.
 */
export default function DigitalPage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Cta />
    </>
  )
}
