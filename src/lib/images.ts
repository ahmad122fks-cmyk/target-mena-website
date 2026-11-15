/*
 * Every raster image on the site, converted at build time to AVIF + WebP
 * (JPEG fallback) in several widths. Real, unedited photos only - see
 * DESIGN.md "Photos". Board photos are keyed by board code.
 */
import creative from '@/assets/art/creative-multicolour.jpg?w=360;540;720&format=avif;webp;jpg&as=picture'
import production from '@/assets/art/production-duotone.jpg?w=400;640;960&format=avif;webp;jpg&as=picture'
import BBH20A from '@/assets/photos/BBH20A.jpg?w=400;640;960;1280&format=avif;webp;jpg&as=picture'
import BGW02A from '@/assets/photos/BGW02A.jpg?w=400;640;960;1400&format=avif;webp;jpg&as=picture'
import BGW03A from '@/assets/photos/BGW03A.jpg?w=400;640;960&format=avif;webp;jpg&as=picture'

export type Picture = ImagetoolsPicture

export const BOARD_PHOTOS: Record<string, Picture> = { BBH20A, BGW02A, BGW03A }

export const ART = { creative, production }
