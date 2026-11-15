import alrabiaa from '@/assets/clients/alrabiaa.png'
import qi from '@/assets/clients/qi.png'
import { usePageData } from '@/app/PageData'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { StatCard } from '@/components/shared/StatCard'
import { ToConfirm } from '@/components/shared/ToConfirm'
import { useT } from '@/features/i18n/LangContext'
import content from '../home.services.content.json'

/** Logo files supplied by Ahmad only; Qi is always the yellow logo. */
const LOGOS: Record<string, { src: string; w: number; h: number }> = {
  qi: { src: qi, w: 248, h: 244 },
  alrabiaa: { src: alrabiaa, w: 70, h: 92 },
}

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
      <div className="mt-11 flex flex-wrap items-center gap-x-11 gap-y-6">
        {n.logos.map((logo) => {
          const file = LOGOS[logo.file]
          return (
            <img
              key={logo.file}
              src={file.src}
              width={file.w}
              height={file.h}
              alt={t(logo.alt)}
              loading="lazy"
              className="h-12 w-auto"
            />
          )
        })}
        <ToConfirm what={n.logosToConfirm} />
      </div>
    </Section>
  )
}
