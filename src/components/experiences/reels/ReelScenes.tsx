import alrabiaa from '@/assets/clients/alrabiaa.png'

/** Camera REC light and frame lines over the production artwork. */
export function RecFrame() {
  return (
    <>
      <span className="absolute start-4 top-24 flex items-center gap-1.5 text-xs font-bold text-black">
        <span className="size-[9px] rounded-full bg-black motion-safe:animate-[blink_1s_steps(2)_infinite]" />
        REC
      </span>
      <span className="absolute inset-x-[26px] top-[120px] bottom-[210px] border-2 border-black/50" />
    </>
  )
}

const EQ = [40, 64, 30, 56, 70, 36, 60, 26, 50]

/** Alrabiaa TV logo with green sound bars (the caption names the channel). */
export function TvScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-[22px] pb-20">
      <img src={alrabiaa} alt="" width={70} height={92} className="h-[60px] w-auto" />
      <div className="flex h-[70px] items-end gap-1.5">
        {EQ.map((h, k) => (
          <span
            key={k}
            className="block w-[9px] origin-bottom rounded-[3px] bg-brand-green motion-safe:animate-[eq-bar_1s_ease-in-out_infinite]"
            style={{ height: h, animationDelay: `${k / 10}s` }}
          />
        ))}
      </div>
    </div>
  )
}

/** Decorative city lights on the satellite map (no board data). */
const LIGHTS = [
  { top: '44%', left: '52%', size: 14, delay: '0s' },
  { top: '58%', left: '46%', size: 12, delay: '.7s' },
  { top: '70%', left: '28%', size: 10, delay: '1.3s' },
]

export function MapLights() {
  return LIGHTS.map((light) => (
    <span
      key={light.top}
      className="absolute"
      style={{ top: light.top, left: light.left, width: light.size, height: light.size }}
    >
      <span
        className="absolute inset-0 rounded-full bg-brand-blue-60 motion-safe:animate-[pulse-ring_2s_ease-out_infinite]"
        style={{ animationDelay: light.delay }}
      />
      <span className="absolute inset-0 rounded-full bg-white" />
    </span>
  ))
}
