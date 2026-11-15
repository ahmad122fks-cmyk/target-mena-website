/*
 * Board photos (BUILD-BRIEF 4.3): Target's photo folder -> public/photos:
 * AVIF at 480/720/960 px + one WebP fallback at 720 px, and src/data/photos.json
 * (code -> photos). Runs on
 * Ahmad's Mac; the originals are never edited. Photos held for review
 * (scripts/data/photos-held.private.json, from PHOTO-REVIEW.md) are skipped.
 *   tsx scripts/build-photos.ts ["<photo folder>"] ["<target-inventory.json>"]
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import sharp from 'sharp'
import boards from '../src/data/boards.json'
import { matchPhoto } from './feed/photos'

const BASE = path.join(os.homedir(), 'Desktop/Target Advertising/02 Inventory Data')
const folder = process.argv[2] ?? path.join(BASE, 'Board photos - all Target sites (13 Oct)')
const inventory = process.argv[3] ?? path.join(BASE, 'target-inventory.json')
const OUT = 'public/photos'
const AVIF_WIDTHS = [480, 720, 960]
const FALLBACK_WIDTH = 720

const heldFile = 'scripts/data/photos-held.private.json'
const held = new Set<string>(
  fs.existsSync(heldFile)
    ? JSON.parse(fs.readFileSync(heldFile, 'utf8')).map((h: { file: string }) => h.file)
    : [],
)
// Network codes only (which backlits share one network photo); nothing else is read.
const rows = (
  JSON.parse(fs.readFileSync(inventory, 'utf8')) as { ads: { c: string; nw: string }[] }
).ads
const networks = new Map<string, string[]>()
for (const row of rows)
  if (row.nw)
    networks.set(row.nw.toUpperCase(), [...(networks.get(row.nw.toUpperCase()) ?? []), row.c])

const published = new Set(boards.map((board) => board.code))
const photos: Record<string, { id: string; w: number; h: number }[]> = {}
const files = fs
  .readdirSync(folder)
  .filter((file) => /\.(jpe?g|png)$/i.test(file))
  .sort()
const skipped = { held: 0, unmatched: 0 }
fs.mkdirSync(OUT, { recursive: true })

for (const file of files) {
  if (held.has(file)) {
    skipped.held++
    continue
  }
  const codes = matchPhoto(file, published, networks)
  if (!codes.length) {
    skipped.unmatched++
    continue
  }
  const id = file
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  const source = path.join(folder, file)
  const encode = async (width: number, format: 'avif' | 'webp') => {
    const target = path.join(OUT, `${id}-${width}.${format}`)
    if (fs.existsSync(target)) return sharp(target).metadata()
    const image = sharp(source).rotate().resize({ width, withoutEnlargement: true })
    return format === 'avif'
      ? image.avif({ quality: 50 }).toFile(target)
      : image.webp({ quality: 72 }).toFile(target)
  }
  for (const width of AVIF_WIDTHS) await encode(width, 'avif')
  const info = await encode(FALLBACK_WIDTH, 'webp')
  const size = { w: info.width ?? 0, h: info.height ?? 0 }
  for (const code of codes) (photos[code] ??= []).push({ id, ...size })
}

fs.writeFileSync('src/data/photos.json', `${JSON.stringify(photos, null, 1)}\n`)
console.log(
  JSON.stringify({
    photoFiles: files.length,
    ...skipped,
    boardsWithPhoto: Object.keys(photos).length,
    published: published.size,
  }),
)
