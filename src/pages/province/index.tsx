import { usePageData } from '@/app/PageData'
import { BoardGroups } from '@/components/shared/BoardGroups'
import { CtaLink } from '@/components/shared/CtaLink'
import { PageHero } from '@/components/shared/PageHero'
import { useLang, useLink, useT } from '@/features/i18n/LangContext'
import { cityLabel, FORMATS, formatOf } from '@/lib/boards'
import { trailFor } from '@/lib/breadcrumbs'
import { formatCount } from '@/lib/format'
import { fill } from '@/lib/template'
import content from './province.content.json'

/** One province or highway: its boards grouped by type. */
export default function ProvincePage() {
  const data = usePageData('province')
  const t = useT()
  const lang = useLang()
  const link = useLink()
  const values = { city: cityLabel(data.city, lang), count: formatCount(data.boards.length, lang) }
  const groups = FORMATS.map((format) => ({
    key: format.key,
    title: format.label[lang],
    boards: data.boards.filter((board) => formatOf(board.type) === format.key),
  })).filter((group) => group.boards.length > 0)
  return (
    <>
      <PageHero
        crumbs={trailFor(data, lang)}
        title={fill(t(content.title), values)}
        intro={fill(t(content.intro), values)}
      >
        <CtaLink tone="outline" href={link(`/boards/?city=${data.city}`)} className="self-start">
          {fill(t(content.finder), values)}
        </CtaLink>
      </PageHero>
      <BoardGroups groups={groups} />
    </>
  )
}
