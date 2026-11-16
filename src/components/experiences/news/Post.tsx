import content from '@/content/news.json'
import { useDir, useLink, useT } from '@/features/i18n/LangContext'
import type { NewsItem } from '@/features/news/build'
import { cn } from '@/lib/utils'
import { Avatar } from './Avatar'
import { NewsPhoto } from './NewsPhoto'
import { TONES } from './screen'

type Props = {
  item: NewsItem
  /** First post of the page: its photo loads at once (it is in the prerendered page). */
  priority: boolean
  /** Rise in when it replaces another post (never on first paint or under reduced motion). */
  animate: boolean
}

/** One post: brand, when · where and tag; the real photo; title, one line, link. */
export function Post({ item, priority, animate }: Props) {
  const t = useT()
  const link = useLink()
  const dir = useDir()
  return (
    <article
      data-post={item.id}
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-hidden px-3.5 pt-3',
        animate && 'motion-safe:animate-[rise-in_0.5s_cubic-bezier(.2,.8,.2,1)_both]',
      )}
    >
      <div className="flex items-center gap-2">
        <Avatar kind={item.avatar} />
        <div className="flex min-w-0 flex-col">
          <b className="truncate text-xs font-semibold">{t(item.brand)}</b>
          <span className="truncate text-[10px] text-brand-text">{t(item.when)}</span>
        </div>
        <span
          className={cn(
            'ms-auto shrink-0 rounded-md px-[7px] py-[3px] text-[10px] font-semibold',
            TONES[item.tone],
          )}
        >
          {t(item.tag)}
        </span>
      </div>
      <NewsPhoto item={item} priority={priority} />
      <p className="line-clamp-2 text-[15px] leading-[1.45] font-semibold">{t(item.title)}</p>
      <p className="line-clamp-3 text-xs leading-[1.7] text-brand-text">{t(item.line)}</p>
      <a
        href={link(item.href)}
        className="mt-auto inline-flex min-h-6 items-center gap-1 self-start text-xs font-semibold text-brand-blue hover:underline"
      >
        {t(content.read)} <span aria-hidden="true">{dir === 'rtl' ? '←' : '→'}</span>
      </a>
    </article>
  )
}
