import type { Picture } from '@/lib/images'
import { cn } from '@/lib/utils'

type Props = {
  picture: Picture
  alt: string
  /** Rendered width hint for the browser, e.g. "(min-width: 1024px) 600px, 100vw". */
  sizes: string
  /** Above the fold (the hero): load first, never lazy. */
  priority?: boolean
  className?: string
}

/** Real photo or catalog artwork as AVIF/WebP with JPEG fallback, never stretched. */
export function Photo({ picture, alt, sizes, priority = false, className }: Props) {
  return (
    <picture>
      {Object.entries(picture.sources).map(([format, srcSet]) => (
        <source
          key={format}
          type={`image/${format === 'jpg' ? 'jpeg' : format}`}
          srcSet={srcSet}
          sizes={sizes}
        />
      ))}
      <img
        src={picture.img.src}
        width={picture.img.w}
        height={picture.img.h}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={cn('block h-auto w-full', className)}
      />
    </picture>
  )
}
