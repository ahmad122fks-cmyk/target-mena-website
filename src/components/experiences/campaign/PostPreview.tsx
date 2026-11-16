import { Heart, MessageCircle, Send, Store } from 'lucide-react'
import { Photo } from '@/components/shared/Photo'
import content from '@/content/experiences.json'
import { useT } from '@/features/i18n/LangContext'
import { ART } from '@/lib/images'
import { cn } from '@/lib/utils'
import { Wipe } from './Wipe'

type Props = { format: number; liked: boolean }

/** The sponsored post being published: creative artwork, format chips, typed caption. */
export function PostPreview({ format, liked }: Props) {
  const t = useT()
  const c = content.social
  return (
    <div className="overflow-hidden rounded-2xl border border-[#1f4a78] bg-[#0f2b4d]">
      <div className="flex items-center gap-2 px-2.5 py-2">
        <span className="flex size-6 items-center justify-center rounded-full border-2 border-brand-yellow bg-brand-blue">
          <Store className="size-3" strokeWidth={2.4} aria-hidden="true" />
        </span>
        <b className="text-[11px]">{t(c.brand)}</b>
        <span className="ms-auto text-[10px] text-[#a9c1d4]">{t(c.sponsored)}</span>
      </div>
      <div className="relative h-[130px] overflow-hidden bg-brand-blue">
        <Photo
          picture={ART.creative}
          alt=""
          sizes="264px"
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute start-2 bottom-2 flex gap-1">
          {c.formats.map((label, j) => (
            <span
              key={label.en}
              className={cn(
                'rounded-full px-2 py-[3px] text-[10px] leading-none font-semibold',
                j === format ? 'bg-white text-black' : 'bg-black/45 text-white',
              )}
            >
              {t(label)}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1.5 px-2.5 py-2">
        <div aria-hidden="true" className="flex gap-2.5">
          <Heart
            className={cn('size-[17px]', liked ? 'fill-brand-yellow text-brand-yellow' : '')}
            strokeWidth={liked ? 0 : 1.8}
          />
          <MessageCircle className="size-[17px]" strokeWidth={1.8} />
          <Send className="size-[17px]" strokeWidth={1.8} />
        </div>
        <Wipe run="type" className="text-[11px] whitespace-nowrap text-[#a9c1d4]">
          {t(c.caption)}
        </Wipe>
      </div>
    </div>
  )
}
