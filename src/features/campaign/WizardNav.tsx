import { Button } from '@/components/ui/button'
import { useT } from '@/features/i18n/LangContext'
import content from '@/pages/campaign/campaign.content.json'
import type { Step } from './schema'

type Props = { step: Step; sending: boolean; onBack: () => void; onNext: () => void }

/** Back / Next, and Send on the last step. */
export function WizardNav({ step, sending, onBack, onNext }: Props) {
  const t = useT()
  const n = content.nav
  return (
    <div className="flex flex-wrap justify-between gap-3 border-t pt-6">
      {step !== 'details' ? (
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="h-12 rounded-xl px-6 text-base"
        >
          {t(n.back)}
        </Button>
      ) : (
        <span />
      )}
      {/* Different keys: React must not turn the clicked "Next" into "Send" mid-click. */}
      {step === 'review' ? (
        <Button
          key="send"
          type="submit"
          disabled={sending}
          className="h-12 rounded-xl px-8 text-base font-semibold"
        >
          {t(sending ? n.sending : n.send)}
        </Button>
      ) : (
        <Button
          key="next"
          type="button"
          onClick={(event) => {
            event.preventDefault()
            onNext()
          }}
          className="h-12 rounded-xl px-8 text-base font-semibold"
        >
          {t(n.next)}
        </Button>
      )}
    </div>
  )
}
