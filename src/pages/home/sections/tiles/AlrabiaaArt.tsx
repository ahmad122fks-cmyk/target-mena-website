import alrabiaaLogo from '@/assets/clients/alrabiaa.png'

const BARS = [30, 50, 22, 44, 56, 28, 48, 18, 40]

/** Alrabiaa TV: the channel logo over on-air sound bars in the channel green. */
export function AlrabiaaArt() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      <img
        src={alrabiaaLogo}
        alt=""
        width={70}
        height={92}
        loading="lazy"
        className="h-[30px] w-auto"
      />
      <div className="flex h-10 items-end gap-1">
        {BARS.map((h, j) => (
          <span
            key={j}
            className="block w-1.5 origin-bottom animate-[eq-bar_1.1s_ease-in-out_infinite] rounded-[3px] bg-brand-green"
            style={{ height: h * 0.7, animationDelay: `${j * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  )
}
