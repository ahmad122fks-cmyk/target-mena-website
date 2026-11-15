import { useT } from '@/features/i18n/LangContext'
import { Section } from '../Section'
import { SectionHeading } from '../SectionHeading'
import { BlockBody } from './BlockBody'
import type { Block } from './types'

/** A page's content blocks as alternating white / ghost bands (or the block's own tone). */
export function Blocks({
  id,
  blocks,
  startGhost = false,
}: {
  id: string
  blocks: Block[]
  startGhost?: boolean
}) {
  const t = useT()
  return blocks.map((block, i) => {
    const heading = `${id}-${i}`
    const tone = block.tone ?? ((i % 2 === 1) !== startGhost ? 'ghost' : 'white')
    return (
      <Section key={heading} tone={tone} labelledBy={block.title && heading} deferred={i > 0}>
        <div className="flex flex-col gap-8">
          {block.title && (
            <SectionHeading
              id={heading}
              size="band"
              title={t(block.title)}
              lead={block.lead && t(block.lead)}
            />
          )}
          <BlockBody block={block} />
        </div>
      </Section>
    )
  })
}
