import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Small blue label above a title. Letter-spaced in English only (never Arabic). */
export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn(
        'text-[0.8125rem] font-semibold leading-normal text-[var(--eyebrow,var(--color-brand-blue))] ltr:tracking-[0.06em]',
        className,
      )}
    >
      {children}
    </p>
  )
}
