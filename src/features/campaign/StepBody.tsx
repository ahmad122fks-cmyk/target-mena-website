import type { UseFormReturn } from 'react-hook-form'
import type { CampaignValues, Step } from './schema'
import { BoardsStep } from './steps/BoardsStep'
import { CampaignStep } from './steps/CampaignStep'
import { DetailsStep } from './steps/DetailsStep'
import { ReviewStep } from './steps/ReviewStep'

/** The current step's fields. */
export function StepBody({
  step,
  form,
  boardsError,
}: {
  step: Step
  form: UseFormReturn<CampaignValues>
  boardsError: boolean
}) {
  if (step === 'details') return <DetailsStep control={form.control} />
  if (step === 'campaign') return <CampaignStep control={form.control} />
  if (step === 'boards') return <BoardsStep error={boardsError} />
  return <ReviewStep getValues={form.getValues} register={form.register} />
}
