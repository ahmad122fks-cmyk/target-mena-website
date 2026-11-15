import { PillButton } from '@/components/shared/PillButton'
import { useLang, useT } from '@/features/i18n/LangContext'
import type { SendResult } from '@/lib/leads'
import content from '@/pages/contact/contact.content.json'
import { emailLink, whatsappLink } from './message'

type Props = { result: SendResult; text: string; name: string }

/** After "Send": success, or the WhatsApp / email fallback (also after an error). */
export function ContactResult({ result, text, name }: Props) {
  const t = useT()
  const lang = useLang()
  const f = content.form
  if (result === 'sent')
    return (
      <p
        role="status"
        className="rounded-[14px] bg-brand-green-10 p-4 font-medium text-brand-black"
      >
        {t(f.sent)}
      </p>
    )
  return (
    <div
      role={result === 'error' ? 'alert' : 'status'}
      className="flex flex-col gap-3 rounded-[14px] border border-line bg-brand-ghost p-4"
    >
      <p className="font-semibold text-brand-black">
        {t(result === 'error' ? f.error : f.fallbackTitle)}
      </p>
      {result === 'fallback' && <p className="text-sm">{t(f.fallbackText)}</p>}
      <div className="flex flex-wrap gap-2.5">
        <PillButton size="sm" href={whatsappLink(text)}>
          {t(f.viaWhatsapp)}
        </PillButton>
        <PillButton size="sm" tone="outline" href={emailLink(text, lang, name)}>
          {t(f.viaEmail)}
        </PillButton>
      </div>
    </div>
  )
}
