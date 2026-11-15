import site from '@/content/site.json'
import { useT } from '@/features/i18n/LangContext'
import type { Board } from '@/lib/boards'
import { cn } from '@/lib/utils'

type Props = { board: Board; alt: string; sizes: string; priority?: boolean; className?: string }

/** Real board photo (WebP, 480/720/960 px) or the neutral "Photo on request" card - never a stock photo. */
export function BoardPhoto({ board, alt, sizes, priority = false, className }: Props) {
  const t = useT()
  const { photo } = board
  if (!photo) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-brand-ghost text-center text-brand-text',
          className,
        )}
      >
        {t(site.photoOnRequest)}
      </div>
    )
  }
  const src = (w: number, format = 'avif') => `/photos/${photo.id}-${w}.${format}`
  return (
    <picture>
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
        className={cn('block h-auto w-full object-cover', className)}
      />
    </picture>
  )
}
