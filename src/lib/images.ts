/*
 * Every raster image on the site, converted at build time to AVIF + WebP
 * (JPEG fallback) in several widths. Real, unedited photos only - see
 * DESIGN.md "Photos". Board photos are keyed by board code.
 */
import creative from '@/assets/art/creative-multicolour.jpg?w=480;720;890&format=avif;webp;jpg&as=picture'
import portalMockup from '@/assets/art/mockup-portal-light.png?w=800;1200;1600;2000&format=avif;webp&quality=72&as=picture'
import alrabiaaMockup from '@/assets/art/mockup-rabiaa-light.png?w=800;1200;1600;2000&format=avif;webp&quality=72&as=picture'
import production from '@/assets/art/production-duotone.jpg?w=480;720;1080&format=avif;webp;jpg&as=picture'
import earthlinkAf10 from '@/assets/feed/earthlink-af10.jpg?w=320;640;880&format=avif;webp;jpg&as=picture'
import earthlinkB22a from '@/assets/feed/earthlink-b22a.jpg?w=320;640;880&format=avif;webp;jpg&as=picture'
import earthlinkBbh20a from '@/assets/feed/earthlink-bbh20a.jpg?w=320;640;880&format=avif;webp;jpg&as=picture'
import iraqSatAvif from '@/assets/map/iraq-sat-1400.jpg?w=700;1000;1400&format=avif&quality=40&as=picture'
import iraqSatOther from '@/assets/map/iraq-sat-1400.jpg?w=700;1000;1400&format=webp;jpg&quality=55&as=picture'
import BBH20A from '@/assets/photos/BBH20A.jpg?w=480;720;1080&format=avif;webp;jpg&as=picture'
import BBL01A from '@/assets/photos/BBL-01A.jpg?w=480;720;1000&format=avif;webp;jpg&as=picture'
import BG46A from '@/assets/photos/BG46A.jpg?w=480;720;1000&format=avif;webp;jpg&as=picture'
import BGM01A from '@/assets/photos/BGM01A.jpg?w=480;720;1000&format=avif;webp;jpg&as=picture'
import BGW04A from '@/assets/photos/BGW04A.jpg?w=480;720;1000&format=avif;webp;jpg&as=picture'
import DB01A from '@/assets/photos/DB01A.jpg?w=480;720;1000&format=avif;webp;jpg&as=picture'
import DB07A from '@/assets/photos/DB07A.jpg?w=480;720;1000&format=avif;webp;jpg&as=picture'
import DBDG01A from '@/assets/photos/DBDG01A.jpg?w=480;720;1000&format=avif;webp;jpg&as=picture'
import LEDAB01 from '@/assets/photos/LED-AB01-covered.jpg?w=480;720;1000&format=avif;webp;jpg&as=picture'
import BBH38A from '@/assets/photos/BBH38A.jpg?w=480;720;1080&format=avif;webp;jpg&as=picture'
import BGW02A from '@/assets/photos/BGW02A.jpg?w=480;720;1080;1400&format=avif;webp;jpg&as=picture'
import BGW03A from '@/assets/photos/BGW03A.jpg?w=480;720;1080&format=avif;webp;jpg&as=picture'

export type Picture = ImagetoolsPicture

export const BOARD_PHOTOS: Record<string, Picture> = {
  BBH20A,
  BBH38A,
  BGW02A,
  BGW03A,
  // Resized street photos for the board cards in the phones (16 Nov 2026).
  'BBL-01A': BBL01A,
  BG46A,
  BGM01A,
  BGW04A,
  DB01A,
  DB07A,
  DBDG01A,
  // The screen showed election content: covered with a Target screen ([TO CONFIRM]).
  'LED-AB01': LEDAB01,
}

/**
 * Satellite base of the network map (cleared for public use by Ahmad, 16 Nov
 * 2026). One value: swap the two imports above to change the image. The source is
 * 1400 px wide, so 1400 is also the retina size until a larger file exists.
 */
export const MAP_IMAGE: Picture = {
  // AVIF needs a lower quality number for the same look (the map is shown
  // darkened): 1400 px = about 80 KB as AVIF, 145 KB as WebP.
  sources: { ...iraqSatAvif.sources, ...iraqSatOther.sources },
  img: iraqSatOther.img,
}

export const ART = { creative, production }

/**
 * Device mockups (Ahmad's line-frame renders, 4000 x 2460, transparent; demo
 * data, no prices). Light versions: both sections sit on light bands. Never
 * cropped or stretched.
 */
export const MOCKUPS = { portal: portalMockup, alrabiaa: alrabiaaMockup }

/** Campaign feed photos (client-approved, src/content/feed.json). */
export const FEED_PHOTOS: Record<string, Picture> = {
  'earthlink-af10': earthlinkAf10,
  'earthlink-b22a': earthlinkB22a,
  'earthlink-bbh20a': earthlinkBbh20a,
}
