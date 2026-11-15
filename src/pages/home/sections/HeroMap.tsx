/**
 * Decorative map illustration for the hero card (DESIGN.md 12): roads, a
 * river and coverage circles in palette colours. Not a real map, no board
 * codes or positions. [TO CONFIRM] illustration vs a real photo.
 */
export function HeroMap() {
  return (
    <svg viewBox="0 0 560 300" aria-hidden="true" className="block h-auto w-full">
      <rect width="560" height="300" className="fill-brand-blue-10" />
      <g className="fill-none stroke-white" strokeWidth="7">
        <path d="M0 60H560M0 150H560M0 235H560M90 0V300M210 0V300M360 0V300M480 0V300M0 290 560 20" />
      </g>
      <path
        d="M300-10C250 60 380 110 320 170S250 260 330 320"
        className="fill-none stroke-brand-blue-40"
        strokeOpacity="0.5"
        strokeWidth="22"
      />
      <g className="fill-brand-blue/10 stroke-brand-blue" strokeWidth="1.5">
        <circle cx="150" cy="105" r="62" />
        <circle cx="420" cy="200" r="72" />
      </g>
      <g className="fill-brand-blue">
        <circle cx="135" cy="95" r="7" />
        <circle cx="170" cy="125" r="7" />
        <circle cx="400" cy="180" r="7" />
        <circle cx="445" cy="215" r="7" />
        <circle cx="410" cy="235" r="7" />
      </g>
      <g className="fill-brand-yellow">
        <circle cx="160" cy="80" r="7" />
        <circle cx="430" cy="165" r="7" />
      </g>
      <g className="fill-brand-green">
        <circle cx="260" cy="230" r="7" />
        <circle cx="520" cy="90" r="7" />
      </g>
    </svg>
  )
}
