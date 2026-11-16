/*
 * Light / dark theme (Ahmad, 16 Nov 2026). The visitor's choice is kept in
 * localStorage; without one the device setting decides. The class is set
 * before the first paint by the inline script in index.html (same key and
 * logic as here), so a prerendered page never flashes the wrong theme.
 */
export type Theme = 'light' | 'dark'

export const THEME_KEY = 'theme'

const listeners = new Set<() => void>()

/** The theme on screen now (the class on <html>); "light" on the server. */
export function currentTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/** Show a theme and remember it for the next visit. */
export function setTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // Private mode or blocked storage: the theme still changes for this page.
  }
  listeners.forEach((listener) => listener())
}

export function subscribeTheme(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/**
 * The inline <head> script, as a string (tested against index.html). Kept
 * tiny and dependency-free: it runs before the CSS and the app. `?theme=dark`
 * (or light) in the address shows that theme without saving it: a shareable
 * link, and how Lighthouse measures the dark pages.
 */
export const THEME_BOOT = `try{var q=new URLSearchParams(location.search).get('theme'),t=q==='light'||q==='dark'?q:localStorage.getItem('${THEME_KEY}');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var r=document.documentElement;r.classList.toggle('dark',t==='dark');r.style.colorScheme=t}catch(e){}`
