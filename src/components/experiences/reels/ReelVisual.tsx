import { Photo } from '@/components/shared/Photo'
import { cn } from '@/lib/utils'
import { BlurredBackdrop, SCREEN_SIZES } from '../deck/DeckPhoto'
import { reelPicture, type ReelPost } from './posts'
import { MapLights, RecFrame, TvScreen } from './ReelScenes'

const BACKGROUND: Record<string, string> = { rec: 'bg-brand-yellow', art: 'bg-white' }

/** The reel's full-screen background: artwork, satellite map, TV or a blurred board photo. */
export function ReelVisual({ post, current }: { post: ReelPost; current: boolean }) {
  const picture = reelPicture(post.image)
  const zoom = current && 'motion-safe:animate-[reel-zoom_8s_ease-out_both]'
  return (
    <div aria-hidden="true" className={cn('absolute inset-0 bg-black', BACKGROUND[post.design])}>
      {post.design === 'board' && picture && (
        <BlurredBackdrop picture={picture} className={zoom || ''} />
      )}
      {post.design !== 'board' && post.design !== 'tv' && picture && (
        <Photo
          picture={picture}
          alt=""
          sizes={SCREEN_SIZES}
          className={cn(
            'absolute inset-0 h-full w-full object-cover',
            post.design === 'rec' && 'mix-blend-multiply',
            zoom,
          )}
        />
      )}
      {post.design === 'rec' && <RecFrame />}
      {post.design === 'tv' && <TvScreen />}
      {post.design === 'map' && <MapLights />}
    </div>
  )
}
