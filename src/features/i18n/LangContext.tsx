import { createContext, useContext, type ReactNode } from 'react'
import { dirOf, localePath, type Lang, type Localized } from './lang'

const LangContext = createContext<Lang>('ar')

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext value={lang}>{children}</LangContext>
}

export function useLang(): Lang {
  return useContext(LangContext)
}

export function useDir(): 'rtl' | 'ltr' {
  return dirOf(useLang())
}

/** Pick the current language from a `{ ar, en }` content value. */
export function useT() {
  const lang = useLang()
  return <T,>(value: Localized<T>): T => value[lang]
}

/** Build a link for the current language: '/boards' -> '/en/boards' on English pages. */
export function useLink() {
  const lang = useLang()
  return (path: string): string => localePath(lang, path)
}
