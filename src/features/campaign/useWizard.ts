import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLang, useT } from '@/features/i18n/LangContext'
import { useSelection } from '@/features/selection/store'
import { loadDraft, saveDraft } from './draft'
import {
  campaignSchema,
  EMPTY_VALUES,
  STEP_FIELDS,
  STEPS,
  type CampaignValues,
  type Step,
} from './schema'
import { sendCampaign, type SendResult } from './send'

/** Form, current step, draft saving, Next/Back and Send for the campaign request. */
export function useWizard() {
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
  const [result, setResult] = useState<SendResult | 'idle' | 'sending'>('idle')
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
  const back = () => go(STEPS[STEPS.indexOf(step) - 1])
  const send = form.handleSubmit(async (values) => {
    if (!codes.length) return go('boards')
    setResult('sending')
    setResult(await sendCampaign(values, codes, lang))
  })
  return {
    form,
    codes,
    step,
    go,
    next,
    back,
    send,
    result,
    boardsError: boardsError && !codes.length,
  }
}
