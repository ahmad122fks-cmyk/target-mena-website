import { useLang, useT } from '@/features/i18n/LangContext'
import { typeLabel, type Board } from '@/lib/boards'
import { cn } from '@/lib/utils'
import content from '../network.tour.content.json'
import { LiveDot } from './LiveDot'

/**
 * Demo of the portal's campaign tracking (v3: white panel): nine boards with
 * green lights that blink off and on, and the four steps (three done).
 * Labelled as an illustration with demo data; it never says whether a board is free.
 */
export function TrackingPanel({ boards }: { boards: Board[] }) {
  const t = useT()
  const lang = useLang()
  const { ground } = content
  return (
    <figure className="m-0 flex flex-col gap-4 rounded-[22px] border border-line bg-surface p-[22px]">
      <div className="flex items-center justify-between gap-2.5">
        <b className="text-ink">{t(ground.panelTitle)}</b>
        <span className="rounded-full border border-brand-green/50 px-2.5 py-0.5">
          <LiveDot label={t(ground.panelLive)} className="text-xs text-ink" />
        </span>
      </div>
      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {boards.map((board, j) => (
          <li
            key={board.code}
            className="flex min-w-0 items-center gap-2.5 rounded-[14px] border border-line bg-brand-ghost p-3"
          >
            <span
              aria-hidden="true"
              className="size-3.5 shrink-0 animate-[led_2.2s_ease-in-out_infinite] rounded-full bg-brand-green shadow-[0_0_12px_3px_rgb(42_185_157/0.65)]"
              style={{
                animationDelay: `${(j * 0.37) % 2.4}s`,
                animationDuration: `${2.2 + (j % 3) * 0.6}s`,
              }}
            />
            <span className="flex min-w-0 flex-col leading-5">
              <b className="ltr-run text-[0.8125rem] text-ink">{board.code}</b>
              <span className="truncate text-xs">{typeLabel(board.type, lang)}</span>
            </span>
          </li>
        ))}
      </ul>
      <ol className="grid grid-cols-4 gap-2">
        {ground.steps.map((step, j) => {
          const done = j < 3
          return (
            <li key={step.en} className="flex flex-col gap-1.5 text-[0.8125rem] leading-5">
              <span className={cn('block h-1 rounded-full', done ? 'bg-brand-green' : 'bg-line')} />
              <span className={done ? 'text-ink' : ''}>{t(step)}</span>
            </li>
          )
        })}
      </ol>
      <figcaption className="text-xs leading-5">{t(ground.note)}</figcaption>
    </figure>
  )
}
