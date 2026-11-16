/*
 * The posts of the TargetNews phone, built from data only (no images here, so
 * the rule is easy to test): approved campaigns in file order (newest first),
 * then published articles that have a real photo (newest first), then the
 * house items; the first `limit` (4) are shown.
 */
import { approvedOnly, type FeedItem } from '@/features/feed/feed'
import type { Localized } from '@/features/i18n/lang'
import type { Article } from '@/features/insights/articles'

export type NewsTone = 'yellow' | 'blue' | 'green'
export type NewsAvatar = 'target' | 'qi' | 'alrabiaa'

/** One story + post in the phone. */
export type NewsItem = {
  id: string
  brand: Localized
  /** Short label under the story ring. */
  story: Localized
  avatar: NewsAvatar
  /** When · where line under the brand. */
  when: Localized
  tag: Localized
  tone: NewsTone
  title: Localized
  line: Localized
  /** Key of FEED_PHOTOS or BOARD_PHOTOS (src/lib/images.ts). */
  photo: string
  alt: Localized
  /** Site path without the language prefix (useLink adds /en). */
  href: string
}

/** An Insights article; `published: false` or no photo keeps it out of the phone. */
export type NewsArticle = Article & {
  published?: boolean
  photo?: { file: string; alt: Localized }
}

export type NewsLabels = {
  target: Localized
  tags: { new: Localized; campaign: Localized; article: Localized }
}

export type NewsSources = {
  campaigns: readonly FeedItem[]
  articles: readonly NewsArticle[]
  house: readonly NewsItem[]
  labels: NewsLabels
  /** True when the photo key is a real, approved photo on the site. */
  hasPhoto: (key: string) => boolean
  limit?: number
}

export const NEWS_LIMIT = 4

const both = (text: string): Localized => ({ ar: text, en: text })
const join = (a: Localized, b: Localized): Localized => ({
  ar: `${a.ar} · ${b.ar}`,
  en: `${a.en} · ${b.en}`,
})
/** "إيرثلنك · تطبيق الوطني" -> "إيرثلنك" for the story label. */
const short = (brand: Localized): Localized => ({
  ar: brand.ar.split(' · ')[0],
  en: brand.en.split(' · ')[0],
})

function fromCampaign(item: FeedItem, labels: NewsLabels): NewsItem | null {
  const photo = item.photos?.[0]
  if (!photo) return null
  // Short brand in the post header too (the title names the product): no truncation next to the tag.
  return {
    id: item.id,
    brand: short(item.brand),
    story: short(item.brand),
    avatar: item.logo ?? 'target',
    when: join(item.when, item.where),
    tag: item.isNew ? labels.tags.new : labels.tags.campaign,
    tone: item.isNew ? 'yellow' : 'blue',
    title: item.title ?? item.brand,
    line: item.line,
    photo: photo.file,
    alt: photo.alt,
    href: '/#feed',
  }
}

function fromArticle(article: NewsArticle, labels: NewsLabels): NewsItem | null {
  if (article.published === false || !article.photo) return null
  return {
    id: `article-${article.slug}`,
    brand: labels.target,
    story: labels.tags.article,
    avatar: 'target',
    when: both(article.date),
    tag: labels.tags.article,
    tone: 'blue',
    title: article.title,
    line: article.description,
    photo: article.photo.file,
    alt: article.photo.alt,
    href: `/insights/${article.slug}/`,
  }
}

export function buildNews(sources: NewsSources): NewsItem[] {
  const { labels, hasPhoto, limit = NEWS_LIMIT } = sources
  const campaigns = approvedOnly(sources.campaigns).map((item) => fromCampaign(item, labels))
  const articles = [...sources.articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((article) => fromArticle(article, labels))
  return [...campaigns, ...articles, ...sources.house]
    .filter((item): item is NewsItem => item !== null && hasPhoto(item.photo))
    .slice(0, limit)
}
