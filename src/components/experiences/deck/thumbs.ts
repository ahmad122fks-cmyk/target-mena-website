/*
 * 32 px copies of the swipe and reel photos for the blurred backdrop. A tiny
 * file stretched under a 26 px blur looks the same, downloads in a few
 * hundred bytes, and is never the page's Largest Contentful Paint (Chrome
 * measures an upscaled image at its own size), so the home phone does not
 * hold up the first view.
 */
import BBH20A from '@/assets/photos/BBH20A.jpg?w=32&format=webp&quality=50'
import BBH38A from '@/assets/photos/BBH38A.jpg?w=32&format=webp&quality=50'
import BBL01A from '@/assets/photos/BBL-01A.jpg?w=32&format=webp&quality=50'
import BG46A from '@/assets/photos/BG46A.jpg?w=32&format=webp&quality=50'
import BGM01A from '@/assets/photos/BGM01A.jpg?w=32&format=webp&quality=50'
import BGW02A from '@/assets/photos/BGW02A.jpg?w=32&format=webp&quality=50'
import BGW03A from '@/assets/photos/BGW03A.jpg?w=32&format=webp&quality=50'
import BGW04A from '@/assets/photos/BGW04A.jpg?w=32&format=webp&quality=50'
import DB01A from '@/assets/photos/DB01A.jpg?w=32&format=webp&quality=50'
import DB07A from '@/assets/photos/DB07A.jpg?w=32&format=webp&quality=50'
import DBDG01A from '@/assets/photos/DBDG01A.jpg?w=32&format=webp&quality=50'
import LEDAB01 from '@/assets/photos/LED-AB01-covered.jpg?w=32&format=webp&quality=50'
import { BOARD_PHOTOS, type Picture } from '@/lib/images'

const THUMBS: Record<string, string> = {
  BBH20A,
  BBH38A,
  'BBL-01A': BBL01A,
  BG46A,
  BGM01A,
  BGW02A,
  BGW03A,
  BGW04A,
  DB01A,
  DB07A,
  DBDG01A,
  'LED-AB01': LEDAB01,
}

const BY_PICTURE = new Map<Picture, string>(
  Object.entries(BOARD_PHOTOS).map(([code, picture]) => [picture, THUMBS[code]]),
)

/** The tiny backdrop file for a board photo (undefined for other pictures). */
export const backdropOf = (picture: Picture): string | undefined => BY_PICTURE.get(picture)
