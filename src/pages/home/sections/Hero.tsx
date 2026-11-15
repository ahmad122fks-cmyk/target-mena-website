import { Calligraphy } from '@/components/shared/Calligraphy'
import { CtaLink } from '@/components/shared/CtaLink'
import { Photo } from '@/components/shared/Photo'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useLink, useT } from '@/features/i18n/LangContext'
import { BOARD_PHOTOS } from '@/lib/images'
import content from '../home.content.json'

/** Clean white hero; the calligraphy is a soft watermark (guideline page 40 tint). */
export function Hero() {
  const t = useT()
  const link = useLink()
  const { hero } = content
  const art = <Calligraphy mark="a" tone="tint" className="-end-48 -top-24 h-[44rem] sm:-end-40" />
  return (
    <Section labelledBy="hero-title" art={art}>
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col gap-6">
          <SectionHeading
            id="hero-title"
            level={1}
            eyebrow={t(hero.eyebrow)}
            title={t(hero.title)}
            light={t(hero.light)}
          />
          <p className="max-w-xl text-lg leading-relaxed">{t(hero.lead)}</p>
          <div className="flex flex-wrap gap-3">
            <CtaLink href={link(hero.primary.path)}>{t(hero.primary.label)}</CtaLink>
            <CtaLink tone="outline" href={link(hero.secondary.path)}>
              {t(hero.secondary.label)}
            </CtaLink>
          </div>
        </div>
        <figure className="flex flex-col gap-3">
          <Photo
            picture={BOARD_PHOTOS[hero.photo.code]}
            alt={t(hero.photo.alt)}
            sizes="(min-width: 1024px) 580px, 100vw"
            priority
            className="rounded-2xl border"
          />
          <figcaption className="text-sm">
            <span className="ltr-run font-semibold text-brand-blue">{hero.photo.code}</span> ·{' '}
            {t(hero.photo.caption)}
          </figcaption>
        </figure>
      </div>
    </Section>
  )
}
