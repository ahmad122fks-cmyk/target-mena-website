import feed from '@/content/feed.json'
import type { Localized } from '@/features/i18n/lang'

/** One client-approved campaign in "Our latest campaigns" (src/content/feed.json). */
export type FeedItem = {
  id: string
  isNew: boolean
  when: Localized
  where: Localized
  brand: Localized
  line: Localized
  tags: Localized[]
  /** Real installed photos: the first is the main one, up to 3 more. */
  photos?: { file: string; alt: Localized }[]
  /** No approved photo yet: the client's logo on a clean card. */
  logo?: 'qi'
  logoAlt?: Localized
  /** Text for the announcement bar (newest campaign only). */
  bar?: Localized
}

export const FEED = feed.items as FeedItem[]

/** The newest campaign that has a bar text, if any. */
export const LATEST = FEED.find((item) => item.bar)
