import { useLocation } from 'react-router'
import site from '@/content/site.json'
import { useLink, useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'

/** Main menu links, shared by the desktop header and the phone menu. */
export function NavLinks({ column = false }: { column?: boolean }) {
  const t = useT()
  const link = useLink()
  const { pathname } = useLocation()
  return (
    <ul className={cn('flex', column ? 'flex-col gap-1' : 'items-center gap-0.5')}>
      {site.nav.map((item) => {
        const href = link(item.path)
        const current = href === pathname
        return (
          <li key={item.path}>
            <a
              href={href}
              aria-current={current ? 'page' : undefined}
              className={cn(
                'inline-flex min-h-11 items-center whitespace-nowrap rounded-lg px-2.5 text-[0.9375rem] text-ink hover:text-link',
                current && 'font-medium text-link',
                column && 'w-full text-lg',
              )}
            >
              {t(item.label)}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
