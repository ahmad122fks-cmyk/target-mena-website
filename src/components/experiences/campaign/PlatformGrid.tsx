import { AtSign, Check, ImageIcon, Music2, Play, UsersRound, Aperture } from 'lucide-react'
import content from '@/content/experiences.json'
import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import { platformState, type PlatformState } from './stage'

/** Generic icons only: no platform logos, no platform colours. */
const ICONS = [ImageIcon, Music2, UsersRound, Aperture, Play, AtSign]

const CHIP: Record<PlatformState, string> = {
  published: 'border-brand-green bg-[#0f2b4d]',
  publishing: 'border-brand-yellow bg-[#0f2b4d]',
  queued: 'border-[#1f4a78] bg-[#0b2340]',
}
const TILE: Record<PlatformState, string> = {
  published:
    'bg-brand-green text-black motion-safe:animate-[campaign-pop_.5s_cubic-bezier(.2,.8,.2,1)_both]',
  publishing: 'bg-brand-yellow text-black',
  queued: 'bg-[#1f4a78] text-white',
}
const STATE_TEXT: Record<PlatformState, string> = {
  published: 'text-brand-green',
  publishing: 'text-brand-yellow',
  queued: 'text-[#a9c1d4]',
}

/** Instagram, TikTok, Facebook, Snapchat, YouTube and X going live one by one. */
export function PlatformGrid({ step, published }: { step: number; published: number }) {
  const t = useT()
  const c = content.social
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] text-[#a9c1d4]">{t(c.platformsTitle)}</span>
      <ul className="m-0 grid list-none grid-cols-3 gap-1.5 p-0">
        {c.platforms.map((name, j) => {
          const state = platformState(j, step, published)
          const Icon = state === 'published' ? Check : ICONS[j]
          return (
            <li
              key={name}
              className={cn(
                'flex flex-col items-center gap-1 rounded-xl border px-1 py-1.5',
                CHIP[state],
              )}
            >
              <span
                className={cn(
                  'flex size-[18px] items-center justify-center rounded-md',
                  TILE[state],
                )}
              >
                <Icon className="size-3" strokeWidth={2.6} aria-hidden="true" />
              </span>
              <b lang="en" className="ltr-run text-[11px] leading-none font-semibold">
                {name}
              </b>
              <span className={cn('text-[9px] leading-none', STATE_TEXT[state])}>
                {t(c.state[state])}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
