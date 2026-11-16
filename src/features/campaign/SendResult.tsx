import { PillButton } from '@/components/shared/PillButton'
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
        className="rounded-[14px] bg-brand-green-10 p-5 text-base font-medium text-ink"
      >
        {t(r.success)}
      </p>
    )
  return (
    <div
      role={result === 'error' ? 'alert' : 'status'}
      className="flex flex-col gap-4 rounded-[14px] border border-line bg-brand-ghost p-5"
    >
      <h2 className="text-lg font-semibold">
        {result === 'error' ? t(r.error) : t(r.fallbackTitle)}
      </h2>
      {result === 'fallback' && <p>{t(r.fallbackText)}</p>}
      <div className="flex flex-wrap gap-3">
        <PillButton href={whatsappUrl(message)}>{t(r.whatsapp)}</PillButton>
        <PillButton tone="outline" href={mailtoUrl(message, lang, name)}>
          {t(r.email)}
        </PillButton>
      </div>
    </div>
  )
}
