import type { PageKey } from './routes'

/** Source file of each page chunk, for <link rel="modulepreload"> at prerender. */
export const PAGE_SOURCES: Record<PageKey, string> = {
  home: 'src/pages/home/index.tsx',
  boards: 'src/pages/boards/index.tsx',
  board: 'src/pages/board/index.tsx',
  network: 'src/pages/network/index.tsx',
  province: 'src/pages/province/index.tsx',
  format: 'src/pages/format/index.tsx',
  campaign: 'src/pages/campaign/index.tsx',
}
