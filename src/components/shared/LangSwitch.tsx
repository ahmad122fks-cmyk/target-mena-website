import { useLocation } from 'react-router'
import site from '@/content/site.json'
import { alternatePath, otherLang } from '@/features/i18n/lang'
import { useLang } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'

/** Link to the same page in the other language. */
export function LangSwitch({ className }: { className?: string }) {
  const lang = useLang()
  const { pathname } = useLocation()
  const target = otherLang(lang)
  return (
    <a
      href={alternatePath(pathname)}
      hrefLang={target}
      lang={target}
      className={cn(
        'inline-flex min-h-11 items-center px-3 font-semibold hover:underline',
        className,
      )}
    >
      {site.langSwitch[lang]}
    </a>
  )
}
