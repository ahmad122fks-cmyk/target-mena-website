import { Calligraphy } from '@/components/shared/Calligraphy'
import { CtaLink } from '@/components/shared/CtaLink'
import { Photo } from '@/components/shared/Photo'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useLink, useT } from '@/features/i18n/LangContext'
import { BOARD_PHOTOS } from '@/lib/images'
import content from '../home.content.json'

/** Grey = billboards and outdoor (guideline layouts, pages 36-37). */
export function Bridges() {
  const t = useT()
  const link = useLink()
  const { bridges } = content
  const art = <Calligraphy mark="b" tone="white" className="-bottom-12 -left-10 h-44" />
  return (
    <Section tone="grey" labelledBy="bridges-title" art={art} className="[&>div]:pb-36">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <SectionHeading id="bridges-title" eyebrow={t(bridges.eyebrow)} title={t(bridges.title)} />
          <p className="text-lg">{t(bridges.lead)}</p>
          <CtaLink tone="black" href={link(bridges.cta.path)} className="self-start">{t(bridges.cta.label)}</CtaLink>
        </div>
        <Photo picture={BOARD_PHOTOS.BBH20A} alt={t(bridges.photoAlt)} sizes="(min-width: 1024px) 600px, 100vw" className="rounded-2xl" />
      </div>
    </Section>
  )
}
