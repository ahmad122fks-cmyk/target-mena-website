import { useLang, useLink } from '@/features/i18n/LangContext'
import { formatCount } from '@/lib/format'

type Item = { key: string; label: string; path: string; count: number }

/** A titled grid of links with board counts (provinces, highways, formats). */
export function LinkGrid({ id, title, items }: { id: string; title: string; items: Item[] }) {
  const lang = useLang()
  const link = useLink()
  if (!items.length) return null
  return (
    <div className="flex flex-col gap-6">
      <h2 id={id} className="text-2xl sm:text-3xl">
        {title}
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.key}>
            <a
              href={link(item.path)}
              className="flex min-h-16 items-center justify-between gap-3 rounded-xl border bg-white px-5 py-3 hover:border-brand-blue hover:bg-brand-blue-10"
            >
              <span className="text-lg font-semibold text-brand-black">{item.label}</span>
              <span className="text-sm">{formatCount(item.count, lang)}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
