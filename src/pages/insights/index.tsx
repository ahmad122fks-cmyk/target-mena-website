import { ContentPage } from '@/components/shared/ContentPage'
import { Section } from '@/components/shared/Section'
import { ToConfirm } from '@/components/shared/ToConfirm'
import { ARTICLES } from '@/features/insights/articles'
import { useLink, useT } from '@/features/i18n/LangContext'
import content from './insights.content.json'

/** Insights: article list (kept out of search engines until the first article exists). */
export default function InsightsPage() {
  const t = useT()
  const link = useLink()
  return (
    <ContentPage id="insights" content={content}>
      <Section>
        {ARTICLES.length === 0 ? (
          <div className="flex flex-col items-start gap-3">
            <p className="text-lg">{t(content.empty)}</p>
            <ToConfirm what={content.emptyToConfirm} className="text-xs" />
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article) => (
              <li
                key={article.slug}
                className="flex flex-col gap-2 rounded-card border border-line p-6"
              >
                <time dateTime={article.date} className="ltr-run text-xs">
                  {article.date}
                </time>
                <h2 className="text-xl font-semibold">{t(article.title)}</h2>
                <p className="text-[0.9375rem]">{t(article.description)}</p>
                <a
                  href={link(`/insights/${article.slug}/`)}
                  className="mt-auto inline-flex min-h-11 items-end font-medium text-brand-blue hover:underline"
                >
                  {t(content.read)}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </ContentPage>
  )
}
