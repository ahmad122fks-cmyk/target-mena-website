import { Photo } from '@/components/shared/Photo'
import { Section } from '@/components/shared/Section'
import { useT } from '@/features/i18n/LangContext'
import { MOCKUPS } from '@/lib/images'
import content from '@/pages/home/home.more.content.json'

/** The Alrabiaa sales planner on a laptop and a phone (demo screens, no prices). */
export function AlrabiaaMockup() {
  const t = useT()
  return (
    <Section tone="ghost" pad="md" deferred>
      <figure className="mx-auto max-w-[960px]">
        <Photo
          picture={MOCKUPS.alrabiaa}
          alt={t(content.planner.alt)}
          sizes="(min-width: 1024px) 960px, calc(100vw - 32px)"
        />
      </figure>
    </Section>
  )
}
