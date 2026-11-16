import feed from '@/content/campaigns.json'
import type { Localized } from '@/features/i18n/lang'

/** One campaign in src/content/campaigns.json; only `approved` ones ever reach the site. */
export type FeedItem = {
  id: string
  /** The client's OK in writing. Anything but `true` keeps the item off the site. */
  approved: boolean
  isNew: boolean
  /** Headline in the TargetNews phone (the brand when missing). */
  title?: Localized
  when: Localized
  where: Localized
  brand: Localized
  line: Localized
  tags: Localized[]
  /** Real installed photos: the first is the main one, up to 3 more. */
  photos?: { file: string; alt: Localized; code?: string }[]
  /** How many of the photos become cards on the home page (default 1). */
  cards?: number
  /** No approved photo yet: the client's logo on a clean card. */
  logo?: 'qi'
  logoAlt?: Localized
  /** Text for the announcement bar (newest campaign only). */
  bar?: Localized
}

/** Keeps only the client-approved campaigns, in file order (newest first). */
export function approvedOnly(items: readonly FeedItem[]): FeedItem[] {
  return items.filter((item) => item.approved === true)
}

/** "Our latest campaigns", the announcement bar and the TargetNews phone read this. */
export const FEED = approvedOnly(feed.items as FeedItem[])

/** The newest campaign that has a bar text, if any. */
export const LATEST = FEED.find((item) => item.bar)
