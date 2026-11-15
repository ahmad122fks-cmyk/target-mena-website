import { usePageData } from '@/app/PageData'
import { PageHero } from '@/components/shared/PageHero'
import { Section } from '@/components/shared/Section'
import { useLang, useT } from '@/features/i18n/LangContext'
import { cityLabel, FORMATS, isHighway } from '@/lib/boards'
import { trailFor } from '@/lib/breadcrumbs'
import content from './network.content.json'
import { LinkGrid } from './sections/LinkGrid'

/** Network overview: provinces, highways and board types, each with its count. */
export default function NetworkPage() {
  const data = usePageData('network')
  const t = useT()
  const lang = useLang()
  const toItem = (key: string, count: number, label: string, path: string) => ({
    key,
    count,
    label,
    path,
  })
  const cities = data.provinces.map((p) =>
    toItem(p.key, p.count, cityLabel(p.key, lang), `/network/${p.key}/`),
  )
  const formats = data.formats.map((f) =>
    toItem(
      f.key,
      f.count,
      FORMATS.find((format) => format.key === f.key)?.label[lang] ?? f.key,
      `/formats/${f.key}/`,
    ),
  )
  return (
    <>
      <PageHero crumbs={trailFor(data, lang)} title={t(content.title)} intro={t(content.intro)} />
      <Section labelledBy="provinces-title">
        <div className="flex flex-col gap-14">
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
    </>
  )
}
