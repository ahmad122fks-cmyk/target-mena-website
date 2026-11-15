/*
 * Share images (BUILD-BRIEF 7): 1200 x 630 JPEG for WhatsApp / Facebook /
 * X previews. One per board that has a published photo (photo + code +
 * place + Target logo) and one for every other page (logo + brand line).
 * Rendered with the local Chrome through Playwright, run on Ahmad's Mac
 * after `npm run photos`:   tsx scripts/build-share-images.ts
 */
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from '@playwright/test'
import areas from '../src/data/areas.json'
import raw from '../src/data/boards.json'
import cities from '../src/data/cities.json'
import { boardSlug, type Board } from '../src/lib/boards'

const OUT = 'public/share'
const root = path.resolve('.')
const font = (file: string) =>
  `file://${root}/node_modules/@fontsource-variable/readex-pro/files/${file}`
const CSS = `
@font-face{font-family:Readex;src:url("${font('readex-pro-latin-wght-normal.woff2')}") format('woff2');font-weight:100 900;unicode-range:U+0000-00FF,U+2000-206F}
@font-face{font-family:Readex;src:url("${font('readex-pro-arabic-wght-normal.woff2')}") format('woff2');font-weight:100 900;unicode-range:U+0600-06FF,U+0750-077F,U+FB50-FDFF,U+FE70-FEFF}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;font-family:Readex;overflow:hidden;background:#fff}`
const logo = `file://${root}/public/brand/target-logo-blue.svg`

function boardPage(board: Board): string {
  const area = board.area ? (areas as Record<string, { ar: string }>)[board.area]?.ar : undefined
  const place =
    area && area !== board.description ? `${area} · ${board.description}` : board.description
  const city = (cities as Record<string, { ar: string }>)[board.city]?.ar ?? board.city
  return `<!doctype html><meta charset=utf-8><style>${CSS}
  .photo{height:450px;background:#F5FAFA}.photo img{width:100%;height:100%;object-fit:cover;display:block}
  .band{height:180px;border-top:6px solid #0161A6;display:flex;align-items:center;justify-content:space-between;padding:0 56px;direction:rtl}
  .code{font-size:56px;font-weight:600;color:#0161A6;direction:ltr;text-align:right;line-height:1.1}
  .place{font-size:26px;color:#000;margin-top:6px}.city{font-size:22px;color:#4D4D4F}</style>
  <div class=photo><img src="file://${root}/public/photos/${board.photo!.id}-960.avif"></div><div class=band><div><div class=code>${board.code}</div>
  <div class=place>${place}</div><div class=city>${city}</div></div><img src="${logo}" style="height:46px"></div>`
}

const sitePage = `<!doctype html><meta charset=utf-8><style>${CSS}
  body{background:#F5FAFA;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:36px;border-bottom:14px solid #0161A6}
  h1{font-size:54px;font-weight:700;color:#000;direction:rtl}p{font-size:30px;color:#4D4D4F}</style>
  <img src="${logo}" style="height:96px"><h1>نجعل علامتك حاضرة في كل مكان في العراق.</h1>
  <p>We make brands impossible to miss in Iraq.</p>`

const boards = (raw as Board[]).filter((board) => board.photo)
fs.mkdirSync(path.join(OUT, 'boards'), { recursive: true })
const browser = await chromium.launch({
  channel: 'chrome',
  args: ['--allow-file-access-from-files'],
})
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
// A file:// page may load the local photos and fonts (about:blank may not).
const tmp = path.resolve('.tools.nosync/share-tmp.html')
async function shot(html: string, file: string) {
  fs.writeFileSync(tmp, html)
  await page.goto(`file://${tmp}`, { waitUntil: 'load' })
  await page.evaluate(async () => {
    await Promise.all([
      document.fonts.load('600 56px Readex', 'BGW'),
      document.fonts.load('400 26px Readex', 'بغداد'),
    ])
    await document.fonts.ready
    await Promise.all([...document.images].map((img) => img.decode().catch(() => {})))
  })
  await page.screenshot({ path: file, type: 'jpeg', quality: 68 })
}
await shot(sitePage, path.join(OUT, 'target.jpg'))
const keep = new Set<string>()
for (const board of boards) {
  const file = path.join(OUT, 'boards', `${boardSlug(board.code)}.jpg`)
  keep.add(path.basename(file))
  await shot(boardPage(board), file)
}
// Boards that lost their photo (held for review) lose their share image too.
for (const file of fs.readdirSync(path.join(OUT, 'boards')))
  if (!keep.has(file)) fs.rmSync(path.join(OUT, 'boards', file))
await browser.close()
console.log(`Share images: 1 site + ${boards.length} boards in ${OUT}/`)
