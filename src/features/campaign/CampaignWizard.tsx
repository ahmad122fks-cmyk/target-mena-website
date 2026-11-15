import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { useLang, useT } from '@/features/i18n/LangContext'
import { useSelection } from '@/features/selection/store'
import { CampaignSteps } from './CampaignSteps'
import { loadDraft, saveDraft } from './draft'
import { buildCampaignMessage } from './message'
import {
  campaignSchema,
  EMPTY_VALUES,
  STEP_FIELDS,
  STEPS,
  type CampaignValues,
  type Step,
} from './schema'
import { sendCampaign, type SendResult as Result } from './send'
import { SendResult } from './SendResult'
import { StepBody } from './StepBody'
import { WizardNav } from './WizardNav'

/** The 4-step campaign request. Data stays in this browser until it is sent. */
export function CampaignWizard() {
  const t = useT()
  const lang = useLang()
  const codes = useSelection().map((item) => item.code)
  const schema = useMemo(() => campaignSchema(t), [t])
  const form = useForm<CampaignValues>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY_VALUES,
    mode: 'onChange',
  })
  const [step, setStep] = useState<Step>('details')
  const [boardsError, setBoardsError] = useState(false)
  const [result, setResult] = useState<Result | 'idle' | 'sending'>('idle')
  useEffect(() => {
    form.reset(loadDraft())
    if (new URLSearchParams(window.location.search).get('step') === 'boards') setStep('boards')
    const sub = form.watch((values) => saveDraft(values as CampaignValues))
    return () => sub.unsubscribe()
  }, [form])
  const go = (next: Step) => {
    setStep(next)
    document.getElementById('page-title')?.scrollIntoView({ block: 'start' })
  }
  async function next() {
    if (step === 'boards' && !codes.length) return setBoardsError(true)
    if (await form.trigger(STEP_FIELDS[step])) go(STEPS[STEPS.indexOf(step) + 1])
  }
  const send = form.handleSubmit(async (values) => {
    if (!codes.length) return go('boards')
    setResult('sending')
    setResult(await sendCampaign(values, codes, lang))
  })
  const done = result !== 'idle' && result !== 'sending'
  return (
    <Form {...form}>
      <form onSubmit={send} noValidate className="flex flex-col gap-8">
        <CampaignSteps step={step} onStep={go} />
        <StepBody step={step} form={form} boardsError={boardsError && !codes.length} />
        {!done && (
          <WizardNav
            step={step}
            sending={result === 'sending'}
            onBack={() => go(STEPS[STEPS.indexOf(step) - 1])}
            onNext={next}
          />
        )}
        {done && (
          <SendResult
            result={result}
            message={buildCampaignMessage(form.getValues(), codes, lang)}
            name={form.getValues('name')}
          />
        )}
      </form>
    </Form>
  )
}
