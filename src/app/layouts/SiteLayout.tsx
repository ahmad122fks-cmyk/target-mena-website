import { useEffect, type ReactNode } from 'react'
import { Footer } from '@/components/shared/Footer'
import { Header } from '@/components/shared/Header'
import { SelectionButton } from '@/components/shared/SelectionButton'
import { dirOf, type Lang } from '@/features/i18n/lang'
import { LangProvider } from '@/features/i18n/LangContext'
import { ClosingBand } from './ClosingBand'

/**
 * The one layout for both languages (Arabic RTL at /, English LTR at /en/):
 * header, page, the blue CTA band where the page has none, the light footer.
 */
export function SiteLayout({ lang, children }: { lang: Lang; children: ReactNode }) {
  useEffect(() => {
    // Prerendered HTML already has lang/dir; this keeps `vite dev` correct.
    document.documentElement.lang = lang
    document.documentElement.dir = dirOf(lang)
  }, [lang])
  return (
    <LangProvider lang={lang}>
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <ClosingBand />
      <Footer />
      <SelectionButton />
    </LangProvider>
  )
}
