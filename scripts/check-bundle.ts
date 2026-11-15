/*
 * JavaScript budget per page (BUILD-BRIEF 2.4): the shared entry chunk plus
 * the page's own chunk and its imports, gzipped, must stay <= 150 KB.
 * Uses Vite's build manifest (dist/.vite/manifest.json).
 */
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { PAGE_SOURCES } from '../src/app/pageSources'

const LIMIT_KB = 150
type Chunk = { file: string; imports?: string[]; isEntry?: boolean }
const manifest = JSON.parse(fs.readFileSync('dist/.vite/manifest.json', 'utf8')) as Record<
  string,
  Chunk
>
const gzipKb = (file: string) =>
  zlib.gzipSync(fs.readFileSync(path.join('dist', file))).length / 1024

function files(key: string, seen = new Set<string>()): Set<string> {
  const chunk = manifest[key]
  if (!chunk || seen.has(chunk.file)) return seen
  seen.add(chunk.file)
  chunk.imports?.forEach((child) => files(child, seen))
  return seen
}

const entry = Object.keys(manifest).find((key) => manifest[key].isEntry)!
let failed = false
for (const [page, source] of Object.entries(PAGE_SOURCES)) {
  const all = files(source, files(entry))
  const kb = [...all].reduce((sum, file) => sum + gzipKb(file), 0)
  const ok = kb <= LIMIT_KB
  failed ||= !ok
  console.log(
    `${ok ? 'ok  ' : 'FAIL'} ${page.padEnd(9)} ${kb.toFixed(1).padStart(6)} KB gzip (${all.size} files)`,
  )
}
if (failed) process.exit(1)
console.log(`JavaScript budget passed (<= ${LIMIT_KB} KB gzip per page).`)
