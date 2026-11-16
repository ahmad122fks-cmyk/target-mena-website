import { PillButton } from '@/components/shared/PillButton'
import { Section } from '@/components/shared/Section'
import { useLink, useT } from '@/features/i18n/LangContext'
import content from '../production.content.json'

/** Yellow closing band (production colour): one line and a black pill to the contact page. */
export function Cta() {
  const t = useT()
  const link = useLink()
  const { cta } = content
  return (
    <Section tone="yellow" pad="md" labelledBy="production-cta" deferred>
      <div className="mx-auto flex max-w-[960px] flex-col items-center gap-5 text-center">
        <h2 id="production-cta" className="text-3xl lg:text-[2.375rem]">
          {t(cta.title)}
        </h2>
        <PillButton tone="black" href={link(cta.link.path)}>
          {t(cta.link.label)}
        </PillButton>
      </div>
    </Section>
  )
}
