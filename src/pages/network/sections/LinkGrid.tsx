import { useLink } from '@/features/i18n/LangContext'

type Item = { key: string; label: string; path: string }

/**
 * A titled grid of links (provinces, highways, formats). No counts here: the
 * page's numbers are the whole network's (674), the site lists the published boards.
 */
export function LinkGrid({ id, title, items }: { id: string; title: string; items: Item[] }) {
  const link = useLink()
  if (!items.length) return null
  return (
    <div className="flex flex-col gap-6">
      <h3 id={id} className="text-xl sm:text-2xl">
        {title}
      </h3>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.key}>
            <a
              href={link(item.path)}
              className="flex min-h-16 items-center justify-between gap-3 rounded-xl border bg-surface px-5 py-3 hover:border-link hover:bg-brand-blue-10"
            >
              <span className="text-lg font-semibold text-ink">{item.label}</span>
              <span aria-hidden="true" className="text-link rtl:-scale-x-100">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
