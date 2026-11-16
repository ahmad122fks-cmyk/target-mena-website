import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import content from '@/pages/campaign/campaign.content.json'
import { STEPS, type Step } from './schema'

/** Four bars with numbered dots; done and current steps are blue, done steps can be reopened. */
export function CampaignSteps({ step, onStep }: { step: Step; onStep: (step: Step) => void }) {
  const t = useT()
  const current = STEPS.indexOf(step)
  return (
    <ol aria-label={t(content.steps.label)} className="grid grid-cols-4 gap-2.5">
      {STEPS.map((key, i) => {
        const reached = i <= current
        return (
          <li key={key}>
            <button
              type="button"
              disabled={i > current}
              onClick={() => onStep(key)}
              aria-current={i === current ? 'step' : undefined}
              className="flex w-full flex-col gap-2.5 text-start disabled:cursor-default"
            >
              <span
                className={cn('block h-[5px] rounded-full', reached ? 'bg-brand-blue' : 'bg-input')}
              />
              <span
                className={cn(
                  'flex items-center gap-2.5 text-sm sm:text-[0.9375rem]',
                  i === current ? 'font-semibold text-ink' : 'text-brand-text',
                )}
              >
                <span
                  className={cn(
                    'ltr-run flex size-[26px] shrink-0 items-center justify-center rounded-full text-[0.8125rem]',
                    reached ? 'bg-brand-blue text-white' : 'bg-line text-brand-text',
                  )}
                >
                  {i + 1}
                </span>
                <span className="max-sm:sr-only">{t(content.steps[key])}</span>
              </span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
