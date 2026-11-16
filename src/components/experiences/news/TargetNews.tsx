import content from '@/content/news.json'
import { useT } from '@/features/i18n/LangContext'
import { NEWS } from '@/features/news/news'
import { cn } from '@/lib/utils'
import { PhoneFrame } from '../PhoneFrame'
import { Dots } from './Dots'
import { NewsTop } from './NewsTop'
import { Post } from './Post'
import { SCREEN_STYLE } from './screen'
import { Stories } from './Stories'
import { useNews } from './useNews'

/**
 * Home hero phone (prompt 5): Target's news app. Stories on top (one per
 * post), one post at a time, dots under; next post every 4.2 s, a tapped
 * story stays 8 s. Posts: src/features/news (approved campaigns first).
 */
export function TargetNews({ className }: { className?: string }) {
  const t = useT()
  const news = useNews(NEWS.length)
  const item = NEWS[news.index]
  if (!item) return null
  return (
    <div
      ref={news.ref}
      data-testid="target-news"
      className={cn('flex justify-center', className)}
      {...news.focus}
    >
      <PhoneFrame label={t(content.label)} float>
        <div
          style={SCREEN_STYLE}
          className="absolute inset-0 flex flex-col bg-brand-white text-brand-black"
        >
          <NewsTop running={news.running} />
          <Stories items={NEWS} current={news.index} running={news.running} onPick={news.pick} />
          <Post key={item.id} item={item} priority={item === NEWS[0]} animate={news.moved} />
          <Dots count={NEWS.length} current={news.index} />
          {/* Announces a post only when the visitor picked it, never on the automatic moves. */}
          <p aria-live="polite" className="sr-only">
            {news.picked ? t(item.title) : ''}
          </p>
        </div>
      </PhoneFrame>
    </div>
  )
}
