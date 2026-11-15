/*
 * Developer rule (BUILD-BRIEF 2.3): files under 150 lines, components under
 * 80. Warns above those, fails the build above 200 lines.
 * shadcn/ui files in src/components/ui are excluded.
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOTS = ['src', 'scripts', 'tests']
const EXTENSIONS = new Set(['.ts', '.tsx', '.css', '.json'])
const EXCLUDE = [path.join('src', 'components', 'ui')]
const HARD_LIMIT = 200

function walk(dir: string): string[] {
  if (!fs.existsSync(dir) || EXCLUDE.some((ex) => dir.startsWith(ex))) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return EXTENSIONS.has(path.extname(entry.name)) ? [full] : []
  })
}

const isComponent = (file: string) => file.endsWith('.tsx') && file.startsWith('src')
let failed = false
for (const file of ROOTS.flatMap(walk)) {
  const lines = fs.readFileSync(file, 'utf8').split('\n').length
  const soft = isComponent(file) ? 80 : 150
  if (lines > HARD_LIMIT) {
    console.error(`FAIL ${file}: ${lines} lines (limit ${HARD_LIMIT}) - split it`)
    failed = true
  } else if (lines > soft) {
    console.warn(`warn ${file}: ${lines} lines (aim for under ${soft})`)
  }
}
if (failed) process.exit(1)
console.log('File length check passed.')
