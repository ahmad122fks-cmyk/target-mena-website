import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ButtonProps = {
  label: string
  onClick: () => void
  pressed?: boolean
  className?: string
  children: ReactNode
}

/** Square icon button of the map's control stack (44 px on phones). */
export function MapButton({ label, onClick, pressed, className, children }: ButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      onClick={onClick}
      className={cn(
        'flex size-11 cursor-pointer items-center justify-center text-white transition-colors outline-offset-[-2px] hover:bg-white/18 focus-visible:outline-2 focus-visible:outline-brand-yellow sm:size-10',
        pressed && 'bg-white/18 text-brand-yellow',
        className,
      )}
    >
      {children}
    </button>
  )
}
