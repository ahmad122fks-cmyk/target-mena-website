import tiles from '@/assets/calligraphy/tiles.svg'
import { CtaLink } from '@/components/shared/CtaLink'
import { EdgeArt } from '@/components/shared/EdgeArt'
import { Photo } from '@/components/shared/Photo'
import { Container, Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useLink, useT } from '@/features/i18n/LangContext'
import { BOARD_PHOTOS } from '@/lib/images'
import content from '../home.content.json'

/** Catalog cover (spread 1): blue page, guideline colour tiles at the edge. */
export function Hero() {
  const t = useT()
  const link = useLink()
  const { hero } = content
  const art = <img src={tiles} alt="" width={366} height={595} className="absolute inset-0 h-full w-full object-cover object-left-top" />
  return (
    <Section tone="blue" labelledBy="hero-title" bare>
      <EdgeArt art={art} artClassName="h-20 sm:h-24 lg:h-auto lg:w-[clamp(7rem,13vw,12rem)]">
        <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:py-20">
          <div className="flex flex-col gap-6">
            <SectionHeading id="hero-title" level={1} eyebrow={t(hero.eyebrow)} title={t(hero.title)} />
            <p className="text-lg leading-relaxed sm:text-xl">{t(hero.lead)}</p>
            <div className="flex flex-wrap gap-3">
              <CtaLink tone="yellow" href={link(hero.primary.path)}>{t(hero.primary.label)}</CtaLink>
              <CtaLink tone="outlineLight" href={link(hero.secondary.path)}>{t(hero.secondary.label)}</CtaLink>
            </div>
          </div>
          <figure className="flex flex-col gap-3">
            <Photo picture={BOARD_PHOTOS[hero.photo.code]} alt={t(hero.photo.alt)} sizes="(min-width: 1024px) 600px, 100vw" priority className="rounded-2xl" />
            <figcaption className="text-sm">
              <span className="ltr-run font-semibold">{hero.photo.code}</span> · {t(hero.photo.caption)}
            </figcaption>
          </figure>
        </Container>
      </EdgeArt>
    </Section>
  )
}
