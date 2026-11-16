import { cn } from '@/lib/utils'

/**
 * «مباشر» / "Live": a green dot with a soft pulse (still under reduced motion).
 * Only the dot is green: green text fails contrast on the light bands
 * (2.5:1), so the label takes the caller's colour (blue by default).
 */
export function LiveDot({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn('inline-flex items-center gap-2 text-[0.8125rem] font-semibold', className)}
    >
      <span aria-hidden="true" className="relative flex size-2">
        <span className="absolute inset-0 animate-[pulse-ring_2s_ease-out_infinite] rounded-full bg-brand-green" />
        <span className="relative size-2 rounded-full bg-brand-green" />
      </span>
      {label}
    </span>
  )
}
