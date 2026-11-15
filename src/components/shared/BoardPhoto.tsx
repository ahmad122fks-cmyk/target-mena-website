import site from '@/content/site.json'
import { useT } from '@/features/i18n/LangContext'
import type { Board } from '@/lib/boards'
import { useNearViewport } from '@/lib/useNearViewport'
import { cn } from '@/lib/utils'

type Props = {
  board: Pick<Board, 'photo'>
  alt: string
  sizes: string
  priority?: boolean
  /** Frame classes (e.g. "aspect-[16/10]"); the photo keeps its true ratio inside it. */
  className?: string
}

/** Real board photo (AVIF 480/720/960 px, WebP fallback), never cropped or stretched; else "Photo on request". */
export function BoardPhoto({ board, alt, sizes, priority = false, className }: Props) {
  const t = useT()
  const { photo } = board
  // Photos further down appear only when the visitor scrolls near them.
  const [ref, near] = useNearViewport<HTMLDivElement>(!priority)
  const frame = cn('flex items-center justify-center overflow-hidden bg-brand-ghost', className)
  if (!photo)
    return (
      <div className={cn(frame, 'p-3 text-center text-sm text-brand-text')}>
        {t(site.photoOnRequest)}
      </div>
    )
  const src = (w: number, format = 'avif') => `/photos/${photo.id}-${w}.${format}`
  if (!near) return <div ref={ref} className={frame} aria-hidden="true" />
  return (
    <div className={frame}>
      <picture className="contents">
        <source
          type="image/avif"
          srcSet={`${src(480)} 480w, ${src(720)} 720w, ${src(960)} 960w`}
          sizes={sizes}
        />
        <img
          src={src(720, 'webp')}
          width={photo.w}
          height={photo.h}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="block h-auto max-h-full w-auto max-w-full object-contain"
        />
      </picture>
    </div>
  )
}
