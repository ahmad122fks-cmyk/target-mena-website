import { FeatureCard } from '@/components/shared/FeatureCard'
import { PillButton } from '@/components/shared/PillButton'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useLink, useT } from '@/features/i18n/LangContext'
import content from '../home.content.json'

/** Two ways to work: plan with us (/campaign/) or choose yourself (/boards/). */
export function TwoWays() {
  const t = useT()
  const link = useLink()
  const { ways } = content
  const { plan, choose } = ways
  return (
    <Section tone="ghost" labelledBy="ways-title" deferred>
      <SectionHeading id="ways-title" title={t(ways.title)} lead={t(ways.lead)} center />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <FeatureCard
          size="lg"
          raised
          eyebrow={t(plan.eyebrow)}
          title={t(plan.title)}
          text={t(plan.text)}
          footer={
            <PillButton href={link(plan.cta.path)} className="mt-2 self-start">
              {t(plan.cta.label)}
            </PillButton>
          }
        />
        <FeatureCard
          size="lg"
          eyebrow={t(choose.eyebrow)}
          title={t(choose.title)}
          text={t(choose.text)}
          footer={
            <div className="mt-2 flex flex-col">
              {choose.links.map((item) => (
                <a
                  key={item.path}
                  href={link(item.path)}
                  className="inline-flex min-h-11 items-center self-start text-[0.9375rem] font-medium text-brand-blue hover:underline"
                >
                  {t(item.label)}
                </a>
              ))}
            </div>
          }
        />
      </div>
    </Section>
  )
}
