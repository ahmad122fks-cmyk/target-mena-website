import { useT } from '@/features/i18n/LangContext'
import { usePrefersReducedMotion } from '@/lib/motion'
import content from './digital-screens.content.json'
import { ScreenShell, type ScreenProps } from './ScreenShell'
import { Unipole } from './Unipole'
import './screens.css'

/* Blueprint grid: fine 12 px lines, stronger every 60 px (white with opacity). */
const GRID = {
  backgroundImage: [
    'linear-gradient(rgba(255,255,255,.09) 1px, transparent 1px)',
    'linear-gradient(90deg, rgba(255,255,255,.09) 1px, transparent 1px)',
    'linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px)',
    'linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)',
  ].join(', '),
  backgroundSize: '12px 12px, 12px 12px, 60px 60px, 60px 60px',
}
const CELL = 'border-white/80 px-2 py-1.5'

/**
 * التصميم ثلاثي الأبعاد / 3D design: a wireframe unipole turning on a blue
 * blueprint grid, the Target logo on both faces, and a drawing title block
 * (the 10 x 4 m board is a design illustration from Ahmad's artboard).
 */
export function BlueprintScreen({ topPad = 52, active = true }: ScreenProps) {
  const t = useT()
  const c = content.threeD
  const still = usePrefersReducedMotion()
  return (
    <ScreenShell topPad={topPad} active={active} className="bg-[#0161A6] text-white">
      <span className="absolute inset-0" style={GRID} />
      {!still && (
        <span className="pointer-events-none animate-[dg-scan_3.2s_linear_infinite] absolute inset-x-0 top-0 h-[60px] bg-[image:linear-gradient(rgba(255,255,255,0),rgba(255,255,255,.14),rgba(255,255,255,0))]" />
      )}
      <div
        dir="ltr"
        className="relative flex justify-between px-4 pt-1.5 text-[10px] tracking-[0.1em] text-white/80"
      >
        <span>{t(c.head)}</span>
        <span>{t(c.rev)}</span>
      </div>
      <div className="relative flex flex-1 items-center justify-center [perspective:760px]">
        <Unipole spin={!still} />
      </div>
      <div className="relative mx-3.5 mb-5 grid grid-cols-2 border border-white/80 text-[10px] leading-snug">
        <span className={`${CELL} border-e border-b`}>{t(c.model)}</span>
        <span className={`${CELL} border-b`}>
          {t(c.board)} <span className="ltr-run">{c.size}</span> {t(c.unit)}
        </span>
        <span className={`${CELL} border-e`}>{t(c.faces)}</span>
        <span className={CELL}>
          <span className="ltr-run">{t(c.brand)}</span>
        </span>
      </div>
    </ScreenShell>
  )
}
