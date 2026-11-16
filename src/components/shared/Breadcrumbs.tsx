import { Fragment } from 'react'
import site from '@/content/site.json'
import { useT } from '@/features/i18n/LangContext'
import type { Crumb } from '@/lib/breadcrumbs'
import { cn } from '@/lib/utils'

type Props = {
  items: Crumb[]
  /** dark = on a deep band (network tour). */ tone?: 'light' | 'dark'
}

/** Visible breadcrumb trail (same items as the BreadcrumbList JSON-LD). */
export function Breadcrumbs({ items, tone = 'light' }: Props) {
  const t = useT()
  return (
    <nav aria-label={t(site.breadcrumbLabel)} className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <Fragment key={item.path}>
            {i > 0 && <li aria-hidden="true">‹</li>}
            <li>
              {i === items.length - 1 ? (
                <span
                  aria-current="page"
                  className={cn('font-medium', tone === 'dark' ? 'text-white' : 'text-ink')}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.path}
                  className={cn(
                    'inline-flex min-h-11 items-center hover:underline',
                    tone === 'dark' ? 'hover:text-white' : 'hover:text-link',
                  )}
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
