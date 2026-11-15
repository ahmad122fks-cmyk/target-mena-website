import { usePageData } from '@/app/PageData'
import { PageHero } from '@/components/shared/PageHero'
import { Section } from '@/components/shared/Section'
import { useLang, useT } from '@/features/i18n/LangContext'
import { trailFor } from '@/lib/breadcrumbs'
import content from '@/pages/insights/insights.content.json'

/** One Insights article: title band, date, then its sections as plain paragraphs. */
export default function ArticlePage() {
  const data = usePageData('article')
  const t = useT()
  const lang = useLang()
  const { article } = data
  return (
    <>
      <PageHero
        crumbs={trailFor(data, lang)}
        title={t(article.title)}
        intro={t(article.description)}
      >
        <p className="text-sm">
          {t(content.published)}{' '}
          <time dateTime={article.date} className="ltr-run">
            {article.date}
          </time>
        </p>
      </PageHero>
      <Section>
        <article className="flex max-w-3xl flex-col gap-6 text-[1.0625rem] leading-[1.9]">
          {article.body.map((part, i) => (
            <div key={i} className="flex flex-col gap-3">
              {part.heading && <h2 className="text-2xl font-semibold">{t(part.heading)}</h2>}
              <p>{t(part.text)}</p>
            </div>
          ))}
        </article>
      </Section>
    </>
  )
}
