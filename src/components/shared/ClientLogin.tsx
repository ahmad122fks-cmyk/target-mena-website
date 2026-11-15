import site from '@/content/site.json'
import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'

/** "Client login": the client portal (login sent with each booking), in a new tab. */
export function ClientLogin({ className }: { className?: string }) {
  const t = useT()
  const { clientLogin } = site
  return (
    <a
      href={clientLogin.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex min-h-11 items-center whitespace-nowrap px-2 text-[0.9375rem] text-brand-black hover:text-brand-blue',
        className,
      )}
    >
      {t(clientLogin.label)}
      <span className="sr-only"> {t(clientLogin.newTab)}</span>
    </a>
  )
}
