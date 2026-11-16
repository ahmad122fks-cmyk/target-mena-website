import reels from '@/content/reels.json'
import type { Localized } from '@/features/i18n/lang'
import { ART, BOARD_PHOTOS, MAP_IMAGE, type Picture } from '@/lib/images'

/** How a reel is drawn; the team swaps posts in src/content/reels.json. */
export type ReelDesign = 'board' | 'rec' | 'art' | 'tv' | 'map'

export type ReelPost = {
  id: string
  design: ReelDesign
  /** A board code with a photo, or production | creative | map. */
  image?: string
  /** Optional chip (a board code). */
  tag?: string
  title?: Localized
  caption: Localized
}

export const POSTS = reels.posts as ReelPost[]

const NAMED: Record<string, Picture> = {
  production: ART.production,
  creative: ART.creative,
  map: MAP_IMAGE,
}

export function reelPicture(image: string | undefined): Picture | undefined {
  return image ? (NAMED[image] ?? BOARD_PHOTOS[image]) : undefined
}
