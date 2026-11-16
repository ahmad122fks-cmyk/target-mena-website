import { describe, expect, it } from 'vitest'
import { alternatePath, basePath, langFromPath, localePath } from '@/features/i18n/lang'

describe('language paths: Arabic at /, English under /en/', () => {
  it('detects the language', () => {
    expect(langFromPath('/')).toBe('ar')
    expect(langFromPath('/boards/BGW03A')).toBe('ar')
    expect(langFromPath('/en/')).toBe('en')
    expect(langFromPath('/en')).toBe('en')
    expect(langFromPath('/energy')).toBe('ar')
  })
  it('builds links per language', () => {
    expect(localePath('ar', '/boards')).toBe('/boards')
    expect(localePath('en', '/boards')).toBe('/en/boards')
    expect(localePath('en', '/')).toBe('/en/')
    expect(localePath('en', '#contact')).toBe('#contact')
    expect(localePath('en', 'tel:+9647719777199')).toBe('tel:+9647719777199')
  })
  it('switches to the same page in the other language', () => {
    expect(basePath('/en/boards')).toBe('/boards')
    expect(alternatePath('/')).toBe('/en/')
    expect(alternatePath('/en/')).toBe('/')
    expect(alternatePath('/boards/BGW03A')).toBe('/en/boards/BGW03A')
  })
  it('treats /…/index.html as the same page (hydrates like the prerendered page)', () => {
    expect(basePath('/index.html')).toBe('/')
    expect(basePath('/en/index.html')).toBe('/')
    expect(basePath('/network/index.html')).toBe('/network/')
    expect(basePath('/en/contact/index.html')).toBe('/contact/')
    expect(alternatePath('/en/index.html')).toBe('/')
  })
})
