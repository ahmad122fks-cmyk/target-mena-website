import { MousePointer2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { MOVE } from './ScreenShell'

type WireProps = {
  /** Step at which this box draws itself in. */
  at: number
  step: number
  /** Final design: outlines calm down and the fill fades in. */
  final: boolean
  fill?: string
  className?: string
  children?: ReactNode
}

/** One wireframe box: grows from the start edge, then takes its final fill. */
export function Wire({ at, step, final, fill, className, children }: WireProps) {
  return (
    <div
      className={cn(
        'relative flex-none border ltr:origin-left rtl:origin-right',
        MOVE,
        final ? 'border-[#1F4A78]' : 'border-[#4DA8E8]',
        step >= at ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0',
        className,
      )}
    >
      {fill && (
        <span
          className={cn(
            'absolute inset-0 rounded-[inherit] transition-opacity duration-700',
            fill,
            final ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
      {children}
    </div>
  )
}

/** Fades a detail in or out (only opacity moves). */
export const fade = (on: boolean) =>
  cn('transition-opacity duration-700', on ? 'opacity-100' : 'opacity-0')

/** The pointer that glides to the button and taps it. */
export function Cursor({ show, pressed }: { show: boolean; pressed: boolean }) {
  return (
    <span
      className={cn(
        'absolute end-14 bottom-9 z-10',
        MOVE,
        'duration-700',
        show
          ? 'translate-x-0 translate-y-0 opacity-100'
          : 'translate-x-10 translate-y-24 opacity-0',
      )}
    >
      {pressed && (
        <span className="absolute -top-1.5 -left-1.5 size-4 animate-[pulse-ring_0.9s_ease-out_both] rounded-full border-2 border-[#F7AF1C]" />
      )}
      <MousePointer2
        className={cn(
          'relative size-6 fill-white text-[#071A2E] transition-[scale] duration-200',
          pressed ? 'scale-90' : 'scale-100',
        )}
      />
    </span>
  )
}
