import { FeatureCard } from '@/components/shared/FeatureCard'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { StatCard } from '@/components/shared/StatCard'
import { useT } from '@/features/i18n/LangContext'
import content from '../production.content.json'

/** How we work: end to end, directors and crews, and the +35 productions (as before). */
export function HowWeWork() {
  const t = useT()
  const { title, items, stat } = content.howWeWork
  return (
    <Section tone="ghost" labelledBy="production-how" deferred>
      <div className="flex flex-col gap-8">
        <SectionHeading id="production-how" size="band" title={t(title)} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <FeatureCard key={item.title.en} title={t(item.title)} text={t(item.text)} />
          ))}
          <StatCard
            value={<span className="ltr-run">{t(stat.value)}</span>}
            label={
              <>
                {t(stat.label)}
                <span className="block text-sm">{t(stat.note)}</span>
              </>
            }
          />
        </div>
      </div>
    </Section>
  )
}
