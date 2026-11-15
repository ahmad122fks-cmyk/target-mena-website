import { CtaLink } from '@/components/shared/CtaLink'
import { useLang, useT } from '@/features/i18n/LangContext'
import content from '@/pages/campaign/campaign.content.json'
import { mailtoUrl, whatsappUrl } from './message'
import type { SendResult as Result } from './send'

type Props = { result: Exclude<Result, 'idle'>; message: string; name: string }

/** After "Send": success, or the WhatsApp / email fallback (also offered after an error). */
export function SendResult({ result, message, name }: Props) {
  const t = useT()
  const lang = useLang()
  const r = content.result
  if (result === 'sent')
    return (
      <p
        role="status"
        className="rounded-xl bg-brand-blue-10 p-5 text-lg font-semibold text-brand-blue"
      >
        {t(r.success)}
      </p>
    )
  return (
    <div
      role={result === 'error' ? 'alert' : 'status'}
      className="flex flex-col gap-4 rounded-xl border bg-white p-5"
    >
      <h2 className="text-xl">{result === 'error' ? t(r.error) : t(r.fallbackTitle)}</h2>
      {result === 'fallback' && <p>{t(r.fallbackText)}</p>}
      <div className="flex flex-wrap gap-3">
        <CtaLink href={whatsappUrl(message)}>{t(r.whatsapp)}</CtaLink>
        <CtaLink tone="outline" href={mailtoUrl(message, lang, name)}>
          {t(r.email)}
        </CtaLink>
      </div>
    </div>
  )
}
