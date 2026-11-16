import { totals } from '@/data/network-map.json'
import { ToConfirm } from '@/components/shared/ToConfirm'
import { LATEST } from '@/features/feed/feed'
import { useLang, useT } from '@/features/i18n/LangContext'
import content from '../home.content.json'
import { HeroSearch } from './HeroSearch'
import { Kpis } from './Kpis'

/** "Before [highlight] after": the bracketed part of the headline is yellow. */
function splitTitle(title: string): [string, string, string] {
  const match = /^(.*)\[(.+)\](.*)$/.exec(title)
  return match ? [match[1], match[2], match[3]] : [title, '', '']
}

/** New-campaign chip, H1, one line naming the four services, white search, the four numbers. */
export function HeroIntro() {
  const t = useT()
  const lang = useLang()
  const { hero } = content
  const title = t(hero.title).replace('{boards}', String(totals.boards))
  const [before, mark, after] = splitTitle(title)
  return (
    <div className="flex min-w-0 flex-[1_1_34rem] flex-col gap-6">
      {LATEST?.bar && (
        <a
          href="#feed"
          className="flex items-center gap-2 self-start rounded-full border border-white/25 bg-white/12 px-3.5 py-1.5 text-[0.8125rem] hover:bg-white/20"
        >
          <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-brand-green" />
          <span>
            <span className="font-semibold">{t(hero.newLabel)}:</span> {t(LATEST.brand)}
            <span aria-hidden="true"> {lang === 'ar' ? '←' : '→'}</span>
          </span>
        </a>
      )}
      <div className="flex flex-col gap-3">
        <h1
          id="hero-title"
          className="text-[2.375rem] leading-[1.2] sm:text-5xl lg:text-[3.5rem] lg:leading-[4.125rem]"
        >
          {before}
          <span className="text-brand-yellow">{mark}</span>
          {after}
        </h1>
        <ToConfirm what={hero.titleToConfirm} className="self-start text-xs text-on-blue" />
      </div>
      <p className="max-w-[35rem] text-[1.0625rem] leading-[1.8] text-on-blue lg:text-[1.1875rem]">
        {t(hero.lead)}
      </p>
      <HeroSearch />
      <Kpis />
    </div>
  )
}
