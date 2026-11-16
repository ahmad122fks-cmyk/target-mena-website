/*
 * The TargetNews posts from today's data: a campaign set to "approved": true in
 * src/content/campaigns.json (or a published article with a photo) shows up in
 * the phone without code changes.
 */
import campaigns from '@/content/campaigns.json'
import { swipe } from '@/content/experiences.json'
import content from '@/content/news.json'
import { totals } from '@/data/network-map.json'
import type { FeedItem } from '@/features/feed/feed'
import { ARTICLES } from '@/features/insights/articles'
import { BOARD_PHOTOS, FEED_PHOTOS, type Picture } from '@/lib/images'
import { fill } from '@/lib/template'
import { buildNews, type NewsArticle, type NewsItem } from './build'

/** Campaign photos first, then board photos (the keys never overlap). */
export function newsPicture(key: string): Picture | undefined {
  return FEED_PHOTOS[key] ?? BOARD_PHOTOS[key]
}

/** Photos still waiting for a yes (same list as the swipe deck): shown with a [TO CONFIRM] chip. */
export const PHOTO_TO_CONFIRM: Record<string, string> = swipe.photoToConfirm

const COUNTS = {
  boards: String(totals.boards),
  provinces: String(totals.provinces),
  highways: String(totals.highways),
}

/** House items with the network numbers filled in from src/data/network-map.json. */
const HOUSE: NewsItem[] = content.house.map((item) => ({
  ...item,
  avatar: item.avatar as NewsItem['avatar'],
  tone: item.tone as NewsItem['tone'],
  title: { ar: fill(item.title.ar, COUNTS), en: fill(item.title.en, COUNTS) },
}))

export const NEWS: NewsItem[] = buildNews({
  campaigns: campaigns.items as FeedItem[],
  articles: ARTICLES as NewsArticle[],
  house: HOUSE,
  labels: content,
  hasPhoto: (key) => newsPicture(key) !== undefined,
})
