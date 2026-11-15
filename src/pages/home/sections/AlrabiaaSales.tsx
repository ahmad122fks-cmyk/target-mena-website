import { Photo } from '@/components/shared/Photo'
import { PillButton } from '@/components/shared/PillButton'
import { Section, type SectionTone } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useLink, useT } from '@/features/i18n/LangContext'
import { MOCKUPS } from '@/lib/images'
import content from '../home.more.content.json'

/** Alrabiaa TV planner: white band, green call to action, price-free screens (figures blurred). */
export function AlrabiaaSales({ tone = 'white' }: { tone?: SectionTone }) {
  const t = useT()
  const link = useLink()
  const { planner } = content
  return (
    <Section tone={tone} labelledBy="planner-title" deferred>
      <div className="flex flex-wrap items-center gap-12">
        <figure className="min-w-0 flex-[1_1_35rem]">
          <Photo
            picture={MOCKUPS.alrabiaa}
            alt={t(planner.alt)}
            sizes="(min-width: 1280px) 660px, (min-width: 1024px) 55vw, calc(100vw - 32px)"
          />
        </figure>
        <div className="flex min-w-0 flex-[1_1_23.75rem] flex-col gap-4">
          <SectionHeading
            id="planner-title"
            size="feature"
            eyebrow={t(planner.eyebrow)}
            title={t(planner.title)}
          />
          <p className="text-[1.0625rem] leading-[1.9]">{t(planner.text)}</p>
          <PillButton tone="green" href={link(planner.cta.path)} className="self-start">
            {t(planner.cta.label)}
          </PillButton>
        </div>
      </div>
    </Section>
  )
}
