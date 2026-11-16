import { LOGO_WHITE } from '@/lib/site'
import { cn } from '@/lib/utils'
import './screens.css'

/*
 * Wireframe unipole in CSS 3D (box 170 x 300 px): a two-faced board on a
 * pole with a footing. Each face carries the real white logo file, never
 * redrawn; faces hide their back so the logo never reads mirrored.
 */
const EDGE = 'absolute box-border border-[1.5px] border-white/95 bg-white/[0.07]'
const STRIPES =
  'bg-[image:repeating-linear-gradient(0deg,rgba(255,255,255,.18)_0_1px,transparent_1px_14px)]'

/** The board's four thin sides (12 px deep), around the two faces. */
const BOARD_SIDES = [
  'top-0 left-[79px] h-[68px] w-3 [transform:rotateY(90deg)_translateZ(85px)]',
  'top-0 left-[79px] h-[68px] w-3 [transform:rotateY(-90deg)_translateZ(85px)]',
  'top-[28px] left-0 h-3 w-[170px] [transform:rotateX(90deg)_translateZ(34px)]',
  'top-[28px] left-0 h-3 w-[170px] [transform:rotateX(-90deg)_translateZ(34px)]',
]

/** Pole (two crossed planes), bracket under the board and the footing plate. */
const POLE_PARTS = [
  `${STRIPES} top-[68px] left-[78px] h-[212px] w-3.5`,
  `${STRIPES} top-[68px] left-[78px] h-[212px] w-3.5 [transform:rotateY(90deg)]`,
  'top-[68px] left-[66px] h-2.5 w-[38px] [transform:rotateX(90deg)]',
  'top-[255px] left-[60px] size-[50px] [transform:rotateX(90deg)]',
]

function Face({ back }: { back?: boolean }) {
  return (
    <div
      className={cn(
        EDGE,
        'inset-0 grid place-items-center [backface-visibility:hidden]',
        back ? '[transform:rotateY(180deg)_translateZ(6px)]' : '[transform:translateZ(6px)]',
      )}
    >
      <img src={LOGO_WHITE} alt="" width={112} height={20} className="h-auto w-28" />
    </div>
  )
}

/** `spin`: turns once every 10 s; otherwise a still three-quarter view. */
export function Unipole({ spin }: { spin: boolean }) {
  return (
    <div
      className={cn(
        'relative h-[300px] w-[170px] [transform-style:preserve-3d]',
        spin
          ? 'animate-[dg-spin_10s_linear_infinite]'
          : '[transform:rotateX(-12deg)_rotateY(-28deg)]',
      )}
    >
      <div className="absolute inset-x-0 top-0 h-[68px] [transform-style:preserve-3d]">
        <Face />
        <Face back />
        {BOARD_SIDES.map((side) => (
          <span key={side} className={cn(EDGE, side)} />
        ))}
        <span className="absolute top-[74px] left-0 h-2 w-[170px] border-t border-dashed border-white/70 [transform:translateZ(6px)]" />
      </div>
      {POLE_PARTS.map((part) => (
        <span key={part} className={cn(EDGE, part)} />
      ))}
      <span className="absolute top-[240px] left-[45px] size-20 rounded-full border-[1.5px] border-dashed border-white/85 [transform:rotateX(90deg)]" />
    </div>
  )
}
