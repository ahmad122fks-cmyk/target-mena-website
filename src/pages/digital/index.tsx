import { Blocks } from '@/components/shared/blocks/Blocks'
import type { Block } from '@/components/shared/blocks/types'
import content from './digital.content.json'
import { Cta } from './sections/Cta'
import { Hero } from './sections/Hero'
import { Process } from './sections/Process'

/**
 * Creative & Digital (prompt 4, Digital.dc.html): hero with six service tabs
 * that change the phone, the digital media services from the catalog, the
 * four-step process and a closing call to action. Light and dark theme.
 */
export default function DigitalPage() {
  return (
    <>
      <Hero />
      <Blocks id="digital" blocks={content.blocks as Block[]} />
      <Process />
      <Cta />
    </>
  )
}
