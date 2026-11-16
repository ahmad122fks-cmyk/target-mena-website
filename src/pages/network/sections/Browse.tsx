import { usePageData } from '@/app/PageData'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useLang, useT } from '@/features/i18n/LangContext'
import { cityLabel, FORMATS, isHighway } from '@/lib/boards'
import content from '../network.content.json'
import { LinkGrid } from './LinkGrid'

/**
 * Links to every province, highway and board-type page (the boards published
 * on the site): a ghost band (v3) between the numbers and the street photos.
 */
export function Browse() {
  const data = usePageData('network')
  const t = useT()
  const lang = useLang()
  const cities = data.provinces.map((p) => ({
    key: p.key,
    label: cityLabel(p.key, lang),
    path: `/network/${p.key}/`,
  }))
  const formats = data.formats.map((f) => ({
    key: f.key,
    label: FORMATS.find((format) => format.key === f.key)?.label[lang] ?? f.key,
    path: `/formats/${f.key}/`,
  }))
  return (
    <Section tone="ghost" labelledBy="browse-title" deferred>
      <SectionHeading id="browse-title" title={t(content.browse)} />
      <div className="mt-10 flex flex-col gap-12">
        <LinkGrid
          id="provinces-title"
          title={t(content.provinces)}
          items={cities.filter((c) => !isHighway(c.key))}
        />
        <LinkGrid
          id="highways-title"
          title={t(content.highways)}
          items={cities.filter((c) => isHighway(c.key))}
        />
        <LinkGrid id="formats-title" title={t(content.formats)} items={formats} />
      </div>
    </Section>
  )
}
