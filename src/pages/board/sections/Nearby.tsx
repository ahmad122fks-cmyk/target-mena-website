import { BoardCard } from '@/components/shared/BoardCard'
import { Section } from '@/components/shared/Section'
import { useLang, useLink, useT } from '@/features/i18n/LangContext'
import { cityLabel, type Board } from '@/lib/boards'
import content from '../board.content.json'

/** Other boards in the same area and city. */
export function Nearby({ board, nearby }: { board: Board; nearby: Board[] }) {
  const t = useT()
  const lang = useLang()
  const link = useLink()
  if (!nearby.length) return null
  const city = cityLabel(board.city, lang)
  return (
    <Section tone="ghost" labelledBy="nearby-title">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <h2 id="nearby-title" className="text-2xl sm:text-3xl">
          {t(content.nearby)}
        </h2>
        <a
          href={link(`/network/${board.city}/`)}
          className="inline-flex min-h-11 items-center font-semibold text-brand-blue hover:underline"
        >
          {t(content.allIn).replace('{city}', city)}
        </a>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {nearby.map((other) => (
          <li key={other.code} className="flex">
            <BoardCard board={other} requestLabel={t(content.request)} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
