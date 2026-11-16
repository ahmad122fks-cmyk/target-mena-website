import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  /** Accessible name of what plays inside (the screen is a figure). */
  label: string
  /** Gentle up-and-down float (home hero only; still under reduced motion). */
  float?: boolean
  className?: string
}

/**
 * Phone mockup for the experiences (290 x 600 at full size, real phone
 * proportions; scales down with its width, never stretched). Screens fill
 * the inside with `absolute inset-0` and keep ~50 px clear at the top for
 * the island.
 */
export function PhoneFrame({ children, label, float, className }: Props) {
  return (
    <figure
      aria-label={label}
      className={cn(
        'relative m-0 aspect-[290/600] w-[290px] max-w-full shrink-0 rounded-[52px] border-4 border-[#1f4a78] bg-black p-[9px] shadow-[0_40px_90px_rgb(1_97_166/0.35)]',
        float && 'motion-safe:animate-[phone-float_6s_ease-in-out_infinite]',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute top-[17px] left-1/2 z-10 h-[25px] w-[88px] -translate-x-1/2 rounded-full bg-black"
      />
      <div className="relative h-full overflow-hidden rounded-[42px] bg-black text-white">
        {children}
      </div>
    </figure>
  )
}
