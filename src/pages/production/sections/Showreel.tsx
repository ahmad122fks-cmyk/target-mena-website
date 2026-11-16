import { Play } from 'lucide-react'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ToConfirm } from '@/components/shared/ToConfirm'
import { useT } from '@/features/i18n/LangContext'
import content from '../production.content.json'

/**
 * Showreel slot (v3): the player is a framed navy device on the ghost band
 * (deep navy in the dark theme, so it still stands out). No video yet, so
 * no play button: the yellow disc is only a picture of one, next to the
 * visible placeholder.
 */
export function Showreel() {
  const t = useT()
  const { showreel } = content
  return (
    <Section tone="ghost" labelledBy="production-reel" deferred>
      <div className="flex flex-col gap-6">
        <SectionHeading id="production-reel" title={t(showreel.title)} />
        <div className="flex aspect-video flex-col items-center justify-center gap-4 rounded-[22px] border border-line-strong bg-navy p-4 text-center shadow-frame lg:aspect-auto lg:h-[28.75rem] dark:bg-deep">
          <span
            aria-hidden="true"
            className="flex size-[4.5rem] items-center justify-center rounded-full bg-brand-yellow sm:size-[5.5rem]"
          >
            {/* Play points right in both languages (media convention), nudged to look centred. */}
            <Play className="size-8 translate-x-0.5 fill-brand-black text-brand-black" />
          </span>
          <ToConfirm what={showreel.toConfirm} className="text-on-blue" />
        </div>
      </div>
    </Section>
  )
}
