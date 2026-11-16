import { Moon, Sun } from 'lucide-react'
import { useSyncExternalStore } from 'react'
import site from '@/content/site.json'
import { useT } from '@/features/i18n/LangContext'
import { currentTheme, setTheme, subscribeTheme } from '@/features/theme/theme'
import { cn } from '@/lib/utils'

/**
 * Sun / moon button in the header. The icon follows the class on <html>
 * through CSS, so the prerendered page shows the right one before hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const t = useT()
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, () => 'light' as const)
  return (
    <button
      type="button"
      onClick={() => setTheme(currentTheme() === 'dark' ? 'light' : 'dark')}
      aria-label={t(site.theme.dark)}
      aria-pressed={theme === 'dark'}
      data-theme-toggle
      className={cn(
        'inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-brand-ghost',
        className,
      )}
    >
      <Moon className="size-5 dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-5 dark:block" aria-hidden="true" />
    </button>
  )
}
