import site from '@/content/site.json'
import { useLink, useT } from '@/features/i18n/LangContext'
import { LOGO_BLUE, LOGO_WHITE } from '@/lib/site'
import { cn } from '@/lib/utils'

type Props = { tone?: 'blue' | 'white'; className?: string }

/**
 * Brand Library logo file, height only (never stretched, recoloured,
 * boxed or placed over a busy background). The p-2 keeps clear space.
 */
export function Logo({ tone = 'blue', className }: Props) {
  const t = useT()
  const link = useLink()
  return (
    <a href={link('/')} className={cn('inline-block shrink-0 p-2', className)}>
      <img
        src={tone === 'blue' ? LOGO_BLUE : LOGO_WHITE}
        alt={t(site.logoAlt)}
        width={1111}
        height={202}
        loading={tone === 'white' ? 'lazy' : undefined}
        className="h-7 w-auto sm:h-[1.875rem]"
      />
    </a>
  )
}
