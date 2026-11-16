import './camera.css'
import './film-look.css'
import { FullViewfinder } from './FullViewfinder'
import { PhoneViewfinder } from './PhoneViewfinder'

type Props = {
  /** 'full': the Production page experience. 'phone': fills a PhoneFrame screen. */
  variant?: 'full' | 'phone'
  /** False pauses everything (e.g. a PhoneShowcase tab that is not showing). */
  active?: boolean
  /** Phone only: space kept clear at the top for the island (px). */
  topPad?: number
}

/**
 * ProductionViewfinder (prompt 4, 2.6 and Production.dc.html): the real
 * cinema camera photo played as footage, with REC, 25 fps timecode,
 * letterbox, grain, light leak, lens flare and whip-pan cuts, plus the
 * clapperboard that steps through the five production stages.
 *
 * Rolls only while active and on screen; under reduced motion it is a still
 * frame. The server render is 00:00:00:00 on the wide shot, stage 1.
 * Video-ready: set "video" in viewfinder.content.json (see Footage.tsx).
 */
export function ProductionViewfinder({ variant = 'full', active = true, topPad = 50 }: Props) {
  if (variant === 'phone') return <PhoneViewfinder active={active} topPad={topPad} />
  return <FullViewfinder active={active} />
}
