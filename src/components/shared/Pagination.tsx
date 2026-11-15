import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDir } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'

type Labels = { pages: string; prev: string; next: string; page: string }
type Props = { page: number; pages: number; onPage: (page: number) => void; labels: Labels }

/** Page numbers around the current page (1 … 4 5 6 … 28), previous / next. */
export function Pagination({ page, pages, onPage, labels }: Props) {
  const rtl = useDir() === 'rtl'
  if (pages <= 1) return null
  const near = [...new Set([1, page - 1, page, page + 1, pages])]
    .filter((n) => n >= 1 && n <= pages)
    .sort((a, b) => a - b)
  const Prev = rtl ? ChevronRight : ChevronLeft
  const Next = rtl ? ChevronLeft : ChevronRight
  return (
    <nav aria-label={labels.pages} className="flex flex-wrap items-center justify-center gap-1">
      <Button
        variant="ghost"
        className="h-11"
        disabled={page === 1}
        onClick={() => onPage(page - 1)}
      >
        <Prev className="size-4" aria-hidden="true" />
        {labels.prev}
      </Button>
      {near.map((n, i) => (
        <span key={n} className="flex items-center">
          {i > 0 && n - near[i - 1] > 1 && (
            <span className="px-1" aria-hidden="true">
              …
            </span>
          )}
          <Button
            variant={n === page ? 'default' : 'ghost'}
            aria-current={n === page ? 'page' : undefined}
            aria-label={`${labels.page} ${n}`}
            onClick={() => onPage(n)}
            className={cn('ltr-run size-11', n !== page && 'text-brand-blue')}
          >
            {n}
          </Button>
        </span>
      ))}
      <Button
        variant="ghost"
        className="h-11"
        disabled={page === pages}
        onClick={() => onPage(page + 1)}
      >
        {labels.next}
        <Next className="size-4" aria-hidden="true" />
      </Button>
    </nav>
  )
}
