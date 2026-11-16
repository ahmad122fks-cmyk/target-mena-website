import { WorkBlock } from '@/components/shared/blocks/WorkBlock'
import { FeatureCard } from '@/components/shared/FeatureCard'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { StatCard } from '@/components/shared/StatCard'
import { ToConfirm } from '@/components/shared/ToConfirm'
import { useT } from '@/features/i18n/LangContext'
import content from '../production.content.json'

/**
 * How we work: end to end, directors and crews, and the productions card,
 * whose number waits on the owner (visible placeholder, prompt 5); then the
 * production clients and recent work (WorkBlock: approved names only).
 */
export function HowWeWork() {
  const t = useT()
  const { title, items, stat } = content.howWeWork
  return (
    <Section labelledBy="production-how" deferred>
      <div className="flex flex-col gap-8">
        <SectionHeading id="production-how" title={t(title)} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <FeatureCard
              key={item.title.en}
              title={t(item.title)}
              text={t(item.text)}
              className="card-lift"
            />
          ))}
          <div className="card-lift grid rounded-card">
            <StatCard
              value={<ToConfirm what={stat.toConfirm} />}
              label={
                <>
                  {t(stat.label)}
                  <span className="block text-sm">{t(stat.note)}</span>
                </>
              }
            />
          </div>
        </div>
        <WorkBlock />
      </div>
    </Section>
  )
}
