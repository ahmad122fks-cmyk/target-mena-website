import { usePageData } from '@/app/PageData'
import { ClientLogos } from '@/components/shared/ClientLogos'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { StatCard } from '@/components/shared/StatCard'
import { ToConfirm } from '@/components/shared/ToConfirm'
import { useT } from '@/features/i18n/LangContext'
import content from '../home.services.content.json'

/** Number cards (the board count is computed) and the client logos Ahmad approved. */
export function Numbers() {
  const t = useT()
  const { total } = usePageData('home')
  const { numbers: n } = content
  return (
    <Section labelledBy="numbers-title" deferred>
      <SectionHeading id="numbers-title" title={t(n.title)} />
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <StatCard
          value={<span className="ltr-run">{total}</span>}
          label={
            <>
              {t(n.boards)} <ToConfirm what={n.networkToConfirm} className="mt-1 text-xs" />
            </>
          }
        />
        <StatCard
          value={<span className="ltr-run">{t(n.produced)}</span>}
          label={t(n.producedLabel)}
        />
        <StatCard value={t(n.exclusive)} label={t(n.exclusiveLabel)} />
      </div>
      <div className="mt-11">
        <ClientLogos logos={n.logos} toConfirm={n.logosToConfirm} />
      </div>
    </Section>
  )
}
