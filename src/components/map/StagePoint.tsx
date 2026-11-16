import type { ReactNode } from 'react'
import { stageAt, type Cam, type Point } from './camera'

/**
 * Puts its children on a map point. A stage-sized layer moved with a %
 * translate (relative to the stage itself), so it needs no measuring and
 * only the transform changes while the camera moves. Children sit at its
 * top-left corner: the point.
 */
export function StagePoint({ cam, at, children }: { cam: Cam; at: Point; children: ReactNode }) {
  const f = stageAt(cam, at)
  const transform = `translate(${(f.x * 100).toFixed(3)}%, ${(f.y * 100).toFixed(3)}%)`
  return (
    <div className="pointer-events-none absolute inset-0" style={{ transform }}>
      {children}
    </div>
  )
}
