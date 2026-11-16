const SPOTS = [
  { x: 120, y: 90, r: 16, delay: 0 },
  { x: 70, y: 120, r: 10, delay: 0.8 },
  { x: 165, y: 52, r: 8, delay: 1.4 },
]

/** Outdoor: a street grid with boards pulsing like the map markers. */
export function OutdoorArt() {
  return (
    <svg viewBox="0 0 220 170" className="block size-full" preserveAspectRatio="xMidYMid slice">
      <path d="M0 56H220M0 112H220M73 0V170M146 0V170" stroke="#1f4a78" />
      {SPOTS.map((spot) => (
        <g key={spot.x}>
          <circle
            cx={spot.x}
            cy={spot.y}
            r={spot.r}
            fill="none"
            stroke="#4da8e8"
            strokeWidth="2"
            className="origin-center animate-[pulse-ring_2.4s_ease-out_infinite] [transform-box:fill-box]"
            style={{ animationDelay: `${spot.delay}s` }}
          />
          <circle cx={spot.x} cy={spot.y} r={spot.r} fill="#0161a6" />
        </g>
      ))}
    </svg>
  )
}
