/*
 * Tiny static server for tests: serves dist/ like the production server
 * should (DEPLOY.md): folders -> index.html, unknown URLs -> 404.html with
 * HTTP 404. Usage: tsx scripts/serve-dist.ts [port]
 */
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'

const DIST = path.resolve('dist')
const PORT = Number(process.argv[2] ?? 4173)
const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
}

function resolve(urlPath: string): string | null {
  const clean = path
    .normalize(decodeURIComponent(urlPath.split('?')[0]))
    .replace(/^(\.\.[/\\])+/, '')
  let file = path.join(DIST, clean)
  if (!file.startsWith(DIST)) return null
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
  return fs.existsSync(file) ? file : null
}

http
  .createServer((req, res) => {
    const file = resolve(req.url ?? '/')
    const status = file ? 200 : 404
    const target = file ?? path.join(DIST, '404.html')
    const cache = target.includes(`${path.sep}assets${path.sep}`)
      ? 'public, max-age=31536000, immutable'
      : 'no-cache'
    res.writeHead(status, {
      'Content-Type': TYPES[path.extname(target)] ?? 'application/octet-stream',
      'Cache-Control': cache,
    })
    fs.createReadStream(target).pipe(res)
  })
  .listen(PORT, () => console.log(`dist/ on http://localhost:${PORT}`))
