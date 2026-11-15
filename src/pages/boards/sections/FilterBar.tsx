import { SlidersHorizontal } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { BoardFilters } from '@/components/shared/BoardFilters'
import { FilterChips } from '@/components/shared/FilterChips'
import { ProvinceChips, type ProvinceCount } from '@/components/shared/ProvinceChips'
import { SearchField } from '@/components/shared/SearchField'
import { Container } from '@/components/shared/Section'
import { Button } from '@/components/ui/button'
import type { Filters } from '@/features/boards/filter'
import { useT } from '@/features/i18n/LangContext'
import content from '../boards.content.json'
import { ListButton } from './ListButton'

const FiltersSheet = lazy(() => import('@/components/shared/FiltersSheet'))

type Props = {
  filters: Filters
  onChange: (patch: Partial<Filters>) => void
  provinces: ProvinceCount[]
  /** Boards in the whole finder (the "All provinces" chip). */
  all: number
  total: number
  listOpen: boolean
  onList: () => void
}

/** Sticky bar under the header: pill search, type/size/faces pills, "My list", province chips. */
export function FilterBar({ filters, onChange, provinces, all, total, listOpen, onList }: Props) {
  const t = useT()
  const f = content.filters
  const [sheet, setSheet] = useState(false)
  const [used, setUsed] = useState(false)
  const active = [filters.city, filters.format, filters.size, filters.faces].filter(Boolean).length
  const cityKeys = provinces.map((p) => p.key)
  return (
    <section
      aria-label={t(f.label)}
      className="sticky top-16 z-30 border-b border-line bg-white/95 shadow-soft backdrop-blur"
    >
      <Container wide className="flex flex-col gap-2.5 py-3">
        <div className="flex items-center gap-2 lg:gap-2.5">
          <SearchField
            id="f-q"
            label={t(f.query)}
            placeholder={t(f.placeholder)}
            value={filters.query}
            onChange={(query) => onChange({ query })}
            className="flex-1"
          />
          <div className="hidden items-center gap-2.5 lg:flex">
            <BoardFilters
              variant="pill"
              filters={filters}
              onChange={onChange}
              cityKeys={cityKeys}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setUsed(true)
              setSheet(true)
            }}
            className="h-11 shrink-0 gap-1.5 rounded-full border-input px-3.5 font-normal text-brand-black lg:hidden"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            {t(f.button)}
            {active > 0 && (
              <span className="ltr-run rounded-full bg-brand-blue px-1.5 text-xs text-white">
                {active}
              </span>
            )}
          </Button>
          <ListButton open={listOpen} onClick={onList} />
        </div>
        <ProvinceChips
          items={provinces}
          selected={filters.city}
          onPick={(city) => onChange({ city })}
          all={{ label: t(f.allProvinces), count: all }}
          label={t(f.provinces)}
          className="-mx-4 flex-nowrap gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:thin] sm:-mx-6 sm:px-6"
        />
        <div className="lg:hidden">
          <FilterChips filters={{ ...filters, city: '' }} onChange={onChange} cityKeys={cityKeys} />
        </div>
      </Container>
      {used && (
        <Suspense fallback={null}>
          <FiltersSheet
            open={sheet}
            onOpenChange={setSheet}
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
