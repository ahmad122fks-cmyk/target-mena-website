import { CtaLink } from '@/components/shared/CtaLink'
import { Photo } from '@/components/shared/Photo'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useLink, useT } from '@/features/i18n/LangContext'
import { ART } from '@/lib/images'
import content from '../home.services.content.json'

/** Catalog spread 16: yellow duotone production page (artwork used as-is). */
export function Production() {
  const t = useT()
  const link = useLink()
  const { production } = content
  return (
    <Section tone="yellow" labelledBy="production-title">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <SectionHeading id="production-title" title={t(production.title)} light={t(production.light)} />
          <ul className="grid gap-2 text-lg font-medium sm:grid-cols-2">
            {production.list.map((item) => (
              <li key={item.en} className="flex items-center gap-3">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-brand-black" />
                {t(item)}
              </li>
            ))}
          </ul>
          <p className="flex flex-wrap items-baseline gap-x-3">
            <b className="ltr-run text-5xl text-brand-black">{t(production.stat)}</b>
            <span>{t(production.statLabel)}</span>
          </p>
          <CtaLink tone="black" href={link(production.cta.path)} className="self-start">{t(production.cta.label)}</CtaLink>
        </div>
        <Photo picture={ART.production} alt={t(production.artAlt)} sizes="(min-width: 1024px) 600px, 100vw" className="aspect-square rounded-2xl object-cover" />
      </div>
    </Section>
  )
}
