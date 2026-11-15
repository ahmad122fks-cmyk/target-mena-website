import type { Picture } from '@/lib/images'
import { cn } from '@/lib/utils'
import { Photo } from './Photo'

type Props = {
  laptop: Picture
  phone: Picture
  /** One description for the whole picture (the screens inside are decorative). */
  alt: string
  /** Which side the phone stands on (physical, as in the design). */
  phoneSide: 'left' | 'right'
  className?: string
}

/**
 * A laptop and a phone drawn in CSS around real screen captures: even bezels,
 * no backdrop, sized with container units so the proportions hold at any width.
 */
export function DeviceMockup({ laptop, phone, alt, phoneSide, className }: Props) {
  const right = phoneSide === 'right'
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn('@container relative w-full pt-[3%]', className)}
    >
      <div className={cn('w-[82%]', right ? 'ml-[3%]' : 'ml-[15%]')}>
        <div className="rounded-[1.6cqw] bg-brand-black p-[1.2cqw] shadow-float">
          <div className="aspect-[16/10] overflow-hidden rounded-[0.4cqw] bg-white">
            <Photo
              picture={laptop}
              alt=""
              sizes="(min-width: 1024px) 520px, 80vw"
              className="h-full object-cover object-top"
            />
          </div>
        </div>
        <div className="relative -mx-[6%] h-[1.6cqw] rounded-b-[1.2cqw] bg-brand-grey-40">
          <span className="absolute top-0 left-1/2 h-[0.6cqw] w-[16%] -translate-x-1/2 rounded-b-[0.6cqw] bg-brand-grey-60" />
        </div>
      </div>
      <div className={cn('absolute bottom-0 w-[23%]', right ? 'right-[1%]' : 'left-[1%]')}>
        <div className="rounded-[3.4cqw] bg-brand-black p-[0.8cqw] shadow-float">
          <div className="aspect-[568/1334] overflow-hidden rounded-[2.6cqw] bg-white">
            <Photo
              picture={phone}
              alt=""
              sizes="(min-width: 1024px) 150px, 25vw"
              className="h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
