import { SlidersHorizontal } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { BoardFilters } from '@/components/shared/BoardFilters'
import { SearchField } from '@/components/shared/SearchField'
import { FilterChips } from '@/components/shared/FilterChips'
import { Container } from '@/components/shared/Section'
import { Button } from '@/components/ui/button'
import type { Filters } from '@/features/boards/filter'
import { useT } from '@/features/i18n/LangContext'
import content from '../boards.content.json'

const FiltersSheet = lazy(() => import('@/components/shared/FiltersSheet'))

type Props = {
  filters: Filters
  onChange: (patch: Partial<Filters>) => void
  cityKeys: string[]
  total: number
}

/** Sticky, compact filter bar. Phones: search + a "Filters" button opening a bottom sheet. */
export function FilterBar({ filters, onChange, cityKeys, total }: Props) {
  const t = useT()
  const [open, setOpen] = useState(false)
  const [used, setUsed] = useState(false)
  const active = [filters.city, filters.format, filters.size].filter(Boolean).length
  return (
    <section
      aria-label={t(content.filters.label)}
      className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur"
    >
      <Container className="flex flex-col gap-3 py-3">
        <div className="hidden lg:block">
          <BoardFilters filters={filters} onChange={onChange} cityKeys={cityKeys} />
        </div>
        <div className="flex items-end gap-2 lg:hidden">
          <div className="flex-1">
            <SearchField
              id="p-q"
              label={t(content.filters.query)}
              value={filters.query}
              onChange={(query) => onChange({ query })}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setUsed(true)
              setOpen(true)
            }}
            className="h-11 rounded-lg font-semibold text-brand-blue"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            {t(content.filters.button)}
            {active > 0 && (
              <span className="ltr-run flex size-6 items-center justify-center rounded-full bg-brand-blue text-xs text-white">
                {active}
              </span>
            )}
          </Button>
        </div>
        <FilterChips filters={filters} onChange={onChange} cityKeys={cityKeys} />
      </Container>
      {used && (
        <Suspense fallback={null}>
          <FiltersSheet
            open={open}
            onOpenChange={setOpen}
            filters={filters}
            onChange={onChange}
            cityKeys={cityKeys}
            total={total}
          />
        </Suspense>
      )}
    </section>
  )
}
