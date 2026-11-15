import { useEffect, useMemo, useState } from 'react'
import { usePageData } from '@/app/PageData'
import { BoardFilters } from '@/components/shared/BoardFilters'
import { PageHero } from '@/components/shared/PageHero'
import { Container } from '@/components/shared/Section'
import {
  EMPTY_FILTERS,
  filterBoards,
  filtersFromSearch,
  photosFirst,
  searchFromFilters,
  type Filters,
} from '@/features/boards/filter'
import { useLang, useT } from '@/features/i18n/LangContext'
import { trailFor } from '@/lib/breadcrumbs'
import content from './boards.content.json'
import { Results } from './sections/Results'

/** Board finder: every published board, filtered in the browser. */
export default function BoardsPage() {
  const data = usePageData('boards')
  const t = useT()
  const lang = useLang()
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS)
  // Read ?city=&format= after hydration so the prerendered HTML always matches.
  useEffect(() => setFilters(filtersFromSearch(window.location.search)), [])
  const change = (next: Filters) => {
    setFilters(next)
    window.history.replaceState(null, '', `${window.location.pathname}${searchFromFilters(next)}`)
  }
  const cityKeys = useMemo(
    () => [...new Set(data.boards.map((board) => board.city))],
    [data.boards],
  )
  const results = useMemo(
    () => photosFirst(filterBoards(data.boards, filters, lang)),
    [data.boards, filters, lang],
  )
  return (
    <>
      <PageHero crumbs={trailFor(data, lang)} title={t(content.title)} intro={t(content.intro)} />
      <section aria-label={t(content.filters.label)} className="border-b bg-brand-ghost">
        <Container className="py-6">
          <BoardFilters filters={filters} onChange={change} cityKeys={cityKeys} />
        </Container>
      </section>
      <Results boards={results} resetKey={searchFromFilters(filters)} />
    </>
  )
}
