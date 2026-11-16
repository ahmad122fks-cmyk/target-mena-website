/** vite-imagetools `as=picture` import (AVIF + WebP sources, JPEG fallback). */
interface ImagetoolsPicture {
  sources: Record<string, string>
  img: { src: string; w: number; h: number }
}

declare module '*&as=picture' {
  const picture: ImagetoolsPicture
  export default picture
}

/** vite-imagetools single file (e.g. a tiny backdrop copy): its URL. */
declare module '*&quality=50' {
  const url: string
  export default url
}
