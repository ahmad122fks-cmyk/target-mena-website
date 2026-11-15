import { cn } from '@/lib/utils'

/** The Target four-colour stripe: blue, yellow, green, grey (DESIGN.md). */
export function Stripe({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('flex h-1.5', className)}>
      <span className="flex-[55] bg-brand-blue" />
      <span className="flex-[15] bg-brand-yellow" />
      <span className="flex-[15] bg-brand-green" />
      <span className="flex-[15] bg-brand-grey" />
    </div>
  )
}
