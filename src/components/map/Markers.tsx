import { useLang } from '@/features/i18n/LangContext'
import { formatCount } from '@/lib/format'
import { cn } from '@/lib/utils'
import { countOf, nameOf, PROVINCES } from './data'
import type { MapState } from './state'
import { StagePoint } from './StagePoint'

const HALO_BLUE = 'radial-gradient(closest-side, #4DA8E88C, #0161A638 45%, #0161A600)'
const HALO_YELLOW = 'radial-gradient(closest-side, #F7AF1C99, #F7AF1C38 45%, #F7AF1C00)'
const CENTRE = 'absolute top-1/2 left-1/2 -translate-1/2 rounded-full'

type Props = Pick<MapState, 'cam' | 'type' | 'sel' | 'hover' | 'layer'>

/**
 * One marker per province with boards (of the chosen type): white core, soft
 * blue halo sized by the count, thin pulsing ring; yellow when selected or
 * hovered. Same size on screen at every zoom. Each is a real button (the
 * interactive layer handles the click); the name says the count.
 */
export function Markers({ cam, type, sel, hover, layer }: Props) {
  const lang = useLang()
  if (layer === 'density') return null
  return PROVINCES.map((p, j) => {
    const n = countOf(p, type)
    if (!n) return null
    const on = p.k === sel || p.k === hover
    const halo = Math.round((10 + Math.sqrt(n) * 2.1) * 10) / 10
    const hit = Math.max(44, Math.round(halo * 1.4))
    return (
      <StagePoint key={p.k} cam={cam} at={p}>
        <button
          type="button"
          data-key={p.k}
          aria-label={`${nameOf(p, lang)}: ${formatCount(n, lang)}`}
          aria-pressed={p.k === sel}
          className="pointer-events-auto absolute top-0 left-0 -translate-1/2 cursor-pointer rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand-yellow"
          style={{ width: hit, height: hit }}
        >
          <span
            aria-hidden="true"
            className={CENTRE}
            style={{ width: halo * 2, height: halo * 2, background: on ? HALO_YELLOW : HALO_BLUE }}
          />
          <span
            aria-hidden="true"
            className={cn(
              CENTRE,
              'size-[10px] animate-[pulse-ring_2.8s_cubic-bezier(.2,.6,.3,1)_infinite] border-[1.2px]',
              on ? 'border-brand-yellow' : 'border-[#4DA8E8]',
            )}
            style={{ animationDelay: `${(j * 0.23).toFixed(2)}s` }}
          />
          <span
            aria-hidden="true"
            className={cn(
              CENTRE,
              'border border-black/35',
              on ? 'size-[9.2px] bg-brand-yellow' : 'size-[6.8px] bg-white',
            )}
          />
        </button>
      </StagePoint>
    )
  })
}
