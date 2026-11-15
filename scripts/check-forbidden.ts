/*
 * Blocks prices, supplier names and staff names (BUILD-BRIEF 8 and 9).
 *   tsx scripts/check-forbidden.ts           source content + board data (part of `npm run build`)
 *   tsx scripts/check-forbidden.ts --dist    every built page (acceptance check 3)
 *   tsx scripts/check-forbidden.ts --staged  files about to be committed (git pre-commit hook)
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { findForbidden, htmlText, pageData, privateTerms, type Finding } from './forbidden-rules'

const mode = process.argv[2] ?? '--source'
const terms = privateTerms()
const SELF = [
  'scripts/forbidden-rules.ts',
  'scripts/check-forbidden.ts',
  'tests/unit/forbidden.test.ts',
]

function walk(dir: string, exts: string[]): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full, exts)
    return exts.includes(path.extname(entry.name)) ? [full] : []
  })
}

function check(file: string, text: string): Finding[] {
  const built = file.startsWith('dist/')
  // Board data: the feed, every JSON file in the build, and each page's embedded data.
  const isData = file.startsWith('src/data/') || (built && file.endsWith('.json'))
  const isPublished = file.endsWith('.content.json') || file.startsWith('src/content/') || built
  const html = file.endsWith('.html')
  // Built scripts and styles: every word except "$" (ordinary code there).
  if (built && /\.(js|css)$/.test(file))
    return findForbidden(text, { words: true, terms }).filter(
      (f) => f.rule !== 'forbidden word /\\$/',
    )
  const found = findForbidden(html ? htmlText(text) : text, {
    keys: isData,
    words: isPublished,
    terms,
  })
  return html && built ? [...found, ...findForbidden(pageData(text), { keys: true })] : found
}

let files: string[]
if (mode === '--dist') files = walk('dist', ['.html', '.json', '.xml', '.txt', '.js', '.css'])
else if (mode === '--staged') {
  files = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' })
    .split('\n')
    .filter(
      (file) =>
        file && !SELF.includes(file) && /\.(json|tsx?|md|html|txt|css|ya?ml|xml)$/.test(file),
    )
} else
  files = [
    ...walk('src', ['.json', '.tsx', '.ts']),
    ...walk('public', ['.txt', '.json', '.xml', '.html']),
  ]

const problems = files.flatMap((file) => {
  const text =
    mode === '--staged'
      ? execSync(`git show ":${file}"`, { encoding: 'utf8' })
      : fs.readFileSync(file, 'utf8')
  return check(file.split(path.sep).join('/'), text).map((f) => `${file}: ${f.rule} -> ${f.sample}`)
})

if (problems.length) {
  console.error(`Forbidden content found (${mode}):\n- ${problems.join('\n- ')}`)
  process.exit(1)
}
console.log(
  `Forbidden-content check passed (${mode}, ${files.length} files, ${terms.length} private names).`,
)
