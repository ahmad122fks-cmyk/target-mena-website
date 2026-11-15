import { usePageData } from '@/app/PageData'
import { BoardGroups } from '@/components/shared/BoardGroups'
import { CtaLink } from '@/components/shared/CtaLink'
import { PageHero } from '@/components/shared/PageHero'
import { useLang, useLink, useT } from '@/features/i18n/LangContext'
import { cityLabel, FORMATS } from '@/lib/boards'
import { trailFor } from '@/lib/breadcrumbs'
import { formatCount } from '@/lib/format'
import { fill } from '@/lib/template'
import content from './format.content.json'

/** One board type (bridges, rooftops ...): its boards grouped by province. */
export default function FormatPage() {
  const data = usePageData('format')
  const t = useT()
  const lang = useLang()
  const link = useLink()
  const cityKeys = [...new Set(data.boards.map((board) => board.city))]
  const label = FORMATS.find((format) => format.key === data.format)?.label[lang] ?? data.format
  const values = {
    format: label,
    count: formatCount(data.boards.length, lang),
    cities: cityKeys.map((key) => cityLabel(key, lang)).join(lang === 'ar' ? '، ' : ', '),
  }
  const groups = cityKeys.map((key) => ({
    key,
    title: cityLabel(key, lang),
    boards: data.boards.filter((board) => board.city === key),
  }))
  return (
    <>
      <PageHero
        crumbs={trailFor(data, lang)}
        title={fill(t(content.title), values)}
        intro={fill(t(content.intro), values)}
      >
        <CtaLink
          tone="outline"
          href={link(`/boards/?format=${data.format}`)}
          className="self-start"
        >
          {fill(t(content.finder), values)}
        </CtaLink>
      </PageHero>
      <BoardGroups groups={groups} />
    </>
  )
}
