import { cn } from '@/lib/utils'

/**
 * Visible placeholder for a fact Ahmad has not confirmed yet. Every use is
 * listed in TODO-CONFIRM.md and must be gone before launch.
 */
export function ToConfirm({ what, className }: { what: string; className?: string }) {
  return (
    <span
      lang="en"
      dir="ltr"
      data-to-confirm={what}
      className={cn(
        'inline-block rounded-md border border-dashed border-current px-2 py-0.5 text-sm font-medium',
        className,
      )}
    >
      [TO CONFIRM: {what}]
    </span>
  )
}
