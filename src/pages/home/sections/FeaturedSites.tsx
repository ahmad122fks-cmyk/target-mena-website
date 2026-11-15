import { usePageData } from '@/app/PageData'
import { BoardCard } from '@/components/shared/BoardCard'
import { Section } from '@/components/shared/Section'
import { useLink, useT } from '@/features/i18n/LangContext'
import content from '../home.content.json'

/** Three real sites from the approved demo, read from the board feed (no prices). */
export function FeaturedSites() {
  const { featured: boards } = usePageData('home')
  const t = useT()
  const link = useLink()
  const { featured } = content
  return (
    <Section tone="ghost" labelledBy="featured-title" deferred>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-3">
        <h2 id="featured-title" className="text-3xl sm:text-4xl">
          {t(featured.title)}
        </h2>
        <a
          href={link(featured.all.path)}
          className="inline-flex min-h-11 items-center font-semibold text-brand-blue hover:underline"
        >
          {t(featured.all.label)}
        </a>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {boards.map((board) => (
          <li key={board.code} className="flex">
            <BoardCard board={board} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
