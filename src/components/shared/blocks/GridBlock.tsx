import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import { FeatureCard } from '../FeatureCard'
import type { Card } from './types'

const COLUMNS = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

/** Cards in 2, 3 or 4 columns (one on phones). */
export function GridBlock({ items, columns }: { items: Card[]; columns: 2 | 3 | 4 }) {
  const t = useT()
  return (
    <div className={cn('grid gap-5', COLUMNS[columns])}>
      {items.map((item) => (
        <FeatureCard
          key={item.title.en}
          eyebrow={item.eyebrow && t(item.eyebrow)}
          title={t(item.title)}
          text={t(item.text)}
        />
      ))}
    </div>
  )
}
