import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Props every phone screen takes (same as SocialCampaign and TargetReels). */
export type ScreenProps = { topPad?: number; active?: boolean }

/** Pop-in used by the build-ups: only transform and opacity move. */
export const MOVE =
  'transition-[opacity,scale,rotate,translate] duration-500 ease-[cubic-bezier(.2,.8,.2,1)]'

type ShellProps = {
  topPad: number
  active: boolean
  className?: string
  children: ReactNode
}

/**
 * Dark phone screen (the same in light and dark theme). Decorative: hidden
 * from screen readers (the phone frame carries the label). CSS loops pause
 * while the screen is not active.
 */
export function ScreenShell({ topPad, active, className, children }: ShellProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute inset-0 flex flex-col overflow-hidden bg-[#071A2E] text-[12px] leading-normal text-[#EAF2F8] select-none',
        !active && '[&_*]:[animation-play-state:paused]',
        className,
      )}
      style={{ paddingTop: topPad }}
    >
      {children}
    </div>
  )
}

type BarProps = { title: string; status: string; done?: boolean; icon?: ReactNode }

/** Top row of a screen: what it is (start) and a status chip (end). */
export function ScreenBar({ title, status, done, icon }: BarProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-1.5 text-[13px] font-semibold">
        {icon}
        {title}
      </span>
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium',
          done ? 'bg-[#2AB99D] text-black' : 'border border-[#1F4A78] text-[#A9C1D4]',
        )}
      >
        {done && <Check className="size-3" strokeWidth={3} />}
        {status}
      </span>
    </div>
  )
}
