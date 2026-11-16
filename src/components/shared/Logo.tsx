import site from '@/content/site.json'
import { useLink, useT } from '@/features/i18n/LangContext'
import { LOGO_BLUE, LOGO_WHITE } from '@/lib/site'
import { cn } from '@/lib/utils'

/** blue = the theme's logo (blue on light, white on dark); white = always white (dark bands). */
type Props = { tone?: 'blue' | 'white'; className?: string }

const IMG = 'h-7 w-auto sm:h-[1.875rem]'

/**
 * Brand Library logo file, height only (never stretched, recoloured,
 * boxed or placed over a busy background). The p-2 keeps clear space.
 * Both files are in the page so the right one shows before any script runs;
 * both are lazy, so neither is preloaded ahead of the page's main photo (the
 * visible one still loads at once: it is on screen).
 */
export function Logo({ tone = 'blue', className }: Props) {
  const t = useT()
  const link = useLink()
  const alt = t(site.logoAlt)
  return (
    <a href={link('/')} className={cn('inline-block shrink-0 p-2', className)}>
      {tone === 'blue' && (
        <img
          src={LOGO_BLUE}
          alt={alt}
          width={1111}
          height={202}
          loading="lazy"
          className={cn(IMG, 'dark:hidden')}
        />
      )}
      <img
        src={LOGO_WHITE}
        alt={alt}
        width={1111}
        height={202}
        loading="lazy"
        className={cn(IMG, tone === 'blue' && 'hidden dark:block')}
      />
    </a>
  )
}
