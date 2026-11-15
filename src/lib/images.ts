/*
 * Every raster image on the site, converted at build time to AVIF + WebP
 * (JPEG fallback) in several widths. Real, unedited photos only - see
 * DESIGN.md "Photos". Board photos are keyed by board code.
 */
import creative from '@/assets/art/creative-multicolour.jpg?w=480;720;890&format=avif;webp;jpg&as=picture'
import rabiaaLaptop from '@/assets/art/rabiaa-laptop.jpg?w=640;960;1280&format=avif;webp;jpg&as=picture'
import rabiaaPhone from '@/assets/art/rabiaa-phone.jpg?w=240;480&format=avif;webp;jpg&as=picture'
import portalLaptop from '@/assets/art/portal-laptop.jpg?w=640;960;1280&format=avif;webp;jpg&as=picture'
import portalPhone from '@/assets/art/portal-phone.jpg?w=240;480&format=avif;webp;jpg&as=picture'
import production from '@/assets/art/production-duotone.jpg?w=480;720;1080&format=avif;webp;jpg&as=picture'
import earthlinkAf10 from '@/assets/feed/earthlink-af10.jpg?w=320;640;880&format=avif;webp;jpg&as=picture'
import earthlinkB22a from '@/assets/feed/earthlink-b22a.jpg?w=320;640;880&format=avif;webp;jpg&as=picture'
import earthlinkBbh20a from '@/assets/feed/earthlink-bbh20a.jpg?w=320;640;880&format=avif;webp;jpg&as=picture'
import BBH20A from '@/assets/photos/BBH20A.jpg?w=480;720;1080&format=avif;webp;jpg&as=picture'
import BBH38A from '@/assets/photos/BBH38A.jpg?w=480;720;1080&format=avif;webp;jpg&as=picture'
import BGW02A from '@/assets/photos/BGW02A.jpg?w=480;720;1080;1400&format=avif;webp;jpg&as=picture'
import BGW03A from '@/assets/photos/BGW03A.jpg?w=480;720;1080&format=avif;webp;jpg&as=picture'

export type Picture = ImagetoolsPicture

export const BOARD_PHOTOS: Record<string, Picture> = { BBH20A, BBH38A, BGW02A, BGW03A }

export const ART = { creative, production }

/** Screen captures (demo data; planner figures blurred) for DeviceMockup. */
export const SCREENS = {
  portal: { laptop: portalLaptop, phone: portalPhone },
  alrabiaa: { laptop: rabiaaLaptop, phone: rabiaaPhone },
}

/** Campaign feed photos (client-approved, src/content/feed.json). */
export const FEED_PHOTOS: Record<string, Picture> = {
  'earthlink-af10': earthlinkAf10,
  'earthlink-b22a': earthlinkB22a,
  'earthlink-bbh20a': earthlinkBbh20a,
}
