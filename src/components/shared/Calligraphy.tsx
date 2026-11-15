import markA from '@/assets/calligraphy/mark-a.svg'
import markB from '@/assets/calligraphy/mark-b.svg'
import { cn } from '@/lib/utils'

/*
 * Target calligraphy, exact vector paths from the brand guideline (pages 1
 * and 40). Used as a CSS mask so the colour comes from the palette, in the
 * colour pairs the guideline itself shows (DESIGN.md "Calligraphy").
 * Never flipped, rotated or stretched: the box keeps the SVG's ratio and
 * the mask is "contain".
 */
const MARKS = {
  a: { src: markA, ratio: '843.14 / 811.3' },
  b: { src: markB, ratio: '927.33 / 906.38' },
} as const

const TONES = {
  white: 'bg-white',
  blue: 'bg-brand-blue',
  yellow: 'bg-brand-yellow',
  black: 'bg-brand-black',
  green: 'bg-brand-green',
  grey: 'bg-brand-grey',
} as const

type Props = { mark: keyof typeof MARKS; tone: keyof typeof TONES; className?: string }

export function Calligraphy({ mark, tone, className }: Props) {
  const { src, ratio } = MARKS[mark]
  const mask = `url(${src}) center / contain no-repeat`
  return (
    <span
      aria-hidden="true"
      className={cn('pointer-events-none absolute block', TONES[tone], className)}
      style={{ aspectRatio: ratio, mask, WebkitMask: mask }}
    />
  )
}
