import { Calligraphy } from '@/components/shared/Calligraphy'

const STRIPES = ['#F5FAFA', '#F7AF1C', '#2AB99D', '#709EB2']

/**
 * The Target brand pattern behind the home hero, rebuilt in CSS/SVG (no
 * image): the big ring turning slowly, the dot grid fading out, the four
 * diagonal stripes from the brand slide background, and the two calligraphy
 * marks in white at 7-8 % floating. Phones keep the ring and stripes only.
 * The ring and stripes sit on the phone side (mirrored in Arabic), never
 * behind the headline or the numbers.
 * Decorative: hidden from screen readers; still under reduced motion.
 */
export function BrandPattern() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="hero-dots absolute inset-0 hidden opacity-50 md:block" />
      <svg
        viewBox="0 0 1440 820"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full rtl:-scale-x-100"
      >
        <g
          style={{ transformOrigin: '1290px 160px' }}
          className="motion-safe:animate-[spin-slow_60s_linear_infinite]"
        >
          <circle
            cx="1290"
            cy="160"
            r="300"
            fill="none"
            stroke="#fff"
            strokeOpacity=".1"
            strokeWidth="64"
          />
        </g>
        <circle
          cx="1290"
          cy="160"
          r="190"
          fill="none"
          stroke="#fff"
          strokeOpacity=".1"
          strokeWidth="6"
        />
        <g className="hidden md:block" fill="none" stroke="#fff">
          <circle cx="980" cy="760" r="120" strokeOpacity=".09" strokeWidth="22" />
          <circle cx="120" cy="720" r="70" strokeOpacity=".08" strokeWidth="14" />
        </g>
        <g transform="translate(1180 610) rotate(-38)">
          <g className="[transform-box:fill-box] motion-safe:animate-[stripes-in_1.2s_cubic-bezier(.2,.8,.2,1)_both]">
            {STRIPES.map((fill, i) => (
              <rect key={fill} x="0" y={i * 24} width="560" height="14" fill={fill} />
            ))}
          </g>
        </g>
      </svg>
      <Calligraphy
        mark="a"
        tone="white"
        className="start-[46%] top-[120px] hidden w-[300px] opacity-[.08] md:block motion-safe:animate-[mark-float_9s_ease-in-out_infinite]"
      />
      <Calligraphy
        mark="b"
        tone="white"
        className="end-[3%] -bottom-[60px] hidden w-[260px] opacity-[.07] md:block motion-safe:animate-[mark-float_11s_ease-in-out_infinite_reverse]"
      />
    </div>
  )
}
