import alrabiaaLogo from '@/assets/clients/alrabiaa.png'
import { PillButton } from '@/components/shared/PillButton'
import { Container } from '@/components/shared/Section'
import { useLink, useT } from '@/features/i18n/LangContext'
import content from '../home.more.content.json'

const BARS = [18, 30, 14, 26, 34, 16, 28, 12]

/**
 * Alrabiaa TV (v3): a dark green card (#0B1A16) on a white band, the
 * channel logo, the planner line, on-air bars and the green call to action
 * (green is for Alrabiaa only). Price-free: figures come with the proposal.
 */
export function AlrabiaaSales() {
  const t = useT()
  const link = useLink()
  const { planner } = content
  return (
    <section aria-labelledby="planner-title" className="bg-page">
      <Container className="pt-16 lg:pt-[5.5rem]">
        <div className="flex flex-wrap items-center justify-between gap-10 rounded-3xl bg-alrabiaa p-8 text-white [--heading:#fff] lg:p-12">
          <div className="flex max-w-[600px] flex-col gap-3.5">
            <img
              src={alrabiaaLogo}
              alt={t(planner.eyebrow)}
              width={70}
              height={92}
              loading="lazy"
              className="h-10 w-auto self-start"
            />
            <h2 id="planner-title" className="text-3xl lg:text-[2.25rem] lg:leading-[3rem]">
              {t(planner.title)}
            </h2>
            <p className="text-white/80">{t(planner.text)}</p>
          </div>
          <div className="flex flex-col items-start gap-3.5">
            <div aria-hidden="true" className="flex h-[60px] items-end gap-[5px]">
              {BARS.map((h, j) => (
                <span
                  key={j}
                  className="block w-[9px] origin-bottom animate-[eq-bar_1.1s_ease-in-out_infinite] rounded-[3px] bg-brand-green"
                  style={{ height: h * 1.6, animationDelay: `${j * 0.1}s` }}
                />
              ))}
            </div>
            <PillButton tone="green" href={link(planner.cta.path)}>
              {t(planner.cta.label)}
            </PillButton>
          </div>
        </div>
      </Container>
    </section>
  )
}
