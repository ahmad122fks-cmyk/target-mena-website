import type { ReactNode } from 'react'
import type { Picture } from '@/lib/images'
import { cn } from '@/lib/utils'
import { Photo } from './Photo'

type Props = {
  picture: Picture
  alt: string
  /** CSS aspect ratio of the artwork, e.g. "1 / 1" (never stretched). */
  ratio: string
  sizes: string
  className?: string
  children: ReactNode
}

/** A catalog artwork shown like a gallery piece: large image, quiet caption below. */
export function Artwork({ picture, alt, ratio, sizes, className, children }: Props) {
  return (
    <figure className={cn('flex flex-col gap-6', className)}>
      <div className="overflow-hidden rounded-xl" style={{ aspectRatio: ratio }}>
        <Photo picture={picture} alt={alt} sizes={sizes} className="size-full object-cover" />
      </div>
      <figcaption className="flex flex-col gap-4">{children}</figcaption>
    </figure>
  )
}
