import type { Picture } from '@/lib/images'
import { useInView } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { Photo } from './Photo'

export type MarqueeItem = { code: string; picture: Picture; alt: string }

type Props = { items: MarqueeItem[]; label: string; className?: string }

function Strip({ items, hidden }: { items: MarqueeItem[]; hidden?: boolean }) {
  return items.map((item) => (
    <li key={item.code} aria-hidden={hidden || undefined} className="shrink-0 pe-3">
      <figure
        className="relative m-0 h-40 overflow-hidden rounded-2xl sm:h-[200px]"
        style={{ aspectRatio: `${item.picture.img.w} / ${item.picture.img.h}` }}
      >
        <Photo
          picture={item.picture}
          alt={hidden ? '' : item.alt}
          sizes="340px"
          className="h-full w-full"
        />
        <figcaption className="ltr-run absolute start-2.5 bottom-2.5 rounded-full bg-black/65 px-2.5 py-0.5 text-xs text-white">
          {item.code}
        </figcaption>
      </figure>
    </li>
  ))
}

/**
 * Real street photos sliding sideways (each at its true ratio, never cropped).
 * Pauses on hover and off screen; still under reduced motion (then it scrolls).
 */
export function PhotoMarquee({ items, label, className }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: '100px' })
  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      className={cn('overflow-x-auto motion-safe:overflow-hidden', className)}
    >
      <ul
        className="flex w-max [--marquee-shift:-50%] hover:[animation-play-state:paused] motion-safe:animate-[marquee_60s_linear_infinite] rtl:[--marquee-shift:50%]"
        style={inView ? undefined : { animationPlayState: 'paused' }}
      >
        <Strip items={items} />
        <Strip items={items} hidden />
      </ul>
    </div>
  )
}
