import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Frosted pill holding a row of chips. Pressing on it never drags the map. */
export function ChipGroup(props: { label: string; children: ReactNode; className?: string }) {
  return (
    <div
      role="group"
      aria-label={props.label}
      data-map-ui=""
      className={cn(
        'pointer-events-auto flex shrink-0 gap-1 rounded-full border border-white/10 bg-[#04111F]/55 p-1 backdrop-blur-md',
        props.className,
      )}
    >
      {props.children}
    </div>
  )
}

type ChipProps = { on: boolean; onClick: () => void; dot?: string; children: ReactNode }

/** Toggle chip: white when on. 44 px tall on phones, compact from 640 px. */
export function Chip({ on, onClick, dot, children }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        'flex min-h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3.5 text-sm whitespace-nowrap transition-colors outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand-yellow sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-xs',
        on ? 'bg-white text-black' : 'text-white hover:bg-white/10',
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="size-[7px] shrink-0 rounded-full"
          style={{ background: dot }}
        />
      )}
      {children}
    </button>
  )
}
