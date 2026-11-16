import { PillButton } from '@/components/shared/PillButton'
import { Section } from '@/components/shared/Section'
import { useLink, useT } from '@/features/i18n/LangContext'
import content from '../digital.process.content.json'

/** Closing band on the deep colour: one line, one yellow action (DESIGN.md 12). */
export function Cta() {
  const t = useT()
  const link = useLink()
  const { cta } = content
  return (
    <Section tone="black" labelledBy="digital-cta" pad="md" deferred>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <h2 id="digital-cta" className="text-3xl lg:text-[2.375rem]">
          {t(cta.title)}
        </h2>
        <p className="text-lg text-brand-grey-40">{t(cta.text)}</p>
        <PillButton tone="yellow" href={link(cta.link.path)} className="mt-2">
          {t(cta.link.label)}
        </PillButton>
      </div>
    </Section>
  )
}
