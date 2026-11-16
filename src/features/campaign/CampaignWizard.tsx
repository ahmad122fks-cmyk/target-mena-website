import { Form } from '@/components/ui/form'
import { useLang } from '@/features/i18n/LangContext'
import { CampaignSteps } from './CampaignSteps'
import { CampaignSummary } from './CampaignSummary'
import { buildCampaignMessage } from './message'
import { SendResult } from './SendResult'
import { StepBody } from './StepBody'
import { useWizard } from './useWizard'
import { WizardNav } from './WizardNav'

/** The 4-step campaign request beside its live summary. Data stays in this browser until it is sent. */
export function CampaignWizard() {
  const lang = useLang()
  const { form, codes, step, go, next, back, send, result, boardsError } = useWizard()
  const done = result !== 'idle' && result !== 'sending'
  return (
    <Form {...form}>
      <div className="flex flex-col gap-7">
        <CampaignSteps step={step} onStep={go} />
        <div className="flex flex-wrap items-start gap-6">
          <form
            onSubmit={send}
            noValidate
            className="flex min-w-0 flex-[999_1_37.5rem] flex-col gap-6 rounded-[1.375rem] border border-line bg-surface p-5 sm:p-8"
          >
            <StepBody step={step} form={form} boardsError={boardsError} />
            {!done && (
              <WizardNav step={step} sending={result === 'sending'} onBack={back} onNext={next} />
            )}
            {done && (
              <SendResult
                result={result}
                message={buildCampaignMessage(form.getValues(), codes, lang)}
                name={form.getValues('name')}
              />
            )}
          </form>
          <CampaignSummary control={form.control} />
        </div>
      </div>
    </Form>
  )
}
