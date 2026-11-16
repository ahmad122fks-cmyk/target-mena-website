import { Suspense } from 'react'
import { PhoneFrame } from '@/components/experiences/PhoneFrame'
import { useInView } from '@/lib/motion'
import { cn } from '@/lib/utils'
import type { TabId } from '../tabs'
import { SCREENS } from './screens'
import './float.css'

type Props = { tab: TabId; label: string }

/** Top clearance inside the phone for the island (PhoneFrame). */
const TOP_PAD = 52

/**
 * The phone beside the tabs (at the end side: left in Arabic, right in
 * English). Only the picked screen is mounted, and it runs only while the
 * phone is on screen. Two floating icons (chat bubble, heart) are decoration.
 */
export function PhoneStage({ tab, label }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 })
  const Screen = SCREENS[tab]
  return (
    <div
      ref={ref}
      className={cn(
        'relative mx-auto flex w-full max-w-[340px] flex-none justify-center',
        !inView && '[&_*]:[animation-play-state:paused]',
      )}
    >
      {/* Dark theme: the navy frame would melt into the navy band, so it goes deeper. */}
      <PhoneFrame label={label} className="dark:border-deep dark:bg-deep">
        <div data-screen={tab} className="absolute inset-0">
          <Suspense fallback={<div className="absolute inset-0 bg-[#071A2E]" />}>
            <Screen key={tab} topPad={TOP_PAD} active={inView} />
          </Suspense>
        </div>
      </PhoneFrame>
      <svg
        viewBox="0 0 80 80"
        aria-hidden="true"
        className="absolute animate-[dg-float_7.5s_ease-in-out_infinite_reverse] -start-1.5 top-[60px] z-10 w-16"
      >
        <path
          d="M14 18h52a6 6 0 0 1 6 6v26a6 6 0 0 1-6 6H34l-14 12V56h-6a6 6 0 0 1-6-6V24a6 6 0 0 1 6-6z"
          fill="#F7AF1C"
        />
      </svg>
      <svg
        viewBox="0 0 80 80"
        aria-hidden="true"
        className="absolute animate-[dg-float_6s_ease-in-out_infinite] -end-1 bottom-[70px] z-10 w-[60px]"
      >
        <path
          d="M40 70 C10 50 6 26 22 18 C32 13 38 20 40 26 C42 20 48 13 58 18 C74 26 70 50 40 70Z"
          fill="#0161A6"
        />
      </svg>
    </div>
  )
}
