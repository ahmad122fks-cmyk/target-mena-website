import { typeLabels } from '@/data/network-map.json'
import { useLang, useT } from '@/features/i18n/LangContext'
import content from '../../network.tour.content.json'
import { TYPE_COLOURS } from '../typeColours'
import { STOPS, stopCounts, type Stop } from './stops'
import { Tween } from './Tween'

type Props = {
  stop: Stop
  index: number
  playing: boolean
  go: (to: number) => void
  toggle: () => void
}

/** The current stop: its count, top types with bars, previous / next and the self-play switch. */
export function StopCard({ stop, index, playing, go, toggle }: Props) {
  const t = useT()
  const lang = useLang()
  const { tour } = content
  const { total, types } = stopCounts(stop)
  const top = types.slice(0, 4)
  const max = top[0]?.[1] ?? 1
  const last = index === STOPS.length - 1
  return (
    <div
      aria-live="polite"
      className="flex flex-col gap-3 rounded-[20px] border border-white/15 bg-white/[0.04] p-[22px]"
    >
      <span className="text-[0.8125rem] font-semibold text-brand-yellow">
        {t(tour.stopOf)
          .replace('{n}', String(index + 1))
          .replace('{total}', String(STOPS.length))}
      </span>
      <b className="text-2xl leading-[1.35] text-white">
        {t(tour.stops[stop.key as keyof typeof tour.stops].title)}
      </b>
      <Tween
        value={total}
        className="ltr-run self-start text-[3.5rem] leading-none font-bold text-white"
      />
      <span className="text-sm">{t(tour.stops[stop.key as keyof typeof tour.stops].unit)}</span>
      <ul className="flex flex-col gap-2.5">
        {top.map(([type, n]) => (
          <li key={type} className="flex flex-col gap-1">
            <span className="flex justify-between text-[0.8125rem]">
              <span>{typeLabels[lang][type as keyof typeof typeLabels.ar]}</span>
              <span className="ltr-run">{n}</span>
            </span>
            <span className="block h-1.5 overflow-hidden rounded-full bg-white/10">
              <span
                key={`${stop.key}-${type}`}
                className={`block h-full origin-left animate-[grow-x_0.9s_cubic-bezier(.2,.8,.2,1)_both] rounded-full rtl:origin-right ${TYPE_COLOURS[type]}`}
                style={{ width: `${Math.round((n / max) * 100)}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-1.5 flex gap-2">
        <button
          type="button"
          onClick={() => go(index - 1)}
          className="min-h-11 flex-1 rounded-full border border-white/25 text-white hover:bg-white/10"
        >
          {t(tour.prev)}
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          className="min-h-11 flex-1 rounded-full bg-brand-yellow font-semibold text-brand-black hover:bg-brand-yellow-80"
        >
          {t(last ? tour.restart : tour.next)}
        </button>
      </div>
      <button type="button" onClick={toggle} className="min-h-11 text-[0.8125rem] hover:text-white">
        {t(playing ? tour.pause : tour.play)}
      </button>
    </div>
  )
}
