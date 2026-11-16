import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import content from './viewfinder.content.json'

const STRIPES = 'bg-[repeating-linear-gradient(-45deg,#fff_0_18px,#000_18px_36px)]'

/**
 * Film slate: the clapstick (hinged at the left) stays open and closes on
 * «أكشن». Scene number, take and production (Target).
 */
export function Clapboard({ scene, clapping }: { scene: number; clapping: boolean }) {
  const t = useT()
  const { slate } = content
  return (
    <div aria-hidden="true" className="w-[13.75rem] shrink-0 sm:w-[18.75rem]">
      <div
        className={cn(
          'h-6 origin-bottom-left rounded-t-[10px] transition-transform duration-[120ms] ease-in sm:h-[2.125rem]',
          STRIPES,
          clapping ? 'rotate-0' : '-rotate-[14deg]',
        )}
      />
      <div className="overflow-hidden rounded-b-[10px] bg-black">
        <div className={cn('h-[1.125rem] sm:h-[1.625rem]', STRIPES)} />
        <div className="grid grid-cols-3 gap-x-1.5 px-4 py-2.5 text-xs text-white/70 sm:py-3">
          <span>{t(slate.scene)}</span>
          <span>{t(slate.take)}</span>
          <span>{t(slate.prod)}</span>
          <b className="text-xl text-white sm:text-[1.625rem]">{scene}</b>
          <b className="text-xl text-white sm:text-[1.625rem]">1</b>
          <b className="self-end text-sm text-white sm:text-base">{t(slate.brand)}</b>
        </div>
      </div>
    </div>
  )
}
