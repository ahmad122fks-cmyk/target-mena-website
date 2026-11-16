import { Play } from 'lucide-react'
import { Section } from '@/components/shared/Section'
import { ToConfirm } from '@/components/shared/ToConfirm'
import { useT } from '@/features/i18n/LangContext'
import content from '../production.content.json'

/**
 * Showreel slot on the deep band. No video yet, so no play button: the
 * yellow disc is only a picture of one, next to the visible placeholder.
 */
export function Showreel() {
  const t = useT()
  const { showreel } = content
  return (
    <Section tone="black" pad="md" labelledBy="production-reel" deferred>
      <div className="flex flex-col gap-6">
        <h2 id="production-reel" className="text-[1.75rem] lg:text-[2.125rem]">
          {t(showreel.title)}
        </h2>
        <div className="flex aspect-video flex-col items-center justify-center gap-4 rounded-[22px] border border-white/10 bg-white/5 p-4 text-center lg:aspect-auto lg:h-[28.75rem]">
          <span
            aria-hidden="true"
            className="flex size-[4.5rem] items-center justify-center rounded-full bg-brand-yellow sm:size-[5.5rem]"
          >
            {/* Play points right in both languages (media convention), nudged to look centred. */}
            <Play className="size-8 translate-x-0.5 fill-brand-black text-brand-black" />
          </span>
          <ToConfirm what={showreel.toConfirm} className="text-white/75" />
        </div>
      </div>
    </Section>
  )
}
