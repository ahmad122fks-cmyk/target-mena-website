import alrabiaaLogo from '@/assets/clients/alrabiaa.png'
import content from '@/content/showcase.json'
import { useLink, useT } from '@/features/i18n/LangContext'

const BARS = [40, 70, 30, 60, 84, 46, 76, 28, 58, 66, 36]

/** Alrabiaa TV inside the phone: on-air light, sound bars, the three programme lines, green action. */
export function TvScreen({ active = true }: { active?: boolean }) {
  const t = useT()
  const link = useLink()
  const { tv } = content
  const play = active ? 'running' : 'paused'
  return (
    <div className="absolute inset-0 flex flex-col gap-4 bg-black px-[18px] pt-16 pb-5 text-white">
      <div className="flex items-center justify-between">
        <img src={alrabiaaLogo} alt={t(tv.logoAlt)} width={70} height={92} className="h-9 w-auto" />
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-green">
          <span
            aria-hidden="true"
            className="size-2 animate-[blink_1s_steps(2)_infinite] rounded-full bg-brand-green"
            style={{ animationPlayState: play }}
          />
          {t(tv.onAir)}
        </span>
      </div>
      <div
        aria-hidden="true"
        className="flex h-[120px] items-end justify-center gap-1.5 rounded-2xl border border-brand-green/35 bg-[#0b2340] pb-[18px]"
      >
        {BARS.map((h, j) => (
          <span
            key={j}
            className="block w-[9px] origin-bottom animate-[eq-bar_1s_ease-in-out_infinite] rounded-[3px] bg-brand-green"
            style={{ height: h, animationDelay: `${j * 0.09}s`, animationPlayState: play }}
          />
        ))}
      </div>
      <b className="text-[17px] leading-normal font-semibold">{t(tv.line)}</b>
      <ul className="flex flex-col gap-2">
        {tv.rows.map((row) => (
          <li
            key={row.en}
            className="flex items-center gap-2.5 rounded-xl border border-[#1f4a78] px-3 py-2.5 text-[13px]"
          >
            <span aria-hidden="true" className="size-2 rounded-full bg-brand-green" />
            {t(row)}
          </li>
        ))}
      </ul>
      <a
        href={link(tv.cta.path)}
        className="mt-auto rounded-full bg-brand-green py-2.5 text-center text-sm font-semibold text-brand-black"
      >
        {t(tv.cta.label)}
      </a>
    </div>
  )
}
