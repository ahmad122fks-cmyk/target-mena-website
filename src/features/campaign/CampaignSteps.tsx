import { Check } from 'lucide-react'
import { useT } from '@/features/i18n/LangContext'
import content from '@/pages/campaign/campaign.content.json'
import { cn } from '@/lib/utils'
import { STEPS, type Step } from './schema'

/** Step indicator: 1 Your details · 2 Campaign · 3 Boards · 4 Review; done steps can be reopened. */
export function CampaignSteps({ step, onStep }: { step: Step; onStep: (step: Step) => void }) {
  const t = useT()
  const current = STEPS.indexOf(step)
  return (
    <ol aria-label={t(content.steps.label)} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {STEPS.map((key, i) => {
        const done = i < current
        return (
          <li key={key}>
            <button
              type="button"
              disabled={i > current}
              onClick={() => onStep(key)}
              aria-current={i === current ? 'step' : undefined}
              className={cn(
                'flex min-h-12 w-full items-center gap-2 rounded-xl border px-3 text-start font-semibold',
                i === current
                  ? 'border-brand-blue bg-brand-blue text-white'
                  : done
                    ? 'border-brand-blue text-brand-blue'
                    : 'text-brand-text',
              )}
            >
              <span className="ltr-run flex size-7 shrink-0 items-center justify-center rounded-full border border-current text-sm">
                {done ? <Check className="size-4" aria-hidden="true" /> : i + 1}
              </span>
              {t(content.steps[key])}
            </button>
          </li>
        )
      })}
    </ol>
  )
}
