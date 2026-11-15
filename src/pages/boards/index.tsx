import { useMemo } from 'react'
import { usePageData } from '@/app/PageData'
import { PageHero } from '@/components/shared/PageHero'
import { Container } from '@/components/shared/Section'
import { filterBoards } from '@/features/boards/filter'
import { pageCount, pageOf, sortBoards } from '@/features/boards/finderState'
import { useFinderState } from '@/features/boards/useFinderState'
import { useLang, useT } from '@/features/i18n/LangContext'
import { trailFor } from '@/lib/breadcrumbs'
import content from './boards.content.json'
import { PickerBanner, SharedBanner } from './sections/Banners'
import { FilterBar } from './sections/FilterBar'
import { Results } from './sections/Results'
import { ResultsBar } from './sections/ResultsBar'

/** Board finder: filters, chips, sort, grid/list, 24 per page; everything kept in the address. */
export default function BoardsPage() {
  const data = usePageData('boards')
  const t = useT()
  const lang = useLang()
  const [state, update] = useFinderState()
  const cityKeys = useMemo(
    () => [...new Set(data.boards.map((board) => board.city))],
    [data.boards],
  )
  const shared = useMemo(
    () => data.boards.filter((board) => state.codes.includes(board.code)),
    [data.boards, state.codes],
  )
  const results = useMemo(
    () =>
      sortBoards(filterBoards(state.codes.length ? shared : data.boards, state, lang), state.sort),
    [data.boards, shared, state, lang],
  )
  const pages = pageCount(results.length)
  const page = Math.min(state.page, pages)
  return (
    <>
      <PageHero crumbs={trailFor(data, lang)} title={t(content.title)} intro={t(content.intro)} />
      <FilterBar filters={state} onChange={update} cityKeys={cityKeys} total={results.length} />
      <section aria-labelledby="results-title">
        <Container className="flex flex-col gap-6 py-8 lg:py-10">
          {state.pick && <PickerBanner />}
          {state.codes.length > 0 && (
            <SharedBanner boards={shared} onShowAll={() => update({ codes: [] })} />
          )}
          <ResultsBar
            total={results.length}
            sort={state.sort}
            view={state.view}
            onSort={(sort) => update({ sort })}
            onView={(view) => update({ view })}
          />
          <Results
            boards={pageOf(results, page)}
            view={state.view}
            page={page}
            pages={pages}
            onPage={(next) => update({ page: next })}
          />
        </Container>
      </section>
    </>
  )
}
