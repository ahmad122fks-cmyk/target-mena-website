import { Photo } from '@/components/shared/Photo'
import content from '@/content/news.json'
import { useT } from '@/features/i18n/LangContext'
import type { NewsItem } from '@/features/news/build'
import { newsPicture } from '@/features/news/news'
import { fill } from '@/lib/template'
import { cn } from '@/lib/utils'
import { POST_SIZES } from './screen'

type Props = {
  items: NewsItem[]
  current: number
  /** The ring of the current story turns only while the phone plays. */
  running: boolean
  onPick: (index: number) => void
}

const RING =
  'bg-[conic-gradient(var(--color-brand-blue),var(--color-brand-green),var(--color-brand-yellow),var(--color-brand-blue))]'

/** Story circles, one per post: the current one has a turning ring; a tap opens that post. */
export function Stories({ items, current, running, onPick }: Props) {
  const t = useT()
  return (
    <ul
      aria-label={t(content.stories)}
      className="flex justify-between gap-1 border-b border-line px-3 py-2.5"
    >
      {items.map((item, j) => {
        const on = j === current
        const picture = newsPicture(item.photo)
        const label = fill(t(content.story), {
          brand: t(item.story),
          n: `${j + 1}`,
          total: `${items.length}`,
        })
        return (
          <li key={item.id}>
            <button
              type="button"
              data-story={item.id}
              aria-label={label}
              aria-current={on ? 'true' : undefined}
              onClick={() => onPick(j)}
              className="flex w-[54px] cursor-pointer flex-col items-center gap-1 rounded-lg"
            >
              <span aria-hidden="true" className="relative block size-[50px]">
                <span
                  className={cn(
                    'absolute inset-0 rounded-full',
                    RING,
                    on && 'motion-safe:animate-[spin-slow_3s_linear_infinite]',
                    !on && (j < current ? 'opacity-25' : 'opacity-70'),
                  )}
                  style={on ? { animationPlayState: running ? 'running' : 'paused' } : undefined}
                />
                <span className="absolute inset-[3px] rounded-full bg-brand-white" />
                <span className="absolute inset-[5px] overflow-hidden rounded-full bg-brand-ghost">
                  {picture && (
                    <Photo
                      picture={picture}
                      alt=""
                      sizes={POST_SIZES}
                      className="h-full w-full object-cover"
                    />
                  )}
                </span>
              </span>
              <span className="max-w-full truncate text-[10px] text-brand-text">
                {t(item.story)}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
