/*
 * Map frame (prompt 5, section 2). The prerendered page is the light render
 * and is shown in both themes before any script runs, so the light frame,
 * cover and vignette must switch by CSS alone: the server HTML carries
 * `map-auto` and `dark:` classes, map.css scopes cover to the light theme.
 */
import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { NetworkMap } from '@/components/map/NetworkMap'
import type { NetworkMapProps } from '@/components/map/state'
import { LangProvider } from '@/features/i18n/LangContext'

vi.mock('@/lib/images', () => ({
  MAP_IMAGE: { sources: { webp: 'x.webp' }, img: { src: 'x.jpg', w: 1400, h: 1416 } },
}))

function render(props: NetworkMapProps = {}) {
  const map = createElement(NetworkMap, props)
  const html = renderToString(createElement(LangProvider, { lang: 'ar', children: map }))
  const root = /data-testid="network-map"[^>]*?class="([^"]*)"/.exec(html)?.[1] ?? ''
  return { html, root: root.split(' ') }
}

describe('map frame on the server', () => {
  it('follows the theme by CSS: clean light frame, dark frame as before', () => {
    const { html, root } = render()
    expect(root).toContain('map-auto')
    expect(root).not.toContain('map-cover')
    for (const light of ['rounded-card', 'border', 'border-line-strong', 'shadow-frame'])
      expect(root).toContain(light)
    for (const dark of ['dark:rounded-[24px]', 'dark:border-0', 'dark:bg-deep', 'dark:shadow-none'])
      expect(root).toContain(dark)
    expect(html).toContain('class="map-vignette hidden dark:block"')
  })
  it('lets the page force cover or contain, and the vignette on or off', () => {
    expect(render({ cover: true }).root).toContain('map-cover')
    expect(render({ cover: true }).root).not.toContain('map-auto')
    const contain = render({ cover: false }).root
    expect(contain.filter((c) => c === 'map-auto' || c === 'map-cover')).toEqual([])
    expect(render({ vignette: true }).html).toContain('class="map-vignette"')
    expect(render({ vignette: false }).html).not.toContain('map-vignette')
  })
  it('scopes cover (stage, SVG, no edge fade) to the cover class or the light theme', () => {
    const css = readFileSync('src/components/map/map.css', 'utf8')
    const cover = ':is(.map-cover, .map-auto:not(.dark, .dark *))'
    expect(css).toContain(`${cover} :is(.map-stage, .map-svg) {`)
    expect(css).toContain(`${cover} .map-svg {`)
    expect(css).toMatch(
      /\.map-auto:not\(\.dark, \.dark \*\)\) \.map-sat img \{\s+mask-image: none;/,
    )
  })
})
