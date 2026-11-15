import { Fragment } from 'react'
import site from '@/content/site.json'
import { useT } from '@/features/i18n/LangContext'
import type { Crumb } from '@/lib/breadcrumbs'

/** Visible breadcrumb trail (same items as the BreadcrumbList JSON-LD). */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const t = useT()
  return (
    <nav aria-label={t(site.breadcrumbLabel)} className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <Fragment key={item.path}>
            {i > 0 && <li aria-hidden="true">‹</li>}
            <li>
              {i === items.length - 1 ? (
                <span aria-current="page" className="font-medium text-brand-black">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.path}
                  className="inline-flex min-h-11 items-center hover:text-brand-blue hover:underline"
                >
                  {item.label}
                </a>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
