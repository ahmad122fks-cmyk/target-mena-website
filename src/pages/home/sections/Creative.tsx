import { Photo } from '@/components/shared/Photo'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useT } from '@/features/i18n/LangContext'
import { ART } from '@/lib/images'
import content from '../home.services.content.json'

/**
 * Catalog spreads 22-23: the statement line and the multicolour calligraphy
 * artwork (one hero image; its red and orange stay inside the artwork).
 */
export function Creative() {
  const t = useT()
  const { creative } = content
  return (
    <Section labelledBy="creative-title">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-6">
          <SectionHeading id="creative-title" title={t(creative.title)} light={t(creative.light)} />
          <p className="text-lg">{t(creative.lead)}</p>
          <ul className="flex flex-wrap gap-2">
            {creative.list.map((item) => (
              <li key={item.en} className="rounded-full bg-brand-ghost px-4 py-2 font-medium text-brand-blue">
                {t(item)}
              </li>
            ))}
          </ul>
        </div>
        <Photo picture={ART.creative} alt={t(creative.artAlt)} sizes="(min-width: 1024px) 480px, 80vw" className="mx-auto max-w-sm lg:max-w-none" />
      </div>
    </Section>
  )
}
