/*
 * Every raster image on the site, converted at build time to AVIF + WebP
 * (JPEG fallback) in several widths. Real, unedited photos only - see
 * DESIGN.md "Photos". Board photos are keyed by board code.
 */
import creative from '@/assets/art/creative-multicolour.jpg?w=480;720;890&format=avif;webp;jpg&as=picture'
import production from '@/assets/art/production-duotone.jpg?w=480;720;1080&format=avif;webp;jpg&as=picture'
import BBH20A from '@/assets/photos/BBH20A.jpg?w=480;720;1080&format=avif;webp;jpg&as=picture'
import BBH38A from '@/assets/photos/BBH38A.jpg?w=480;720;1080&format=avif;webp;jpg&as=picture'
import BGW02A from '@/assets/photos/BGW02A.jpg?w=480;720;1080;1400&format=avif;webp;jpg&as=picture'
import BGW03A from '@/assets/photos/BGW03A.jpg?w=480;720;1080&format=avif;webp;jpg&as=picture'

export type Picture = ImagetoolsPicture

export const BOARD_PHOTOS: Record<string, Picture> = { BBH20A, BBH38A, BGW02A, BGW03A }

export const ART = { creative, production }
