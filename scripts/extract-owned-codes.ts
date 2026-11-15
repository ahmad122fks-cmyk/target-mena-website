/*
 * Which sites are Target's own (BUILD-BRIEF 4.2 scope; Ahmad 15 Nov 2026:
 * "just our sites"). Source: the catalog's all-sites page
 * ("05 All Sites - Target and partners (no prices).html", 6 Oct 2026), whose
 * data marks every site with stock = Target / Partner / Airport / Bus stops.
 * Only the codes of stock = Target are written; nothing else is read.
 *   tsx scripts/extract-owned-codes.ts "<path to 05 ... .html>"
 */
import fs from 'node:fs'

const source = process.argv[2]
if (!source) throw new Error('Usage: tsx scripts/extract-owned-codes.ts "<05 All Sites ... .html>"')

const html = fs.readFileSync(source, 'utf8')
const start = html.indexOf('<script id="data" type="application/json">')
if (start < 0) throw new Error('Site data block not found')
const json = html.slice(html.indexOf('>', start) + 1, html.indexOf('</script>', start))
const sites = (JSON.parse(json) as { sites: { id: string; stock: string }[] }).sites

const codes = sites
  .filter((site) => site.stock === 'Target')
  .map((site) => site.id.replace(/\s+/g, '').toUpperCase())
  .sort()

const out = {
  source: '05 All Sites - Target and partners (no prices).html, stock = Target',
  generated: new Date().toISOString().slice(0, 10),
  count: codes.length,
  codes,
}
fs.writeFileSync('scripts/data/target-owned-codes.json', `${JSON.stringify(out, null, 1)}\n`)
console.log(`Target-owned codes: ${codes.length} (of ${sites.length} sites)`)
