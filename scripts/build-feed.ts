/*
 * Board feed (BUILD-BRIEF 4.2): inventory export -> src/data/boards.json.
 * Keeps ONLY whitelisted fields and Target-owned sites; never reads prices.
 * Runs on Ahmad's Mac (the inventory has prices and is never committed):
 *   tsx scripts/build-feed.ts ["<path to target-inventory.json>"]
 * Later the public API (admin.target-mena.cloud/api/public/sites) replaces the file.
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import areas from '../src/data/areas.json'
import cities from '../src/data/cities.json'
import owned from './data/target-owned-codes.json'
import {
  assertWhitelisted,
  cleanCoords,
  normaliseCity,
  normaliseCode,
  normaliseType,
  type FeedBoard,
} from './feed/normalise'

const DEFAULT = path.join(
  os.homedir(),
  'Desktop/Target Advertising/02 Inventory Data/target-inventory.json',
)
const source = process.argv[2] ?? process.env.INVENTORY_PATH ?? DEFAULT
const photosFile = 'src/data/photos.json'
const photos: Record<string, { id: string; w: number; h: number }[]> = fs.existsSync(photosFile)
  ? JSON.parse(fs.readFileSync(photosFile, 'utf8'))
  : {}

type Row = {
  c: string
  ct: string
  tp: string
  n: string
  ds: string
  ar: string
  h: number
  w: number
  f: number
  m: number
  la: unknown
  ln: unknown
  fz: boolean
}
const rows = (JSON.parse(fs.readFileSync(source, 'utf8')) as { ads: Row[] }).ads
const ownedCodes = new Set(owned.codes.map(normaliseCode))
const skipped: Record<string, string[]> = { notOwned: [], frozen: [], noCity: [], unknownType: [] }
const boards: FeedBoard[] = []

for (const row of rows) {
  const code = normaliseCode(row.c)
  if (!ownedCodes.has(code)) {
    skipped.notOwned.push(code)
    continue
  }
  if (row.fz) {
    skipped.frozen.push(code)
    continue
  }
  const city = normaliseCity(row.ct)
  if (!city) {
    skipped.noCity.push(code)
    continue
  }
  const type = normaliseType(row.tp)
  if (!type) {
    skipped.unknownType.push(code)
    continue
  }
  const area = row.ar.trim()
  if (area && !(area in areas))
    throw new Error(`Area "${area}" (${code}) missing from src/data/areas.json`)
  const coords = cleanCoords(code, row.la, row.ln)
  const photo = photos[code]?.[0]
  // Built field by field from the whitelist - the source row is never copied.
  boards.push({
    code,
    type,
    city,
    ...(area ? { area } : {}),
    description: (row.ds || row.n).trim(),
    height: row.h,
    width: row.w,
    faces: row.f,
    sqm: row.m,
    ...(coords ?? {}),
    ...(photo ? { photo } : {}),
  })
}

const cityOrder = Object.keys(cities)
boards.sort(
  (a, b) =>
    cityOrder.indexOf(a.city) - cityOrder.indexOf(b.city) ||
    a.code.localeCompare(b.code, 'en', { numeric: true }),
)
assertWhitelisted(boards)
fs.writeFileSync(
  'src/data/boards.json',
  `[\n${boards.map((b) => JSON.stringify(b)).join(',\n')}\n]\n`,
)

const inFeed = new Set(rows.map((row) => normaliseCode(row.c)))
const report = {
  ownedSites: ownedCodes.size,
  published: boards.length,
  ownedMissingFromInventory: [...ownedCodes].filter((code) => !inFeed.has(code)),
  skipped: Object.fromEntries(
    Object.entries(skipped).map(([k, v]) => [k, k === 'notOwned' ? v.length : v]),
  ),
  withoutPhoto: boards.filter((b) => !b.photo).length,
  mapHidden: boards.filter((b) => b.lat === undefined).length,
}
console.log(JSON.stringify(report, null, 1))
