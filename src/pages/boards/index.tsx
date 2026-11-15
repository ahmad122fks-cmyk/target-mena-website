import { lazy, Suspense, useMemo, useState } from 'react'
import { usePageData } from '@/app/PageData'
import { PageHero } from '@/components/shared/PageHero'
import { Container } from '@/components/shared/Section'
import selectionContent from '@/content/selection.json'
import { filterBoards } from '@/features/boards/filter'
import { shownOf, sortBoards } from '@/features/boards/finderState'
import { useFinderBoards } from '@/features/boards/useFinderBoards'
import { useFinderState } from '@/features/boards/useFinderState'
import { useLang, useT } from '@/features/i18n/LangContext'
import { trailFor } from '@/lib/breadcrumbs'
import content from './boards.content.json'
import { PickerBanner, SharedBanner } from './sections/Banners'
import { FilterBar } from './sections/FilterBar'
import { Results } from './sections/Results'
import { ResultsBar } from './sections/ResultsBar'

const SelectionSheet = lazy(() => import('@/components/shared/SelectionSheet'))
// The side panel loads the first time it opens, not with the page.
const SelectionPanel = lazy(() =>
  import('@/components/shared/SelectionPanel').then((m) => ({ default: m.SelectionPanel })),
)
const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches

/** Board finder: pill filters, province chips, 24 more at a time, "My list" side panel; state kept in the address. */
export default function BoardsPage() {
  const data = usePageData('boards')
  const t = useT()
  const lang = useLang()
  const [state, update] = useFinderState()
  const [panel, setPanel] = useState(false)
  const [sheet, setSheet] = useState<boolean | null>(null)
  const all = useFinderBoards(data.feed)
  const shared = useMemo(
    () => (all ?? []).filter((board) => state.codes.includes(board.code)),
    [all, state.codes],
  )
  // Until the full list arrives, show exactly what was prerendered.
  const results = useMemo(
    () =>
      all
        ? sortBoards(filterBoards(state.codes.length ? shared : all, state, lang), state.sort)
        : data.boards,
    [all, data.boards, shared, state, lang],
  )
  const total = all ? results.length : data.total
  const openList = () => (isDesktop() ? setPanel((open) => !open) : setSheet(true))
  return (
    <>
      <PageHero
        wide
        crumbs={trailFor(data, lang)}
        title={t(content.title)}
        intro={t(content.intro)}
      />
      <FilterBar
        filters={state}
        onChange={update}
        provinces={data.provinces}
        all={data.total}
        total={total}
        listOpen={panel || sheet === true}
        onList={openList}
      />
      <Container wide className="flex items-start gap-7 pt-7 pb-20">
        <section aria-labelledby="results-title" className="flex min-w-0 flex-1 flex-col gap-5">
          {state.pick && <PickerBanner />}
          {all && state.codes.length > 0 && (
            <SharedBanner boards={shared} onShowAll={() => update({ codes: [] })} />
          )}
          <ResultsBar
            total={total}
            city={state.city}
            sort={state.sort}
            view={state.view}
            onSort={(sort) => update({ sort })}
            onView={(view) => update({ view })}
          />
          <Results
            boards={shownOf(results, state.page)}
            total={total}
            view={state.view}
            narrow={panel}
            onMore={() => update({ page: state.page + 1 })}
            onAdd={() => isDesktop() && setPanel(true)}
          />
        </section>
        {panel && (
          <aside
            aria-label={t(selectionContent.title)}
            className="sticky top-[12.75rem] hidden max-h-[calc(100vh-13.75rem)] w-[21.25rem] shrink-0 overflow-hidden rounded-card border border-line shadow-float lg:flex"
          >
            <Suspense fallback={null}>
              <SelectionPanel onClose={() => setPanel(false)} className="w-full" />
            </Suspense>
          </aside>
        )}
      </Container>
      {sheet !== null && (
        <Suspense fallback={null}>
          <SelectionSheet open={sheet} onOpenChange={setSheet} />
        </Suspense>
      )}
    </>
  )
}
