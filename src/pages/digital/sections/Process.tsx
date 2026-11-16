import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useT } from '@/features/i18n/LangContext'
import content from '../digital.process.content.json'

/**
 * «من الفكرة إلى النشر»: four steps as white v3 cards with blue numbers on
 * the ghost band (yellow stays for the main action, green for Alrabiaa).
 * Phone 1 column, tablet 2, desktop 4.
 */
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
              className="card-lift flex min-h-[170px] flex-col gap-2.5 rounded-card border border-line bg-surface p-6"
            >
              <span className="ltr-run self-start text-[2.5rem] leading-none font-bold text-link">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-semibold">{t(step.title)}</h3>
              <p className="text-[0.9375rem] leading-[1.75]">{t(step.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
