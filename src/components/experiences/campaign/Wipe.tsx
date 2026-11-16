import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Full class names (Tailwind reads them from the source as written). */
const RUNS = {
  type: [
    'motion-safe:animate-[campaign-wipe_3.6s_steps(30)_infinite]',
    'motion-safe:animate-[campaign-unwipe_3.6s_steps(30)_infinite]',
  ],
  draw: [
    'motion-safe:animate-[campaign-wipe_4s_ease-out_infinite]',
    'motion-safe:animate-[campaign-unwipe_4s_ease-out_infinite]',
  ],
}

type Props = { children: ReactNode; run: keyof typeof RUNS; className?: string }

/**
 * Reveals its content from the start side (typing, line drawing) by moving a
 * clip, not the content: transform only (keyframes in campaign.css).
 */
export function Wipe({ children, run, className }: Props) {
  const [clip, content] = RUNS[run]
  return (
    <span
      className={cn('block overflow-hidden [--wipe-from:-100%] rtl:[--wipe-from:100%]', className)}
    >
      <span className={cn('block h-full overflow-hidden', clip)}>
        <span className={cn('block h-full', content)}>{children}</span>
      </span>
    </span>
  )
}
