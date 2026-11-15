import articles from '@/content/articles.json'
import type { Localized } from '@/features/i18n/lang'

/** One Insights article (src/content/articles.json): plain paragraphs, both languages. */
export type Article = {
  slug: string
  date: string
  title: Localized
  description: Localized
  body: { heading?: Localized; text: Localized }[]
}

/** Newest first. Empty until Ahmad approves the first articles. */
export const ARTICLES = [...(articles as Article[])].sort((a, b) => b.date.localeCompare(a.date))
