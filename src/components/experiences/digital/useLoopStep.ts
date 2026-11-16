import { useState } from 'react'
import { useInterval, usePrefersReducedMotion } from '@/lib/motion'
import { nextStep } from './sequence'

/**
 * Step of a looping build-up (0 to count - 1), one step every `ms` while the
 * screen is active (paused otherwise). Under reduced motion it stays on the
 * finished `still` step: a static frame, nothing moves.
 */
export function useLoopStep(count: number, ms: number, active: boolean, still: number): number {
  const reduced = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  useInterval(() => setStep((s) => nextStep(s, count)), active && !reduced ? ms : null)
  return reduced ? still : step
}
