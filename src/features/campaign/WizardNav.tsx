import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PillButton } from '@/components/shared/PillButton'
import { useT } from '@/features/i18n/LangContext'
import content from '@/pages/campaign/campaign.content.json'
import type { Step } from './schema'

type Props = { step: Step; sending: boolean; onBack: () => void; onNext: () => void }

const arrow = 'size-4 rtl:rotate-180'

/** Back / Next, and Send on the last step. */
export function WizardNav({ step, sending, onBack, onNext }: Props) {
  const t = useT()
  const n = content.nav
  return (
    <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-5">
      {step !== 'details' ? (
        <PillButton tone="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className={arrow} aria-hidden="true" />
          {t(n.back)}
        </PillButton>
      ) : (
        <span />
      )}
      {/* Different keys: React must not turn the clicked "Next" into "Send" mid-click. */}
      {step === 'review' ? (
        <PillButton key="send" type="submit" size="sm" disabled={sending} className="px-6">
          {t(sending ? n.sending : n.send)}
        </PillButton>
      ) : (
        <PillButton
          key="next"
          size="sm"
          className="px-6"
          onClick={(event) => {
            event.preventDefault()
            onNext()
          }}
        >
          {t(n.next)}
          <ArrowRight className={arrow} aria-hidden="true" />
        </PillButton>
      )}
    </div>
  )
}
