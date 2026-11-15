import type { UseFormReturn } from 'react-hook-form'
import { useT } from '@/features/i18n/LangContext'
import content from '@/pages/campaign/campaign.content.json'
import type { CampaignValues, Step } from './schema'
import { BoardsStep } from './steps/BoardsStep'
import { CampaignStep } from './steps/CampaignStep'
import { DetailsStep } from './steps/DetailsStep'
import { ReviewStep } from './steps/ReviewStep'

type Props = { step: Step; form: UseFormReturn<CampaignValues>; boardsError: boolean }

/** The current step: its title and its fields. */
export function StepBody({ step, form, boardsError }: Props) {
  const t = useT()
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold">{t(content.steps[step])}</h2>
      {step === 'details' && <DetailsStep control={form.control} />}
      {step === 'campaign' && <CampaignStep control={form.control} />}
      {step === 'boards' && <BoardsStep error={boardsError} />}
      {step === 'review' && <ReviewStep getValues={form.getValues} register={form.register} />}
    </div>
  )
}
