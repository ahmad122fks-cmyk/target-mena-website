import { usePageData } from '@/app/PageData'
import { ProductionViewfinder } from '@/components/experiences/production/ProductionViewfinder'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Section } from '@/components/shared/Section'
import { useLang, useT } from '@/features/i18n/LangContext'
import { trailFor } from '@/lib/breadcrumbs'
import content from '../production.content.json'

/**
 * On set: the deep band with breadcrumb, page name, the in-house line as
 * H1 and the viewfinder. Ink and link are re-tinted for the dark band.
 */
export function Hero() {
  const t = useT()
  const lang = useLang()
  const data = usePageData('static')
  return (
    <Section
      tone="black"
      pad="md"
      labelledBy="page-title"
      className="[--color-ink:var(--color-brand-white)] [--color-link:#4da8e8] [--eyebrow:var(--color-brand-yellow)]"
    >
      <div className="flex flex-col gap-7 lg:gap-9">
        <div className="flex max-w-3xl flex-col gap-2.5 text-white/75">
          <Breadcrumbs items={trailFor(data, lang)} />
          <Eyebrow>{t(content.title)}</Eyebrow>
          <h1 id="page-title" className="text-[2rem] sm:text-[2.5rem] lg:text-[3.125rem]">
            {t(content.hero.title)}
          </h1>
          <p className="text-[1.0625rem] leading-[1.8]">{t(content.hero.text)}</p>
        </div>
        <ProductionViewfinder />
      </div>
    </Section>
  )
}
