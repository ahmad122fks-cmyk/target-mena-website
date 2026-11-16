import { useLink } from '@/features/i18n/LangContext'

type Item = { key: string; label: string; path: string }

/**
 * A titled grid of links (provinces, highways, formats) as white cards that
 * lift on hover (v3); 4, then 2, then 1 column. No counts here: the page's
 * numbers are the whole network's (674), the site lists the published boards.
 */
export function LinkGrid({ id, title, items }: { id: string; title: string; items: Item[] }) {
  const link = useLink()
  if (!items.length) return null
  return (
    <div className="flex flex-col gap-5">
      <h3 id={id} className="text-xl font-semibold">
        {title}
      </h3>
      <ul aria-labelledby={id} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.key}>
            <a
              href={link(item.path)}
              className="card-lift flex min-h-16 items-center justify-between gap-3 rounded-card border border-line bg-surface px-5 py-3 hover:border-link"
            >
              <span className="text-[1.0625rem] font-semibold text-ink">{item.label}</span>
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
