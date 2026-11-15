import site from '@/content/site.json'
import { useLink, useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'

/** Main menu links, shared by the desktop header and the phone menu. */
export function NavLinks({ column = false }: { column?: boolean }) {
  const t = useT()
  const link = useLink()
  return (
    <ul className={cn('flex', column ? 'flex-col gap-1' : 'items-center gap-1')}>
      {site.nav.map((item) => (
        <li key={item.path}>
          <a
            href={link(item.path)}
            className={cn(
              'inline-flex min-h-11 items-center whitespace-nowrap rounded-lg px-3 font-medium text-brand-black hover:bg-brand-ghost hover:text-brand-blue',
              column && 'w-full text-lg',
            )}
          >
            {t(item.label)}
          </a>
        </li>
      ))}
    </ul>
  )
}
