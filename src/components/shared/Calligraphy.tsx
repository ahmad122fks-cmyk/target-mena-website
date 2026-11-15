import markA from '@/assets/calligraphy/mark-a.svg?raw'
import markB from '@/assets/calligraphy/mark-b.svg?raw'
import { cn } from '@/lib/utils'

/*
 * Target calligraphy, exact vector paths from the brand guideline (pages 1
 * and 40), inlined so it paints with the page (no extra request, never the
 * "largest image" Lighthouse waits for). Colour = currentColor from the
 * palette, only in pairs the guideline shows (DESIGN.md section 10).
 * Never flipped, rotated or stretched: the box keeps the SVG's ratio.
 */
const MARKS = {
  a: { svg: markA, ratio: '843.14 / 811.3' },
  b: { svg: markB, ratio: '927.33 / 906.38' },
} as const

const TONES = {
  /** guideline page 40: calligraphy in a light blue tint on white */
  tint: 'text-brand-blue-10',
  /** tone-on-tone on blue sections */
  blue80: 'text-brand-blue-80',
  white: 'text-white',
  blue: 'text-brand-blue',
  yellow: 'text-brand-yellow',
  black: 'text-brand-black',
  green: 'text-brand-green',
  grey: 'text-brand-grey',
} as const

type Props = { mark: keyof typeof MARKS; tone: keyof typeof TONES; className?: string }

export function Calligraphy({ mark, tone, className }: Props) {
  const { svg, ratio } = MARKS[mark]
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute block [&>svg]:block [&>svg]:size-full',
        TONES[tone],
        className,
      )}
      style={{ aspectRatio: ratio }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
