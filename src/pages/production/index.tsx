import { WorkBlock } from '@/components/shared/blocks/WorkBlock'
import { Section } from '@/components/shared/Section'
import { Cta } from './sections/Cta'
import { Hero } from './sections/Hero'
import { HowWeWork } from './sections/HowWeWork'
import { Make } from './sections/Make'
import { Showreel } from './sections/Showreel'

/**
 * Production (BUILD-BRIEF 3, prompt 4 and Production.dc.html): on set in the
 * viewfinder, then what we make (catalog facts and services), how we work
 * (+35), the showreel slot, clients and recent work, and the yellow CTA.
 * The contact block and footer come from SiteLayout.
 */
export default function ProductionPage() {
  return (
    <>
      <Hero />
      <Make />
      <HowWeWork />
      <Showreel />
      <Section deferred>
        <WorkBlock />
      </Section>
      <Cta />
    </>
  )
}
