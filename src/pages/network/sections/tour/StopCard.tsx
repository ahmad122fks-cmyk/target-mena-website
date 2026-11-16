import { typeLabels } from '@/data/network-map.json'
import { PillButton } from '@/components/shared/PillButton'
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

/** The current stop (light card, v3): count, top types with bars, previous / next, self-play. */
export function StopCard({ stop, index, playing, go, toggle }: Props) {
  const t = useT()
  const lang = useLang()
  const { tour } = content
  const { total, types } = stopCounts(stop)
  const top = types.slice(0, 4)
  const max = top[0]?.[1] ?? 1
  const last = index === STOPS.length - 1
  const text = tour.stops[stop.key as keyof typeof tour.stops]
  return (
    <div
      aria-live="polite"
      className="flex flex-col gap-3 rounded-card border border-line bg-surface p-[22px]"
    >
      <span className="text-[0.8125rem] font-semibold text-link">
        {t(tour.stopOf)
          .replace('{n}', String(index + 1))
          .replace('{total}', String(STOPS.length))}
      </span>
      <b className="text-[1.625rem] leading-[1.35] text-ink">{t(text.title)}</b>
      <Tween
        value={total}
        className="ltr-run self-start text-[3.5rem] leading-none font-bold text-ink"
      />
      <span className="text-[0.9375rem] leading-6">{t(text.unit)}</span>
      <ul className="flex flex-col gap-2.5">
        {top.map(([type, n]) => (
          <li key={type} className="flex flex-col gap-1">
            <span className="flex justify-between text-sm leading-6">
              <span>{typeLabels[lang][type as keyof typeof typeLabels.ar]}</span>
              <span className="ltr-run font-semibold text-ink">{n}</span>
            </span>
            <span className="block h-1.5 overflow-hidden rounded-full bg-line">
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
        <PillButton tone="outline" size="sm" className="flex-1" onClick={() => go(index - 1)}>
          {t(tour.prev)}
        </PillButton>
        <PillButton size="sm" className="flex-1" onClick={() => go(index + 1)}>
          {t(last ? tour.restart : tour.next)}
        </PillButton>
      </div>
      <button
        type="button"
        onClick={toggle}
        className="min-h-11 text-sm text-brand-text hover:text-link"
      >
        {t(playing ? tour.pause : tour.play)}
      </button>
    </div>
  )
}
