import type { ReactNode } from 'react'
import { Photo } from '@/components/shared/Photo'
import { ToConfirm } from '@/components/shared/ToConfirm'
import type { Picture } from '@/lib/images'
import { cn } from '@/lib/utils'

/** Inner width of the phone screen: one source size for the photo and its blurred copy. */
export const SCREEN_SIZES = '264px'

/**
 * Blurred, darkened copy of the photo filling the card behind the real one
 * (decorative only; the real photo is shown whole on top).
 */
export function BlurredBackdrop({ picture, className }: { picture: Picture; className?: string }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <Photo
        picture={picture}
        alt=""
        sizes={SCREEN_SIZES}
        className={cn(
          'absolute -inset-[30px] h-[calc(100%_+_60px)] w-[calc(100%_+_60px)] max-w-none object-cover blur-[26px] brightness-[.38] saturate-[1.2]',
          className,
        )}
      />
    </div>
  )
}

type Props = { picture: Picture; alt: string; toConfirm?: string; children?: ReactNode }

/** The real photo at its true ratio across the full width: never cropped, never stretched. */
export function TrueRatioPhoto({ picture, alt, toConfirm, children }: Props) {
  return (
    <div
      className="relative w-full shadow-[0_18px_40px_rgb(0_0_0/0.55)]"
      style={{ aspectRatio: `${picture.img.w} / ${picture.img.h}` }}
    >
      <Photo picture={picture} alt={alt} sizes={SCREEN_SIZES} className="h-full w-full" />
      {children}
      {toConfirm && (
        <ToConfirm
          what={toConfirm}
          className="absolute start-2 bottom-2 bg-black/70 px-1.5 text-[10px] leading-4 text-white"
        />
      )}
    </div>
  )
}
