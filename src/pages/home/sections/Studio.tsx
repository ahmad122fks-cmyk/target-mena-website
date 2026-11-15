import { Badge } from '@/components/ui/badge'
import { CtaLink } from '@/components/shared/CtaLink'
import { ImageCard } from '@/components/shared/ImageCard'
import { Section } from '@/components/shared/Section'
import { useLink, useT } from '@/features/i18n/LangContext'
import { ART } from '@/lib/images'
import content from '../home.services.content.json'

/**
 * Production and creative side by side. The catalog's warm artwork
 * (spread 16 duotone, spread 22 multicolour calligraphy) appears once each.
 */
export function Studio() {
  const t = useT()
  const link = useLink()
  const { production, creative, studio } = content
  const chips = (items: { ar: string; en: string }[]) => (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item.en}>
          <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
            {t(item)}
          </Badge>
        </li>
      ))}
    </ul>
  )
  return (
    <Section labelledBy="studio-title">
      <h2 id="studio-title" className="mb-10 text-3xl sm:text-4xl">
        {t(studio.title)}
      </h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <ImageCard
          picture={ART.production}
          alt={t(production.artAlt)}
          titleId="production-title"
          title={t(production.title)}
          light={t(production.light)}
        >
          {chips(production.list)}
          <p className="flex flex-wrap items-baseline gap-x-3">
            <b className="ltr-run text-3xl font-semibold text-brand-blue">{t(production.stat)}</b>
            <span>{t(production.statLabel)}</span>
          </p>
          <CtaLink tone="outline" href={link(production.cta.path)} className="self-start">
            {t(production.cta.label)}
          </CtaLink>
        </ImageCard>
        <ImageCard
          picture={ART.creative}
          alt={t(creative.artAlt)}
          titleId="creative-title"
          title={t(creative.title)}
          light={t(creative.light)}
        >
          <p>{t(creative.lead)}</p>
          {chips(creative.list)}
        </ImageCard>
      </div>
    </Section>
  )
}
