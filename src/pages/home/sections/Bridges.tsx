import { CtaLink } from '@/components/shared/CtaLink'
import { Photo } from '@/components/shared/Photo'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useLink, useT } from '@/features/i18n/LangContext'
import { BOARD_PHOTOS } from '@/lib/images'
import content from '../home.content.json'

/** Highway bridges: one photo, one message, one link. */
export function Bridges() {
  const t = useT()
  const link = useLink()
  const { bridges } = content
  return (
    <Section labelledBy="bridges-title">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Photo
          picture={BOARD_PHOTOS.BBH20A}
          alt={t(bridges.photoAlt)}
          sizes="(min-width: 1024px) 580px, 100vw"
          className="rounded-2xl border"
        />
        <div className="flex flex-col gap-5 lg:order-first">
          <SectionHeading
            id="bridges-title"
            eyebrow={t(bridges.eyebrow)}
            title={t(bridges.title)}
          />
          <p className="max-w-xl text-lg">{t(bridges.lead)}</p>
          <CtaLink tone="outline" href={link(bridges.cta.path)} className="self-start">
            {t(bridges.cta.label)}
          </CtaLink>
        </div>
      </div>
    </Section>
  )
}
