import { usePageData } from '@/app/PageData'
import { BoardCard } from '@/components/shared/BoardCard'
import { PageHero } from '@/components/shared/PageHero'
import { PillButton } from '@/components/shared/PillButton'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useLang, useLink, useT } from '@/features/i18n/LangContext'
import { trailFor } from '@/lib/breadcrumbs'
import content from './highways.content.json'
import { RoadCard } from './sections/RoadCard'

/** Highway bridges: the two highways with counts from boards.json, real photos, a call to action. */
export default function HighwaysPage() {
  const data = usePageData('highways')
  const t = useT()
  const lang = useLang()
  const link = useLink()
  return (
    <>
      <PageHero crumbs={trailFor(data, lang)} title={t(content.title)} intro={t(content.intro)} />
      <Section labelledBy="roads-title">
        <h2 id="roads-title" className="sr-only">
          {t(content.title)}
        </h2>
        <div className="grid gap-5 lg:grid-cols-2">
          {data.roads.map((road) => (
            <RoadCard key={road.key} road={road} />
          ))}
        </div>
      </Section>
      {data.featured.length > 0 && (
        <Section tone="ghost" labelledBy="road-photos" deferred>
          <SectionHeading id="road-photos" size="band" title={t(content.photosTitle)} />
          <ul className="mt-8 grid grid-cols-1 gap-[1.125rem] sm:grid-cols-2 lg:grid-cols-3">
            {data.featured.map((board) => (
              <li key={board.code} className="flex min-w-0">
                <BoardCard board={board} />
              </li>
            ))}
          </ul>
        </Section>
      )}
      <Section labelledBy="roads-cta" deferred>
        <div className="flex flex-col items-start gap-5">
          <h2 id="roads-cta" className="max-w-2xl text-2xl font-semibold lg:text-[1.875rem]">
            {t(content.cta.text)}
          </h2>
          <PillButton href={link(content.cta.link.path)}>{t(content.cta.link.label)}</PillButton>
        </div>
      </Section>
    </>
  )
}
