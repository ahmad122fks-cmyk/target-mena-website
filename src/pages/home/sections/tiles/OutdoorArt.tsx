import { Photo } from '@/components/shared/Photo'
import { BOARD_PHOTOS } from '@/lib/images'

const SPOTS = [
  { x: 230, y: 150, r: 20, delay: 0 },
  { x: 140, y: 210, r: 14, delay: 0.8 },
  { x: 320, y: 90, r: 10, delay: 1.4 },
]

/**
 * Outdoor (large card): a street grid with a route and boards pulsing like
 * the map markers, and a real board photo (BBL-01A, Baghdad entrance bridge)
 * framed in white at its true ratio.
 */
export function OutdoorArt() {
  return (
    <>
      <svg viewBox="0 0 400 300" className="block size-full" preserveAspectRatio="xMidYMid slice">
        <path d="M0 100H400M0 200H400M133 0V300M266 0V300" className="stroke-line-strong" />
        <path
          d="M60 260 C140 210 180 190 230 150 S330 80 370 50"
          fill="none"
          stroke="#F7AF1C"
          strokeWidth="4"
          strokeDasharray="8 8"
        />
        {SPOTS.map((spot) => (
          <g key={spot.x}>
            <circle
              cx={spot.x}
              cy={spot.y}
              r={spot.r}
              fill="none"
              stroke="#0161a6"
              strokeWidth="2"
              className="origin-center animate-[pulse-ring_2.6s_ease-out_infinite] [transform-box:fill-box]"
              style={{ animationDelay: `${spot.delay}s` }}
            />
            <circle cx={spot.x} cy={spot.y} r={spot.r} fill="#0161a6" />
          </g>
        ))}
      </svg>
      <div className="absolute end-[18px] bottom-[18px] w-[52%] overflow-hidden rounded-xl border-4 border-white shadow-[0_14px_30px_rgb(0_0_0/0.18)]">
        <Photo picture={BOARD_PHOTOS['BBL-01A']} alt="" sizes="220px" />
      </div>
    </>
  )
}
