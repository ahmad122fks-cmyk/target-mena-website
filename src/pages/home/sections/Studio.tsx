import { Artwork } from '@/components/shared/Artwork'
import { CtaLink } from '@/components/shared/CtaLink'
import { Section } from '@/components/shared/Section'
import { useLink, useT } from '@/features/i18n/LangContext'
import { ART } from '@/lib/images'
import content from '../home.services.content.json'

type Item = { ar: string; en: string }

/**
 * The page's one artistic moment: a dark showcase band (as the catalog's
 * production pages) with the catalog artwork shown large - spread 16 yellow
 * duotone and spread 22 multicolour calligraphy. Everything else stays clean.
 */
export function Studio() {
  const t = useT()
  const link = useLink()
  const { production, creative, studio } = content
  const list = (items: Item[]) => (
    <p className="text-brand-grey-40">{items.map((item) => t(item)).join(' · ')}</p>
  )
  return (
    <Section tone="black" labelledBy="studio-title" deferred>
      <h2 id="studio-title" className="mb-12 text-3xl sm:text-4xl">
        {t(studio.title)}
      </h2>
      <div className="grid items-start gap-12 lg:grid-cols-[1.337fr_1fr] lg:gap-10">
        <Artwork
          picture={ART.production}
          alt={t(production.artAlt)}
          ratio="1 / 1"
          sizes="(min-width: 1024px) 680px, calc(100vw - 32px)"
        >
          <h3 id="production-title" className="text-2xl sm:text-3xl">
            {t(production.title)} <span className="font-light">{t(production.light)}</span>
          </h3>
          {list(production.list)}
          <p className="flex flex-wrap items-baseline gap-x-3">
            <b className="ltr-run text-4xl font-semibold text-brand-yellow">{t(production.stat)}</b>
            <span className="text-brand-grey-40">{t(production.statLabel)}</span>
          </p>
          <CtaLink tone="white" href={link(production.cta.path)} className="self-start">
            {t(production.cta.label)}
          </CtaLink>
        </Artwork>
        <Artwork
          picture={ART.creative}
          alt={t(creative.artAlt)}
          ratio="890 / 1190"
          sizes="(min-width: 1024px) 510px, calc(100vw - 32px)"
        >
          <h3 id="creative-title" className="text-2xl sm:text-3xl">
            {t(creative.title)} <span className="block font-light">{t(creative.light)}</span>
          </h3>
          <p className="text-brand-grey-40">{t(creative.lead)}</p>
          {list(creative.list)}
        </Artwork>
      </div>
    </Section>
  )
}
