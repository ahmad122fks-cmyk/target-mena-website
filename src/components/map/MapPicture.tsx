import { MAP_IMAGE } from '@/lib/images'
import { stageAt, type Cam } from './camera'

// Rendered at the stage width; after the intro it shows about 1.7x larger.
const SIZES = '(max-width: 640px) 100vw, 1000px'

/**
 * The satellite base (AVIF/WebP with srcset, JPEG fallback), moved with the
 * same camera as the SVG: translate + scale from its top-left corner, on
 * its own layer so a camera frame does not repaint it. It is decoration;
 * the map's name is on the SVG.
 */
export function MapPicture({ cam, priority }: { cam: Cam; priority?: boolean }) {
  const corner = stageAt(cam, { x: 0, y: 0 })
  const transform = `translate(${(corner.x * 100).toFixed(3)}%, ${(corner.y * 100).toFixed(3)}%) scale(${cam.z.toFixed(4)})`
  return (
    <picture>
      {Object.entries(MAP_IMAGE.sources).map(([format, srcSet]) => (
        <source
          key={format}
          type={`image/${format === 'jpg' ? 'jpeg' : format}`}
          srcSet={srcSet}
          sizes={SIZES}
        />
      ))}
      <img
        src={MAP_IMAGE.img.src}
        width={MAP_IMAGE.img.w}
        height={MAP_IMAGE.img.h}
        alt=""
        sizes={SIZES}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        draggable={false}
        className="absolute inset-0 block size-full max-w-none origin-top-left will-change-transform"
        style={{ transform }}
      />
    </picture>
  )
}
