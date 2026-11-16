import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import content from '../digital.process.content.json'

/* One guideline colour per step; black text on yellow and green. */
const TONES = [
  'bg-brand-blue text-white',
  'bg-brand-yellow text-brand-black',
  'bg-brand-green text-brand-black',
  'border border-line bg-deep text-white',
]

/** «من الفكرة إلى النشر»: four steps, phone 1 column, tablet 2, desktop 4. */
export function Process() {
  const t = useT()
  const { process } = content
  return (
    <Section tone="ghost" labelledBy="digital-process" deferred>
      <div className="flex flex-col gap-8">
        <SectionHeading
          id="digital-process"
          eyebrow={t(process.eyebrow)}
          title={t(process.title)}
          lead={t(process.lead)}
        />
        <ol className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <li
              key={step.title.en}
              className={cn('flex min-h-[170px] flex-col gap-2.5 rounded-card p-6', TONES[i])}
            >
              <span className="ltr-run self-start text-[2.5rem] leading-none font-bold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[1.1875rem] text-inherit">{t(step.title)}</h3>
              <p className="text-sm leading-[1.7]">{t(step.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
